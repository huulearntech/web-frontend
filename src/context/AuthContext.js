/**
 * AuthContext.js
 * This file contains the AuthContext and its components for managing user authentication state.
 * It provides the AuthProvider component to wrap around parts of the app that need access to authentication state,
 * and the AuthRequired component to protect routes that require authentication.
 */

import React, { createContext, useState, useEffect, useContext } from 'react';
import { Navigate } from 'react-router-dom';
import authServices from '../services/authServices';
import userServices from '../services/userServices';
import paths from '../router/paths';

// Tạo context để quản lý trạng thái đăng nhập
const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    // Fetch user data if needed
    const fetchUser = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        return;
      }
      try {
        const user = await userServices.getUserData();
        setUser(user);
        console.log('User:', user.fullName, user.email);
      } catch (error) {
        console.error('Failed to fetch user', error);
      }
    };

    fetchUser();
  }, []);

  const signIn = async (authenticationRequest) => {
    try {
      const response = await authServices.authenticateUser(authenticationRequest);
      localStorage.setItem('token', response.data.token);

      const user = await userServices.getUserData();
      setUser(user);
      console.log('Signed in successfully');
      console.log('User:', user.fullName, user.email);
    } catch (error) {
      console.error('Failed to sign in', error);
    }
  };
  const signOut = () => {
    localStorage.removeItem('token');
    setUser(null);
  };
  return <AuthContext.Provider value={{ user, signIn, signOut }}>
    {children}
  </AuthContext.Provider>;
};

export const withAuthContext = (WrappedComponent) => (props) => {
  const authContext = useAuth();
  return <WrappedComponent {...props} authContext={authContext} />;
};

export const AuthRequired = ({ children, requiredRole }) => {
  const { user } = useAuth();

  if (!user || requiredRole && !user.authorities.include(requiredRole)) {
    return <Navigate to={paths.notAuthorized} />;
  }

  return children;
}