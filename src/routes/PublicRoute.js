import React from 'react';
import { Navigate } from 'react-router-dom';

const PublicRoute = ({ children }) => {
  const authToken = localStorage.getItem('authToken');
  return authToken ? <Navigate to="/" /> : children;
};

export default PublicRoute;
