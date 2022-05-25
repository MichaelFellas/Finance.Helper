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
      }
    }
  }
`;

export const QUERY_SINGLE_GOAL = gql`
  query getSingleGoal($goalId: ID!) {
    goal(goalId: $goalId) {
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
