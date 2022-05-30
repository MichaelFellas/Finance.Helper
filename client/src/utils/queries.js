import { gql } from "@apollo/client";

export const QUERY_ME = gql`
  query me {
    me {
      _id
      name
      Goals {
        _id
        goalName
        amount
        progress
        dateBuy
      }
      Bills {
        name
        amount
        billDate
      }
    }
  }
`;

export const QUERY_ME_GOALS = gql`
  query meGoal {
    meGoal {
      _id
      name
      Goals {
        _id
        goalName
        amount
        progress
        dateBuy
      }
    }
  }
`;

export const QUERY_ME_BILLS = gql`
  query meBill {
    meBill {
      _id
      name
      Bills {
        _id
        name
        amount
        billDate
        recurring
        recurringTime
      }
    }
  }
`;

export const QUERY_SINGLE_GOAL = gql`
  query goal($goalId: ID!) {
    goal(goalId: $goalId) {
      _id
      goalName
      amount
      progress
      dateBuy
    }
  }
`;

export const QUERY_SINGLE_BILL = gql`
  query bill($_id: ID!) {
    bill(_id: $_id) {
      _id
      name
      amount
      billDate
      recurring
      recurringTime
    }
  }
`;
