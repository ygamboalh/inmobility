import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import * as Yup from "yup";
import { message } from "antd";
import { useFormik } from "formik";
import axios from "axios";

import { API, BEARER } from "../../constant";
import { getToken } from "../../utils/helpers";
import MySpinner from "../Spinner/spinner";
import {
  Electrica,
  Locales,
  Parqueo,
  Provincia,
  Servicios,
  TipoPiso,
  UbicacionCatastral,
  UbicacionDemografica,
  UbicacionGeografica,
  UsoSuelo,
} from "../../BD/bd";
import { QueriesByFilters } from "../../utils/QueriesByFilters";
import MetaData from "../Metadata/metadata";

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
            const propertyList = response.data.data;

            if (propertyList.length !== 0) {
              navigate("/home/search/search-results", {
                state: {
                  propertyList,
                  categories: "Venta de Locales Comerciales",
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
      canton: Yup.string().min(3, "*").max(150, "*"),
      uniqueId: Yup.string().min(3, "*").max(150, "*"),
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
      <MetaData title="Buscar" description="Buscar" />
      <div className="inset-y-0 mb-4 left-0 flex h-fit justify-center align-middle items-center pl-3"></div>
      <div className="flex mt-3 justify-center align-middle items-center w-full">
        <div className="font-semibold max-[450px]:text-xs text-xl text-center flex flex-col">
          <span>Búsqueda por características específicas</span>
          <span>Venta de locales comerciales</span>
        </div>
      </div>
      <form onSubmit={handleSubmit} autoComplete="off">
        <div className="flex flex-wrap justify-center m-3">
          <input
            type="text"
            value={values.uniqueId}
            onChange={handleChange}
            name="uniqueId"
            placeholder="Identificador único"
            className="input-admin-property text-gray-500 m-2 w-80 sm:w-1/3 md:w-1/4 lg:w-1/6 p-2"
          />
          <div className="space -mt-4">
            {errors.uniqueId && touched.uniqueId ? (
              <div className="errordiv text-xs">{errors.uniqueId}</div>
            ) : null}
          </div>
          <select
            name="provincia"
            value={values.provincia}
            onChange={handleChange}
            className="input-admin-property text-gray-500 m-2 w-80 sm:w-1/3 md:w-1/4 lg:w-1/6 p-2"
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
            placeholder="Cantón"
            className="input-admin-property text-gray-500 m-2 w-80 sm:w-1/3 md:w-1/4 lg:w-1/6 p-2"
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
            className="input-admin-property text-gray-500 m-2 w-80 sm:w-1/3 md:w-1/4 lg:w-1/6 p-2"
          />
          <div className="space -mt-4">
            {errors.distrito && touched.distrito ? (
              <div className="errordiv text-xs">{errors.distrito}</div>
            ) : null}
          </div>
          <select
            name="ubicacionCastral"
            value={values.ubicacionCastral}
            onChange={handleChange}
            id="ubicacionCastral"
            placeholder="Ubicación castral"
            className="input-admin-property text-gray-500 m-2 w-80 sm:w-1/3 md:w-1/4 lg:w-1/6 p-2"
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
            className="input-admin-property text-gray-500 m-2 w-80 sm:w-1/3 md:w-1/4 lg:w-1/6 p-2"
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
            className="input-admin-property text-gray-500 m-2 w-80 sm:w-1/3 md:w-1/4 lg:w-1/6 p-2"
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
            className="input-admin-property text-gray-500 m-2 w-80 sm:w-1/3 md:w-1/4 lg:w-1/6 p-2"
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
          <select
            name="vistaPanoramica"
            id="vistaPanoramica"
            onChange={handleChange}
            placeholder="Vista Panorámica"
            className="input-admin-property text-gray-500 m-2 w-80 sm:w-1/3 md:w-1/4 lg:w-1/6 p-2"
          >
            <option value="" label="">
              {"¿Tiene vista panorámica?"}
            </option>
            <option value={true} label="Si">
              Si
            </option>
            <option value={false} label="No">
              No
            </option>
          </select>
          <div class="flex flex-row w-fit input-admin-property mx-2 py-2">
            <select
              id="dropdown-button"
              name="moneda"
              onChange={handleChange}
              class="flex-shrink-0 inline-flex text-gray-500 items-center pl-2 text-sm h-[42px] w-18 font-medium text-center bg-gray-100 border rounded-l-md hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-300 "
            >
              <option value="">$</option>
              <option value="$">USD</option>
              <option value="₡">CRC</option>
            </select>
            <div class="relative w-full">
              <input
                type="number"
                min={0}
                onChange={handleChange}
                name="precio"
                placeholder="Precio de venta"
                id="search-dropdown"
                className="block text-gray-500 max-[650px]:w-[241px] p-2.5 w-[145px] bg-transparent z-20 text-sm rounded-r-md border-l-transparent border focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          <div class="flex flex-row w-fit input-admin-property mx-2 py-2">
            <select
              name="monedaAlquiler"
              onChange={handleChange}
              class="flex-shrink-0 inline-flex items-center pl-2 text-sm h-[42px] w-18 font-medium text-center text-gray-500 bg-gray-100 border rounded-l-md hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-300 "
            >
              <option value="">$</option>
              <option value="$">USD</option>
              <option value="₡">CRC</option>
            </select>
            <div class="relative w-full">
              <input
                type="number"
                min={0}
                onChange={handleChange}
                name="precioAlquiler"
                placeholder="Precio de alquiler"
                className="block text-gray-500 max-[650px]:w-[241px] p-2.5 w-[145px] bg-transparent z-20 text-sm rounded-r-md border-l-transparent border focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          <div class="flex flex-row w-fit input-admin-property mx-2 py-2">
            <select
              name="monedaAlquilerVenta"
              onChange={handleChange}
              class="flex-shrink-0 inline-flex items-center pl-2 text-sm h-[42px] w-18 font-medium text-center text-gray-500 bg-gray-100 border rounded-l-md hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-300 "
            >
              <option value="">$</option>
              <option value="$">USD</option>
              <option value="₡">CRC</option>
            </select>
            <div class="relative w-full">
              <input
                type="number"
                onChange={handleChange}
                min={0}
                name="precioAlquilerCompra"
                placeholder="Precio de alquiler compra"
                className="block text-gray-500 max-[650px]:w-[241px] p-2.5 w-[145px] bg-transparent z-20 text-sm rounded-r-md border-l-transparent border focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          <select
            name="tieneCuotaMantenimiento"
            onChange={handleChange}
            placeholder="Tiene cuota mantenimiento"
            className="input-admin-property text-gray-500 m-2 w-80 sm:w-1/3 md:w-1/4 lg:w-1/6 p-2"
          >
            <option value="" label="">
              {"¿Tiene cuota de mantenimiento?"}
            </option>
            <option value={true} label="Si">
              Si
            </option>
            <option value={false} label="No">
              No
            </option>
          </select>

          <div class="flex flex-row w-fit input-admin-property py-2">
            <select
              name="monedaCuotaMantenimiento"
              onChange={handleChange}
              class="flex-shrink-0 inline-flex items-center pl-2 text-sm h-[42px] w-18 font-medium text-center text-gray-500 bg-gray-100 border rounded-l-md hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-300 "
            >
              <option value="">$</option>
              <option value="$">USD</option>
              <option value="₡">CRC</option>
            </select>
            <div class="relative w-full">
              <input
                type="number"
                onChange={handleChange}
                min={0}
                name="cuotaMantenimiento"
                placeholder="Cuota mantenimiento"
                className="block text-gray-500 max-[650px]:w-[241px] p-2.5 w-[183px] bg-transparent z-20 text-sm rounded-r-md border-l-transparent border focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          <select
            onChange={handleChange}
            name="servicios"
            className="input-admin-property text-gray-500 m-2 w-80 sm:w-1/3 md:w-1/4 lg:w-1/6 p-2"
          >
            <option value="" label="">
              {"Servicios"}
            </option>
            {Servicios.map((item) => (
              <option value={item.value} label={item.label}>
                {item.value}
              </option>
            ))}
          </select>
          <input
            type="number"
            value={values.areaTerreno}
            onChange={handleChange}
            name="areaTerreno"
            placeholder="Área del terreno"
            className="input-admin-property text-gray-500 m-2 w-80 sm:w-1/3 md:w-1/4 lg:w-1/6 p-2"
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
            className="input-admin-property text-gray-500 m-2 w-80 sm:w-1/3 md:w-1/4 lg:w-1/6 p-2"
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
            className="input-admin-property text-gray-500 m-2 w-80 sm:w-1/3 md:w-1/4 lg:w-1/6 p-2"
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
            className="input-admin-property text-gray-500 m-2 w-80 sm:w-1/3 md:w-1/4 lg:w-1/6 p-2"
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

          <select
            name="concepcionElectrica"
            value={values.concepcionElectrica}
            onChange={handleChange}
            id="concepcionElectrica"
            placeholder="Conexión eléctrica"
            className="input-admin-property text-gray-500 m-2 w-80 sm:w-1/3 md:w-1/4 lg:w-1/6 p-2"
          >
            <option value="" label="">
              {"Conexión eléctrica"}
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
            className="input-admin-property text-gray-500 m-2 w-80 sm:w-1/3 md:w-1/4 lg:w-1/6 p-2"
          />
          <div className="space -mt-4">
            {errors.areaMesanini && touched.areaMesanini ? (
              <div className="errordiv text-xs">{errors.areaMesanini}</div>
            ) : null}
          </div>
          <input
            type="number"
            onChange={handleChange}
            value={values.areaPropiedad}
            name="areaPropiedad"
            placeholder="Área de la propiedad"
            className="input-admin-property text-gray-500 m-2 w-80 sm:w-1/3 md:w-1/4 lg:w-1/6 p-2"
          />
          <div className="space -mt-4">
            {errors.areaPropiedad && touched.areaPropiedad ? (
              <div className="errordiv text-xs">{errors.areaPropiedad}</div>
            ) : null}
          </div>
          <input
            type="number"
            value={values.areaSotano}
            onChange={handleChange}
            name="areaSotano"
            placeholder="Área sótano"
            className="input-admin-property text-gray-500 m-2 w-80 sm:w-1/3 md:w-1/4 lg:w-1/6 p-2"
          />
          <div className="space -mt-4">
            {errors.areaSotano && touched.areaSotano ? (
              <div className="errordiv text-xs">{errors.areaSotano}</div>
            ) : null}
          </div>
          <select
            name="tipoPiso"
            onChange={handleChange}
            placeholder="Tipo de piso"
            className="input-admin-property text-gray-500 m-2 w-80 sm:w-1/3 md:w-1/4 lg:w-1/6 p-2"
          >
            <option value="" label="">
              {"Tipo de piso"}
            </option>
            {TipoPiso.map((item) => (
              <option value={item.value} label={item.label}>
                {item.value}
              </option>
            ))}
          </select>
        </div>
        <div className="flex m-4 content-center items-center justify-center ">
          <div className="flex flex-col w-fit sm:flex-col lg:flex-row content-center items-center justify-center">
            <div className="m-1 flex justify-center items-center content-center self-start">
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  value={values.ley7600}
                  onChange={handleChange}
                  id="ley7600"
                  name="ley7600"
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                <span className="ml-3 text-sm font-medium text-gray-500 dark:text-gray-300">
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
