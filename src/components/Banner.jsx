import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import MySpinner from "./Spinner/spinner";

import MetaData from "./Metadata/metadata";
import { authUserData } from "../api/usersApi";
import { useQuery } from "react-query";
import { useFormik } from "formik";
import { API, BEARER } from "../constant";
import axios from "axios";
import { getToken } from "../utils/helpers";
import { message } from "antd";
import * as Yup from "yup";
import { QueriesByFilters } from "../utils/QueriesByFilters";

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

  const { handleChange, handleSubmit, values, errors, touched } = useFormik({
    initialValues: {},
    onSubmit: (values) => {
      setIsLoading(true);
      const urlPortion = makeQueries(values);
      let urlFinal = "";
      urlPortion.map((value) => {
        urlFinal += value.name;
      });
      if (urlFinal.length !== 0) {
        const urlQuery = urlFinal.replace(/ /g, "%20");
        const url = `${API}properties?filters[uniqueId][$eq]=${urlQuery}`;
        const busqueda = axios
          .get(url, {
            headers: {
              Authorization: `Bearer ${BEARER} ${getToken()}`,
            },
          })
          .then((response) => {
            const propertyList = response.data.data;
            if (propertyList.length !== 0) {
              navigate("/home/search/search-results", {
                state: {
                  propertyList,
                  categories: "Alquiler de Bodegas o Similares",
                },
              });
            } else {
              message.info("No se encontraron resultados");
              return;
            }
          })
          .finally(() => {
            setIsLoading(false);
          });
      } else {
        message.error(`Debe introducir al menos un criterio de búsqueda`);
        setIsLoading(false);
        return;
      }
    },
    validationSchema: Yup.object({
      uniqueId: Yup.string().min(3, "*").max(150, "*"),
    }),
  });
  const makeQueries = (values) => {
    const valuesFiltered = QueriesByFilters(values);
    return valuesFiltered;
  };

  if (isLoading) {
    return <MySpinner />;
  }

  return (
    <section className="h-full max-h-[670px] my-4">
      <MetaData title="Opciones" description="Opciones" />
      <form onSubmit={handleSubmit} autoComplete="off">
        <div className="flex -mt-2 justify-center">
          <input
            type="text"
            value={values.uniqueId}
            onChange={handleChange}
            name="uniqueId"
            placeholder="Buscar por código de inmueble"
            className="input-admin-property border-1 placeholder:text-center text-center placeholder:text-gray-300  text-white bg-blue-700 justify-center  m-2 w-[323px] p-2"
          />
          <div className="space -mt-4">
            {errors.uniqueId && touched.uniqueId ? (
              <div className="errordiv text-xs">{errors.uniqueId}</div>
            ) : null}
          </div>
        </div>
        <div className="inset-y-0 mt-1 -mb-2 left-0 flex justify-center align-middle items-center pl-3">
          <div className="">
            <button
              type="submit"
              className="mr-2 mb-0 py-2 px-4 rounded bg-green-500 text-white"
            >
              Realizar búsqueda
            </button>
          </div>
        </div>
      </form>
      <div className="grid grid-cols-3 p-5 gap-4 lg:py-12  max-[1000px]:grid-cols-1 max-md:grid-cols-1 text-center text-white font-medium">
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
