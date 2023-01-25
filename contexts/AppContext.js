import React, { useContext, useState } from "react";

const AppContext = React.createContext();

export function useAppStates() {
  return useContext(AppContext);
}

export function AuthProvider({ children }) {
  const [showUpdateModal, setShowUpdateModal] = useState(false);

  const context = {
    showUpdateModal,
    setShowUpdateModal,
  };

  return (
    <AppContext.Provider value={{ ...context }}>{children}</AppContext.Provider>
  );
}
