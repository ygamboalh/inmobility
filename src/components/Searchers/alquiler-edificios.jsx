import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as Yup from "yup";

import { Spin, message } from "antd";
import { Formik, Form, Field } from "formik";

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

import axios from "axios";

import { useQuery } from "react-query";
import { authUserData } from "../../api/usersApi";
import { API, BEARER } from "../../constant";
import { getToken } from "../../utils/helpers";
import AxiosInstance from "../../api/AxiosInstance";
import MySpinner from "../Spinner/spinner";

const AlquilerEdificios = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const InsertPropertySchema = Yup.object().shape({
    canton: Yup.string().min(3, "*").max(150, "*"),
    distrito: Yup.string().min(3, "*").max(150, "*"),
    precio: Yup.number().min(0, "*").max(2000000, "*"),
    areaTerreno: Yup.number().min(0, "*").max(500000, "*"),
    areaPropiedad: Yup.string().min(0, "*").max(10000, "*"),
    areaContruccion: Yup.number().min(0, "*").max(100000, "*"),
    cuotaMantenimiento: Yup.number().min(0, "*").max(15, "*"),
    areaPlantas: Yup.number().min(0, "*").max(100000, "*"),
    numeroPlantas: Yup.number().min(0, "*").max(100, "*"),
    parqueo: Yup.string(),

    usoDeSuelo: Yup.string().required("*"),
    tipoEdificio: Yup.string().required("*"),
    concepcionElectrica: Yup.string().required("*"),
    ubicacionCastral: Yup.string().required("*"),
    ubicacionDemografica: Yup.string().required("*"),
    ubicacionGeografica: Yup.string().required("*"),
  });

  const [selectedOption, setSelectedOption] = useState("");

  const [category, setCategory] = useState({});
  const [categoriesDB, setCategoriesDB] = useState({});
  const [amenidades, setAmenidades] = useState({});
  const [patio, setPatio] = useState({});
  const [detallesInternos, setDetallesInternos] = useState({});
  const [detallesExternos, setDetallesExternos] = useState({});
  const [property, setProperty] = useState();
  const [images, setImages] = useState(null);
  const [createdPropertyId, setCreatedPropertyId] = useState(null);
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

  const handleEdificioProperty = (event) => {
    const option = event.target.value;
    if (option) setSelectedPropertyType(option);
  };

  useEffect(() => {
    const response = AxiosInstance.get(`properties/${id}`).then((property) =>
      setProperty(property?.data?.data?.attributes)
    );
  }, []);

  const [initialData, setinitialData] = useState();

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
  const onFinish = async (values) => {
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
        tipoEdificio: values.tipoEdificio,
        areaPropiedad: values.areaPropiedad,
        areaContruccion: values.areaContruccion,
        usoDeSuelo: values.usoDeSuelo,
        parqueo: values.parqueo,
        cuotaMantenimiento: values.cuotaMantenimiento,
        concepcionElectrica: values.concepcionElectrica,
        areaPlantas: values.areaPlantas,
        numeroPlantas: values.numeroPlantas,
        ubicacionCastral: values.ubicacionCastral,
        ubicacionDemografica: values.ubicacionDemografica,
        ubicacionGeografica: values.ubicacionGeografica,
      };

      if (!id) {
        const response = await AxiosInstance.post("/properties", {
          data: value,
        })
          .then((respons) => {
            message.success("¡La propiedad fue creada correctamente!");
            const propertyId = respons.data.data.id;
            setCreatedPropertyId(propertyId);
            console.log(respons);
            if (userRole === "SuperAdmin") {
              navigate(`/admin/upload/${propertyId}`, { replace: true });
            } else {
              navigate(`/home/upload/${propertyId}`, { replace: true });
            }
          })
          .catch((error) => {
            message.error("¡Ocurrió un error inesperado. Intente de nuevo!");
          });
      } else {
        const response = await AxiosInstance.put(`/properties/${id}`, {
          data: value,
        })
          .then((response) => {
            message.success("¡La propiedad fue actualizada correctamente!");
            if (userRole === "SuperAdmin") {
              navigate(`/admin/upload/${id}`, { replace: true });
            } else {
              navigate(`/home/upload/${id}`, { replace: true });
            }
          })
          .catch((error) => {
            message.error("¡Ocurrió un error inesperado!");
          });
      }
    } catch (error) {
      message.error("¡Ocurrió un error inesperado!");
    } finally {
      setIsLoading(false);
    }
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
      <Formik
        initialValues={initialData}
        validationSchema={InsertPropertySchema}
        onSubmit={onFinish}
      >
        {({ errors, touched }) => (
          <Form onFinish={onFinish} autoComplete="off">
            <div className="flex flex-wrap justify-center m-3">
              <Field
                as="select"
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
              </Field>
              <div className="space mb-2.5">
                {errors.provincia && touched.provincia ? (
                  <div className="errordiv text-xs">{errors.provincia}</div>
                ) : null}
              </div>

              <Field
                type="text"
                name="canton"
                placeholder="Canton"
                className="input-admin-property  m-2 w-80 sm:w-1/3 md:w-1/4 lg:w-1/6 p-2"
              />
              <div className="space mb-2.5">
                {errors.canton && touched.canton ? (
                  <div className="errordiv text-xs">{errors.canton}</div>
                ) : null}
              </div>
              <Field
                type="text"
                name="distrito"
                placeholder="Distrito"
                className="input-admin-property  m-2 w-80 sm:w-1/3 md:w-1/4 lg:w-1/6 p-2"
              />
              <div className="space mb-2.5">
                {errors.distrito && touched.distrito ? (
                  <div className="errordiv text-xs">{errors.distrito}</div>
                ) : null}
              </div>

              <Field
                type="number"
                name="precio"
                placeholder="Precio"
                className="input-admin-property  m-2 w-80 sm:w-1/3 md:w-1/4 lg:w-1/6 p-2"
              />
              <div className="space mb-2.5">
                {errors.precio && touched.precio ? (
                  <div className="errordiv text-xs">{errors.precio}</div>
                ) : null}
              </div>
              <Field
                type="number"
                name="areaTerreno"
                placeholder="Área del terreno"
                className="input-admin-property  m-2 w-80 sm:w-1/3 md:w-1/4 lg:w-1/6 p-2"
              />
              <div className="space mb-2.5">
                {errors.areaTerreno && touched.areaTerreno ? (
                  <div className="errordiv text-xs">{errors.areaTerreno}</div>
                ) : null}
              </div>

              <Field
                type="number"
                name="areaPropiedad"
                placeholder="Área de la propiedad"
                className="input-admin-property  m-2 w-80 sm:w-1/3 md:w-1/4 lg:w-1/6 p-2"
              />
              <div className="space mb-2.5">
                {errors.areaPropiedad && touched.areaPropiedad ? (
                  <div className="errordiv text-xs">{errors.areaPropiedad}</div>
                ) : null}
              </div>
              <div className="space mb-2.5">
                {errors.tipoOficina && touched.tipoOficina ? (
                  <div className="errordiv text-xs">{errors.tipoOficina}</div>
                ) : null}
              </div>
              <Field
                as="select"
                name="tipoEdificio"
                onChange={handleEdificioProperty}
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
              </Field>

              <Field
                type="number"
                name="areaContruccion"
                placeholder="Área construcción"
                className="input-admin-property  m-2 w-80 sm:w-1/3 md:w-1/4 lg:w-1/6 p-2"
              />
              <div className="space mb-2.5">
                {errors.areaContruccion && touched.areaContruccion ? (
                  <div className="errordiv text-xs">
                    {errors.areaContruccion}
                  </div>
                ) : null}
              </div>

              <Field
                as="select"
                name="parqueo"
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
              </Field>
              <div className="space mb-2.5">
                {errors.parqueo && touched.parqueo ? (
                  <div className="errordiv text-xs">{errors.parqueo}</div>
                ) : null}
              </div>

              <Field
                type="number"
                name="cuotaMantenimiento"
                placeholder="Cuota mantenimiento"
                className="input-admin-property  m-2 w-80 sm:w-1/3 md:w-1/4 lg:w-1/6 p-2"
              />
              <div className="space mb-2.5">
                {errors.cuotaMantenimiento && touched.cuotaMantenimiento ? (
                  <div className="errordiv text-xs">
                    {errors.cuotaMantenimiento}
                  </div>
                ) : null}
              </div>

              <Field
                as="select"
                name="concepcionElectrica"
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
              </Field>
              <div className="space mb-2.5">
                {errors.concepcionElectrica && touched.concepcionElectrica ? (
                  <div className="errordiv text-xs">
                    {errors.concepcionElectrica}
                  </div>
                ) : null}
              </div>
              <Field
                type="number"
                name="areaPlantas"
                placeholder="Área por plantas"
                className="input-admin-property  m-2 w-80 sm:w-1/3 md:w-1/4 lg:w-1/6 p-2"
              />
              <div className="space mb-2.5">
                {errors.areaPlantas && touched.areaPlantas ? (
                  <div className="errordiv text-xs">{errors.areaPlantas}</div>
                ) : null}
              </div>
              <Field
                type="number"
                name="numeroPlantas"
                placeholder="Número de plantas"
                className="input-admin-property  m-2 w-80 sm:w-1/3 md:w-1/4 lg:w-1/6 p-2"
              />
              <div className="space mb-2.5">
                {errors.numeroPlantas && touched.numeroPlantas ? (
                  <div className="errordiv text-xs">{errors.numeroPlantas}</div>
                ) : null}
              </div>

              <Field
                as="select"
                name="ubicacionCastral"
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
              </Field>
              <div className="space mb-2.5">
                {errors.ubicacionCastral && touched.ubicacionCastral ? (
                  <div className="errordiv text-xs">
                    {errors.ubicacionCastral}
                  </div>
                ) : null}
              </div>
              <Field
                as="select"
                name="ubicacionDemografica"
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
              </Field>
              <div className="space mb-2.5">
                {errors.ubicacionDemografica && touched.ubicacionDemografica ? (
                  <div className="errordiv text-xs">
                    {errors.ubicacionDemografica}
                  </div>
                ) : null}
              </div>
              <Field
                as="select"
                name="ubicacionGeografica"
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
              </Field>
              <div className="space mb-2.5">
                {errors.ubicacionGeografica && touched.ubicacionGeografica ? (
                  <div className="errordiv text-xs">
                    {errors.ubicacionGeografica}
                  </div>
                ) : null}
              </div>

              <Field
                as="select"
                name="usoDeSuelo"
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
              </Field>
              <div className="space mb-2.5">
                {errors.usoDeSuelo && touched.usoDeSuelo ? (
                  <div className="errordiv text-xs">{errors.usoDeSuelo}</div>
                ) : null}
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
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AlquilerEdificios;
