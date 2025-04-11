import React, { createContext, useReducer, ReactNode, Dispatch } from "react";
import { openNotification } from "@util/Notification";
type State = {
  modal: { name: string }[];
  id: string | null;
};

type Action =
  | { type: "SET_OPEN_MODAL"; payload: { name: string } }
  | { type: "SET_CLOSE_MODAL"; payload: { name: string } }
  | { type: "SET_ID"; payload: { id: string | null } };

const initialState: State = {
  modal: [],
  id: null,
};

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_OPEN_MODAL":
      if (state.modal.find((item) => item.name === action.payload.name)) {
        openNotification({
          message: "",
          description: "Modal already open",
          type: "error",
        });
        return state;
      }
      return {
        ...state,
        modal: [...state.modal, action.payload],
      };
    case "SET_CLOSE_MODAL":
      const newModal = state.modal.filter(
        (item) => item.name !== action.payload.name
      );
      return {
        ...state,
        modal: newModal,
      };
    case "SET_ID":
      return {
        ...state,
        id: action.payload.id,
      };
    default:
      return state;
  }
};

type ContextType = {
  state: State;
  dispatch: Dispatch<Action>;
};

export const AppContext = createContext<ContextType | undefined>(undefined);

type AppProviderProps = {
  children: ReactNode;
};

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = (): ContextType => {
  const context = React.useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};
