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
      _id
      name
    }
  }
`;

//TODO: CHECK THIS
export const ADD_GOAL = gql`
  mutation addGoal($goal: GoalInput!) {
    addGoal(goal: $goal) {
      _id
      name
      email
      Goals {
        goalId
        goalName
        amount
        progress
        dateBuy
        Contributions
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
        billId
        amount
        name
        recurring
        recurringTime
        date
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
        amount
        date
      }
    }
  }
`;
