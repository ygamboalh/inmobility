import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import * as Yup from "yup";
import { message } from "antd";
import { useFormik } from "formik";
import axios from "axios";

import { API, BEARER } from "../../constant";
import { getToken } from "../../utils/helpers";
import MySpinner from "../Spinner/spinner";
import { Electrica, Locales, Parqueo, Provincia } from "../../BD/bd";
import { QueriesByFilters } from "../../utils/QueriesByFilters";

const AlquileraLocalesComerciales = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { handleChange, handleSubmit, values, errors, touched } = useFormik({
    initialValues: {
      provincia: "",
      canton: "",
    },
    onSubmit: (values) => {
      setIsLoading(true);
      const urlPortion = makeQueries(values);
      let urlFinal = "";
      urlPortion.map((value) => {
        urlFinal += value.name;
      });
      if (urlFinal.length !== 0) {
        const urlQuery = urlFinal.replace(/ /g, "%20");
        const url = `${API}properties?filters[categories][id][$eq]=5${urlQuery}`;

        const busqueda = axios
          .get(url, {
            headers: {
              Authorization: `Bearer ${BEARER} ${getToken()}`,
            },
          })
          .then((response) => {
            const data = response.data.data;

            if (data.length !== 0) {
              navigate("/home/search/search-results", { state: { data } });
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
      canton: Yup.string().min(3, "*").max(150, "*"),
      distrito: Yup.string().min(3, "*").max(150, "*"),
      precio: Yup.number().min(0, "*").max(2000000, "*"),
      areaTerreno: Yup.number().min(0, "*").max(500000, "*"),
      areaContruccion: Yup.string().min(0, "*").max(10000, "*"),
      areaMesanini: Yup.number().min(0, "*").max(6000, "*"),
      areaSotano: Yup.number().min(0, "*").max(6000, "*"),
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
    <div className="flex flex-col justify-center items-center h-fit">
      <div className="inset-y-0 mb-4 left-0 flex h-fit justify-center align-middle items-center pl-3"></div>
      <div className="flex mt-3 justify-center align-middle items-center w-full">
        <label className="font-semibold text-xl text-center">
          Búsqueda: Venta de locales comerciales
        </label>
      </div>
      <form onSubmit={handleSubmit} autoComplete="off">
        <div className="flex flex-wrap justify-center m-3">
          <select
            name="provincia"
            value={values.provincia}
            onChange={handleChange}
            className="input-admin-property  m-2 w-80 sm:w-1/3 md:w-1/4 lg:w-1/6 p-2"
          >
            <option value="" label="">
              {"Provincia"}
            </option>
            {Provincia.map((item) => (
              <option value={item.value} label={item.label}>
                {item.value}
              </option>
            ))}
          </select>

          <input
            type="text"
            value={values.canton}
            onChange={handleChange}
            name="canton"
            placeholder="Canton"
            className="input-admin-property  m-2 w-80 sm:w-1/3 md:w-1/4 lg:w-1/6 p-2"
          />
          <div className="space -mt-4">
            {errors.canton && touched.canton ? (
              <div className="errordiv text-xs">{errors.canton}</div>
            ) : null}
          </div>
          <input
            type="text"
            value={values.distrito}
            onChange={handleChange}
            name="distrito"
            placeholder="Distrito"
            className="input-admin-property  m-2 w-80 sm:w-1/3 md:w-1/4 lg:w-1/6 p-2"
          />
          <div className="space -mt-4">
            {errors.distrito && touched.distrito ? (
              <div className="errordiv text-xs">{errors.distrito}</div>
            ) : null}
          </div>
          <input
            type="number"
            value={values.precio}
            onChange={handleChange}
            name="precio"
            placeholder="Precio"
            className="input-admin-property  m-2 w-80 sm:w-1/3 md:w-1/4 lg:w-1/6 p-2"
          />
          <div className="space -mt-4">
            {errors.precio && touched.precio ? (
              <div className="errordiv text-xs">{errors.precio}</div>
            ) : null}
          </div>
          <input
            type="number"
            value={values.areaTerreno}
            onChange={handleChange}
            name="areaTerreno"
            placeholder="Área del terreno"
            className="input-admin-property  m-2 w-80 sm:w-1/3 md:w-1/4 lg:w-1/6 p-2"
          />
          <div className="space -mt-4">
            {errors.areaTerreno && touched.areaTerreno ? (
              <div className="errordiv text-xs">{errors.areaTerreno}</div>
            ) : null}
          </div>
          <input
            type="number"
            value={values.areaContruccion}
            onChange={handleChange}
            name="areaContruccion"
            placeholder="Área de la construcción"
            className="input-admin-property  m-2 w-80 sm:w-1/3 md:w-1/4 lg:w-1/6 p-2"
          />
          <div className="space -mt-4">
            {errors.areaContruccion && touched.areaContruccion ? (
              <div className="errordiv text-xs">{errors.areaContruccion}</div>
            ) : null}
          </div>
          <select
            name="tipoLocal"
            value={values.tipoPropiedad}
            onChange={handleChange}
            className="input-admin-property  m-2 w-80 sm:w-1/3 md:w-1/4 lg:w-1/6 p-2"
          >
            <option value="" label="">
              {"Tipo de inmueble ( Locales Comerciales )"}
            </option>
            {Locales.map((item) => (
              <option value={item.value} label={item.label}>
                {item.value}
              </option>
            ))}
          </select>

          <select
            name="parqueo"
            value={values.parqueo}
            onChange={handleChange}
            id="parqueo"
            className="input-admin-property  m-2 w-80 sm:w-1/3 md:w-1/4 lg:w-1/6 p-2"
          >
            <option value="" label="">
              {"Parqueo"}
            </option>
            {Parqueo.map((item) => (
              <option value={item.value} label={item.label}>
                {item.value}
              </option>
            ))}
          </select>

          <input
            type="number"
            value={values.cuotaMantenimiento}
            onChange={handleChange}
            name="cuotaMantenimiento"
            placeholder="Cuota mantenimiento"
            className="input-admin-property  m-2 w-80 sm:w-1/3 md:w-1/4 lg:w-1/6 p-2"
          />
          <div className="space -mt-4">
            {errors.cuotaMantenimiento && touched.cuotaMantenimiento ? (
              <div className="errordiv text-xs">
                {errors.cuotaMantenimiento}
              </div>
            ) : null}
          </div>
          <select
            name="concepcionElectrica"
            value={values.concepcionElectrica}
            onChange={handleChange}
            id="concepcionElectrica"
            placeholder="Concepción eléctrica"
            className="input-admin-property  m-2 w-80 sm:w-1/3 md:w-1/4 lg:w-1/6 p-2"
          >
            <option value="" label="">
              {"Concepción eléctrica"}
            </option>
            {Electrica.map((item) => (
              <option value={item.value} label={item.label}>
                {item.value}
              </option>
            ))}
          </select>
          <input
            type="number"
            value={values.areaMesanini}
            onChange={handleChange}
            name="areaMesanini"
            placeholder="Área mezanine"
            className="input-admin-property  m-2 w-80 sm:w-1/3 md:w-1/4 lg:w-1/6 p-2"
          />
          <div className="space -mt-4">
            {errors.areaMesanini && touched.areaMesanini ? (
              <div className="errordiv text-xs">{errors.areaMesanini}</div>
            ) : null}
          </div>
          <input
            type="number"
            value={values.areaSotano}
            onChange={handleChange}
            name="areaSotano"
            placeholder="Área sótano"
            className="input-admin-property  m-2 w-80 sm:w-1/3 md:w-1/4 lg:w-1/6 p-2"
          />
          <div className="space -mt-4">
            {errors.areaSotano && touched.areaSotano ? (
              <div className="errordiv text-xs">{errors.areaSotano}</div>
            ) : null}
          </div>
        </div>
        <div className="flex m-4 content-center items-center justify-center ">
          <div className="flex flex-col w-fit sm:flex-col lg:flex-row content-center items-center justify-center">
            <div className="m-1 flex justify-center items-center content-center self-start">
              <label class="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  value={values.ley7600}
                  onChange={handleChange}
                  id="ley7600"
                  name="ley7600"
                  class="sr-only peer"
                />
                <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                <span class="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                  Ley 7600
                </span>
              </label>
            </div>
          </div>
        </div>

        <hr></hr>
        <div className="inset-y-0 mt-3 left-0 flex justify-center align-middle items-center pl-3">
          <div className="">
            <button
              type="submit"
              className="mr-2 mb-3 py-2 px-4 rounded bg-blue-700 text-white"
            >
              Realizar búsqueda
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AlquileraLocalesComerciales;