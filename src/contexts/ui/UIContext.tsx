import { createContext } from "react";

// Definition of context types
interface ContextProps {
  sidemenuOpen: boolean;
  isAddingEntry: boolean;
  isDragging: boolean; // Drag state (dragging/not dragging)

  // Methods
  closeSideMenu: () => void;
  openSideMenu: () => void;

  setIsAddingEntry: (isAdding: boolean) => void; // Method to set the input add state

  endDragging: () => void; // Method to end the drag
  startDragging: () => void; // Method to start the drag
}

// Create the UIContext context
export const UIContext = createContext({} as ContextProps);
