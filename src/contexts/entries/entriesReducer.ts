import { EntriesState } from "./";
import { Entry } from "../../interfaces";

// Definition of action types
type EntriesActionType =
  | { type: "[Entry] Add-Entry"; payload: Entry }
  | { type: "[Entry] Entry-Updated"; payload: Entry }
  | { type: "[Entry] Refresh-Data"; payload: Entry[] };

// Reducer for actions related to inputs
export const entriesReducer = (
  state: EntriesState,
  action: EntriesActionType
): EntriesState => {
  switch (action.type) {
    case "[Entry] Add-Entry":
      // Add the new entry to the current state
      return {
        ...state,
        entries: [...state.entries, action.payload],
      };

    case "[Entry] Entry-Updated":
      // Update the existing entry to the current state
      return {
        ...state,
        entries: state.entries.map((entry) => {
          if (entry.id === action.payload.id) {
            entry.status = action.payload.status;
            entry.description = action.payload.description;
          }
          return entry;
        }),
      };

    case "[Entry] Refresh-Data":
      // Update the input data in the current state
      return {
        ...state,
        entries: [...action.payload],
      };
    default:
      return state;
  }
};
