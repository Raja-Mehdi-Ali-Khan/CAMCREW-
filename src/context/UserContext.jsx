import React, { createContext, useContext, useState } from "react";

export const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {

  const [userData, setUser] = useState(null);
  const [join, setJoin] = useState(false);

  const updateUser = (userData) => {
    setUser(userData);
  };

  return (
    <UserContext.Provider value={{ userData, updateUser, join, setJoin }}>
      {children}
    </UserContext.Provider>
  );
};
