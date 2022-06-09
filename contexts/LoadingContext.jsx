import { createContext, useContext, useState, useMemo } from "react";

const LoadingContext = createContext(null);

export const useLoadingContext = () => useContext(LoadingContext);

export const LoadingContextProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);

  function startLoading() {
    setLoading(true);
  }

  function endLoading() {
    setLoading(false);
  }

  const values = useMemo(
    () => ({ startLoading, endLoading, loading }),
    [loading]
  );

  return (
    <LoadingContext.Provider value={values}>{children}</LoadingContext.Provider>
  );
};
