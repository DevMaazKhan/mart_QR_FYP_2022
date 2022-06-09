import { createContext, useContext, useState, useMemo } from "react";

const UserContext = createContext(null);

export const useUserContext = () => useContext(UserContext);

const userDefaultValues = {
  isLoggedIn: false,
  isMartUser: false,
  username: "",
  userID: "",
  martName: "",
  martAddress: "",
  martCell: "",
  martEmail: "",
  itemsCount: 0,
  shelvesCount: 0,
  floorsCount: 0,
  companiesCount: 0,
  categoriesCount: 0,
  martID: "",
  martInfoID: "",
};

export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(userDefaultValues);

  function loginUser(user) {
    setUser(user);
  }

  function logoutUser() {
    setUser(userDefaultValues);
  }

  const values = useMemo(
    () => ({ user, loginUser, logoutUser, setUser }),
    [user]
  );

  return <UserContext.Provider value={values}>{children}</UserContext.Provider>;
};
