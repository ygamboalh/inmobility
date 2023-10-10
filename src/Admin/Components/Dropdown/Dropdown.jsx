import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
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

import {
  deleteNotification,
  deleteZero,
  getUserTokenDate,
} from "../../../utils/helpers";
import { getAllNotifications } from "../../../api/propertiesApi";

const Dropdown = ({ ubicacion }) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();

  const [imageUrl, setImageUrl] = useState(
    "https://backend.sistemacic.com/uploads/small_userinfo_dac703068b.png"
  );
  const [notificaciones, setNotificaciones] = useState();
  const { data: userData } = useQuery("profile", authUserData);
  const id = userData?.id;
  const user = AxiosInstance.get(`users/${id}?populate=photo`).then((data) => {
    const image = data?.data?.photo?.url;
    const url = `https://backend.sistemacic.com${image}`;

    setImageUrl(url);
  });
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
  useEffect(() => {
    deleteNotification();
  }, []);

  const buttonStyle = {
    backgroundImage: `url("${imageUrl}")`,
    backgroundSize: "cover",
    width: "40px",
    height: "40px",
  };
  const signOut = useSignOut();
  useEffect(() => {
    const id = userData?.id;
    if (id) {
      forcedLogOut();
    }
  });
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
    const diaCreado = parseInt(deleteZero(fecha?.slice(8, 10)));
    const diaActual = parseInt(deleteZero(currentDateString?.slice(8, 10)));
    const result = horaActual - horaCreado;
    const dias = diaActual - diaCreado;

    //Si es el mismo dia
    if (currentDateString === fecha && result >= 3) {
      const response = AxiosInstance.put(`/users/${id}`, {
        isLoggedIn: false,
      })
        .then((res) => {
          signOut();
          navigate("/");
        })
        .catch((err) => {
          return err;
        });
    } else if (dias > 1) {
      //Si ha pasado mas de un dia
      const response = AxiosInstance.put(`/users/${id}`, {
        isLoggedIn: false,
      })
        .then((res) => {
          signOut();
          navigate("/");
        })
        .catch((err) => {
          return err;
        });
    } else if (
      dias === 1 &&
      horaCreado >= 21 &&
      horaCreado <= 23 &&
      result > -21
    ) {
      //Si paso de dia e inicio sesion entre las 21 y las 23 y ademas es entre las 0 y las 2 horas del dia que inicio sesion
      const response = AxiosInstance.put(`/users/${id}`, {
        isLoggedIn: false,
      })
        .then((res) => {
          signOut();
          navigate("/");
        })
        .catch((err) => {
          return err;
        });
    } else if (dias > 0) {
      //Si no se cumplen los anteriores y paso de dia
      const response = AxiosInstance.put(`/users/${id}`, {
        isLoggedIn: false,
      })
        .then((res) => {
          signOut();
          navigate("/");
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
        return res;
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
          <button
            onClick={() => {
              setIsOpen(false);
              navigate("/admin/properties");
            }}
            className="w-full flex flex-row px-2 align-middle rounded-lg py-2 text-gray-800 hover:bg-blue-500 hover:text-white"
          >
            <BiWrench size={20} />
            <span className="text-xs flex flex-row pt-0.5 pl-1">
              Administrar
            </span>
          </button>
          <button
            onClick={() => {
              setIsOpen(false);
              navigate("/home/banner");
            }}
            className="flex w-full flex-row px-2 align-middle rounded-lg py-2 text-gray-800 hover:bg-blue-500 hover:text-white"
          >
            <BiHomeAlt size={20} />
            <span className="text-xs flex flex-row pt-1 pl-1">Opciones</span>
          </button>
          {userData?.active === "Supervisor" ? (
            <button
              onClick={() => {
                setIsOpen(false);
                navigate("/user/verified-adviser");
              }}
              className="flex flex-row px-2 w-full align-middle rounded-lg py-2 text-gray-800 hover:bg-blue-500 hover:text-white"
            >
              <BiSitemap size={20} />
              <span className="text-xs flex flex-row pt-1 pl-1">
                Portal verificados
              </span>
            </button>
          ) : null}
          {notificaciones?.length > 0 ? (
            <button
              onClick={() => {
                setIsOpen(false);
                navigate("/home/notifications");
              }}
              className="flex w-full flex-row px-2 align-middle rounded-lg py-2 text-gray-800 hover:bg-blue-500 hover:text-white"
            >
              <BiBell size={20} />
              <span className="text-xs flex flex-row pt-1 pl-1">
                Notificaciones
              </span>
            </button>
          ) : null}
          <button
            onClick={() => {
              setIsOpen(false);
              navigate("/home/portfolio");
            }}
            className="flex w-full flex-row px-2 align-middle rounded-lg py-2 text-gray-800 hover:bg-blue-500 hover:text-white"
          >
            <BiBook size={20} />
            <span className="text-xs flex flex-row pt-1 pl-1">Portafolios</span>
          </button>
          <button
            onClick={() => {
              setIsOpen(false);
              navigate("/user/profile");
            }}
            className="flex flex-row w-full px-2 align-middle rounded-lg py-2 text-gray-800 hover:bg-blue-500 hover:text-white"
          >
            <BiUserCircle size={20} />
            <span className="text-xs flex flex-row pt-1 pl-1">Perfil</span>
          </button>
          <button
            onClick={() => {
              setIsOpen(false);
              navigate("/auth/change-password");
            }}
            className="w-full flex flex-row px-2 align-middle rounded-lg py-2 text-gray-800 hover:bg-blue-500 hover:text-white"
          >
            <BiLockOpenAlt size={20} />
            <span className="text-xs flex flex-row pt-1 pl-1">
              Cambiar clave
            </span>
          </button>
          <div className="min-[1100px]:hidden">
            <button
              onClick={() => {
                setIsOpen(false);
                navigate("/admin/properties");
              }}
              className="flex w-full flex-row px-2 align-middle rounded-lg py-2 text-gray-800 hover:bg-blue-500 hover:text-white"
            >
              <BiBuildingHouse size={20} />
              <span className="text-xs flex flex-row pt-1 pl-1">
                Propiedades
              </span>
            </button>
            <button
              onClick={() => {
                setIsOpen(false);
                navigate("/admin/users");
              }}
              className="flex w-full flex-row px-2 align-middle rounded-lg py-2 text-gray-800 hover:bg-blue-500 hover:text-white"
            >
              <BiUser size={20} />
              <span className="text-xs flex flex-row pt-1 pl-1">Usuarios</span>
            </button>
            <button
              onClick={() => {
                setIsOpen(false);
                navigate("/admin/buttons");
              }}
              className="flex w-full flex-row px-2 align-middle rounded-lg py-2 text-gray-800 hover:bg-blue-500 hover:text-white"
            >
              <BiChevronDownCircle size={20} />
              <span className="text-xs flex flex-row pt-1 pl-1">Botones</span>
            </button>
            <button
              onClick={() => {
                setIsOpen(false);
                navigate("/user/verified-adviser");
              }}
              className="flex w-full flex-row px-2 align-middle rounded-lg py-2 text-gray-800 hover:bg-blue-500 hover:text-white"
            >
              <BiSitemap size={20} />
              <span className="text-xs flex flex-row pt-1 pl-1">
                Portal verificados
              </span>
            </button>
            <button
              onClick={() => {
                setIsOpen(false);
                navigate("/admin/links");
              }}
              className="flex flex-row w-full px-2 align-middle rounded-lg py-2 text-gray-800 hover:bg-blue-500 hover:text-white"
            >
              <BiLink size={20} />
              <span className="text-xs flex flex-row pt-1 pl-1">Enlaces</span>
            </button>
          </div>

          <div className="px-2 py-2 text-gray-800 rounded-lg hover:bg-blue-500 hover:text-white">
            <button
              onClick={() => {
                setIsOpen(false);
                loginOut();
                signOut();
                navigate("/");
                window.location.reload(true);
              }}
              className="text-xs flex flex-row w-full"
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
