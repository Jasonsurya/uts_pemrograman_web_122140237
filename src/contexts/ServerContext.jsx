// src/contexts/ServerContext.js
import React, { createContext, useState } from 'react';

// Context untuk menyimpan data server dan user
export const ServerContext = createContext({
  activeServer: null,
  setActiveServer: () => {},
  currentUser: null,
  isLoggedIn: false,
  login: () => {},
  logout: () => {},
});

// Provider component (opsional - dapat digunakan untuk mengatur state di satu tempat)
export const ServerProvider = ({ children }) => {
  // Default user for Ultraman themed community
  const defaultUser = {
    id: 'user123',
    username: 'UltraFan2025',
    avatar: '🦸‍♂️',
    joinDate: '15 Mei 2025',
    favoriteUltra: 'Ultraman Zero'
  };

  const [activeServer, setActiveServer] = useState(null);
  const [currentUser, setCurrentUser] = useState(defaultUser);
  const [isLoggedIn, setIsLoggedIn] = useState(true); // Default to logged in for demo

  // Fungsi login (untuk implementasi mendatang)
  const login = (user) => {
    setCurrentUser(user);
    setIsLoggedIn(true);
  };

  // Fungsi logout
  const logout = () => {
    setCurrentUser(null);
    setIsLoggedIn(false);
  };

  return (
    <ServerContext.Provider 
      value={{ 
        activeServer, 
        setActiveServer,
        currentUser,
        isLoggedIn,
        login,
        logout
      }}
    >
      {children}
    </ServerContext.Provider>
  );
};

export default ServerContext;