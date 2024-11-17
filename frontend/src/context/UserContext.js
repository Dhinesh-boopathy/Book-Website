import React, { createContext, useState, useContext, useEffect } from 'react';
import { parseJwt } from '../utils/jwtUtils'; // Import the parseJwt function from utils

const UserContext = createContext();

const isTokenExpired = (token) => {
  const decoded = parseJwt(token);
  if (decoded && decoded.exp) {
    return Date.now() >= decoded.exp * 1000; // JWT exp is in seconds, convert to milliseconds
  }
  return false;
};
 
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check for stored user in localStorage (if user is already logged in)
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        const decodedToken = parseJwt(parsedUser.token);
        
        // Check if the token is expired
        if (decodedToken && !isTokenExpired(parsedUser.token)) {
          setUser({
            ...parsedUser,
            _id: decodedToken._id, // Ensure user ID from the token is added
          });
        } else {
          logoutUser(); // Clear invalid/expired user data
        }
      } catch (error) {
        console.error('Error parsing stored user JSON:', error);
        logoutUser(); // Clear invalid user data
      }
    }
  }, []); // Add setUser as a dependency if using React 18 or later

  const loginUser = (userData) => {
    const decodedToken = parseJwt(userData.token);
    console.log("Decoded token:", decodedToken); // Log decoded token
    
    if (decodedToken && !isTokenExpired(userData.token)) {
      const userWithId = {
        ...userData,
        _id: decodedToken._id, // Add user ID to the user data
      };
      setUser(userWithId);
      console.log("User with ID set:", userWithId); // Log user with _id
      localStorage.setItem('user', JSON.stringify(userWithId)); // Store user in localStorage
    } else {
      console.error('Invalid or expired token');
      logoutUser(); // Logout if the token is invalid
    }
  };
  

  const logoutUser = () => {
    setUser(null);
    localStorage.removeItem('user'); // Remove user from localStorage on logout
  };

  return (
    <UserContext.Provider value={{ user, setUser, loginUser, logoutUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
