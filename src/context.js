import * as React from "react";

const initialState = { maxApproval: true };

const AppContext = React.createContext();

function appReducer(state, action) {
  switch (action.type) {
    case "enable": {
      return { maxApproval: true };
    }
    case "disable": {
      return { maxApproval: false };
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

export function AppProvider({ children }) {
  const [state, dispatch] = React.useReducer(appReducer, { maxApproval: true });
  const value = { state, dispatch };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export const useMaxApproval = () => {
  const context = React.useContext(AppContext);
  if (context === undefined) {
    throw new Error("useMaxApproval must be used within a AppProvider");
  }
  return context;
};
