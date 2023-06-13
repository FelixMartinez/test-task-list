import { enqueueSnackbar } from "notistack";
import { useEffect, useReducer } from "react";
import { v4 as uuidv4 } from "uuid";

import {
  ENTRIES_LIST_QUERY,
  ENTRY_NEW_MUTATION,
  ENTRY_UPDATE_MUTATION,
} from "@/src/graphql/entries.graphql";
import { ENTRY_UPDATE_FUNCTION } from "@/src/graphql/functions/users.functions";
import { useMutations } from "@/src/hooks/useMutations";
import { useQueries } from "@/src/hooks/useQueries";
import { Entry } from "@/src/interfaces";
import { EntriesContext, entriesReducer } from "./";
import { CURRENT_USER_QUERY } from "@/src/shared/graphql";

// Interface that defines the state of the inputs
export interface EntriesState {
  entries: Entry[];
}
// Initial state of the inputs
const Entries_INITIAL_STATE: EntriesState = {
  entries: [],
};

interface Props {
  children: React.ReactNode;
}

export const EntriesProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(entriesReducer, Entries_INITIAL_STATE);
  const entriesListQuery = useQueries(ENTRIES_LIST_QUERY); // Query to get the list of inputs
  const currentUser = useQueries(CURRENT_USER_QUERY); // Query to get the current user
  const { setEntryMutation } = useMutations(ENTRY_NEW_MUTATION); //mutation to add a new entry
  const { setEntryMutation: updEntryMutation } = useMutations(
    ENTRY_UPDATE_MUTATION
  );// Mutation to update an existing entry
  const { setEntryMutation: entryMutationFunction } = useMutations(
    ENTRY_UPDATE_FUNCTION
  );// Mutation to execute a function related to the inputs

  // Method to add a new entry
  const addNewEntry = (description: string) => {
    const newEntry: Entry = {
      id: uuidv4(),
      description,
      informerIs: currentUser.user.firstName + " " + currentUser.user.lastName,
      responsibleIs: "",
      status: "pending",
    };

    // Call the mutation to add the new entry
    setEntryMutation({ variables: newEntry }).catch((err) =>
      console.log("Err: setEntryMutation ", err)
    );

    newEntry.createdAt = new Date().toString();
    newEntry.updatedAt = new Date().toString();
    dispatch({ type: "[Entry] Add-Entry", payload: newEntry });
  };

  // Method to update an existing entry
  const updateEntry = (entry: Entry, showSnackbar = false) => {
    /**
     * status === "finished" call function
     */
    if (entry.status === "finished") {
      // Call to the function related to the inputs if the status is "finished"
      entryMutationFunction({ variables: entry })
        .then(() => {})
        .catch((err) => console.log("Err: setEntryMutation ", err.code));
    } else {
      // Call the mutation to update the entry if the status is not "finished"
      updEntryMutation({ variables: entry })
        .then(() => {})
        .catch((err) => console.log("Err: setEntryMutation ", err.code));
    }

    dispatch({ type: "[Entry] Entry-Updated", payload: entry });

    if (showSnackbar)
    // Show a notification if specified
      enqueueSnackbar("Entrada actualizada", {
        variant: "success",
        autoHideDuration: 2500,
        anchorOrigin: {
          vertical: "top",
          horizontal: "right",
        },
      });
  };

  // Method to update the local state of the entries with the data from the query
  const refreshEntry = async () => {
    const data = entriesListQuery.entriesList.items.map((item: Entry) =>
      Object.assign({}, item)
    );
    dispatch({ type: "[Entry] Refresh-Data", payload: data });
  };

  useEffect(() => {
    if (entriesListQuery) {
      refreshEntry();
    }
  }, [entriesListQuery]);

  return (
    <EntriesContext.Provider
      value={{
        ...state,

        // Methods
        addNewEntry,
        updateEntry,
      }}
    >
      {children}
    </EntriesContext.Provider>
  );
};
