import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        name
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($name: String!, $email: String!, $password: String!) {
    addUser(name: $name, email: $email, password: $password) {
      token
      user {
        _id
        name
      }
    }
  }
`;

export const ADD_GOAL = gql`
  mutation addGoal(
    $goalName: String!
    $amount: Float!
    $progress: Float!
    $dateBuy: Date!
  ) {
    addGoal(
      goalName: $goalName
      amount: $amount
      progress: $progress
      dateBuy: $dateBuy
    ) {
      _id
      name
      email
      Goals {
        _id
        goalName
        amount
        progress
      }
    }
  }
`;

export const REMOVE_GOAL = gql`
  mutation removeGoal($_id: String!) {
    removeGoal(_id: $_id) {
      _id
      name
      email
      Goals {
        _id
        goalName
        amount
        progress
      }
    }
  }
`;

export const ADD_BILL = gql`
  mutation addBill(
    $name: String!
    $amount: Float!
    $billDate: Date!
    $recurring: String!
    $recurringTime: String!
  ) {
    addBill(
      name: $name
      amount: $amount
      billDate: $billDate
      recurring: $recurring
      recurringTime: $recurringTime
    ) {
      _id
      name
      email
      Bills {
        _id
        amount
        name
        recurring
        recurringTime
        billDate
      }
    }
  }
`;
