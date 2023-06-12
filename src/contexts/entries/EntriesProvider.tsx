import { useEffect, useReducer } from "react";
import { v4 as uuidv4 } from "uuid";

import { ENTRIES_LIST_QUERY, ENTRY_NEW_MUTATION, ENTRY_UPDATE_MUTATION } from "@/src/graphql/entries.graphql";
import { useQueries } from "@/src/hooks/useQueries";
import { Entry } from "../../interfaces";
import { EntriesContext, entriesReducer } from "./";
import { useMutations } from "@/src/hooks/useMutations";
export interface EntriesState {
  entries: Entry[];
}

const Entries_INITIAL_STATE: EntriesState = {
  entries: [],
};

interface Props {
    children: React.ReactNode
}

export const EntriesProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(entriesReducer, Entries_INITIAL_STATE);
  const entriesListQuery = useQueries(ENTRIES_LIST_QUERY);
  const {setEntryMutation} = useMutations(ENTRY_NEW_MUTATION);
  const {setEntryMutation: updEntryMutation} = useMutations(ENTRY_UPDATE_MUTATION);

  const addNewEntry = (description: string) => {
    const newEntry: Entry = {
      id: uuidv4(),
      description,
      informerIs: "Maria",
      createdAt: new Date(),
      updatedAt: new Date(),
      status: "pending",
    };

    console.log('newEntry: ', newEntry);
    setEntryMutation({variables: newEntry})
      .catch((err) => console.log('Err: setEntryMutation ', err))

    dispatch({ type: "[Entry] Add-Entry", payload: newEntry });
  };

  const updateEntry = (entry: Entry) => {
    entry.updatedAt = new Date();
    updEntryMutation({variables: entry})
      .catch((err) => console.log('Err: setEntryMutation ', err))

    console.log('entry: ', entry);
    dispatch({ type: "[Entry] Entry-Updated", payload: entry });
  };

  const refreshEntry = async() => {
    const data = entriesListQuery.entriesList.items.map((item: Entry) => Object.assign({}, item))
    dispatch({ type: "[Entry] Refresh-Data", payload: data });
  }

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
