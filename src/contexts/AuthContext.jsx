import React, { createContext, useState, useEffect, useContext } from 'react';
import { Navigate } from 'react-router-dom';
import authServices from '../services/authServices';
import userServices from '../services/userServices';
import paths from '../const/paths';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const fetchUserData = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      return;
    }
    try {
      const user = await userServices.getUserData();
      console.log('Fetched user data:', user); // Debugging statement
      setUser(user);
    } catch (error) {
      console.error('Failed to fetch user', error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const signIn = async (authenticationRequest) => {
    try {
      const response = await authServices.authenticateUser(authenticationRequest);
      localStorage.setItem('token', response.data.token);

      await fetchUserData();
      console.log('Signed in successfully');
    } catch (error) {
      console.error('Failed to sign in', error);
    }
  };

  const signOut = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, signIn, signOut, fetchUserData }}>
      {children}
    </AuthContext.Provider>
  );
};

export const withAuthContext = (WrappedComponent) => (props) => {
  const authContext = useAuth();
  return <WrappedComponent {...props} authContext={authContext} />;
};

export const AuthRequired = ({ children, requiredRole }) => {
  const { user } = useAuth();

  if (!user || (requiredRole && !user.authorities.includes(requiredRole))) {
    return <Navigate to={paths.notAuthorized} />;
  }

  return children;
};