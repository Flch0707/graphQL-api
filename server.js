const express = require("express");
const cors = require('cors')
const multer  = require('multer')
const PORT = process.env.PORT || 4000;
const { ApolloServer } = require("apollo-server-express");
const cookieParser = require("cookie-parser");
const typeDefs = require("./knex/graphql/typeDefs");
const resolvers = require("./knex/graphql/resolvers");
const queries = require("./knex/queries/queries");
const { verify } = require("jsonwebtoken");
const createTokens = require("./auth/auth.js");
const { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } = require("./env/ENV");
const app = express();
app.use(cors())
//launch the Apollo server and the middlewares
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req, res }) => ({ req, res }),
  playground: {
    settings: {
      "editor.theme": "light"
    },
    tabs: [
      {
        endpoint: "/graphql"
      }
    ]
  }
});

app.use(cookieParser());

app.use(async (req, res, next) => {
  const refreshToken = req.cookies["refresh-token"];
  const accessToken = req.cookies["access-token"];
  //if no access and refresh token we exit with next
  if (!refreshToken && !accessToken) {
    return next();
  }
  //verify if access token valid
  try {
    const data = verify(accessToken, ACCESS_TOKEN_SECRET);
    req.email = data.email;

    return next();
  } catch {}
  //if access token not valid, check if there'a a refresh token
  if (!refreshToken) {
    return next();
  }
  //if there's a refresh token, check if it's valid
  let datas;
  try {
    datas = verify(refreshToken, REFRESH_TOKEN_SECRET);
  } catch {
    return next();
  }
  //look for user in db with the verify refreshToken
  const curUser = await queries.getUsers({
    email: datas.email
  });
  // check if refresh token is valid
  if (!curUser ) {
    return next();
  }
  //refresh token is valid at this point, clear to create new tokens
  const tokens = createTokens(curUser[0]);
  //save the new tokens in the cookies
  res.cookie("refresh-token", tokens.refreshToken);
  res.cookie("access-token", tokens.accessToken);
  req.email = curUser.email;
  next();
});

server.applyMiddleware({ app });

const fileFilter = (req, file, cb) => {
  const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
  if (!allowedTypes.includes(file.mimetype)) {
    const error = new Error("Incorrect file");
    error.code = "INCORRECT_FILETYPE";
    return cb(error, false)
  }
  cb(null, true);
}

const upload = multer({
  dest: './uploads',
  fileFilter,
  limits: {
    fileSize: 5000000
  }
});

app.post('/upload', upload.single('file'), (req, res) => {
  res.json(req.file);
});

app.use((err, req, res, next) => {
  if (err.code === "INCORRECT_FILETYPE") {
    res.status(422).json({ error: 'Only images are allowed' });
    return;
  }
  if (err.code === "LIMIT_FILE_SIZE") {
    res.status(422).json({ error: 'Allow file size is 500KB' });
    return;
  }
});

app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
