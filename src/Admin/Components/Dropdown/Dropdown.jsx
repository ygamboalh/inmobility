import React, { useState } from "react";
import { useSignOut } from "react-auth-kit";
import {
  BiLogOut,
  BiHomeAlt,
  BiLockOpenAlt,
  BiUserCircle,
  BiWrench,
} from "react-icons/bi";
import { authUserData } from "../../../api/usersApi";
import { useQuery } from "react-query";
import AxiosInstance from "../../../api/AxiosInstance";

const Dropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [imageUrl, setImageUrl] = useState(
    "https://siccic.com/backend/uploads/small_userinfo_dac703068b.png"
  );
  const { data: userData } = useQuery("profile", authUserData);
  const id = userData?.id;
  const user = AxiosInstance.get(`users/${id}?populate=photo`).then((data) => {
    const image = data?.data?.photo?.url;
    const url = `https://siccic.com/backend${image}`;

    setImageUrl(url);
  });
  const buttonStyle = {
    backgroundImage: `url("${imageUrl}")`,
    backgroundSize: "cover",
    width: "40px",
    height: "40px",
  };
  const signOut = useSignOut();
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="">
      {/* <button
        onClick={toggleMenu}
        className="user-info-button"
        style={buttonStyle}
      ></button> */}
      <div className="relative">
        <button
          onClick={toggleMenu}
          className="user-info-button"
          style={buttonStyle}
        >
          <span class="bottom-0 left-7 absolute  w-3.5 h-3.5 bg-red-700 border-2 border-white dark:border-gray-800 rounded-full"></span>
        </button>
      </div>
      {isOpen && (
        <div className="absolute mt-2 py-2 w-[134px] bg-white rounded-lg shadow-lg">
          <div className="flex flex-row px-2 align-middle py-2 text-gray-800 hover:bg-blue-500 hover:text-white">
            <BiWrench size={20} />
            <a
              className="text-xs flex flex-row pt-1 pl-1"
              href="/admin/properties"
            >
              Administrar
            </a>
          </div>
          <div className="flex flex-row px-2 align-middle py-2 text-gray-800 hover:bg-blue-500 hover:text-white">
            <BiHomeAlt size={20} />
            <a className="text-xs flex flex-row pt-1 pl-1" href="/home/banner">
              Opciones
            </a>
          </div>
          <div className="flex flex-row px-2 align-middle py-2 text-gray-800 hover:bg-blue-500 hover:text-white">
            <BiUserCircle size={20} />
            <a className="text-xs flex flex-row pt-1 pl-1" href="/user/profile">
              Perfil
            </a>
          </div>
          <div className="flex flex-row px-2 align-middle py-2 text-gray-800 hover:bg-blue-500 hover:text-white">
            <BiLockOpenAlt size={20} />
            <a
              className="text-xs flex flex-row pt-1 pl-1"
              href="/auth/change-password"
            >
              Cambiar clave
            </a>
          </div>
          <div className="px-2 py-2 text-gray-800 hover:bg-blue-500 hover:text-white">
            <button onClick={() => signOut()} className="text-xs flex flex-row">
              <BiLogOut size={20} />{" "}
              <label className="pt-0.5 pl-0.5">Salir</label>
            </button>
          </div>
        </div>
      )}
      <div></div>
    </div>
  );
};

export default Dropdown;
