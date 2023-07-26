import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";

import { message } from "antd";
import { useFormik } from "formik";
import axios from "axios";

import {
  Electrica,
  UbicacionCatastral,
  UbicacionDemografica,
  UbicacionGeografica,
  Edificio,
  Parqueo,
  UsoSuelo,
  Provincia,
} from "../../BD/bd";
import { API, BEARER } from "../../constant";
import { getToken } from "../../utils/helpers";
import MySpinner from "../Spinner/spinner";
import { QueriesByFilters } from "../../utils/QueriesByFilters";

const AlquilerEdificios = () => {
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
        const url = `${API}properties?filters[categories][id][$eq]=8${urlQuery}`;

        const busqueda = axios
          .get(url, {
            headers: {
              Authorization: `Bearer ${BEARER} ${getToken()}`,
            },
          })
          .then((response) => {
            const data = response.data.data;
            if (data.length !== 0) {
              navigate("/home/search/search-results", {
                state: { data, categories: "Alquiler de Edificios" },
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
      canton: Yup.string().min(3, "*").max(150, "*"),
      uniqueId: Yup.string().min(3, "*").max(150, "*"),
      distrito: Yup.string().min(3, "*").max(150, "*"),
      precio: Yup.number().min(0, "*").max(2000000, "*"),
      areaTerreno: Yup.number().min(0, "*").max(500000, "*"),
      areaPropiedad: Yup.string().min(0, "*").max(10000, "*"),
      areaContruccion: Yup.number().min(0, "*").max(100000, "*"),
      cuotaMantenimiento: Yup.number().min(0, "*").max(200000, "*"),
      areaPlantas: Yup.number().min(0, "*").max(100000, "*"),
      numeroPlantas: Yup.number().min(0, "*").max(100, "*"),
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
          Búsqueda: Alquiler de edificios
        </label>
      </div>

      <form onSubmit={handleSubmit} autoComplete="off">
        <div className="flex flex-wrap justify-center m-3">
          <input
            type="text"
            value={values.uniqueId}
            onChange={handleChange}
            name="uniqueId"
            placeholder="Identificador único"
            className="input-admin-property  m-2 w-80 sm:w-1/3 md:w-1/4 lg:w-1/6 p-2"
          />
          <div className="space -mt-4">
            {errors.uniqueId && touched.uniqueId ? (
              <div className="errordiv text-xs">{errors.uniqueId}</div>
            ) : null}
          </div>
          <select
            value={values.provincia}
            onChange={handleChange}
            name="provincia"
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
            value={values.areaPropiedad}
            onChange={handleChange}
            name="areaPropiedad"
            placeholder="Área de la propiedad"
            className="input-admin-property  m-2 w-80 sm:w-1/3 md:w-1/4 lg:w-1/6 p-2"
          />
          <div className="space -mt-4">
            {errors.areaPropiedad && touched.areaPropiedad ? (
              <div className="errordiv text-xs">{errors.areaPropiedad}</div>
            ) : null}
          </div>
          <select
            name="tipoEdificio"
            value={values.tipoPropiedad}
            onChange={handleChange}
            className="input-admin-property  m-2 w-80 sm:w-1/3 md:w-1/4 lg:w-1/6 p-2"
          >
            <option value="" label="">
              {"Tipo de inmueble ( Edificio )"}
            </option>
            {Edificio.map((item) => (
              <option value={item.value} label={item.label}>
                {item.value}
              </option>
            ))}
          </select>

          <input
            type="number"
            value={values.areaContruccion}
            onChange={handleChange}
            name="areaContruccion"
            placeholder="Área construcción"
            className="input-admin-property  m-2 w-80 sm:w-1/3 md:w-1/4 lg:w-1/6 p-2"
          />
          <div className="space -mt-4">
            {errors.areaContruccion && touched.areaContruccion ? (
              <div className="errordiv text-xs">{errors.areaContruccion}</div>
            ) : null}
          </div>
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
            value={values.areaPlantas}
            onChange={handleChange}
            name="areaPlantas"
            placeholder="Área por plantas"
            className="input-admin-property  m-2 w-80 sm:w-1/3 md:w-1/4 lg:w-1/6 p-2"
          />
          <div className="space -mt-4">
            {errors.areaPlantas && touched.areaPlantas ? (
              <div className="errordiv text-xs">{errors.areaPlantas}</div>
            ) : null}
          </div>
          <input
            type="number"
            value={values.numeroPlantas}
            onChange={handleChange}
            name="numeroPlantas"
            placeholder="Número de plantas"
            className="input-admin-property  m-2 w-80 sm:w-1/3 md:w-1/4 lg:w-1/6 p-2"
          />
          <div className="space -mt-4">
            {errors.numeroPlantas && touched.numeroPlantas ? (
              <div className="errordiv text-xs">{errors.numeroPlantas}</div>
            ) : null}
          </div>
          <select
            name="ubicacionCastral"
            value={values.ubicacionCastral}
            onChange={handleChange}
            id="ubicacionCastral"
            placeholder="Ubicación castral"
            className="input-admin-property  m-2 w-80 sm:w-1/3 md:w-1/4 lg:w-1/6 p-2"
          >
            <option value="" label="">
              {"Ubicación catastral"}
            </option>
            {UbicacionCatastral.map((item) => (
              <option value={item.value} label={item.label}>
                {item.value}
              </option>
            ))}
          </select>

          <select
            name="ubicacionDemografica"
            value={values.ubicacionDemografica}
            onChange={handleChange}
            id="ubicacionDemografica"
            placeholder="Ubicación demográfica"
            className="input-admin-property  m-2 w-80 sm:w-1/3 md:w-1/4 lg:w-1/6 p-2"
          >
            <option value="" label="">
              {"Ubicación demográfica"}
            </option>
            {UbicacionDemografica.map((item) => (
              <option value={item.value} label={item.label}>
                {item.value}
              </option>
            ))}
          </select>
          <select
            name="ubicacionGeografica"
            value={values.ubicacionGeografica}
            onChange={handleChange}
            id="ubicacionGeografica"
            placeholder="Ubicación geográfica"
            className="input-admin-property  m-2 w-80 sm:w-1/3 md:w-1/4 lg:w-1/6 p-2"
          >
            <option value="" label="">
              {"Ubicación geográfica"}
            </option>
            {UbicacionGeografica.map((item) => (
              <option value={item.value} label={item.label}>
                {item.value}
              </option>
            ))}
          </select>
          <select
            name="usoDeSuelo"
            value={values.usoDeSuelo}
            onChange={handleChange}
            className="input-admin-property  m-2 w-80 sm:w-1/3 md:w-1/4 lg:w-1/6 p-2"
          >
            <option value="" label="">
              {"Uso del suelo"}
            </option>
            {UsoSuelo.map((item) => (
              <option value={item.value} label={item.label}>
                {item.value}
              </option>
            ))}
          </select>
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

export default AlquilerEdificios;
