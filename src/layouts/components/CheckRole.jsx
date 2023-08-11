import React, { useEffect, useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useQuery } from "react-query";
import { useIsAuthenticated } from "react-auth-kit";

import { message } from "antd";

import { authUserData } from "../../api/usersApi";
import axios from "axios";
import { API, BEARER } from "../../constant";
import { getToken } from "../../utils/helpers";
import MySpinner from "../../components/Spinner/spinner";

const CheckRole = ({ roles }) => {
  const [loading, setLoading] = useState();
  const [active, setActive] = useState();
  useEffect(() => {
    setLoading(true);
    const response = axios(`${API}users/me?populate=role`, {
      method: "GET",
      headers: { Authorization: `${BEARER} ${getToken()}` },
    })
      .then((response) => {
        setActive(response.data.active);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const isAuthenticated = useIsAuthenticated();
  const location = useLocation();

  if (loading || !active) {
    return <MySpinner />;
  }
  return isAuthenticated() && roles?.includes(active) ? (
    <Outlet />
  ) : (
    message.error("Aún no está autorizado para estas opciones") && (
      <Navigate to="/home/banner" state={{ from: location }} replace />
    )
  );
};

export default CheckRole;
