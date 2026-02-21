import React, { createContext, useContext, useState, useEffect } from 'react';
import { authAPI } from '../api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('medivault_token');
    const savedUser = localStorage.getItem('medivault_user');
    if (token && savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch(e) {}
    }
    setLoading(false);
  }, []);

  const login = (userData, token) => {
    localStorage.setItem('medivault_token', token);
    localStorage.setItem('medivault_user', JSON.stringify(userData));
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem('medivault_token');
    localStorage.removeItem('medivault_user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};
