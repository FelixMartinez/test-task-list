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
export interface EntriesState {
  entries: Entry[];
}

const Entries_INITIAL_STATE: EntriesState = {
  entries: [],
};

interface Props {
  children: React.ReactNode;
}

export const EntriesProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(entriesReducer, Entries_INITIAL_STATE);
  const entriesListQuery = useQueries(ENTRIES_LIST_QUERY);
  const currentUser = useQueries(CURRENT_USER_QUERY);
  const { setEntryMutation } = useMutations(ENTRY_NEW_MUTATION);
  const { setEntryMutation: updEntryMutation } = useMutations(
    ENTRY_UPDATE_MUTATION
  );
  const { setEntryMutation: entryMutationFunction } = useMutations(
    ENTRY_UPDATE_FUNCTION
  );

  const addNewEntry = (description: string) => {
    const newEntry: Entry = {
      id: uuidv4(),
      description,
      informerIs: currentUser.user.firstName + " " + currentUser.user.lastName,
      responsibleIs: "",
      status: "pending",
    };

    setEntryMutation({ variables: newEntry }).catch((err) =>
      console.log("Err: setEntryMutation ", err)
    );

    newEntry.createdAt = new Date().toString();
    newEntry.updatedAt = new Date().toString();
    dispatch({ type: "[Entry] Add-Entry", payload: newEntry });
  };

  const updateEntry = (entry: Entry, showSnackbar = false) => {
    /**
     * status === "finished" call function
     */
    if (entry.status === "finished") {
      entryMutationFunction({ variables: entry })
        .then(() => {})
        .catch((err) => console.log("Err: setEntryMutation ", err.code));
    } else {
      updEntryMutation({ variables: entry })
        .then(() => {})
        .catch((err) => console.log("Err: setEntryMutation ", err.code));
    }

    dispatch({ type: "[Entry] Entry-Updated", payload: entry });

    if (showSnackbar)
      enqueueSnackbar("Entrada actualizada", {
        variant: "success",
        autoHideDuration: 2500,
        anchorOrigin: {
          vertical: "top",
          horizontal: "right",
        },
      });
  };

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
