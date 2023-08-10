import { useEffect, useState } from "react";
import AxiosInstance from "../../api/AxiosInstance";
import { API } from "../../constant";
import MySpinner from "../Spinner/spinner";
import { BiBell } from "react-icons/bi";

import { useNavigate } from "react-router-dom";
import MetaData from "../Metadata/metadata";

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const getNotifications = async () => {
    const res = await AxiosInstance.get(`${API}notifications`)
      .then((response) => {
        const data = response.data.data;
        const notifications = data.reverse();
        setNotifications(notifications);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getNotifications();
    deleteNotification();
  }, []);

  function deleteZero(string) {
    if (string.startsWith("0") && string.length > 1) {
      return string.slice(1);
    } else {
      return string;
    }
  }
  const deleteNotification = () => {
    const currentDate = new Date();
    const currentDateString = currentDate.toISOString().split("T")[0];
    const currentTimeString = currentDate
      .toISOString()
      .split("T")[1]
      .split(".")[0];
    console.log("las notificaciones", notifications);
    if (notifications.length > 0) {
      console.log("hay elementos");
      notifications.map((notif) => {
        const fecha = notif.attributes.createdAt.slice(0, 10);
        const hora = notif.attributes.createdAt.slice(11, 16);
        const horaCreado = deleteZero(hora.slice(0, 2));
        const horaActual = deleteZero(currentTimeString.slice(0, 2));
        console.log(horaActual, horaCreado);
        const result = horaActual - horaCreado;
        console.log("resultado", result);
        console.log(fecha, currentDateString);
        setIsLoading(true);
        if (result >= 3) {
          const response = AxiosInstance.delete(
            `${API}notifications/${notif.id}`
          )
            .then((response) => {
              console.log("respueta correacta", response);
              return response;
            })
            .catch((error) => {
              console.log("pero el error", error);
            });
        } else if (fecha !== currentDateString) {
          const response = AxiosInstance.delete(
            `${API}notifications/${notif.id}`
          )
            .then((response) => {
              return;
            })
            .catch((error) => {
              return;
            })
            .finally(() => {
              setIsLoading(false);
            });
        }
      });
    }
  };
  if (!notifications) {
    return <MySpinner />;
  }
  return (
    <div>
      <MetaData title="Notificaciones" description="Notificaciones" />
      <div className="flex justify-center my-4 font-semibold">
        {notifications.length < 1 ? (
          <span>No hay notificaciones para mostrar</span>
        ) : (
          <span>Notificaciones</span>
        )}
      </div>
      {notifications?.map((notification) => {
        return (
          <div className="flex flex-col mx-8 bg-gray-200 rounded-md p-4 align-middle mb-1">
            <div className="flex flex-row">
              <div className="align-middle ml-1 mr-1">
                <BiBell size={20} />
              </div>
              <div>
                <span className="font-semibold">
                  {notification.attributes.type}
                </span>
              </div>
              <hr />
            </div>
            <div className="mx-2 align-middle">
              {notification.attributes.information}
            </div>
            <div className="ml-4 my-2">
              <button
                onClick={() =>
                  navigate(
                    `/home/search/property-detail/${notification.attributes.reference}`
                  )
                }
                className="bg-green-400 hover:bg-green-500 px-2 py-1 rounded-md cursor-pointer"
              >
                Revisar
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};
export default Notifications;
