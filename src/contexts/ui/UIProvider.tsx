import { useReducer } from "react";
import { UIContext, uiReducer } from "./";

// Definition of the context state types
export interface UIState {
  sidemenuOpen: boolean;
  isAddingEntry: boolean;
  isDragging: boolean; // Drag state (dragging/not dragging)
}

const UI_INITIAL_STATE: UIState = {
  sidemenuOpen: false,
  isAddingEntry: false,
  isDragging: false,
};

interface Props {
  children: React.ReactNode;
}

// Definition of the context state types
export const UIProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(uiReducer, UI_INITIAL_STATE);

  const openSideMenu = () => {
    dispatch({ type: "UI - Open Sidebar" });
  };

  const closeSideMenu = () => dispatch({ type: "UI - Close Sidebar" });

  // Method to set the input add state
  const setIsAddingEntry = (isAdding: boolean) => {
    dispatch({ type: "UI - Set isAddingEntry", payload: isAdding });
  };

  // Method to start the drag
  const startDragging = () => {
    dispatch({ type: "UI - Start Dragging" });
  };

  // Method to end the drag
  const endDragging = () => {
    dispatch({ type: "UI - End Dragging" });
  };

  return (
    <UIContext.Provider
      value={{
        ...state,

        // Methods
        closeSideMenu,
        openSideMenu,

        setIsAddingEntry,

        endDragging,
        startDragging,
      }}
    >
      {children}
    </UIContext.Provider>
  );
};
