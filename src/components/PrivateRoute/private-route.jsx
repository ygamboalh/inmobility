import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import AuthProvider from '../AuthProvider/AuthProvider';

const PrivateRoute = () => {
   return AuthProvider.authToken ? <Outlet /> : <Navigate to="/auth/signin" />;
}

export default PrivateRoute;