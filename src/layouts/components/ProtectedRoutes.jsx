import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useIsAuthenticated } from "react-auth-kit";

const ProtectedRoutes = () => {
  const isAuthenticated = useIsAuthenticated();
  const location = useLocation();

  return isAuthenticated() ? (
    <Outlet />
  ) : (
    <Navigate to="/" state={{ from: location }} replace />
  );
};

export default ProtectedRoutes;
