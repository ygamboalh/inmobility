import React, { useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { message } from "antd";
import { API, BEARER } from "../../constant";
import { useEffect } from "react";
import { getToken } from "../../utils/helpers";

const AuthProvider = ({ children }) => {
  const [userData, setUserData] = useState();
  const [isLoading, setIsLoading] = useState(false);
 //----------------------------------------------------------------
  const [userRole, setUserRole] = useState();
  //----------------------------------------------------------------

  const authToken = getToken();

  const fetchLoggedInUser = async (token) => {
    setIsLoading(true);
    try {
      if(authToken){
      const response = await fetch(`${API}/users/me?populate=role`, {
        method: "GET",
        headers: { Authorization: `${BEARER} ${token}` },
      });
      const data = await response.json();
      //----------------------------------------------------------------
      setUserRole(data.role.name);
      //----------------------------------------------------------------
      setUserData(data);
    }
    else {//--------------------REVISAR AQUI}
    }
    } catch (error) {
      message.error("¡Actualmente no tiene conexión con el servidor!");
    } finally {
      setIsLoading(false);
    }
  };

  const handleUser = (user) => {
    setUserData(user);
  };
  //----------------------------------------------------------------
  const handleRole = (role) => {
    setUserRole(role.name);
  };
  //----------------------------------------------------------------

  useEffect(() => {
    if (authToken) {
      fetchLoggedInUser(authToken);
    }
  }, [authToken]);

  return (
    <AuthContext.Provider
      value={{ user: userData, setUser: handleUser, isLoading,role: fetchLoggedInUser}}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;