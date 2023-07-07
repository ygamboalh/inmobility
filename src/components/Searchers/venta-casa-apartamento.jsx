import React, { useEffect, useState } from "react";
import {
  useLocation,
  useNavigate,
  useParams,
  useResolvedPath,
  useSearchParams,
} from "react-router-dom";
import * as Yup from "yup";

import { Spin, message } from "antd";
import { useFormik } from "formik";

import {
  Amenidades,
  DetallesExternos,
  DetallesInternos,
  PatioJardin,
  TipoInmueble,
  Cochera,
  Provincia,
} from "../../BD/bd";
import Select from "react-select";

import axios from "axios";

import { useQuery } from "react-query";

import { API, BEARER } from "../../constant";
import { getToken } from "../../utils/helpers";
import MySpinner from "../Spinner/spinner";
import { authUserData } from "../../api/usersApi";
import { QueriesByFilters } from "../../utils/QueriesByFilters";
import { useIsSearched } from "../../store/Globals";
import { GetAllProperties } from "../../api/GetProperties";
import SearchResultsActive from "../SearchResults/search-results-active";
import SearchResults from "../SearchResults/search-results";
import PropertyDetailsSearch from "../PropertyDetails/property-search-detail";

const VentaCasaApartamento = () => {
  const navigate = useNavigate();

  const [selectedOption, setSelectedOption] = useState("");
  const [property, setProperty] = useState();

  const [categoriesDB, setCategoriesDB] = useState({});
  const [amenidades, setAmenidades] = useState({});
  const [patio, setPatio] = useState({});
  const [detallesInternos, setDetallesInternos] = useState({});
  const [detallesExternos, setDetallesExternos] = useState({});
  //----------------------------------------------------------------
  const { isSearched, setIsSearched } = useIsSearched();
  const [params, setParams] = useSearchParams();
  //console.log("los parametros", params.toString());
  const { search } = useLocation();
  //console.log("la busqueda", search);
  const { pathname } = useResolvedPath();
  //console.log("la ruta", pathname);
  const { data, isLoadings, isError, isSuccess, error } = useQuery({
    queryKey: ["properties", search],
    queryFn: () => GetAllProperties({ search }),
  });
  const [searchResult, setSearchResult] = useState({});
  //----------------------------------------------------------------
  const [userRole, setUserRole] = useState();

  const [selectedPropertyType, setSelectedPropertyType] = useState("");
  const { data: userData } = useQuery("profile", authUserData);
  const userId = userData?.id;
  const response = axios(`${API}/users/me?populate=role`, {
    method: "GET",
    headers: { Authorization: `${BEARER} ${getToken()}` },
  }).then((response) => {
    setUserRole(response.data.role.name);
  });
  //quitar esta funcion despues de revisar
  const fetchData = async (searchParams, event) => {
    event.preventDefault();
    const {
      provincia,
      canton,
      distriro,
      tipoPropiedad,
      areaPropiedad,
      cochera,
      areaContruccion,
      habitaciones,
      banos,
    } = searchParams;

    const url = `${API}properties?filters[provincia][$eq]=San%20José`;

    const response = await axios(url, {
      method: "GET",
      headers: { Authorization: `${BEARER} ${getToken()}` },
    })
      .then((resp) => {
        console.log(resp);
      })
      .catch((err) => {
        console.log(err);
      });

    return response;
  };

  const handleHouseProperty = (event) => {
    const option = event.target.value;
    setSelectedPropertyType(option);
  };

  const handleChangeAmenidades = (selectedOption) => {
    setAmenidades(selectedOption);
    console.log(selectedOption);
  };
  const handleChangePatioJardin = (selectedOption) => {
    setPatio(selectedOption);
    console.log(selectedOption);
  };
  const handleChangeDetallesInternos = (selectedOption) => {
    setDetallesInternos(selectedOption);
    console.log(selectedOption);
  };
  const handleChangeDetallesExternos = (selectedOption) => {
    setDetallesExternos(selectedOption);
    console.log(selectedOption);
  };

  const [initialData, setinitialData] = useState({});

  useEffect(() => {
    fetch(`${API}categories`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        const categories = [];
        data?.data?.map((category) => {
          const { nombre } = category.attributes;
          categories.push({ id: category.id, nombre: nombre });
        });
        setCategoriesDB(categories);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  const [isLoading, setIsLoading] = useState(false);
  /*   const onFinish = async (values) => {
    setIsLoading(true);

    try {
      const catFounded = [];
      const cat = categoriesDB?.find((c) => c.nombre === selectedOption);
      if (cat) {
        catFounded.push(cat.id);
      }

      const value = {
        provincia: values.provincia,
        canton: values.canton,
        distrito: values.distrito,
        precio: values.precio,
        tipoPropiedad: selectedPropertyType,
        amenidades: amenidades,
        areaPropiedad: values.areaPropiedad,
        areaContruccion: values.areaContruccion,
        habitaciones: values.habitaciones,
        cochera: values.cochera,
        banos: values.banos,
        ley7600: values.ley7600,
        detallesInternos: detallesInternos,
        detallesExternos: detallesExternos,
        serviciosMedicos: values.serviciosMedicos,
        anunciante: values.anunciante,
        categories: catFounded,
        creadoPor: userId,
      };
    } catch (error) {
      message.error("¡Ocurrió un error inesperado!");
    } finally {
      setIsLoading(false);
    }
  }; */
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
      const urlQuery = urlFinal.replace(/ /g, "%20");
      const url = `${API}properties?filters[categories][id][$eq]=1${urlQuery}`;
      console.log("url: ", url);
      const busqueda = axios
        .get(url, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${BEARER} ${getToken()}`,
          },
        })
        .then((response) => {
          const data = response.data.data;
          setIsLoading(false);
          console.log("resultado de la busqueda", data);
          //Recorrer las propiedades y ver cuales coinciden con los criterior de busqueda de amenidades, patio, detalles internos y externos
          /* let amenidad = [];
          let patioJ = [];
          let detallesInt = [];
          let detallesExt = [];
          let listaFinalPropiedades = [];
          if (amenidades.length > 0) {
            amenidad = amenidades?.map((a) => a.value);
          }
          if (patio.length > 0) {
            patioJ = patio?.map((p) => p.value);
          }
          if (detallesInternos.length > 0) {
            detallesInt = detallesInternos?.map((d) => d.value);
          }
          if (detallesExternos.length > 0) {
            detallesExt = detallesExternos?.map((d) => d.value);
          }
          let amenidadeBD = [];
          const coincidencias = data.map((d) => {
            d.attributes.amenidades.filter((elemento1) => {
              amenidades.some((elemento2) => elemento2 === elemento1);
              // console.log("elemento2", amenidades);
            });
            console.log("dddddd", d);
            return d;
          }); */

          //console.log("coindicencia amenidades", coincidencias);
          /*  if (amenidad.length > 0) {
            data.map((prop) => {
              if (prop.attributes.amenidades.value === amenidad.value) {

              }
            });
          } */
          /* const filtros = response.data.data.filter((item) =>
            amenidad.includes(item.value)
          );
          console.log("filtros", filtros);
          setIsLoading(false);
          setSearchResult(response.data.data);
          console.log(response.data.data);
          console.log("resultados de busqueda", response.data.data); */
        });
    },
    validationSchema: Yup.object().shape({
      provincia: Yup.string().min(3, "*").max(150, "*"),
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

    //console.log("valores que quiero", valuesFiltered);
    return valuesFiltered;
  };
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
                <label class="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    onChange={handleChange}
                    value={values.ley7600}
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
              <div className="m-1 justify-center items-center content-center flex self-start">
                <label class="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    id="serviciosMedicos"
                    name="serviciosMedicos"
                    onChange={handleChange}
                    value={values.serviciosMedicos}
                    class="sr-only peer"
                  />
                  <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                  <span class="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                    Servicios médicos
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
              placeholder={"Amenidades"}
              isMulti
              onChange={handleChangeAmenidades}
              value={values.amenidades}
            />

            <Select
              className="categories mb-2 lg:mx-80"
              name="jardinPatio"
              options={PatioJardin}
              placeholder={"Patio"}
              isMulti
              onChange={handleChangePatioJardin}
              value={values.jardinPatio}
            />

            <Select
              className="categories mb-2 lg:mx-80"
              name="detallesInternos"
              options={DetallesInternos}
              placeholder={"Detalles internos"}
              isMulti
              onChange={handleChangeDetallesInternos}
              value={values.detallesInternos}
            />

            <Select
              className="categories mb-2 lg:mx-80"
              name="detallesExternos"
              options={DetallesExternos}
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
      <div>
        {searchResult ? (
          <PropertyDetailsSearch searchResults={searchResult} />
        ) : (
          <>No hay resultados</>
        )}
      </div>
    </div>
  );
};

export default VentaCasaApartamento;
