/* import React, { useState } from "react";

import { useSignOut } from "react-auth-kit";
import {
  BiLogOut,
  BiHomeAlt,
  BiLockOpenAlt,
  BiUserCircle,
  BiUserCheck,
} from "react-icons/bi";
import { authUserData } from "../../api/usersApi";
import { useQuery } from "react-query";
import AxiosInstance from "../../api/AxiosInstance";

const UserInfo = () => {
  const signOut = useSignOut();
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

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="">
      <button
        onClick={toggleMenu}
        className="user-info-button"
        style={buttonStyle}
      ></button>
      {isOpen && (
        <div className="absolute mt-2 py-2 w-10 bg-white rounded shadow-lg">
          <a
            href="/user/verified-adviser"
            className="block px-2 py-2 text-gray-800 hover:bg-blue-500 hover:text-white"
          >
            <BiUserCheck size={25} />
          </a>
          <a
            href="/home/banner"
            className="block px-2 py-2 text-gray-800 hover:bg-blue-500 hover:text-white"
          >
            <BiHomeAlt size={25} />
          </a>
          <a
            href="/user/profile"
            className="block px-2 py-2 text-gray-800 hover:bg-blue-500 hover:text-white"
          >
            <BiUserCircle size={25} />
          </a>
          <a
            href="/auth/change-password"
            className="block px-2 py-2 text-gray-800 hover:bg-blue-500 hover:text-white"
          >
            <BiLockOpenAlt size={25} />
          </a>
          <button
            onClick={() => signOut()}
            className="block px-2 py-2 text-gray-800 hover:bg-blue-500 hover:text-white"
          >
            <BiLogOut size={25} />
          </button>
        </div>
      )}
    </div>
  );
};

export default UserInfo;
 */
import React, { useEffect, useState } from "react";

import { useSignOut } from "react-auth-kit";
import {
  BiLogOut,
  BiHomeAlt,
  BiLockOpenAlt,
  BiUserCircle,
  BiUserCheck,
  BiWrench,
  BiBook,
  BiBell,
} from "react-icons/bi";
import { authUserData } from "../../api/usersApi";
import { useQuery } from "react-query";
import AxiosInstance from "../../api/AxiosInstance";
import { API } from "../../constant";
import { deleteNotification } from "../../utils/helpers";

const UserInfo = () => {
  const signOut = useSignOut();
  const [isOpen, setIsOpen] = useState(false);
  const [imageUrl, setImageUrl] = useState(
    "https://siccic.com/backend/uploads/small_userinfo_dac703068b.png"
  );
  const [notificaciones, setNotificaciones] = useState();
  const { data: userData } = useQuery("profile", authUserData);
  const id = userData?.id;
  const user = AxiosInstance.get(`users/${id}?populate=photo`).then((data) => {
    const image = data?.data?.photo?.url;
    const url = `https://siccic.com/backend${image}`;

    setImageUrl(url);
  });
  deleteNotification();
  useEffect(() => {
    const response = AxiosInstance.get(`${API}notifications`)
      .then((response) => {
        console.log("encontre estas notificaciones", response.data.data);
        setNotificaciones(response.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const buttonStyle = {
    backgroundImage: `url("${imageUrl}")`,
    backgroundSize: "cover",
    width: "40px",
    height: "40px",
  };

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
      <div
        className={
          notificaciones?.length < 1
            ? "relative rounded-full w-[45px] h-[45px] justify-center items-center"
            : "relative w-[44px] h-[44px] border-2 mb-1 rounded-full border-red-600 justify-center items-center"
        }
      >
        <button
          onClick={toggleMenu}
          className="user-info-button"
          style={buttonStyle}
        ></button>
      </div>
      {isOpen && (
        <div className="absolute z-10 mt-2 py-2 w-[105px] bg-white rounded-lg shadow-lg">
          <div className="flex flex-row px-2 align-middle py-2 text-gray-800 hover:bg-blue-500 hover:text-white">
            <BiUserCheck size={20} />
            <a
              className="text-xs flex flex-row pt-1 pl-1"
              href="/user/verified-adviser"
            >
              Verificado
            </a>
          </div>
          <div className="flex flex-row px-2 align-middle py-2 text-gray-800 hover:bg-blue-500 hover:text-white">
            <BiHomeAlt size={20} />
            <a className="text-xs flex flex-row pt-1 pl-1" href="/home/banner">
              Opciones
            </a>
          </div>
          <div className="flex flex-row px-2 align-middle py-2 text-gray-800 hover:bg-blue-500 hover:text-white">
            <BiBook size={20} />
            <a
              className="text-xs flex flex-row pt-1 pl-1"
              href="/home/portfolio"
            >
              Portafolio
            </a>
          </div>
          {notificaciones?.length > 0 ? (
            <div className="flex flex-row px-2 align-middle py-2 text-gray-800 hover:bg-blue-500 hover:text-white">
              <BiBell size={20} />
              <a
                className="text-xs flex flex-row pt-1 pl-1"
                href="/home/notifications"
              >
                Notific...
              </a>
            </div>
          ) : null}
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
              Clave
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
    </div>
  );
};

export default UserInfo;
