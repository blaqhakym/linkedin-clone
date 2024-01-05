import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
import { Text } from "react-native";

 const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
const [user, setUser] = useState("");

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <Text>{children}</Text>
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error("useMyContext must be used within a MyContextProvider");
  }

  return context;
};
