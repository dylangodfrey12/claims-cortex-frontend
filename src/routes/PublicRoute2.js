import React from 'react';
import { Navigate } from 'react-router-dom';

const PublicRoute2 = ({ children }) => {
  const authToken = localStorage.getItem('authToken');
  return authToken ? <Navigate to="/billing" /> : children;
};
 
export default PublicRoute2;
