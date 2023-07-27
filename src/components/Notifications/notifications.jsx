import { useEffect, useState } from "react";
import AxiosInstance from "../../api/AxiosInstance";
import { API } from "../../constant";
import MySpinner from "../Spinner/spinner";
import { BiBell } from "react-icons/bi";
import { BgColorsOutlined } from "@ant-design/icons";

import { notification } from "antd";
import { useNavigate } from "react-router-dom";

const Notifications = () => {
  const [notifications, setNotifications] = useState();
  const navigate = useNavigate();
  useEffect(() => {
    const response = AxiosInstance.get(`${API}notifications`).then(
      (response) => {
        const data = response.data.data;
        setNotifications(data);
        console.log(data);
      }
    );

    deleteNotification();
  }, []);
  const currentTime = new Date();
  const currentDateString = currentTime.toISOString().split("T")[0];
  const currentTimeString = currentTime
    .toISOString()
    .split("T")[1]
    .split(".")[0];
  //const fecha = notifications[0].attributes.createdAt;
  console.log("fecha y hora actual", currentDateString, currentTimeString);
  //console.log("fecha y hora de la notificacion", fecha);
  const deleteNotification = () => {
    notifications?.map((notification) => {
      if (notification.attributes.createdAt >= notification.attributes.expire) {
        const response = AxiosInstance.delete(`${API}notifications`)
          .then((response) => {
            console.log(response);
          })
          .catch((error) => {});
      }
    });
  };
  if (!notifications) {
    return <MySpinner />;
  }

  /* const showNotifications = () => {
    const [api, contextHolder] = notification.useNotification();
    const openNotification = (placement) => {
      api.info({
        message: `Notification ${placement}`,
        description:
          "This is the content of the notification. This is the content of the notification. This is the content of the notification.",
        placement,
      });
    };
  }; */

  console.log(notifications);
  return (
    <div>
      <div className="flex justify-center my-4 font-semibold">
        <span>Notificaciones</span>
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
