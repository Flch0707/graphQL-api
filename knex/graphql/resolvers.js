const queries = require("../queries/queries");
const bcrypt = require("bcryptjs");
const createTokens = require("../../auth/auth.js");


const resolvers = {
  //GET
  Query: {
    users: (_, filters) => queries.getUsers(filters),
    categories: (_, filters,{req}) => {
      if(!req.email){
        return console.log("forbidden")
      }
      return queries.getCategories(filters)
    },
    alcohols: (_, filters) => queries.getAlcohols(filters),
    types: (_, filters) => queries.getTypes(filters),
    bottles: (_, filters) => queries.getBottles(filters)
  },

  //ADD,UPDATE,DELETE
  Mutation: {
    //AUTH
    register: async (_, user) => {
      const hashedPassword = await bcrypt.hash(user.password, 10);
      const curUser = await queries.getUsers({
        email: user.email
      });
      if (curUser.length < 1) {
        const newUser = await queries.addUser({
          email: user.email,
          password: hashedPassword,
          role: user.role
        });
        return newUser[0];
      } else {
        return console.log("User already exist");
      }
    },
    login: async (_, user, { res }) => {
      const curUser = await queries.getUsers({
        email: user.email
      });
      if (curUser.length === 1) {
        const valid = await bcrypt.compare(user.password, curUser[0].password);
        if (!valid) {
          return console.log("Password is not correct");
        }
        const { accessToken, refreshToken } = createTokens(user);

        res.cookie("access-token", accessToken);
        res.cookie("refresh-token", refreshToken);

        return curUser[0];
      } else {
        return console.log("User does not exist");
      }
    },

    invalidateTokens: async (_, user, { res }) => {
      res.clearCookie('access-token')
    },
    //ADD

    addCategory: async (_, cat) => {
      const newCategory = await queries.addCategory(cat);

      return newCategory[0];
    },
    addAlcohol: async (_, alc) => {
      const newAlcohol = await queries.addAlcohol(alc);

      return newAlcohol[0];
    },
    addType: async (_, type) => {
      const newType = await queries.addType(type);

      return newType[0];
    },
    addBottle: async (_, bot) => {
      const newBottle = await queries.addBottle(bot);

      return newBottle[0];
    },

    //UPDATE
    updateUser: async (_, user) => {
      const newUser = await queries.updateUser(user);

      return newUser[0];
    },
    updateCategory: async (_, cat) => {
      const newCategory = await queries.updateCategory(cat);

      return newCategory[0];
    },
    updateAlcohol: async (_, alc) => {
      const newAlcohol = await queries.updateAlcohol(alc);

      return newAlcohol[0];
    },
    updateType: async (_, type) => {
      const newType = await queries.updateType(type);

      return newType[0];
    },
    updateBottle: async (_, bot) => {
      const newBottle = await queries.updateBottle(bot);

      return newBottle[0];
    },

    //DELETE
    deleteUser: async (_, user) => {
      const deletedUser = await queries.deleteUser(user);

      return deletedUser[0];
    },
    deleteCategory: async (_, cat) => {
      const deletedCategory = await queries.deleteCategory(cat);

      return deletedCategory[0];
    },
    deleteAlcohol: async (_, alc) => {
      const deletedAlcohol = await queries.deleteAlcohol(alc);

      return deletedAlcohol[0];
    },
    deleteType: async (_, type) => {
      const deletedType = await queries.deleteType(type);

      return deletedType[0];
    },
    deleteBottle: async (_, bot) => {
      const deletedBottle = await queries.deleteBottle(bot);

      return deletedBottle[0];
    }
  },
  Category: {
    alcohols: async cat => {
      const alcohols = await queries.getAlcohols({
        category: cat.id
      });
      return alcohols;
    },
    bottles: async cat => {
      const bottles = await queries.getBottles({
        category: cat.id
      });
      return bottles;
    }
  },
  Alcohol: {
    category: async alc => {
      const cat = await queries.getCategories({
        id: alc.category
      });
      return cat[0];
    },
    types: async alc => {
      const types = await queries.getTypes({
        alcohol: alc.id
      });
      return types;
    },
    bottles: async alc => {
      const bottles = await queries.getBottles({
        alcohol: alc.id
      });
      return bottles;
    }
  },
  Type: {
    alcohol: async type => {
      const alc = await queries.getAlcohols({
        id: type.alcohol
      });
      return alc[0];
    },
    bottles: async type => {
      const bottles = await queries.getBottles({
        type: type.id
      });
      return bottles;
    }
  },
  Bottle: {
    category: async bot => {
      const cat = await queries.getCategories({
        id: bot.category
      });
      return cat[0];
    },
    alcohol: async bot => {
      const alc = await queries.getAlcohols({
        id: bot.alcohol
      });
      return alc[0];
    },
    type: async bot => {
      const type = await queries.getTypes({
        id: bot.type
      });
      return type[0];
    }
  }
};
module.exports = resolvers;
