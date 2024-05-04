import React, { createContext, useContext, useState } from "react";

// Create a context for user data
export const UserContext = createContext();

// Custom hook to use the user context
export const useUser = () => useContext(UserContext);

// Provider component to wrap your application and provide the user data
export const UserProvider = ({ children }) => {
  // State to store user data
  const [userData, setUser] = useState(null);
  const [join, setJoin] = useState(false);

  // Function to update user data
  const updateUser = (userData) => {
    setUser(userData);
  };

  return (
    <UserContext.Provider value={{ userData, updateUser, join, setJoin }}>
      {children}
    </UserContext.Provider>
  );
};
