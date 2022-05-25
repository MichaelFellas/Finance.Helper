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

  type Goal {
    _id: ID!
    goalName: String!
    amount: Float!
    progress: Float!
    dateBuy: Date!
  }

  type Bill {
    _id: ID!
    amount: Float!
    name: String!
    billDate: Date!
    recurring: String!
    recurringTime: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    me: User
    meGoal: User
    meBill: User
    goal(goalId: ID!): User
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
    removeGoal(_id: String!): User
    addBill(
      name: String!
      amount: Float!
      billDate: Date!
      recurring: String!
      recurringTime: String
    ): User
  }
`;

module.exports = typeDefs;

//TODO: ADD QUERIES FOR BILLS AND GOALS
