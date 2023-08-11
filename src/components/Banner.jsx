import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { getToken } from "../utils/helpers";
import { API, BEARER } from "../constant";
import MySpinner from "./Spinner/spinner";
import axios from "axios";
import MetaData from "./Metadata/metadata";

const Banner = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const SelectLink = async () => {
    setIsLoading(true);
    const token = getToken();
    const response = await axios
      .get(`${API}/users/me?populate=role`, {
        headers: { Authorization: `${BEARER} ${token}` },
      })
      .then((response) => {
        const role = response?.data.role.name;
        const active = response.data?.active;
        if (role === "SuperAdmin" || active === "Super Administrador") {
          navigate("/home/insert-property", { replace: true });
        }
        if (active === "Supervisor" || active === "Asesor verificado") {
          navigate("/home/insert-property", { replace: true });
        } else if (active === "Solicitante") {
          navigate("/user/evaluating", { replace: true });
        } else {
          navigate("/user/access-denied", { replace: true });
        }
      })
      .catch((error) => console.log(error))
      .finally(() => setIsLoading(false));
  };
  if (isLoading) {
    return <MySpinner />;
  }

  return (
    <section className="h-full max-h-[640px] my-8">
      <MetaData title="Opciones" description="Opciones" />
      <div className="grid grid-cols-3 p-5 gap-10 lg:py-16  max-[1000px]:grid-cols-1 max-md:grid-cols-1 text-center text-white font-medium">
        <Link
          to="/ventas"
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
          to="/alquiler"
          className="border flex flex-col py-14 justify-center align-middle lg:p-20 lg:w-full shadow-1 hover:shadow-2xl rounded-lg bg-primary"
        >
          <div className="px-2">
            <h1>Alquileres de Inmuebles</h1>
          </div>
          <div>
            <label className="font-thin">
              presiona para ver todas los alquileres
            </label>
          </div>
        </Link>
        <button
          type="button"
          onClick={SelectLink}
          className="border flex flex-col py-14 justify-center
          align-middle lg:p-20 lg:w-full shadow-1 hover:shadow-2xl rounded-lg
          bg-primary text-center items-center"
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
      </div>
    </section>
  );
};

export default Banner;
