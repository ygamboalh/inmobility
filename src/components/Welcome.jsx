import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MetaData from "./Metadata/metadata";
import { authUserData } from "../api/usersApi";
import { useQuery } from "react-query";
import { deleteZero, getUserTokenDate } from "../utils/helpers";
import AxiosInstance from "../api/AxiosInstance";
import { useSignOut } from "react-auth-kit";

const Welcome = () => {
  const navigate = useNavigate();
  const signOut = useSignOut();
  const { data: userData } = useQuery("profile", authUserData);
  useEffect(() => {
    //Cuando se cierra la app y se abre nuevamente,
    //si hay sesion abierta intentara entrar al login.
    //En login si hay usuario loggeado lo envia automaticamente a / home / banner
    const active = userData?.active;
    if (active) {
      navigate("/auth/signin");
    }
  }, [userData]);

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
      const response = AxiosInstance.put(`/users/${userData?.id}`, {
        isLoggedIn: false,
      })
        .then((res) => {
          signOut();
          window.location.reload(true);
        })
        .catch((err) => {
          return err;
        });
    } else {
      if (currentDateString !== fecha && (result <= -4 || result >= 4)) {
        signOut();
        window.location.reload(true);
      }
    }
  };

  useEffect(() => {
    forcedLogOut();
  });
  return (
    <div className="flex flex-col h-screen px-12 div-welcome text-center sm:px-10 md:px-6 justify-center items-center">
      <div className="p-4 flex flex-col items-center justify-center border rounded-lg shadow border-gray-500 mt-2">
        <MetaData
          description="Venta y Alquiler de inmuebles y propiedades"
          title="Sistema CIC"
        />
        <div className="justify-center flex items-center mb-4 logo"></div>
        <div className="flex-5 lg:w-96 md:w-96 text-white">
          <label className="mb-4">
            Esta es la principal herramienta de trabajo de los Asesores
            Inmobiliarios en Costa Rica
          </label>
        </div>
        <div className="flex-5 lg:w-96 md:w-96 text-white">
          <button
            onClick={() => navigate("/auth/signin")}
            className="button-pro-inm"
          >
            <div className="div-button cursor-pointer">
              <label className="label-button cursor-pointer">
                INGRESAR COMO
              </label>
              <label className="label-button cursor-pointer">
                ASESOR PROFESIONAL
              </label>
            </div>
          </button>
        </div>
        <div className="flex-5 lg:w-96 md:w-96 text-white">
          <a href="/home/investor">
            <button className="button-pro-inm">
              <div className="div-button cursor-pointer">
                <label className="label-button cursor-pointer">
                  INGRESAR COMO
                </label>
                <label className="label-button cursor-pointer">
                  INVERSIONISTA INMOBILIARIO
                </label>
              </div>
            </button>
          </a>
        </div>
        <div className="flex-5 lg:w-96 md:w-96 text-white">
          <a href="/home/visit-record">
            <button className="button-pro-visit">
              <div className="div-button cursor-pointer">
                <label className="label-button cursor-pointer">
                  INGRESAR COMO VISITANTE
                </label>
              </div>
            </button>
          </a>
        </div>
        <div className="flex-5 lg:my-5 lg:w-96 md:w-96 my-6 text-white">
          <span className="">
            Como Visitante usted tendrá acceso a la base de datos de todos los
            inmuebles en venta y alquiler en Costa Rica
          </span>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
