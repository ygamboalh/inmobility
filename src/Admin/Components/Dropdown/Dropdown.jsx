import React, { useEffect, useState } from "react";
import { useSignOut } from "react-auth-kit";
import {
  BiLogOut,
  BiHomeAlt,
  BiLockOpenAlt,
  BiUserCircle,
  BiWrench,
  BiBell,
  BiBook,
} from "react-icons/bi";
import { authUserData } from "../../../api/usersApi";
import { useQuery } from "react-query";
import AxiosInstance from "../../../api/AxiosInstance";
import { API } from "../../../constant";
import { message } from "antd";
import {
  deleteNotification,
  deleteZero,
  getUserTokenDate,
} from "../../../utils/helpers";
import enviarCorreoComunOrigen from "../../../utils/email/send-common-email-origin";
import enviarCorreo from "../../../utils/email/send-email";
import enviarCorreoPersonalizadoOrigen from "../../../utils/email/send-personalized-email-origin";
import enviarCorreoPersonalizado from "../../../utils/email/send-personalized-email";

const Dropdown = ({ ubicacion }) => {
  const [isOpen, setIsOpen] = useState(false);
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
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
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
      signOut();
      window.location.reload(true);
    } else {
      if (horaActual <= horaCreado) {
        signOut();
        window.location.reload(true);
      }
    }
  };
  useEffect(() => {
    forcedLogOut();
  });
  return (
    <div className="">
      <button
        onClick={toggleMenu}
        className={
          notificaciones?.length < 1
            ? `${ubicacion} rounded-full`
            : `${ubicacion} p-1 rounded-full border-2 border-red-600`
        }
        style={buttonStyle}
      ></button>

      {isOpen && (
        <div className="fixed border top-[70px] right-1 z-10 p-4 w-[180px] h-fit mt-2 py-2 bg-gray-300 rounded-lg shadow-lg">
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
              Portafolio
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
          <div className="px-2 py-2 text-gray-800 rounded-lg hover:bg-blue-500 hover:text-white">
            <button onClick={() => signOut()} className="text-xs flex flex-row">
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
