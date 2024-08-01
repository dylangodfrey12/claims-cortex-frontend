import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from '../components/Login';
import Billing from '../components/Billing';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
import PublicRoute2 from './PublicRoute2';

import Stepper from '../components/Stepper';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Navigation = () => {
  return (
    <>
      <Routes>
        <Route path="/login" element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        } />
          <Route path="/billing" element={<Billing />} />

        <Route path="/" element={
          <PrivateRoute>
            <Stepper />
          </PrivateRoute>
        } />
        {/* <Route path="/summary" element={
          <PrivateRoute>
            <Summary />
          </PrivateRoute>
        } />
        <Route path="/edit" element={
          <PrivateRoute>
            <EditMail />
          </PrivateRoute>
        } /> */}
      </Routes>
      <ToastContainer />
    </>
  );
};

export default Navigation;
