import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loadToken = async () => {
      const token = await SecureStore.getItemAsync('token');
      const userData = await SecureStore.getItemAsync('user');
      if (token && userData) {
        setUser(JSON.parse(userData));
      }
    };
    loadToken();
  }, []);

  const login = async (email) => {
    try {
      const res = await axios.post('http://localhost:5000/login', { email }); // No password
      const { token, user } = res.data;
      await SecureStore.setItemAsync('token', token);
      await SecureStore.setItemAsync('user', JSON.stringify(user));
      setUser(user);
    } catch (error) {
      throw new Error(
        error?.response?.data?.message || 'Login failed'
      );
    }
  };

  const logout = async () => {
    await SecureStore.deleteItemAsync('token');
    await SecureStore.deleteItemAsync('user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
