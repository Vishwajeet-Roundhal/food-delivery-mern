import React, { createContext, useState } from 'react';
import { useEffect } from 'react';

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

  const [locData, setLocData] = useState({
    city: '',
    region: '',
    country_name: '',
    latitude: '',
    longitude: ''
  });

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const response = await fetch('https://ipapi.co/json/');
        if (!response.ok) {
          throw new Error('Failed to fetch location data');
        }
        const data = await response.json();
        setLocData({
          city: data.city || '',
          region: data.region || '',
          country_name: data.country_name || '',
          latitude: data.latitude || '',
          longitude: data.longitude || ''
        });
      } catch (error) {
        console.error('Error fetching location:', error);
      }
    };

    fetchLocation();
  },[])

  return (
    <UserContext.Provider value={{ userId, loginUser, logoutUser , locData }}>
      {children}
    </UserContext.Provider>
  );
};
