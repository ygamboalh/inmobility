import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery, useQueryClient } from "react-query";

import { BiBell } from "react-icons/bi";
import Swal from "sweetalert2";

import AxiosInstance from "../../api/AxiosInstance";
import { API } from "../../constant";
import MySpinner from "../Spinner/spinner";
import MetaData from "../Metadata/metadata";
import { authUserData } from "../../api/usersApi";
import withReactContent from "sweetalert2-react-content";
import { getAllNotifications } from "../../api/propertiesApi";
import { message } from "antd";

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { data: userData } = useQuery("profile", authUserData);
  const id = userData?.id;

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

        setNotifications(notifications);
      },
    }
  );
  useEffect(() => {
    deleteNotification();
  }, []);

  function deleteZero(string) {
    if (string?.startsWith("0") && string?.length > 1) {
      return string?.slice(1);
    } else {
      return string;
    }
  }
  const DeleteNotification = async (id) => {
    let data = [];
    const user = {
      id: userData?.id,
      attributes: {
        active: userData?.active,
        address: userData?.address,
        blocked: userData?.blocked,
        company: userData?.company,
        confirmed: userData?.confirmed,
        email: userData?.email,
        isLoggedIn: userData?.isLoggedIn,
        mobile: userData?.mobile,
        personalId: userData?.personalId,
        phone: userData?.phone,
        provider: userData?.provider,
        type: userData?.type,
        username: userData?.username,
        updated: userData?.updated,
        createdAt: userData?.createdAt,
      },
    };
    const MySwal = withReactContent(Swal);
    setIsLoading(true);
    MySwal.fire({
      title: "¿Desea eliminar la notificación?",
      showDenyButton: true,
      confirmButtonText: "Sí, eliminar",
      confirmButtonColor: "#1863e4",
      denyButtonText: `No`,
    }).then((result) => {
      if (result.isConfirmed) {
        setIsLoading(true);
        const response = AxiosInstance.get(
          `${API}notifications/${id}?populate=*`
        ).then((result) => {
          data = result.data.data.attributes.users.data;

          data.push(user);
          const secondResponse = AxiosInstance.put(
            `${API}notifications/${id}`,
            {
              data: { users: data },
            }
          )
            .then(() => {
              queryClient.invalidateQueries(["notifications"]);
            })
            .catch((error) => {
              console.log(error);
            })
            .finally(() => {
              setIsLoading(false);
            });
        });
      }
      setIsLoading(false);
    });

    setIsLoading(false);
  };
  const deleteNotification = () => {
    const currentDate = new Date();
    const currentDateString = currentDate.toISOString().split("T")[0];
    /* const currentTimeString = currentDate
      .toISOString()
      .split("T")[1]
      .split(".")[0];
 */
    if (notifications.length > 0) {
      notifications.map((notif) => {
        setIsLoading(true);
        const fecha = notif.attributes.createdAt.slice(0, 10);
        /* const hora = notif.attributes.createdAt.slice(11, 16); */
        /* const horaCreado = deleteZero(hora.slice(0, 2));
        const horaActual = deleteZero(currentTimeString.slice(0, 2)); */

        const diaActual = deleteZero(currentDateString.slice(5, 7));
        const diaCreado = deleteZero(fecha.slice(5, 7));
        const diaInicial = diaActual.slice(0, 2);
        const diaFinal = diaCreado.slice(0, 2);
        const resultado = diaInicial - diaFinal;

        if (resultado >= 3) {
          const response = AxiosInstance.delete(
            `${API}notifications/${notif.id}`
          )
            .then((response) => {
              return response;
            })
            .catch((error) => {
              console.log(error);
            })
            .finally(() => {
              setIsLoading(false);
            });
        }
        setIsLoading(false);
      });
    }
  };
  const navegar = (id) => {
    const response = AxiosInstance.get(`/home/shared-property/${id}`)
      .then((res) => {
        console.log("respuesta", res);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const viewProperty = (propertyId) => {
    setIsLoading(true);
    const response = AxiosInstance.get(
      `/properties?filters[uniqueId][$eq]=${propertyId}`
    )
      .then((res) => {
        if (res.data.data.length !== 0) {
          navigate(`/home/shared-property/${propertyId}`);
        } else {
          message.error(`Los datos que está intentando revisar ya no existen`);
        }
      })
      .catch((error) => {
        message.error(`Ha ocurrido un error. Intente nuevamente`);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  if (!notifications || loading) {
    return <MySpinner />;
  }
  return (
    <div>
      <MetaData title="Notificaciones" description="Notificaciones" />
      <div className="flex justify-center my-4 font-semibold">
        {notifications.length < 1 ? (
          <span>No hay notificaciones para mostrar</span>
        ) : (
          <span>Todas las notificaciones</span>
        )}
      </div>
      {notifications?.map((notification) => {
        return (
          <div className="flex flex-col mx-8 bg-gray-200 rounded-md p-4 align-middle mb-1">
            <div className="flex flex-row mb-2">
              <div className="align-middle ml-1 mr-1">
                <BiBell size={20} />
              </div>
              <div className="flex justify-between w-full flex-row">
                <div>
                  <span className="font-semibold mr-4">
                    {notification.attributes.type}
                  </span>
                </div>
                <div className="flex justify-end">
                  <span className="bg-gray-300 text-xs rounded-md py-[5px] px-2">
                    {notification?.attributes?.createdAt?.slice(0, 10)}
                  </span>
                </div>
              </div>
              <hr />
            </div>
            <div className="mx-2 align-middle">
              {notification.attributes.information}
            </div>
            <div className="flex flex-row">
              {notification?.attributes.reference !== null &&
              notification?.attributes.reference !== undefined ? (
                <div className="ml-4 my-2">
                  <button
                    type="button"
                    onClick={
                      () => viewProperty(notification.attributes.reference)
                      /* navigate(
                        `/home/shared-property/${notification?.attributes?.reference}`
                      ) */
                    }
                    className="bg-green-400 hover:bg-green-500 px-2 py-1 text-white rounded-md cursor-pointer"
                  >
                    Revisar
                  </button>
                </div>
              ) : null}
              <div className="ml-4 my-2">
                <button
                  onClick={() => DeleteNotification(notification.id)}
                  className="bg-red-600 hover:bg-red-700 px-2 py-1 text-white rounded-md cursor-pointer"
                >
                  Eliminar
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
export default Notifications;
