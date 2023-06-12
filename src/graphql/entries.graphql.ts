import { gql } from "@apollo/client";

/**
 * Query entries list
 */
export const ENTRIES_LIST_QUERY = gql`
  query {
    entriesList {
      items {
        id
        description
        status
        responsibleIs
        informerIs
        createdAt
        updatedAt
      }
    }
  }
`;

/**
 *  new entry mutation.
 */
export const ENTRY_NEW_MUTATION = gql`
  mutation EntryCreate(
    $description: String
    $status: String
    $responsibleIs: String
    $informerIs: String
  ) {
    entryCreate(
      data: {
        description: $description
        status: $status
        responsibleIs: $responsibleIs
        informerIs: $informerIs
      }
    ) {
      id
      description
      status
      responsibleIs
      informerIs
      createdAt
      updatedAt
    }
  }
`;

/**
 *  update entry mutation.
 */
export const ENTRY_UPDATE_MUTATION = gql`
  mutation EntryCreate(
    $id: ID
    $description: String
    $status: String
    $responsibleIs: String
    $informerIs: String
  ) {
    entryUpdate(
      data: {
        id: $id
        description: $description
        status: $status
        responsibleIs: $responsibleIs
        informerIs: $informerIs
      }
    ) {
      id
      description
      status
      responsibleIs
      informerIs
      createdAt
      updatedAt
    }
  }
`;
