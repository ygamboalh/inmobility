import React, { useEffect, useRef, useState } from "react";
import { useSignOut } from "react-auth-kit";

import {
  BiLogOut,
  BiHomeAlt,
  BiLockOpenAlt,
  BiUserCircle,
  BiWrench,
  BiBell,
  BiBook,
  BiUser,
  BiSitemap,
  BiLink,
  BiChevronDownCircle,
  BiBuildingHouse,
} from "react-icons/bi";

import { authUserData } from "../../../api/usersApi";
import { useQuery } from "react-query";
import AxiosInstance from "../../../api/AxiosInstance";
import { API } from "../../../constant";

import {
  deleteNotification,
  deleteZero,
  getUserTokenDate,
} from "../../../utils/helpers";

const Dropdown = ({ ubicacion }) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  const [imageUrl, setImageUrl] = useState(
    "https://backend.siccic.com/uploads/small_userinfo_dac703068b.png"
  );
  const [notificaciones, setNotificaciones] = useState();
  const { data: userData } = useQuery("profile", authUserData);
  const id = userData?.id;
  const user = AxiosInstance.get(`users/${id}?populate=photo`).then((data) => {
    const image = data?.data?.photo?.url;
    const url = `https://backend.siccic.com${image}`;

    setImageUrl(url);
  });
  useEffect(() => {
    deleteNotification();
    const response = AxiosInstance.get(`${API}notifications`)
      .then((response) => {
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
  const signOut = useSignOut();

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
    if (currentDateString === fecha && horaActual >= horaCreado) {
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
  };
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
  useEffect(() => {
    forcedLogOut();
  });
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
  return (
    <div className="">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={
          notificaciones?.length < 1
            ? `${ubicacion} rounded-full`
            : `${ubicacion} p-1 rounded-full border-2 border-red-600`
        }
        style={buttonStyle}
      ></button>

      {isOpen && (
        <div
          ref={menuRef}
          className="fixed border top-[70px] right-1 z-10 p-4 w-[180px] h-fit mt-2 py-2 bg-gray-300 rounded-lg shadow-lg"
        >
          <div className="flex flex-row px-2 align-middle rounded-lg py-2 text-gray-800 hover:bg-blue-500 hover:text-white">
            <BiWrench size={20} />
            <a
              className="text-xs flex flex-row pt-1 pl-1"
              href="/admin/properties"
            >
              Administrar
            </a>
          </div>
          <div className="flex flex-row px-2 align-middle rounded-lg py-2 text-gray-800 hover:bg-blue-500 hover:text-white">
            <BiHomeAlt size={20} />
            <a className="text-xs flex flex-row pt-1 pl-1" href="/home/banner">
              Opciones
            </a>
          </div>
          {notificaciones?.length > 0 ? (
            <div className="flex flex-row px-2 align-middle rounded-lg py-2 text-gray-800 hover:bg-blue-500 hover:text-white">
              <BiBell size={20} />
              <a
                className="text-xs flex flex-row pt-1 pl-1"
                href="/home/notifications"
              >
                Notificaciones
              </a>
            </div>
          ) : null}
          <div className="flex flex-row px-2 align-middle rounded-lg py-2 text-gray-800 hover:bg-blue-500 hover:text-white">
            <BiBook size={20} />
            <a
              className="text-xs flex flex-row pt-1 pl-1"
              href="/home/portfolio"
            >
              Portafolios
            </a>
          </div>
          <div className="flex flex-row px-2 align-middle rounded-lg py-2 text-gray-800 hover:bg-blue-500 hover:text-white">
            <BiUserCircle size={20} />
            <a className="text-xs flex flex-row pt-1 pl-1" href="/user/profile">
              Perfil
            </a>
          </div>
          <div className="flex flex-row px-2 align-middle rounded-lg py-2 text-gray-800 hover:bg-blue-500 hover:text-white">
            <BiLockOpenAlt size={20} />
            <a
              className="text-xs flex flex-row pt-1 pl-1"
              href="/auth/change-password"
            >
              Cambiar clave
            </a>
          </div>
          <div className="min-[1100px]:hidden">
            <div className="flex flex-row px-2 align-middle rounded-lg py-2 text-gray-800 hover:bg-blue-500 hover:text-white">
              <BiBuildingHouse size={20} />
              <a
                className="text-xs flex flex-row pt-1 pl-1"
                href="/auth/change-password"
              >
                Propiedades
              </a>
            </div>
            <div className="flex flex-row px-2 align-middle rounded-lg py-2 text-gray-800 hover:bg-blue-500 hover:text-white">
              <BiUser size={20} />
              <a
                className="text-xs flex flex-row pt-1 pl-1"
                href="/auth/change-password"
              >
                Usuarios
              </a>
            </div>
            <div className="flex flex-row px-2 align-middle rounded-lg py-2 text-gray-800 hover:bg-blue-500 hover:text-white">
              <BiChevronDownCircle size={20} />
              <a
                className="text-xs flex flex-row pt-1 pl-1"
                href="/auth/change-password"
              >
                Botones
              </a>
            </div>
            <div className="flex flex-row px-2 align-middle rounded-lg py-2 text-gray-800 hover:bg-blue-500 hover:text-white">
              <BiSitemap size={20} />
              <a
                className="text-xs flex flex-row pt-1 pl-1"
                href="/auth/change-password"
              >
                Portal verificados
              </a>
            </div>
            <div className="flex flex-row px-2 align-middle rounded-lg py-2 text-gray-800 hover:bg-blue-500 hover:text-white">
              <BiLink size={20} />
              <a
                className="text-xs flex flex-row pt-1 pl-1"
                href="/auth/change-password"
              >
                Enlaces
              </a>
            </div>
          </div>
          <div className="px-2 py-2 text-gray-800 rounded-lg hover:bg-blue-500 hover:text-white">
            <button
              onClick={() => {
                loginOut();
                signOut();
              }}
              className="text-xs flex flex-row"
            >
              <BiLogOut size={20} />{" "}
              <label className="pt-0.5 pl-0.5 cursor-pointer">Salir</label>
            </button>
          </div>
        </div>
      )}
      <div></div>
    </div>
  );
};

export default Dropdown;
