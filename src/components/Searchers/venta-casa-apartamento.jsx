import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import * as Yup from "yup";
import { message } from "antd";
import { useFormik } from "formik";
import Select from "react-select";
import axios from "axios";

import {
  Amenidades,
  DetallesExternos,
  DetallesInternos,
  PatioJardin,
  TipoInmueble,
  Cochera,
  Provincia,
} from "../../BD/bd";

import { API, BEARER } from "../../constant";
import { getToken } from "../../utils/helpers";
import MySpinner from "../Spinner/spinner";
import { QueriesByFilters } from "../../utils/QueriesByFilters";

const VentaCasaApartamento = () => {
  const navigate = useNavigate();

  const [amenidades, setAmenidades] = useState(null);
  const [patio, setPatio] = useState(null);
  const [detallesInternos, setDetallesInternos] = useState(null);
  const [detallesExternos, setDetallesExternos] = useState(null);

  const handleChangeAmenidades = (selectedOption) => {
    setAmenidades(selectedOption);
  };
  const handleChangePatioJardin = (selectedOption) => {
    setPatio(selectedOption);
  };
  const handleChangeDetallesInternos = (selectedOption) => {
    setDetallesInternos(selectedOption);
  };
  const handleChangeDetallesExternos = (selectedOption) => {
    setDetallesExternos(selectedOption);
  };

  const [isLoading, setIsLoading] = useState(false);

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
      if (
        urlFinal.length !== 0 ||
        patio?.length > 0 ||
        amenidades?.length > 0 ||
        detallesInternos?.length > 0 ||
        detallesExternos?.length > 0
      ) {
        const urlQuery = urlFinal.replace(/ /g, "%20");
        const url = `${API}properties?filters[categories][id][$eq]=1${urlQuery}`;

        const busqueda = axios
          .get(url, {
            headers: {
              Authorization: `Bearer ${BEARER} ${getToken()}`,
            },
          })
          .then((response) => {
            const data = response.data.data;

            let propertyList = [];

            data.map((property) => {
              //Verfica si cumple al menos con 1 criterio,
              //si pongo que coincidan todos se pierden datos en la busqueda
              if (
                areArraysEqual(property.attributes.jardinPatio, patio) ||
                areArraysEqual(property.attributes.amenidades, amenidades) ||
                areArraysEqual(
                  property.attributes.detallesInternos,
                  detallesInternos
                ) ||
                areArraysEqual(
                  property.attributes.detallesExternos,
                  detallesExternos
                ) ||
                (patio === null &&
                  amenidades === null &&
                  detallesInternos === null &&
                  detallesExternos === null)
              ) {
                propertyList.push(property);
              }
            });

            setIsLoading(false);

            if (propertyList.length !== 0) {
              navigate("/home/search/search-results", {
                state: {
                  propertyList,
                  categories: "Venta de Casas y Apartamentos",
                },
              });
            } else {
              message.info("No se encontraron resultados");
              return;
            }
          });
      } else {
        message.error(`Debe introducir al menos un criterio de búsqueda`);
        setIsLoading(false);
        return;
      }
    },
    validationSchema: Yup.object().shape({
      provincia: Yup.string().min(3, "*").max(150, "*"),
      uniqueId: Yup.string().min(3, "*").max(150, "*"),
      canton: Yup.string().min(3, "*").max(150, "*"),
      distrito: Yup.string().min(3, "*").max(150, "*"),
      precio: Yup.number().min(0, "*").max(2000000, "*"),
      areaTerreno: Yup.number().min(0, "*").max(500000, "*"),
      habitaciones: Yup.number().min(0, "*").max(15, "*"),
      areaPropiedad: Yup.string().min(0, "*").max(10000, "*"),
      areaContruccion: Yup.number().min(0, "*").max(100000, "*"),
      banos: Yup.number().min(0, "*").max(10, "*"),
    }),
  });
  const makeQueries = (values) => {
    //** Recibe los filtros y retorna consultas */
    const valuesFiltered = QueriesByFilters(values);

    return valuesFiltered;
  };
  function areArraysEqual(array1, array2) {
    if (!array1 || !array2 || !array1.length || !array2.length) {
      return false;
    }
    // Verificar si la longitud de los arreglos es la misma
    if (array1?.length !== array2?.length) {
      return false;
    }

    // Crear una copia de los arreglos originales para evitar modificarlos
    const copyArray1 = [...array1];
    const copyArray2 = [...array2];

    // Ordenar las copias de los arreglos basado en la clave 'label'
    copyArray1.sort((a, b) => a.label.localeCompare(b.label));
    copyArray2.sort((a, b) => a.label.localeCompare(b.label));

    // Verificar si los arreglos ordenados son iguales
    for (let i = 0; i < copyArray1.length; i++) {
      if (
        copyArray1[i].label !== copyArray2[i].label ||
        copyArray1[i].value !== copyArray2[i].value
      ) {
        return false;
      }
    }

    return true;
  }
  if (isLoading) {
    return <MySpinner />;
  }

  return (
    <div className="flex flex-col justify-center items-center h-fit">
      <div className="inset-y-0 mb-4 left-0 flex h-fit justify-center align-middle items-center pl-3"></div>
      <div className="flex mt-3 justify-center align-middle items-center w-full">
        <label className="font-semibold text-xl flex text-center">
          Búsqueda: Venta de casas y apartamentos
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
            name="provincia"
            type="select"
            value={values.provincia}
            onChange={handleChange}
            className="input-admin-property m-2 w-80 sm:w-1/3 md:w-1/4 lg:w-1/6
          p-2"
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
            name="canton"
            value={values.canton}
            onChange={handleChange}
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
            name="distrito"
            placeholder="Distrito"
            onChange={handleChange}
            value={values.distrito}
            className="input-admin-property  m-2 w-80 sm:w-1/3 md:w-1/4 lg:w-1/6 p-2"
          />
          <div className="space -mt-4">
            {errors.distrito && touched.distrito ? (
              <div className="errordiv text-xs">{errors.cantodistriton}</div>
            ) : null}
          </div>
          <input
            type="number"
            name="precio"
            placeholder="Precio"
            onChange={handleChange}
            value={values.precio}
            className="input-admin-property  m-2 w-80 sm:w-1/3 md:w-1/4 lg:w-1/6 p-2"
          />
          <div className="space -mt-4">
            {errors.precio && touched.precio ? (
              <div className="errordiv text-xs">{errors.precio}</div>
            ) : null}
          </div>
          <input
            type="number"
            name="areaTerreno"
            onChange={handleChange}
            value={values.areaTerreno}
            placeholder="Área del terreno"
            className="input-admin-property  m-2 w-80 sm:w-1/3 md:w-1/4 lg:w-1/6 p-2"
          />
          <div className="space -mt-4">
            {errors.areaTerreno && touched.areaTerreno ? (
              <div className="errordiv text-xs">{errors.areaTerreno}</div>
            ) : null}
          </div>
          <select
            name="tipoPropiedad"
            placeholder="Tipo de propiedad"
            onChange={handleChange}
            value={values.tipoPropiedad}
            className="input-admin-property  m-2 w-80 sm:w-1/3 md:w-1/4 lg:w-1/6 p-2"
          >
            <option value="" label="">
              {"Tipo de inmueble"}
            </option>
            {TipoInmueble.map((item) => (
              <option value={item.value} label={item.label}>
                {item.value}
              </option>
            ))}
          </select>
          <input
            type="number"
            onChange={handleChange}
            value={values.areaPropiedad}
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
            onChange={handleChange}
            value={values.cochera}
            name="cochera"
            className="input-admin-property  m-2 w-80 sm:w-1/3 md:w-1/4 lg:w-1/6 p-2"
          >
            <option value="" label="">
              {"Cochera"}
            </option>
            {Cochera.map((item) => (
              <option value={item.value} label={item.label}>
                {item.value}
              </option>
            ))}
          </select>

          <input
            type="number"
            onChange={handleChange}
            value={values.areaContruccion}
            name="areaContruccion"
            placeholder="Área construcción"
            className="input-admin-property  m-2 w-80 sm:w-1/3 md:w-1/4 lg:w-1/6 p-2"
          />
          <div className="space -mt-4">
            {errors.areaContruccion && touched.areaContruccion ? (
              <div className="errordiv text-xs">{errors.areaContruccion}</div>
            ) : null}
          </div>
          <input
            type="number"
            onChange={handleChange}
            value={values.habitaciones}
            name="habitaciones"
            placeholder="Habitaciones"
            className="input-admin-property  m-2 w-80 sm:w-1/3 md:w-1/4 lg:w-1/6 p-2"
          />
          <div className="space -mt-4">
            {errors.habitaciones && touched.habitaciones ? (
              <div className="errordiv text-xs">{errors.habitaciones}</div>
            ) : null}
          </div>
          <input
            type="number"
            name="banos"
            onChange={handleChange}
            value={values.banos}
            placeholder="Baños"
            className="input-admin-property  m-2 w-80 sm:w-1/3 md:w-1/4 lg:w-1/6 p-2"
          />
          <div className="space -mt-4">
            {errors.banos && touched.banos ? (
              <div className="errordiv text-xs">{errors.banos}</div>
            ) : null}
          </div>
        </div>
        <div>
          <div className="flex m-4 content-center items-center justify-center ">
            <div className="flex flex-col w-fit sm:flex-col lg:flex-row content-center items-center justify-center">
              <div className="m-1 flex justify-center items-center content-center self-start">
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    onChange={handleChange}
                    value={values.ley7600}
                    id="ley7600"
                    name="ley7600"
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                  <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                    Ley 7600
                  </span>
                </label>
              </div>
            </div>
          </div>
          <div className="">
            <Select
              className="categories mb-2 lg:mx-80"
              name="amenidades"
              options={Amenidades}
              noOptionsMessage={() => null}
              closeMenuOnSelect={false}
              placeholder={"Amenidades"}
              isMulti
              onChange={handleChangeAmenidades}
              value={values.amenidades}
            />

            <Select
              className="categories mb-2 lg:mx-80"
              name="jardinPatio"
              options={PatioJardin}
              noOptionsMessage={() => null}
              closeMenuOnSelect={false}
              placeholder={"Patio"}
              isMulti
              onChange={handleChangePatioJardin}
              value={values.jardinPatio}
            />

            <Select
              className="categories mb-2 lg:mx-80"
              name="detallesInternos"
              options={DetallesInternos}
              noOptionsMessage={() => null}
              closeMenuOnSelect={false}
              placeholder={"Detalles internos"}
              isMulti
              onChange={handleChangeDetallesInternos}
              value={values.detallesInternos}
            />

            <Select
              className="categories mb-2 lg:mx-80"
              name="detallesExternos"
              options={DetallesExternos}
              noOptionsMessage={() => null}
              closeMenuOnSelect={false}
              placeholder={"Detalles externos"}
              isMulti
              onChange={handleChangeDetallesExternos}
              value={values.detallesExternos}
            />
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
        </div>
      </form>
    </div>
  );
};

export default VentaCasaApartamento;
