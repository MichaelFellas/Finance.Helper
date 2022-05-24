import { gql } from "@apollo/client";

export const QUERY_ME = gql`
  query me {
    me {
      _id
      name
      Goals {
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
