import React from "react";
import { Outlet, Navigate, useLocation } from "react-router-dom";
import { useIsAuthenticated, useAuthUser } from "react-auth-kit";

const PublicRoutes = () => {
  const isAuthenticated = useIsAuthenticated();
  const auth = useAuthUser();
  const location = useLocation();
  const from = location.stabannerte?.from?.pathname || "/home/banner";
  // const from =
  //   auth()?.role !== "Colaborador"
  //     ? auth()?.role === "SuperAdministrador"
  //       ? "/tenants"
  //       : "/users"
  //     : "/liveChat";
  return !isAuthenticated() ? <Outlet /> : <Navigate to={from} replace />;
};

export default PublicRoutes;
