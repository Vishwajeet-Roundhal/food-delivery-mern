import React, { createContext, useState } from 'react';

// Create a context object
export const UserContext = createContext();

// Create a provider component
export const UserProvider = ({ children }) => {
  const [userId, setUserId] = useState(() => {
    // Initialize userId from localStorage if available
    return localStorage.getItem('userId') || null;
  });

  const loginUser = (id) => {
    setUserId(id);
    localStorage.setItem('userId', id); // Store userId in localStorage
  };

  const logoutUser = () => {
    setUserId(null);
    localStorage.removeItem('userId'); // Remove userId from localStorage
  };

  return (
    <UserContext.Provider value={{ userId, loginUser, logoutUser }}>
      {children}
    </UserContext.Provider>
  );
};
