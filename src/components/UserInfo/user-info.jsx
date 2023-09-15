import React, { useEffect, useRef, useState } from "react";

import { useSignOut } from "react-auth-kit";
import {
  BiLogOut,
  BiHomeAlt,
  BiLockOpenAlt,
  BiUserCircle,
  BiUserCheck,
  BiBook,
  BiBell,
  BiMailSend,
  BiMessageDetail,
} from "react-icons/bi";
import { authUserData } from "../../api/usersApi";
import { useQuery } from "react-query";
import AxiosInstance from "../../api/AxiosInstance";
import {
  deleteNotification,
  deleteZero,
  getUserTokenDate,
} from "../../utils/helpers";
import { useNavigate } from "react-router-dom";
import { getAllNotifications } from "../../api/propertiesApi";

const UserInfo = () => {
  const signOut = useSignOut();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenM, setIsOpenM] = useState(false);
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
  deleteNotification();
  const { data, isLoading: loadingNotifications } = useQuery(
    "notifications",
    getAllNotifications,
    {
      onSuccess: (data) => {
        let notifications = [];
        data?.data?.map((item) => {
          let users = [];
          item.attributes.users.data?.map((user) => {
            users.push(user.id);
          });
          if (
            !users.includes(id) &&
            (item.attributes.emailReference === userData?.email ||
              item.attributes.emailReference === null)
          ) {
            notifications.push(item);
          }
        });

        notifications = notifications.reverse();

        setNotificaciones(notifications);
      },
    }
  );

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
    /* console.log("dia", result);
    console.log("fecha", fecha);
    console.log("hora actual", horaActual);
    console.log("hora creado", horaCreado); */
    if (currentDateString === fecha && horaActual >= horaCreado) {
      const response = AxiosInstance.put(`/users/${id}`, {
        isLoggedIn: false,
      })
        .then((res) => {
          signOut();
          //return res;
          window.location.reload(true);
        })
        .catch((err) => {
          return err;
        });
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

  const buttonStyle = {
    backgroundImage: `url("${imageUrl}")`,
    backgroundSize: "cover",
    width: "40px",
    height: "40px",
  };
  const toggleMenuM = () => {
    setIsOpenM(!isOpenM);
  };
  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setIsOpenM(false);
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
        onClick={() => setIsOpenM(!isOpenM)}
        className={
          notificaciones?.length < 1
            ? "absolute top-8 right-8 rounded-full"
            : "absolute top-8 right-8 p-1 rounded-full border-2 border-red-600"
        }
        style={buttonStyle}
      ></button>
      {isOpenM && (
        <div
          ref={menuRef}
          className="fixed right-1 top-20 z-10 w-[200px] h-fit bg-white p-4 border rounded-lg shadow-lg"
        >
          {userData?.active === "Freelancer" ? null : (
            <div className="flex flex-row px-2 rounded-lg align-middle py-2 text-gray-800 hover:bg-blue-500 hover:text-white">
              <BiUserCheck size={20} />
              <a
                className="text-xs flex flex-row pt-1 pl-1"
                href="/user/verified-adviser"
              >
                Verificado
              </a>
            </div>
          )}
          <div className="flex flex-row px-2 align-middle rounded-lg py-2 text-gray-800 hover:bg-blue-500 hover:text-white">
            <BiHomeAlt size={20} />
            <a className="text-xs flex flex-row pt-1 pl-1" href="/home/banner">
              Opciones
            </a>
          </div>
          {userData?.active === "Freelancer" ? null : (
            <div className="flex flex-row px-2 align-middle py-2 rounded-lg text-gray-800 hover:bg-blue-500 hover:text-white">
              <BiBook size={20} />
              <a
                className="text-xs flex flex-row pt-1 pl-1"
                href="/home/portfolio"
              >
                Portafolios
              </a>
            </div>
          )}
          {userData?.active === "Asesor verificado activo" ? (
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
          <div className="px-2 py-2 text-gray-800 hover:bg-blue-500 rounded-lg hover:text-white">
            <button
              onClick={() => {
                loginOut();
                signOut();
              }}
              className="text-xs flex flex-row"
            >
              <div className="-ml-1 flex flex-row">
                <BiLogOut size={20} />{" "}
                <label className="pt-0.5 pl-1 cursor-pointer">Salir</label>
              </div>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserInfo;
