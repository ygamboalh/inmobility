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
  const [isLoading, setIsLoading] = useState(false);
  const menuRef = useRef(null);
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
    const diaCreado = parseInt(deleteZero(fecha?.slice(8, 10)));
    const diaActual = parseInt(deleteZero(currentDateString?.slice(8, 10)));
    const result = horaActual - horaCreado;
    const dias = diaActual - diaCreado;
    /* console.log("hora actual y creado", horaActual, horaCreado);
    console.log("resultado", result); */
    //Si es el mismo dia
    setIsLoading(true);
    if (currentDateString === fecha && result >= 0) {
      const response = AxiosInstance.put(`/users/${id}`, {
        isLoggedIn: false,
      })
        .then((res) => {
          const respuesta = res.status;
          console.log("la respuesta de cerrar session para un mismo dia", res);
          if (respuesta === 200) {
            signOut();
            navigate("/");
          }
        })
        .catch((err) => {
          return err;
        })
        .finally(() => {
          setIsLoading(false);
        });
      setIsLoading(false);
    } else if (dias > 1) {
      //Si ha pasado mas de un dia
      const response = AxiosInstance.put(`/users/${id}`, {
        isLoggedIn: false,
      })
        .then((res) => {
          const respuesta = res.status;
          console.log("la respuesta de cerrar session para mas de un dia", res);
          if (respuesta === 200) {
            signOut();
            navigate("/");
          }
          setIsLoading(false);
        })
        .catch((err) => {
          return err;
        })
        .finally(() => {
          setIsLoading(false);
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
          const respuesta = res.status;
          console.log(
            "la respuesta de cerrar session cuando es medianoche",
            res
          );
          if (respuesta === 200) {
            signOut();
            navigate("/");
          }
          setIsLoading(false);
        })
        .catch((err) => {
          return err;
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else if (dias > 0) {
      //Si no se cumplen los anteriores y paso de dia
      const response = AxiosInstance.put(`/users/${id}`, {
        isLoggedIn: false,
      })
        .then((res) => {
          const respuesta = res.status;
          console.log(
            "la respuesta de cerrar session, pasa de un dia para otro",
            res
          );
          if (respuesta === 200) {
            signOut();
            navigate("/");
          }
          setIsLoading(false);
        })
        .catch((err) => {
          return err;
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
    setIsLoading(false);
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
        if (res.status === 200) {
          signOut();
          navigate("/");
          return res;
        }
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
            <button
              onClick={() => {
                setIsOpenM(false);
                navigate("/user/verified-adviser");
              }}
              className="flex w-full flex-row px-2 rounded-lg align-middle pb-2 pt-2 mt-1 text-gray-800 hover:bg-blue-500 hover:text-white"
            >
              <BiUserCheck size={20} />
              <span className="text-xs flex flex-row pt-[3px] pl-1">
                Portal verificados
              </span>
            </button>
          )}
          <button
            onClick={() => {
              setIsOpenM(false);
              navigate("/home/banner");
            }}
            className="flex w-full flex-row px-2 align-middle rounded-lg py-2 text-gray-800 hover:bg-blue-500 hover:text-white"
          >
            <BiHomeAlt size={20} />
            <span className="text-xs flex flex-row pt-1 pl-1">Opciones</span>
          </button>
          {userData?.active === "Freelancer" ? null : (
            <button
              onClick={() => {
                setIsOpenM(false);
                navigate("/home/portfolio");
              }}
              className="flex w-full flex-row px-2 align-middle py-2 rounded-lg text-gray-800 hover:bg-blue-500 hover:text-white"
            >
              <BiBook size={20} />
              <span className="text-xs flex flex-row pt-0.5 pl-1">
                Portafolios
              </span>
            </button>
          )}
          {userData?.active === "Asesor verificado activo" ? (
            <button
              onClick={() => {
                setIsOpenM(false);
                navigate("/home/notifications");
              }}
              className="flex flex-row px-2 w-full align-middle rounded-lg py-2 text-gray-800 hover:bg-blue-500 hover:text-white"
            >
              <BiBell size={20} />
              <span className="text-xs flex flex-row pt-[3px] pl-1">
                Notificaciones
              </span>
            </button>
          ) : null}
          <button
            onClick={() => {
              setIsOpenM(false);
              navigate("/user/profile");
            }}
            className="flex w-full flex-row px-2 align-middle rounded-lg py-2 text-gray-800 hover:bg-blue-500 hover:text-white"
          >
            <BiUserCircle size={22} />
            <span className="text-xs w-full flex flex-row pt-[3px] pl-1">
              Perfil
            </span>
          </button>
          <button
            onClick={() => {
              setIsOpenM(false);
              navigate("/auth/change-password");
            }}
            className="flex w-full flex-row px-2 align-middle py-2 rounded-lg text-gray-800 hover:bg-blue-500 hover:text-white"
          >
            <BiLockOpenAlt size={22} />
            <span className="text-xs flex flex-row w-full pt-[4px] pl-0.5">
              Cambiar clave
            </span>
          </button>
          <button
            onClick={() => {
              setIsOpenM(false);
              navigate("/home/visiter-contact");
            }}
            className="flex flex-row w-full px-2 rounded-md align-middle py-2 text-gray-800 hover:bg-blue-500 hover:text-white"
          >
            <BiMailSend
              style={{
                fontSize: 22,
                marginLeft: -2,
              }}
            />
            <span className="text-xs -mt-[1px] flex pt-[3px] w-full flex-row pl-1">
              Contactar
            </span>
          </button>
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
                setIsOpenM(false);
                loginOut();
                signOut();
                navigate("/");
                window.location.reload(true);
              }}
              className="text-xs flex w-full flex-row"
            >
              <div className="-ml-1 flex flex-row">
                <BiLogOut size={20} />{" "}
                <label className="pt-0.5 pl-1 cursor-pointer ">Salir</label>
              </div>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserInfo;
