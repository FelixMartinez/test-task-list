import { gql } from "@apollo/client";

/**
 * Query users list
 */
export const LIST_USERS_QUERY = gql`
  query UserList {
    usersList {
      items {
        email
        firstName
        lastName
        status
      }
    }
  }
`;
