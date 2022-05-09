import { createContext, useContext, useMemo } from "react";

const ManageProfileSettingsContext = createContext({});

export const useManageProfileSettingsContext = () =>
  useContext(ManageProfileSettingsContext);

export const ManageProfileSettingsProvider = ({ children }) => {
  const values = useMemo(() => ({}), []);

  return (
    <ManageProfileSettingsContext.Provider value={values}>
      {children}
    </ManageProfileSettingsContext.Provider>
  );
};
