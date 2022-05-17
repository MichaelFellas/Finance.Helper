import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
        _id
        username
      }
    }
  }
`;

//TODO: CHECK THIS
export const ADD_GOAL = gql`
  mutation addGoal($goalData: GoalInput!) {
    addGoal(goalData: $goalData) {
      _id
      name
      email
      Goals {
        goalId: ID
        name: String!
        amount: Float!
        progress: Float!
        dateBuy: Date!
        Contributions: [Contribution]
      }
    }
  }
`;

//TODO: CHECK THIS
export const ADD_BILL = gql`
  mutation addBill($billData: BillInput!) {
    addBill(billData: $billData) {
      _id
      name
      email
      Bills {
        billId: ID
        amount: Float!
        name: String!
        recurring: Boolean!
        recurringTime: Float
        date: Date!
      }
    }
  }
`;

//TODO: CHECK THIS
export const ADD_CONTRIBUTION = gql`
  mutation addContribution($amount: Float!, $date: Date!, $billId: billId) {
    addContribution(amount: $amount, date: $date, billId: $billId) {
      billId
      Contributions {
        amount: Float!        
        date: Date!
      }
    }
  }
`;
