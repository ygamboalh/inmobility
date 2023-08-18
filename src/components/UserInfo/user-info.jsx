import React, { useEffect, useState } from "react";

import { useSignOut } from "react-auth-kit";
import {
  BiLogOut,
  BiHomeAlt,
  BiLockOpenAlt,
  BiUserCircle,
  BiUserCheck,
  BiBook,
  BiBell,
} from "react-icons/bi";
import { authUserData } from "../../api/usersApi";
import { useQuery } from "react-query";
import AxiosInstance from "../../api/AxiosInstance";
import { ACCESS_TOKEN_STORAGE, API } from "../../constant";
import {
  deleteNotification,
  deleteZero,
  forcedLogOut,
  getUserTokenDate,
} from "../../utils/helpers";

const UserInfo = () => {
  const signOut = useSignOut();
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenM, setIsOpenM] = useState(false);
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
  deleteNotification();
  useEffect(() => {
    const response = AxiosInstance.get(`${API}notifications`)
      .then((response) => {
        setNotificaciones(response.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

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
    const horaCreado = deleteZero(hora.slice(0, 2));
    const horaActual = deleteZero(currentTimeString?.slice(0, 2));
    const result = horaActual - horaCreado;
    console.log(currentDateString, fecha);
    console.log(horaActual, horaCreado);
    if (currentDateString === fecha && horaActual >= horaCreado) {
      signOut();
      window.location.reload(true);
    } /* else {
      if (horaActual <= horaCreado) {
        signOut();
        window.location.reload(true);
      }
    } */
  };
  useEffect(() => {
    forcedLogOut();
  });

  const buttonStyle = {
    backgroundImage: `url("${imageUrl}")`,
    backgroundSize: "cover",
    width: "40px",
    height: "40px",
  };
  const toggleMenuM = () => {
    setIsOpenM(!isOpenM);
  };

  return (
    <div className="">
      <button
        onClick={toggleMenuM}
        className={
          notificaciones?.length < 1
            ? "absolute top-8 right-8 rounded-full"
            : "absolute top-8 right-8 p-1 rounded-full border-2 border-red-600"
        }
        style={buttonStyle}
      ></button>
      {isOpenM && (
        <div className="fixed right-1 top-20 z-10 w-[200px] h-fit bg-white p-4 border rounded-lg shadow-lg">
          <div className="flex flex-row px-2 rounded-lg align-middle py-2 text-gray-800 hover:bg-blue-500 hover:text-white">
            <BiUserCheck size={20} />
            <a
              className="text-xs flex flex-row pt-1 pl-1"
              href="/user/verified-adviser"
            >
              Verificado
            </a>
          </div>
          <div className="flex flex-row px-2 align-middle rounded-lg py-2 text-gray-800 hover:bg-blue-500 hover:text-white">
            <BiHomeAlt size={20} />
            <a className="text-xs flex flex-row pt-1 pl-1" href="/home/banner">
              Opciones
            </a>
          </div>
          <div className="flex flex-row px-2 align-middle py-2 rounded-lg text-gray-800 hover:bg-blue-500 hover:text-white">
            <BiBook size={20} />
            <a
              className="text-xs flex flex-row pt-1 pl-1"
              href="/home/portfolio"
            >
              Portafolios
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
            <BiUserCircle size={20} />
            <a className="text-xs flex flex-row pt-1 pl-1" href="/user/profile">
              Perfil
            </a>
          </div>
          <div className="flex flex-row px-2 align-middle py-2 rounded-lg text-gray-800 hover:bg-blue-500 hover:text-white">
            <BiLockOpenAlt size={20} />
            <a
              className="text-xs flex flex-row pt-1 pl-1"
              href="/auth/change-password"
            >
              Cambiar clave
            </a>
          </div>
          <div className="px-2 py-2 text-gray-800 hover:bg-blue-500 rounded-lg hover:text-white">
            <button onClick={() => signOut()} className="text-xs flex flex-row">
              <BiLogOut size={20} />{" "}
              <label className="pt-0.5 pl-0.5 cursor-pointer">Salir</label>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserInfo;
