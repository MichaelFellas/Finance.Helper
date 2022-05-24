const { gql } = require("apollo-server-express");

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
    _id: ID!
    amount: Float!
    name: String!
    recurring: Boolean!
    recurringTime: Float
  }

  input BillInput {
    amount: Float!
    name: String!
    recurring: Boolean!
    recurringTime: String
  }

  type Goal {
    _id: ID!
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
    addGoal(
      goalName: String!
      amount: Float!
      progress: Float!
      dateBuy: Date!
    ): User
    addContribution(amount: Float!, date: Date!): Goal
    addBill(billData: BillInput!): User
  }
`;

module.exports = typeDefs;

//TODO: ADD QUERIES FOR BILLS AND GOALS
