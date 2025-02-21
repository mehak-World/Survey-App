import { createContext, useState, useContext, useEffect } from "react";

// Create the UserContext
export const UserContext = createContext();

// UserProvider component
export const UserProvider = ({ children }) => {
  const [username, setUserName] = useState(() => localStorage.getItem("username") || null);

  // Update localStorage whenever username changes
  useEffect(() => {
    if (username && localStorage.getItem("username") !== username) {
      localStorage.setItem("username", username);
    } else if (!username) {
      localStorage.removeItem("username");
    }
  }, [username]);


  return (
    <UserContext.Provider value={{ username, setUserName }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook for using UserContext
export const useUser = () => useContext(UserContext);
