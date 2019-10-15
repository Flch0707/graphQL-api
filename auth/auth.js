const { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } = require("../env/ENV");
const jwt = require("jsonwebtoken");

const createTokens = user => {
  const refreshToken = jwt.sign({ email: user.email }, REFRESH_TOKEN_SECRET, {
    expiresIn: "60min"
  });
  const accessToken = jwt.sign({ email: user.email }, ACCESS_TOKEN_SECRET, {
    expiresIn: "8min"
  });

  return { refreshToken, accessToken };
};

module.exports = createTokens;
