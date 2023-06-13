import { createContext } from "react";
import { Entry } from "../../interfaces";

/**
 * Context to manage entries.
 *
 * Provides access to entries and methods for adding and updating entries.
 */
interface ContextProps {
  entries: Entry[];// List of entries

  // Methods
  addNewEntry: (description: string) => void;
  updateEntry: (entry: Entry, showSnackbar?: boolean) => void;
}

/**
 * Context to manage entries.
 *
 * Provides access to entries and methods for adding and updating entries.
 */
export const EntriesContext = createContext({} as ContextProps);
