const { gql } = require("apollo-server-express");

const { GraphQLScalarType, Kind } = require("graphql");

const dateScalar = new GraphQLScalarType({
  name: "Date",
  description: "Date custom scalar type",
  serialize(value) {
    return value.getTime(); // Convert outgoing Date to integer for JSON
  },
  parseValue(value) {
    return new Date(value); // Convert incoming integer to Date
  },
  parseLiteral(ast) {
    if (ast.kind === Kind.INT) {
      return new Date(parseInt(ast.value, 10)); // Convert hard-coded AST string to integer and then to Date
    }
    return null; // Invalid hard-coded value (not an integer)
  },
});

const Date = dateScalar;

const typeDefs = gql`
  scalar Date

  type User {
    _id: ID!
    name: String!
    email: String!
    password: String!
    Goals: [Goal]
    Bills: [Bill]
  }

  type Bill {
    billId: ID
    amount: Float!
    name: String!
    recurring: Boolean!
    recurringTime: Float
    date: Date!
  }

  input BillInput {
    amount: Float!
    name: String!
    recurring: Boolean!
    recurringTime: Float
    date: Date!
  }

  type Goal {
    goalId: ID
    goalName: String!
    amount: Float!
    progress: Float!
    dateBuy: Date!
    Contributions: [Contribution]
  }

  input GoalInput {
    goalName: String!
    amount: Float!
    progress: Float!
    dateBuy: Date!
  }

  type Contribution {
    amount: Float!
    date: Date!
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    me: User
  }

  type Mutation {
    addUser(name: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addGoal(goal: GoalInput!): User
    addContribution(amount: Float!, date: Date!): Goal
    addBill(billData: BillInput!): User
  }
`;

module.exports = typeDefs;

//TODO: ADD QUERIES FOR BILLS AND GOALS
