import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import MySpinner from "./Spinner/spinner";

import MetaData from "./Metadata/metadata";
import { authUserData } from "../api/usersApi";
import { useQuery } from "react-query";

const Banner = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const { data: userData } = useQuery("profile", authUserData);

  const SelectLink = async () => {
    //setIsLoading(true);
    if (
      userData?.active === "Super Administrador" ||
      userData?.active === "Supervisor" ||
      userData?.active === "Asesor verificado activo"
    ) {
      navigate("/home/insert-property", { replace: true });
    } else if (userData?.active === "Solicitante") {
      navigate("/user/evaluating", { replace: true });
    } else {
      navigate("/user/access-denied", { replace: true });
    }
  };
  if (isLoading) {
    return <MySpinner />;
  }

  return (
    <section className="h-full max-h-[640px] my-8">
      <MetaData title="Opciones" description="Opciones" />
      <div className="grid grid-cols-3 p-5 gap-10 lg:py-16  max-[1000px]:grid-cols-1 max-md:grid-cols-1 text-center text-white font-medium">
        <Link
          to="/selling"
          className="border flex flex-col py-14 justify-center align-middle lg:p-20 lg:w-full shadow-1 hover:shadow-2xl rounded-lg bg-primary"
        >
          <div className="px-2">
            <h1>Buscar Inmuebles en Venta</h1>
          </div>
          <div>
            <label className="font-thin">
              presiona para ver todas las ventas
            </label>
          </div>
        </Link>
        <Link
          to="/renting"
          className="border flex flex-col py-14 justify-center align-middle lg:p-20 lg:w-full shadow-1 hover:shadow-2xl rounded-lg bg-primary"
        >
          <div className="px-2">
            <h1>Buscar Alquileres de Inmuebles</h1>
          </div>
          <div>
            <label className="font-thin">
              presiona para ver todas los alquileres
            </label>
          </div>
        </Link>
        {!userData ||
        userData?.active === "Asesor verificado inactivo" ||
        userData?.active === "Freelancer" ? (
          <Link
            to="https://sites.google.com/view/directoriocr/ubicar-asesores-inmobiliarios-por-zona"
            className="border flex flex-col py-14 justify-center align-middle lg:p-20 lg:w-full shadow-1 hover:shadow-2xl rounded-lg bg-primary"
          >
            <div className="px-2">
              <h1>Buscar un Asesor inmobiliario</h1>
            </div>
            <div>
              <label className="font-thin">por zona geográfica</label>
            </div>
          </Link>
        ) : (
          <button
            type="button"
            onClick={SelectLink}
            className="border flex flex-col py-14 justify-center align-middle lg:p-20 lg:w-full shadow-1 hover:shadow-2xl rounded-lg bg-primary text-center items-center"
          >
            <div className="px-2">
              <h1>Subir un inmueble</h1>
            </div>
            <div>
              <label className="font-thin">
                si eres un asesor verificado podrás subir un inmueble
              </label>
            </div>
          </button>
        )}
      </div>
    </section>
  );
};

export default Banner;
