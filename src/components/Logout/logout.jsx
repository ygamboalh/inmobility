import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSignOut } from "react-auth-kit";
import AxiosInstance from "../../api/AxiosInstance";
import { useQuery } from "react-query";
import { authUserData } from "../../api/usersApi";

const Logout = () => {
  const { data: userData } = useQuery("profile", authUserData);
  const id = userData?.id;
  const signOut = useSignOut();
  const navigate = useNavigate();
  useEffect(() => {
    const response = AxiosInstance.put(`/users/${id}`, {
      isLoggedIn: false,
    })
      .then((res) => {
        signOut();
        navigate("/");
        //return;
      })
      .catch((err) => {
        console.log(err);
        //return;
      });
    //window.location.reload(true);
  }, [navigate]);
  return null;
};

export default Logout;
