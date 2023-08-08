import React, { useEffect, useState } from "react";
import { useSignOut } from "react-auth-kit";
import {
  BiLogOut,
  BiHomeAlt,
  BiLockOpenAlt,
  BiUserCircle,
  BiWrench,
  BiBell,
} from "react-icons/bi";
import { authUserData } from "../../../api/usersApi";
import { useQuery } from "react-query";
import AxiosInstance from "../../../api/AxiosInstance";
import { API } from "../../../constant";
import { message } from "antd";
import { deleteNotification } from "../../../utils/helpers";
import enviarCorreoComunOrigen from "../../../utils/email/send-common-email-origin";
import enviarCorreo from "../../../utils/email/send-email";
import enviarCorreoPersonalizadoOrigen from "../../../utils/email/send-personalized-email-origin";
import enviarCorreoPersonalizado from "../../../utils/email/send-personalized-email";

const Dropdown = () => {
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
  useEffect(() => {
    deleteNotification();
    const response = AxiosInstance.get(`${API}notifications`)
      .then((response) => {
        //const length = response.data.data.length;
        console.log("encontre estas notificaciones", response.data.data.length);
        setNotificaciones(response.data.data);
        /* message.info(
          `${response.data.data[length - 1].attributes.information}`
        ); */
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

  return (
    <div className="">
      <div
        className={
          notificaciones?.length < 1
            ? "relative rounded-full w-[44px] h-[44px] justify-center items-center"
            : "relative w-[44px] h-[44px] border-2 rounded-full border-red-600 justify-center items-center"
        }
      >
        <button
          onClick={toggleMenu}
          className="user-info-button"
          style={buttonStyle}
        ></button>
      </div>
      {isOpen && (
        <div className="absolute z-10 mt-2 py-2 w-[134px] bg-white rounded-lg shadow-lg">
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
          {notificaciones?.length > 0 ? (
            <div className="flex flex-row px-2 align-middle py-2 text-gray-800 hover:bg-blue-500 hover:text-white">
              <BiBell size={20} />
              <a
                className="text-xs flex flex-row pt-1 pl-1"
                href="/home/notifications"
              >
                Notificaciones
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
