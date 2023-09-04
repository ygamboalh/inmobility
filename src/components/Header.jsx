import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import {
  Link,
  useLocation,
  useNavigate,
  useResolvedPath,
} from "react-router-dom";

import { Avatar } from "flowbite-react";
import { BiArrowBack } from "react-icons/bi";

import UserInfo from "./UserInfo/user-info";
import { authUserData } from "../api/usersApi";
import logo from "../assets/images/logo192.png";
import { getToken } from "../utils/helpers";
import Dropdown from "../Admin/Components/Dropdown/Dropdown";
import VisiterUserInfo from "./UserInfo/visiter-user-info";
import { API, BEARER } from "../constant";
import axios from "axios";
import NoneUser from "./UserInfo/none-user";

const Header = () => {
  const [link, setLink] = useState("None");
  const location = useLocation();
  useEffect(() => {
    SelectLink();
  }, []);

  const SelectLink = async () => {
    const token = getToken();

    const response = await axios(`${API}users/me?populate=role`, {
      method: "GET",
      headers: { Authorization: `${BEARER} ${token}` },
    })
      .then((response) => {
        const role = response?.data?.role?.name;
        const activo = response?.data?.active;

        if (role === "SuperAdmin" || activo === "Super Administrador") {
          setLink("Super Administrador");
        } else if (
          activo === "Asesor verificado activo" ||
          activo === "Asesor verificado inactivo" ||
          activo === "Freelancer"
        ) {
          setLink("Asesor verificado");
        } else if (activo === "Solicitante") {
          setLink("Solicitante");
        } else if (activo === "Supervisor") {
          setLink("Supervisor");
        } else if (activo === undefined) {
          setLink("None");
        }
      })
      .catch((error) => {
        return;
      });
  };

  const navigate = useNavigate();
  const { pathname } = useResolvedPath();
  const { data: userData, loading } = useQuery("profile", authUserData);

  const goBack = () => {
    navigate(-1);
  };

  return (
    <header className="py-6 border-b bg-primary flex">
      {pathname === "/" ? null : (
        <BiArrowBack
          onClick={goBack}
          className="absolute cursor-pointer text-3xl text-white mt-3 ml-10"
        />
      )}
      <div className="container mx-auto flex flex-row justify-center items-center">
        <div className="flex flex-row justify-center items-center mr-auto">
          <Link to="/">
            <Avatar img={logo} className="m-2" />
          </Link>
          <Link to="/">
            <div className="text-white text-3xl flex items-center justify-center gap-3 flex-row">
              Sistema<span className="font-semibold">CIC</span>
            </div>
          </Link>
        </div>

        {!userData &&
        location?.pathname !== "/home/visit-record" &&
        location?.pathname !== "/home/visit-record" &&
        location?.pathname !== "/auth/signin" &&
        location?.pathname !== "/auth/register-request" ? (
          <div className="flex flex-row justify-end items-end">
            {link === "None" && <NoneUser />}
          </div>
        ) : (
          <div>
            <div className="flex flex-row justify-end items-end">
              {link === "Asesor verificado" && <UserInfo />}
              {link === "Solicitante" && <VisiterUserInfo />}
              {link === "Super Administrador" && (
                <Dropdown ubicacion={"absolute top-8 right-5"} />
              )}
              {link === "Supervisor" && (
                <Dropdown ubicacion={"absolute top-8 right-5"} />
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
