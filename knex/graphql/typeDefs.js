const { gql } = require("apollo-server-express");

//gql parses the graphql type file
const typeDefs = gql`
  """
  graphql shemas
  """
  type User {
    id: ID
    email: String
    password: String
    role: String
  }
  type Category {
    id: ID
    name: String
    alcohols: [Alcohol]
    bottles: [Bottle]
  }
  type Alcohol {
    id: ID
    name: String
    category: Category
    types: [Type]
    bottles: [Bottle]
  }
  type Type {
    id: ID
    name: String
    alcohol: Alcohol
    bottles: [Bottle]
  }
  type Bottle {
    id: ID
    name: String
    alcohol_volume: Float
    format: Float
    price: Float
    URL: String
    created_at: String
    updated_at: String
    rate: Int
    empty: Boolean
    category: Category
    type: Type
    alcohol: Alcohol
  }

  """
  GET prototypes
  """
  type Query {
    users(id: ID, email: String, password: String, role: String): [User]
    categories(id: ID, name: String): [Category]
    alcohols(id: ID, name: String, category: ID): [Alcohol]
    types(id: ID, name: String, alcohol: ID): [Type]
    bottles(
      id: ID
      name: String
      alcohol_volume: Float
      format: Float
      price: Float
      URL: String
      rate: Int
      empty: Boolean
      category: ID
      alcohol: ID
      type: ID
    ): [Bottle]
  }

  """
  ADD/UPDATE/DELETE prototypes
  """
  type Mutation {
    register(id: ID, email: String, password: String, role: String): User

    login(id: ID, email: String, password: String, role: String): User
    updateUser(id: ID!, email: String, password: String, role: String): User
    invalidateTokens:Boolean
    deleteUser(id: ID!): User

    addCategory(id: ID, name: String): Category
    updateCategory(id: ID!, name: String): Category
    deleteCategory(id: ID!): Category

    addAlcohol(id: ID, name: String, category: ID): Alcohol
    updateAlcohol(id: ID!, name: String, category: ID): Alcohol
    deleteAlcohol(id: ID!): Alcohol

    addType(id: ID, name: String, alcohol: ID): Type
    updateType(id: ID!, name: String, alcohol: ID): Type
    deleteType(id: ID!): Type

    addBottle(
      id: ID
      name: String
      alcohol_volume: Float
      format: Float
      price: Float
      URL: String
      rate: Int
      empty: Boolean
      category: ID
      alcohol: ID
      type: ID
    ): Bottle
    updateBottle(
      id: ID!
      name: String
      alcohol_volume: Float
      format: Float
      price: Float
      URL: String
      rate: Int
      empty: Boolean
      category: ID
      alcohol: ID
      type: ID
    ): Bottle
    deleteBottle(id: ID!): Bottle
  }
`;
module.exports = typeDefs;
