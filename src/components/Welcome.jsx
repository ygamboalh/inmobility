import React from "react";
import { useNavigate } from "react-router-dom";
import MetaData from "./Metadata/metadata";

const Welcome = () => {
  const navigate = useNavigate();

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
