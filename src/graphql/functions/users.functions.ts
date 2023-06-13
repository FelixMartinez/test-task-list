import { gql } from "@apollo/client";

/**
 * Query update entry to finish
 */
export const ENTRY_UPDATE_FUNCTION = gql`
  mutation EntryUpdate(
    $id: ID
    $description: String
    $status: String
    $responsibleIs: String
    $informerIs: String
  ) {
    updateTaskByStatusFinished(
      id: $id
      description: $description
      status: $status
      responsibleIs: $responsibleIs
      informerIs: $informerIs
    ){
      result
    }
  }
`;
