import React, { useEffect, useRef, useState } from "react";
import { useQuery } from "react-query";
import { useSignOut } from "react-auth-kit";

import {
  BiLogOut,
  BiHomeAlt,
  BiLockOpenAlt,
  BiMailSend,
  BiMessageDetail,
} from "react-icons/bi";
import { SiHomeassistantcommunitystore } from "react-icons/si";
import { FaWarehouse } from "react-icons/fa";

import { deleteZero, getUserTokenDate } from "../../utils/helpers";
import AxiosInstance from "../../api/AxiosInstance";
import { authUserData } from "../../api/usersApi";

const VisiterUserInfo = () => {
  const signOut = useSignOut();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  const { data: userData } = useQuery("profile", authUserData);
  const id = userData?.id;

  const forcedLogOut = () => {
    const token = getUserTokenDate();
    const currentDate = new Date();
    const currentDateString = currentDate.toISOString().split("T")[0];
    const currentTimeString = currentDate
      .toISOString()
      .split("T")[1]
      .split(".")[0];
    const fecha = token?.slice(0, 10);
    const hora = token?.slice(11, 16);
    const horaCreado = deleteZero(hora?.slice(0, 2));
    const horaActual = deleteZero(currentTimeString?.slice(0, 2));
    const result = horaActual - horaCreado;
    if (currentDateString === fecha && result >= 3) {
      const response = AxiosInstance.put(`/users/${userData?.id}`, {
        isLoggedIn: false,
      })
        .then((res) => {
          signOut();
          window.location.reload(true);
        })
        .catch((err) => {
          return err;
        });
    } else {
      if (currentDateString !== fecha && (result <= -4 || result >= 4)) {
        const response = AxiosInstance.put(`/users/${id}`, {
          isLoggedIn: false,
        })
          .then((res) => {
            signOut();
            window.location.reload(true);
          })
          .catch((err) => {
            return err;
          });
      }
    }
  };
  useEffect(() => {
    const id = userData?.id;
    if (id) {
      forcedLogOut();
    }
  });

  const loginOut = () => {
    const response = AxiosInstance.put(`/users/${id}`, {
      isLoggedIn: false,
    })
      .then((res) => {
        window.location.reload(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  const buttonStyle = {
    backgroundImage: `url("https://backend.sistemacic.com/uploads/small_userinfo_dac703068b.png")`,
    backgroundSize: "cover",
    width: "40px",
    height: "40px",
  };
  return (
    <div className="">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="h-[45px] w-[45px] absolute top-8 right-8 rounded-full"
        style={buttonStyle}
      ></button>
      {isOpen && (
        <div
          ref={menuRef}
          className="absolute top-20 right-1 z-10 w-[170px] h-fit mt-2 py-2 bg-white rounded-lg shadow-lg"
        >
          <div className="flex flex-row px-2 rounded-md align-middle py-2 text-gray-800 hover:bg-blue-500 hover:text-white">
            <BiHomeAlt size={20} />
            <a className="text-xs flex flex-row pt-1 pl-1" href="/home/banner">
              Opciones
            </a>
          </div>
          <hr />
          <div className="flex flex-row px-2 rounded-md align-middle py-2 text-gray-800 hover:bg-blue-500 hover:text-white">
            <SiHomeassistantcommunitystore
              style={{
                fontSize: 18,
              }}
            />
            <a
              className="text-xs -mt-0.5 flex py-1 w-full flex-row pl-1"
              href="/selling"
            >
              Ventas
            </a>
          </div>
          <hr />
          <div className="flex flex-row px-2 rounded-md align-middle py-2 text-gray-800 hover:bg-blue-500 hover:text-white">
            <FaWarehouse
              style={{
                fontSize: 18,
              }}
            />
            <a
              className="text-xs flex -mt-0.5 py-1 w-full flex-row pl-1"
              href="/renting"
            >
              Alquileres
            </a>
          </div>
          <hr />
          <div className="flex flex-row px-2 rounded-md align-middle py-2 text-gray-800 hover:bg-blue-500 hover:text-white">
            <BiMailSend
              style={{
                fontSize: 22,
                marginLeft: -2,
              }}
            />
            <a
              className="text-xs -mt-0.5 flex py-1 w-full flex-row pl-1"
              href="/home/visiter-contact"
            >
              Contactar
            </a>
          </div>
          <hr />
          <div className="flex flex-row px-2 rounded-md align-middle py-2 text-gray-800 hover:bg-blue-500 hover:text-white">
            <BiMessageDetail
              style={{
                fontSize: 22,
                marginLeft: -2,
              }}
            />
            <a
              className="text-xs -mt-0.5 flex py-1 w-full flex-row pl-1"
              href="https://sites.google.com/view/buzonvirtualsistemacic/buz%C3%B3n-virtual-de-sugerencias"
            >
              Buzón virual
            </a>
          </div>
          <hr />
          <div className="flex flex-row px-2 rounded-md align-middle py-2 text-gray-800 hover:bg-blue-500 hover:text-white">
            <BiLockOpenAlt size={20} />
            <a
              className="text-xs flex flex-row pt-1 pl-1"
              href="/auth/change-password"
            >
              Cambiar clave
            </a>
          </div>
          <hr />
          <div className="px-2 py-2 text-gray-800 hover:bg-blue-500 rounded-lg hover:text-white">
            <button
              onClick={() => {
                loginOut();
                signOut();
              }}
              className="text-xs flex flex-row"
            >
              <div className="flex flex-row">
                <BiLogOut size={20} className="-ml-0.5" />{" "}
                <label className="pt-0.5 pl-1 cursor-pointer">Salir</label>
              </div>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default VisiterUserInfo;
