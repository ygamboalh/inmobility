import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as Yup from "yup";

import { Spin, message } from "antd";
import { Formik, Form, Field } from "formik";

import { API, BEARER } from "../../../constant";
import AxiosInstance from "../../../api/AxiosInstance";
import {
  Amenidades,
  Amueblado,
  categories,
  AptoMascotas,
  AptoNinos,
  DetallesExternos,
  DetallesInternos,
  PatioJardin,
  TipoInmueble,
  Electrica,
  UbicacionCatastral,
  UbicacionDemografica,
  UbicacionGeografica,
  Estado,
  Cochera,
  Densidad,
  Servicios,
  Edificio,
  Bodega,
  Oficina,
  Parqueo,
  TipoLote,
  Locales,
  UsoSuelo,
  Provincia,
} from "../../../BD/bd";
import Select from "react-select";
import PropertyLoadImage from "../../../components/UploadImage/property-upload-image";
import MySpinner from "../../../components/Spinner/spinner";
import axios from "axios";
import { getToken } from "../../../utils/helpers";
import LoadPropertyImage from "../../../components/UploadImage/my-upload-property";
import { useQuery } from "react-query";
import { authUserData } from "../../../api/usersApi";

const InsertProperty = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const InsertPropertySchema = Yup.object().shape({
    provincia: Yup.string().required("*"),
    canton: Yup.string().required("*").min(6, "*").max(150, "*"),
    distrito: Yup.string().required("*").min(6, "*").max(150, "*"),
    precio: Yup.number().required("*").min(0, "*").max(2000000, "*"),
    areaTerreno: Yup.number().required("*").min(0, "*").max(500000, "*"),
    anunciante: Yup.string().required("*").min(6, "*").max(150, "*"),
    active: Yup.string().required("*"),

    habitaciones: Yup.number().min(0, "*").max(15, "*"),
    areaPropiedad: Yup.string().min(0, "*").max(10000, "*"),
    areaContruccion: Yup.number().min(0, "*").max(100000, "*"),
    banos: Yup.number().min(0, "*").max(10, "*"),
    cuotaMantenimiento: Yup.number().min(0, "*").max(500000, "*"),
    areaBodega: Yup.number().min(0, "*").max(10000000, "*"),
    altura: Yup.number().min(0, "*").max(500, "*"),
    areaPlantas: Yup.number().min(0, "*").max(100000, "*"),
    numeroPlantas: Yup.number().min(0, "*").max(100, "*"),
    areaMesanini: Yup.number().min(0, "*").max(6000, "*"),
    areaSotano: Yup.number().min(0, "*").max(6000, "*"),
    //parqueo: Yup.string(),
    //tipoPropiedad: Yup.string(),
    //cochera: Yup.string(),
    //usoDeSuelo: Yup.string().required("*"),
    //tipoEdificio: Yup.string().required("*"),
    //tipoLocal: Yup.string().required("*"),
    //tipoOficina: Yup.string().required("*"),
    //tipoLote: Yup.string().required("*"),
    //tipoBodega: Yup.string().required("*"),
    //amenidades: Yup.object().required("*"),
    // jardinPatio: Yup.object().required("*"),
    //ley7600: Yup.boolean().oneOf([true, false]).required("*"),
    //detallesInternos: Yup.object().required("*"),
    //detallesExternos: Yup.object().required("*"),
    //amueblado: Yup.string().required("*"),
    //aptoHijos: Yup.string().required("*"),
    //aptoMascotas: Yup.string().required("*"),
    //concepcionElectrica: Yup.string().required("*"),
    //areaCarga: Yup.boolean().oneOf([true, false]).required("*"),
    // propositoTerreno: Yup.string().required("*"),
    // ubicacionCastral: Yup.string().required("*"),
    //ubicacionDemografica: Yup.string().required("*"),
    //ubicacionGeografica: Yup.string().required("*"),
    // tipoDensidad: Yup.string().required("*"),
    // servicios: Yup.string().required("*"),
    // serviciosMedicos: Yup.boolean().oneOf([true, false]).required("*"),
    //categories: Yup.string().required("*"),
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

  const handleImageChange = (event) => {
    console.log(event.target.files);
    setImages(event.target.files[0]);
  };
  const handleHouseProperty = (event) => {
    const option = event.target.value;
    setSelectedPropertyType(option);
  };
  const handleFincaProperty = (event) => {
    const option = event.target.value;

    if (option) setSelectedPropertyType(option);
  };
  const handleLocalesProperty = (event) => {
    const option = event.target.value;

    if (option) setSelectedPropertyType(option);
  };
  const handleBodegasProperty = (event) => {
    const option = event.target.value;

    if (option) setSelectedPropertyType(option);
  };
  const handleOficinasProperty = (event) => {
    const option = event.target.value;

    if (option) setSelectedPropertyType(option);
  };
  const handleEdificioProperty = (event) => {
    const option = event.target.value;
    if (option) setSelectedPropertyType(option);
  };
  const handleOptionSelectChange = (event) => {
    const selectedOption = event.target.value;
    setSelectedOption(selectedOption);
  };
  const handleChangeCategory = (selectedOption) => {
    setCategory(selectedOption);
  };
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

  useEffect(() => {
    const response = AxiosInstance.get(`properties/${id}`).then((property) =>
      setProperty(property?.data?.data?.attributes)
    );
  }, []);

  const [initialData, setinitialData] = useState({
    provincia: property?.provincia,
    canton: property?.canton,
    distrito: property?.distrito,
    precio: property?.precio,
    tipoPropiedad: property?.tipoPropiedad,
    tipoEdificio: property?.tipoEdificio,
    tipoLocal: property?.tipoLocal,
    tipoBodega: property?.tipoBodega,
    tipoOficina: property?.tipoOficina,
    tipoLote: property?.tipoLote,
    amenidades: amenidades,
    cochera: property?.cochera,
    usoDeSuelo: property?.usoDeSuelo,
    areaPropiedad: property?.areaPropiedad,
    areaContruccion: property?.areaContruccion,
    habitaciones: property?.habitaciones,
    banos: property?.banos,
    jardinPatio: patio,
    parqueo: property?.parqueo,
    ley7600: property?.ley7600,
    detallesInternos: detallesInternos,
    detallesExternos: detallesExternos,
    amueblado: property?.amueblado,
    aptoHijos: property?.aptoHijos,
    aptoMascotas: property?.aptoMascotas,
    cuotaMantenimiento: property?.cuotaMantenimiento,
    areaBodega: property?.areaBodega,
    altura: property?.altura,
    concepcionElectrica: property?.concepcionElectrica,
    areaCarga: property?.areaCarga,
    areaPlantas: property?.areaPlantas,
    numeroPlantas: property?.numeroPlantas,
    propositoTerreno: property?.propositoTerren,
    ubicacionCastral: property?.ubicacionCastral,
    ubicacionDemografica: property?.ubicacionDemografica,
    ubicacionGeografica: property?.ubicacionGeografica,
    areaMesanini: property?.areaMesanini,
    areaSotano: property?.areaSotano,
    tipoDensidad: property?.tipoDensidad,
    servicios: property?.servicios,
    serviciosMedicos: property?.serviciosMedicos,
    anunciante: property?.anunciante,
    categories: property?.categories,
    active: property?.active,
    areaTerreno: property?.areaTerreno,
  });

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
        tipoBodega: values.tipoBodega,
        tipoOficina: values.tipoOficina,
        tipoLote: values.tipoLote,
        tipoLocal: values.tipoLocal,
        amenidades: amenidades,
        areaPropiedad: values.areaPropiedad,
        areaContruccion: values.areaContruccion,
        habitaciones: values.habitaciones,
        cochera: values.cochera,
        usoDeSuelo: values.usoDeSuelo,
        banos: values.banos,
        jardinPatio: patio,
        parqueo: values.parqueo,
        ley7600: values.ley7600,
        detallesInternos: detallesInternos,
        detallesExternos: detallesExternos,
        amueblado: values.amueblado,
        aptoHijos: values.aptoHijos,
        aptoMascotas: values.aptoMascotas,
        cuotaMantenimiento: values.cuotaMantenimiento,
        areaBodega: values.areaBodega,
        altura: values.altura,
        concepcionElectrica: values.concepcionElectrica,
        areaCarga: values.areaCarga,
        areaPlantas: values.areaPlantas,
        numeroPlantas: values.numeroPlantas,
        propositoTerreno: values.propositoTerreno,
        ubicacionCastral: values.ubicacionCastral,
        ubicacionDemografica: values.ubicacionDemografica,
        ubicacionGeografica: values.ubicacionGeografica,
        areaMesanini: values.areaMesanini,
        areaSotano: values.areaSotano,
        tipoDensidad: values.tipoDensidad,
        servicios: values.servicios,
        serviciosMedicos: values.serviciosMedicos,
        anunciante: values.anunciante,
        categories: catFounded,
        active: values.active,
        creadoPor: userId,
        //photos: images,
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
            //navigate("/admin/properties", { replace: true });
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
      <div className="inset-y-0 mb-20 left-0 flex h-fit justify-center align-middle items-center pl-3"></div>
      <div className="flex mt-3 justify-center align-middle items-center w-full">
        <label className="font-semibold text-xl">
          Crear o editar una propiedad
        </label>
      </div>
      <Formik
        initialValues={initialData}
        validationSchema={InsertPropertySchema}
        onSubmit={onFinish}
      >
        {({ errors, touched }) => (
          <Form onFinish={onFinish} autoComplete="off">
            <div className="flex justify-center  flex-row content-center items-center">
              <Field
                as="select"
                name="categories"
                value={selectedOption}
                defaultValue={property?.categories}
                onChange={handleOptionSelectChange}
                className="categories  m-2 w-full  md:w-fit lg:mx-80"
              >
                <option value="" label="">
                  {"Seleccione la categoría"}
                </option>
                {categories.map((item) => (
                  <option value={item.value} label={item.label}>
                    {item.value}
                  </option>
                ))}
              </Field>
              <div className="space mb-2.5">
                {errors.categories && touched.categories ? (
                  <div className="-ml-1.5 text-red-500 mt-4 text-xs">
                    {errors.categories}
                  </div>
                ) : null}
              </div>
            </div>
            <div className="flex flex-wrap justify-center m-3">
              <Field
                as="select"
                defaultValue={property?.provincia}
                hidden={selectedOption === ""}
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
                defaultValue={property?.canton}
                hidden={selectedOption === ""}
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
                hidden={selectedOption === ""}
                name="distrito"
                defaultValue={property?.distrito}
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
                hidden={selectedOption === ""}
                defaultValue={property?.precio}
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
                hidden={selectedOption === ""}
                name="areaTerreno"
                defaultValue={property?.areaTerreno}
                placeholder="Área del terreno"
                className="input-admin-property  m-2 w-80 sm:w-1/3 md:w-1/4 lg:w-1/6 p-2"
              />
              <div className="space mb-2.5">
                {errors.areaTerreno && touched.areaTerreno ? (
                  <div className="errordiv text-xs">{errors.areaTerreno}</div>
                ) : null}
              </div>
              <Field
                as="select"
                hidden={
                  selectedOption === "" ||
                  selectedOption ===
                    "Venta de Lotes, Fincas,Terrenos y Predios" ||
                  selectedOption ===
                    "Alquiler de Fincas, Lotes, Predios o Terrenos" ||
                  selectedOption === "Venta de Locales Comerciales" ||
                  selectedOption === "Alquiler de Locales Comerciales" ||
                  selectedOption === "Venta de Edificios" ||
                  selectedOption === "Alquiler de Edificios" ||
                  selectedOption === "Venta de Bodegas o Similares" ||
                  selectedOption === "Alquiler de Bodegas o Similares" ||
                  selectedOption ===
                    "Venta de Oficinas o Consultorios Médicos" ||
                  selectedOption ===
                    "Alquiler de Oficinas o Consultorios Médicos"
                }
                name="tipoPropiedad"
                onChange={handleHouseProperty}
                defaultValue={property?.tipoPropiedad}
                placeholder="Tipo de propiedad"
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
              </Field>
              <Field
                as="select"
                hidden={
                  selectedOption ===
                    "Venta de Oficinas o Consultorios Médicos" ||
                  selectedOption === "" ||
                  selectedOption === "Venta de Casas y Apartamentos" ||
                  selectedOption === "Alquiler de Casas y Apartamentos" ||
                  selectedOption ===
                    "Venta de Lotes, Fincas,Terrenos y Predios" ||
                  selectedOption ===
                    "Alquiler de Fincas, Lotes, Predios o Terrenos" ||
                  selectedOption === "Venta de Locales Comerciales" ||
                  selectedOption === "Alquiler de Locales Comerciales" ||
                  selectedOption === "Venta de Edificios" ||
                  selectedOption === "Alquiler de Edificios" ||
                  selectedOption ===
                    "Alquiler de Oficinas o Consultorios Médicos"
                }
                onChange={handleBodegasProperty}
                name="tipoBodega"
                defaultValue={property?.tipoBodega}
                className="input-admin-property  m-2 w-80 sm:w-1/3 md:w-1/4 lg:w-1/6 p-2"
              >
                <option value="" label="">
                  {"Tipo de inmueble ( Bodega )"}
                </option>
                {Bodega.map((item) => (
                  <option value={item.value} label={item.label}>
                    {item.value}
                  </option>
                ))}
              </Field>
              <Field
                as="select"
                hidden={
                  selectedOption === "" ||
                  selectedOption === "Venta de Casas y Apartamentos" ||
                  selectedOption === "Alquiler de Casas y Apartamentos" ||
                  selectedOption === "Venta de Locales Comerciales" ||
                  selectedOption === "Alquiler de Locales Comerciales" ||
                  selectedOption === "Venta de Edificios" ||
                  selectedOption === "Alquiler de Edificios" ||
                  selectedOption === "Venta de Bodegas o Similares" ||
                  selectedOption === "Alquiler de Bodegas o Similares" ||
                  selectedOption ===
                    "Venta de Oficinas o Consultorios Médicos" ||
                  selectedOption ===
                    "Alquiler de Oficinas o Consultorios Médicos"
                }
                onChange={handleFincaProperty}
                name="tipoLote"
                defaultValue={property?.tipoLote}
                className="input-admin-property  m-2 w-80 sm:w-1/3 md:w-1/4 lg:w-1/6 p-2"
              >
                <option value="" label="">
                  {"Tipo de inmueble ( Lotes )"}
                </option>
                {TipoLote.map((item) => (
                  <option value={item.value} label={item.label}>
                    {item.value}
                  </option>
                ))}
              </Field>
              <div className="space mb-2.5">
                {errors.tipoLote && touched.tipoLote ? (
                  <div className="errordiv text-xs">{errors.tipoLote}</div>
                ) : null}
              </div>
              <Field
                as="select"
                hidden={
                  selectedOption === "" ||
                  selectedOption === "Venta de Casas y Apartamentos" ||
                  selectedOption === "Alquiler de Casas y Apartamentos" ||
                  selectedOption ===
                    "Venta de Lotes, Fincas,Terrenos y Predios" ||
                  selectedOption ===
                    "Alquiler de Fincas, Lotes, Predios o Terrenos" ||
                  selectedOption === "Venta de Locales Comerciales" ||
                  selectedOption === "Alquiler de Locales Comerciales" ||
                  selectedOption === "Venta de Edificios" ||
                  selectedOption === "Alquiler de Edificios" ||
                  selectedOption === "Venta de Bodegas o Similares" ||
                  selectedOption === "Alquiler de Bodegas o Similares"
                }
                onChange={handleOficinasProperty}
                name="tipoOficina"
                defaultValue={property?.tipoOficina}
                className="input-admin-property  m-2 w-80 sm:w-1/3 md:w-1/4 lg:w-1/6 p-2"
              >
                <option value="" label="">
                  {"Tipo de inmueble ( Oficina )"}
                </option>
                {Oficina.map((item) => (
                  <option value={item.value} label={item.label}>
                    {item.value}
                  </option>
                ))}
              </Field>
              <Field
                type="number"
                name="areaPropiedad"
                defaultValue={property?.areaPropiedad}
                placeholder="Área de la propiedad"
                hidden={
                  selectedOption ===
                    "Alquiler de Fincas, Lotes, Predios o Terrenos" ||
                  selectedOption === "Venta de Locales Comerciales" ||
                  selectedOption ===
                    "Venta de Lotes, Fincas,Terrenos y Predios" ||
                  selectedOption === "Alquiler de Casas y Apartamentos" ||
                  selectedOption === "Venta de Casas y Apartamentos" ||
                  selectedOption === ""
                }
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
                hidden={
                  selectedOption ===
                    "Alquiler de Oficinas o Consultorios Médicos" ||
                  selectedOption ===
                    "Venta de Oficinas o Consultorios Médicos" ||
                  selectedOption === "Alquiler de Bodegas o Similares" ||
                  selectedOption === "" ||
                  selectedOption === "Venta de Casas y Apartamentos" ||
                  selectedOption === "Alquiler de Casas y Apartamentos" ||
                  selectedOption ===
                    "Venta de Lotes, Fincas,Terrenos y Predios" ||
                  selectedOption ===
                    "Alquiler de Fincas, Lotes, Predios o Terrenos" ||
                  selectedOption === "Venta de Locales Comerciales" ||
                  selectedOption === "Alquiler de Locales Comerciales" ||
                  selectedOption === "Venta de Bodegas o Similares"
                }
                onChange={handleEdificioProperty}
                defaultValue={property?.tipoEdificio}
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
                as="select"
                name="tipoLocal"
                onChange={handleLocalesProperty}
                required={
                  selectedOption === "Venta de Locales Comerciales" ||
                  selectedOption === "Alquiler de Locales Comerciales"
                }
                hidden={
                  selectedOption === "" ||
                  selectedOption === "Venta de Casas y Apartamentos" ||
                  selectedOption === "Alquiler de Casas y Apartamentos" ||
                  selectedOption ===
                    "Venta de Lotes, Fincas,Terrenos y Predios" ||
                  selectedOption ===
                    "Alquiler de Fincas, Lotes, Predios o Terrenos" ||
                  selectedOption === "Venta de Edificios" ||
                  selectedOption === "Alquiler de Edificios" ||
                  selectedOption === "Venta de Bodegas o Similares" ||
                  selectedOption === "Alquiler de Bodegas o Similares" ||
                  selectedOption ===
                    "Venta de Oficinas o Consultorios Médicos" ||
                  selectedOption ===
                    "Alquiler de Oficinas o Consultorios Médicos"
                }
                defaultValue={property?.tipoLocal}
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
              </Field>
              <div className="space mb-2.5">
                {errors.tipoLocal && touched.tipoLocal ? (
                  <div className="errordiv text-xs">{errors.tipoLocal}</div>
                ) : null}
              </div>
              <Field
                as="select"
                hidden={
                  selectedOption === "Alquiler de Edificios" ||
                  selectedOption ===
                    "Alquiler de Fincas, Lotes, Predios o Terrenos" ||
                  selectedOption ===
                    "Alquiler de Oficinas o Consultorios Médicos" ||
                  selectedOption ===
                    "Venta de Oficinas o Consultorios Médicos" ||
                  selectedOption === "Alquiler de Bodegas o Similares" ||
                  selectedOption === "Venta de Bodegas o Similares" ||
                  selectedOption === "Alquiler de Edificios" ||
                  selectedOption === "Venta de Edificios" ||
                  selectedOption === "Alquiler de Locales Comerciales" ||
                  selectedOption === "Venta de Locales Comerciales" ||
                  selectedOption ===
                    "Venta de Lotes, Fincas,Terrenos y Predios" ||
                  selectedOption === ""
                }
                name="cochera"
                defaultValue={property?.cochera}
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
              </Field>
              <div className="space mb-2.5">
                {errors.cochera && touched.cochera ? (
                  <div className="errordiv text-xs">{errors.cochera}</div>
                ) : null}
              </div>
              <Field
                type="number"
                hidden={
                  selectedOption ===
                    "Alquiler de Fincas, Lotes, Predios o Terrenos" ||
                  selectedOption ===
                    "Alquiler de Oficinas o Consultorios Médicos" ||
                  selectedOption ===
                    "Venta de Oficinas o Consultorios Médicos" ||
                  selectedOption === "Alquiler de Locales Comerciales" ||
                  selectedOption ===
                    "Venta de Lotes, Fincas,Terrenos y Predios" ||
                  selectedOption === "Alquiler de Casas y Apartamentos" ||
                  selectedOption === ""
                }
                name="areaContruccion"
                defaultValue={property?.areaContruccion}
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
                type="number"
                name="habitaciones"
                defaultValue={property?.habitaciones}
                placeholder="Habitaciones"
                hidden={
                  selectedOption ===
                    "Alquiler de Fincas, Lotes, Predios o Terrenos" ||
                  selectedOption ===
                    "Alquiler de Oficinas o Consultorios Médicos" ||
                  selectedOption ===
                    "Venta de Oficinas o Consultorios Médicos" ||
                  selectedOption === "Alquiler de Bodegas o Similares" ||
                  selectedOption === "Venta de Bodegas o Similares" ||
                  selectedOption === "Alquiler de Edificios" ||
                  selectedOption === "Venta de Edificios" ||
                  selectedOption === "Alquiler de Locales Comerciales" ||
                  selectedOption === "Venta de Locales Comerciales" ||
                  selectedOption ===
                    "Venta de Lotes, Fincas,Terrenos y Predios" ||
                  selectedOption === ""
                }
                className="input-admin-property  m-2 w-80 sm:w-1/3 md:w-1/4 lg:w-1/6 p-2"
              />
              <div className="space mb-2.5">
                {errors.habitaciones && touched.habitaciones ? (
                  <div className="errordiv text-xs">{errors.habitaciones}</div>
                ) : null}
              </div>
              <Field
                type="number"
                name="banos"
                defaultValue={property?.banos}
                placeholder="Baños"
                hidden={
                  selectedOption ===
                    "Alquiler de Fincas, Lotes, Predios o Terrenos" ||
                  selectedOption ===
                    "Alquiler de Oficinas o Consultorios Médicos" ||
                  selectedOption ===
                    "Venta de Oficinas o Consultorios Médicos" ||
                  selectedOption === "Alquiler de Bodegas o Similares" ||
                  selectedOption === "Venta de Bodegas o Similares" ||
                  selectedOption === "Alquiler de Edificios" ||
                  selectedOption === "Venta de Edificios" ||
                  selectedOption === "Alquiler de Locales Comerciales" ||
                  selectedOption === "Venta de Locales Comerciales" ||
                  selectedOption ===
                    "Venta de Lotes, Fincas,Terrenos y Predios" ||
                  selectedOption === ""
                }
                className="input-admin-property  m-2 w-80 sm:w-1/3 md:w-1/4 lg:w-1/6 p-2"
              />
              <div className="space mb-2.5">
                {errors.banos && touched.banos ? (
                  <div className="errordiv text-xs">{errors.banos}</div>
                ) : null}
              </div>

              <Field
                as="select"
                name="amueblado"
                id="amueblado"
                defaultValue={property?.amueblado}
                placeholder="Amueblado"
                hidden={selectedOption !== "Alquiler de Casas y Apartamentos"}
                className="input-admin-property  m-2 w-80 sm:w-1/3 md:w-1/4 lg:w-1/6 p-2"
              >
                <option value="" label="">
                  {"Amueblado"}
                </option>
                {Amueblado.map((item) => (
                  <option value={item.value} label={item.label}>
                    {item.value}
                  </option>
                ))}
              </Field>
              <div className="space mb-2.5">
                {errors.amueblado && touched.amueblado ? (
                  <div className="errordiv text-xs">{errors.amueblado}</div>
                ) : null}
              </div>
              <Field
                as="select"
                name="aptoHijos"
                hidden={
                  selectedOption ===
                    "Venta de Oficinas o Consultorios Médicos" ||
                  selectedOption === "Alquiler de Bodegas o Similares" ||
                  selectedOption === "Venta de Bodegas o Similares" ||
                  selectedOption === "Alquiler de Edificios" ||
                  selectedOption === "" ||
                  selectedOption === "Venta de Casas y Apartamentos" ||
                  selectedOption ===
                    "Venta de Lotes, Fincas,Terrenos y Predios" ||
                  selectedOption ===
                    "Alquiler de Fincas, Lotes, Predios o Terrenos" ||
                  selectedOption === "Venta de Locales Comerciales" ||
                  selectedOption === "Alquiler de Locales Comerciales" ||
                  selectedOption === "Venta de Edificios" ||
                  selectedOption ===
                    "Alquiler de Oficinas o Consultorios Médicos"
                }
                defaultValue={property?.aptoHijos}
                id="aptoHijos"
                placeholder="Apto hijos"
                className="input-admin-property  m-2 w-80 sm:w-1/3 md:w-1/4 lg:w-1/6 p-2"
              >
                <option value="" label="">
                  {"Apto hijos"}
                </option>
                {AptoNinos.map((item) => (
                  <option value={item.value} label={item.label}>
                    {item.value}
                  </option>
                ))}
              </Field>
              <div className="space mb-2.5">
                {errors.aptoHijos && touched.aptoHijos ? (
                  <div className="errordiv text-xs">{errors.aptoHijos}</div>
                ) : null}
              </div>
              <Field
                as="select"
                name="parqueo"
                hidden={
                  selectedOption ===
                    "Alquiler de Fincas, Lotes, Predios o Terrenos" ||
                  selectedOption ===
                    "Venta de Lotes, Fincas,Terrenos y Predios" ||
                  selectedOption === "Alquiler de Casas y Apartamentos" ||
                  selectedOption === "Venta de Casas y Apartamentos" ||
                  selectedOption === ""
                }
                defaultValue={property?.parqueo}
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
                as="select"
                hidden={
                  selectedOption === "Alquiler de Edificios" ||
                  selectedOption === "Venta de Casas y Apartamentos" ||
                  selectedOption === "" ||
                  selectedOption ===
                    "Venta de Lotes, Fincas,Terrenos y Predios" ||
                  selectedOption ===
                    "Alquiler de Fincas, Lotes, Predios o Terrenos" ||
                  selectedOption === "Venta de Locales Comerciales" ||
                  selectedOption === "Alquiler de Locales Comerciales" ||
                  selectedOption === "Venta de Edificios" ||
                  selectedOption === "Venta de Bodegas o Similares" ||
                  selectedOption === "Alquiler de Bodegas o Similares" ||
                  selectedOption ===
                    "Venta de Oficinas o Consultorios Médicos" ||
                  selectedOption ===
                    "Alquiler de Oficinas o Consultorios Médicos"
                }
                name="aptoMascotas"
                defaultValue={property?.aptoMascotas}
                id="aptoMascotas"
                placeholder="Apto mascotas"
                className="input-admin-property  m-2 w-80 sm:w-1/3 md:w-1/4 lg:w-1/6 p-2"
              >
                <option value="" label="">
                  {"Apto mascotas"}
                </option>
                {AptoMascotas.map((item) => (
                  <option value={item.value} label={item.label}>
                    {item.value}
                  </option>
                ))}
              </Field>
              <div className="space mb-2.5">
                {errors.aptoMascotas && touched.aptoMascotas ? (
                  <div className="errordiv text-xs">{errors.aptoMascotas}</div>
                ) : null}
              </div>
              <Field
                type="number"
                name="cuotaMantenimiento"
                defaultValue={property?.cuotaMantenimiento}
                placeholder="Cuota mantenimiento"
                hidden={
                  selectedOption ===
                    "Alquiler de Oficinas o Consultorios Médicos" ||
                  selectedOption ===
                    "Venta de Oficinas o Consultorios Médicos" ||
                  selectedOption === "Venta de Bodegas o Similares" ||
                  selectedOption === "Venta de Edificios" ||
                  selectedOption ===
                    "Venta de Lotes, Fincas,Terrenos y Predios" ||
                  selectedOption === "Venta de Casas y Apartamentos" ||
                  selectedOption === ""
                }
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
                type="number"
                name="areaBodega"
                defaultValue={property?.areaBodega}
                placeholder="Área bodega"
                hidden={
                  selectedOption ===
                    "Alquiler de Fincas, Lotes, Predios o Terrenos" ||
                  selectedOption ===
                    "Alquiler de Oficinas o Consultorios Médicos" ||
                  selectedOption ===
                    "Alquiler de Oficinas o Consultorios Médicos" ||
                  selectedOption ===
                    "Venta de Oficinas o Consultorios Médicos" ||
                  selectedOption === "Alquiler de Edificios" ||
                  selectedOption === "Venta de Edificios" ||
                  selectedOption === "Alquiler de Locales Comerciales" ||
                  selectedOption === "Venta de Locales Comerciales" ||
                  selectedOption ===
                    "Venta de Lotes, Fincas,Terrenos y Predios" ||
                  selectedOption === "Alquiler de Casas y Apartamentos" ||
                  selectedOption === "Venta de Casas y Apartamentos" ||
                  selectedOption === ""
                }
                className="input-admin-property  m-2 w-80 sm:w-1/3 md:w-1/4 lg:w-1/6 p-2"
              />
              <div className="space mb-2.5">
                {errors.areaBodega && touched.areaBodega ? (
                  <div className="errordiv text-xs">{errors.areaBodega}</div>
                ) : null}
              </div>
              <Field
                type="number"
                name="altura"
                hidden={
                  selectedOption ===
                    "Alquiler de Fincas, Lotes, Predios o Terrenos" ||
                  selectedOption ===
                    "Alquiler de Oficinas o Consultorios Médicos" ||
                  selectedOption ===
                    "Venta de Oficinas o Consultorios Médicos" ||
                  selectedOption === "Alquiler de Edificios" ||
                  selectedOption === "Venta de Edificios" ||
                  selectedOption === "Alquiler de Locales Comerciales" ||
                  selectedOption === "Venta de Locales Comerciales" ||
                  selectedOption ===
                    "Venta de Lotes, Fincas,Terrenos y Predios" ||
                  selectedOption === "Alquiler de Casas y Apartamentos" ||
                  selectedOption === "Venta de Casas y Apartamentos" ||
                  selectedOption === ""
                }
                defaultValue={property?.altura}
                placeholder="Altura"
                className="input-admin-property  m-2 w-80 sm:w-1/3 md:w-1/4 lg:w-1/6 p-2"
              />
              <div className="space mb-2.5">
                {errors.altura && touched.altura ? (
                  <div className="errordiv text-xs">{errors.altura}</div>
                ) : null}
              </div>
              <Field
                as="select"
                name="concepcionElectrica"
                hidden={
                  selectedOption ===
                    "Alquiler de Fincas, Lotes, Predios o Terrenos" ||
                  selectedOption ===
                    "Venta de Lotes, Fincas,Terrenos y Predios" ||
                  selectedOption === "Alquiler de Casas y Apartamentos" ||
                  selectedOption === "Venta de Casas y Apartamentos" ||
                  selectedOption === ""
                }
                defaultValue={property?.concepcionElectrica}
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
                hidden={
                  selectedOption ===
                    "Alquiler de Fincas, Lotes, Predios o Terrenos" ||
                  selectedOption ===
                    "Alquiler de Oficinas o Consultorios Médicos" ||
                  selectedOption ===
                    "Venta de Oficinas o Consultorios Médicos" ||
                  selectedOption === "Alquiler de Bodegas o Similares" ||
                  selectedOption === "Venta de Bodegas o Similares" ||
                  selectedOption === "Venta de Edificios" ||
                  selectedOption === "Alquiler de Locales Comerciales" ||
                  selectedOption === "Venta de Locales Comerciales" ||
                  selectedOption ===
                    "Venta de Lotes, Fincas,Terrenos y Predios" ||
                  selectedOption === "Alquiler de Casas y Apartamentos" ||
                  selectedOption === "Venta de Casas y Apartamentos" ||
                  selectedOption === ""
                }
                defaultValue={property?.areaPlantas}
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
                hidden={
                  selectedOption ===
                    "Alquiler de Fincas, Lotes, Predios o Terrenos" ||
                  selectedOption ===
                    "Alquiler de Oficinas o Consultorios Médicos" ||
                  selectedOption ===
                    "Venta de Oficinas o Consultorios Médicos" ||
                  selectedOption === "Alquiler de Bodegas o Similares" ||
                  selectedOption === "Venta de Bodegas o Similares" ||
                  selectedOption === "Alquiler de Locales Comerciales" ||
                  selectedOption === "Venta de Locales Comerciales" ||
                  selectedOption ===
                    "Venta de Lotes, Fincas,Terrenos y Predios" ||
                  selectedOption === "Alquiler de Casas y Apartamentos" ||
                  selectedOption === "Venta de Casas y Apartamentos" ||
                  selectedOption === ""
                }
                defaultValue={property?.numeroPlantas}
                placeholder="Número de plantas"
                className="input-admin-property  m-2 w-80 sm:w-1/3 md:w-1/4 lg:w-1/6 p-2"
              />
              <div className="space mb-2.5">
                {errors.numeroPlantas && touched.numeroPlantas ? (
                  <div className="errordiv text-xs">{errors.numeroPlantas}</div>
                ) : null}
              </div>
              <Field
                type="text"
                name="propositoTerreno"
                defaultValue={property?.propositoTerreno}
                placeholder="Propósito terreno"
                hidden
                className="input-admin-property  m-2 w-80 sm:w-1/3 md:w-1/4 lg:w-1/6 p-2"
              />
              <div className="space mb-2.5">
                {errors.propositoTerreno && touched.propositoTerreno ? (
                  <div className="errordiv text-xs">
                    {errors.propositoTerreno}
                  </div>
                ) : null}
              </div>
              <Field
                as="select"
                name="ubicacionCastral"
                id="ubicacionCastral"
                hidden={
                  selectedOption ===
                    "Alquiler de Oficinas o Consultorios Médicos" ||
                  selectedOption ===
                    "Venta de Oficinas o Consultorios Médicos" ||
                  selectedOption === "Alquiler de Bodegas o Similares" ||
                  selectedOption === "Venta de Bodegas o Similares" ||
                  selectedOption === "Alquiler de Locales Comerciales" ||
                  selectedOption === "Venta de Locales Comerciales" ||
                  selectedOption === "Alquiler de Casas y Apartamentos" ||
                  selectedOption === "Venta de Casas y Apartamentos" ||
                  selectedOption === ""
                }
                defaultValue={property?.ubicacionCastral}
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
                hidden={
                  selectedOption ===
                    "Alquiler de Oficinas o Consultorios Médicos" ||
                  selectedOption ===
                    "Venta de Oficinas o Consultorios Médicos" ||
                  selectedOption === "Alquiler de Bodegas o Similares" ||
                  selectedOption === "Venta de Bodegas o Similares" ||
                  selectedOption === "Alquiler de Locales Comerciales" ||
                  selectedOption === "Venta de Locales Comerciales" ||
                  selectedOption === "Alquiler de Casas y Apartamentos" ||
                  selectedOption === "Venta de Casas y Apartamentos" ||
                  selectedOption === ""
                }
                defaultValue={property?.ubicacionDemografica}
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
                hidden={
                  selectedOption ===
                    "Alquiler de Oficinas o Consultorios Médicos" ||
                  selectedOption ===
                    "Venta de Oficinas o Consultorios Médicos" ||
                  selectedOption === "Alquiler de Bodegas o Similares" ||
                  selectedOption === "Venta de Bodegas o Similares" ||
                  selectedOption === "Alquiler de Locales Comerciales" ||
                  selectedOption === "Venta de Locales Comerciales" ||
                  selectedOption === "Alquiler de Casas y Apartamentos" ||
                  selectedOption === "Venta de Casas y Apartamentos" ||
                  selectedOption === ""
                }
                defaultValue={property?.ubicacionGeografica}
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
                name="active"
                defaultValue={property?.active}
                id="active"
                hidden={selectedOption === ""}
                placeholder="Activa"
                className="input-admin-property  m-2 w-80 sm:w-1/3 md:w-1/4 lg:w-1/6 p-2"
              >
                <option value="" label="">
                  {"Estado"}
                </option>
                {Estado.map((item) => (
                  <option value={item.value} label={item.label}>
                    {item.value}
                  </option>
                ))}
              </Field>
              <div className="space mb-2.5">
                {errors.active && touched.active ? (
                  <div className="errordiv text-xs">{errors.active}</div>
                ) : null}
              </div>
              <Field
                type="number"
                name="areaMesanini"
                hidden={
                  selectedOption ===
                    "Alquiler de Fincas, Lotes, Predios o Terrenos" ||
                  selectedOption ===
                    "Alquiler de Oficinas o Consultorios Médicos" ||
                  selectedOption ===
                    "Venta de Oficinas o Consultorios Médicos" ||
                  selectedOption === "Alquiler de Bodegas o Similares" ||
                  selectedOption === "Venta de Bodegas o Similares" ||
                  selectedOption === "Alquiler de Edificios" ||
                  selectedOption === "Venta de Edificios" ||
                  selectedOption ===
                    "Venta de Lotes, Fincas,Terrenos y Predios" ||
                  selectedOption === "Alquiler de Casas y Apartamentos" ||
                  selectedOption === "Venta de Casas y Apartamentos" ||
                  selectedOption === ""
                }
                defaultValue={property?.areaMesanini}
                placeholder="Área mezanine"
                className="input-admin-property  m-2 w-80 sm:w-1/3 md:w-1/4 lg:w-1/6 p-2"
              />
              <div className="space mb-2.5">
                {errors.areaMesanini && touched.areaMesanini ? (
                  <div className="errordiv text-xs">{errors.areaMesanini}</div>
                ) : null}
              </div>
              <Field
                type="number"
                name="areaSotano"
                hidden={
                  selectedOption ===
                    "Alquiler de Fincas, Lotes, Predios o Terrenos" ||
                  selectedOption ===
                    "Alquiler de Oficinas o Consultorios Médicos" ||
                  selectedOption ===
                    "Venta de Oficinas o Consultorios Médicos" ||
                  selectedOption === "Alquiler de Bodegas o Similares" ||
                  selectedOption === "Venta de Bodegas o Similares" ||
                  selectedOption === "Alquiler de Edificios" ||
                  selectedOption === "Venta de Edificios" ||
                  selectedOption ===
                    "Venta de Lotes, Fincas,Terrenos y Predios" ||
                  selectedOption === "Alquiler de Casas y Apartamentos" ||
                  selectedOption === "Venta de Casas y Apartamentos" ||
                  selectedOption === ""
                }
                defaultValue={property?.areaSotano}
                placeholder="Área sótano"
                className="input-admin-property  m-2 w-80 sm:w-1/3 md:w-1/4 lg:w-1/6 p-2"
              />
              <div className="space mb-2.5">
                {errors.areaSotano && touched.areaSotano ? (
                  <div className="errordiv text-xs">{errors.areaSotano}</div>
                ) : null}
              </div>
              <Field
                as="select"
                name="tipoDensidad"
                hidden={
                  selectedOption ===
                    "Alquiler de Oficinas o Consultorios Médicos" ||
                  selectedOption ===
                    "Venta de Oficinas o Consultorios Médicos" ||
                  selectedOption === "Alquiler de Bodegas o Similares" ||
                  selectedOption === "Venta de Bodegas o Similares" ||
                  selectedOption === "Alquiler de Edificios" ||
                  selectedOption === "Venta de Edificios" ||
                  selectedOption === "Alquiler de Locales Comerciales" ||
                  selectedOption === "Venta de Locales Comerciales" ||
                  selectedOption === "Alquiler de Casas y Apartamentos" ||
                  selectedOption === "Venta de Casas y Apartamentos" ||
                  selectedOption === ""
                }
                className="input-admin-property  m-2 w-80 sm:w-1/3 md:w-1/4 lg:w-1/6 p-2"
              >
                <option value="" label="">
                  {"Tipo de densidad"}
                </option>
                {Densidad.map((item) => (
                  <option value={item.value} label={item.label}>
                    {item.value}
                  </option>
                ))}
              </Field>
              <Field
                as="select"
                name="usoDeSuelo"
                defaultValue={property?.usoDeSuelo}
                className="input-admin-property  m-2 w-80 sm:w-1/3 md:w-1/4 lg:w-1/6 p-2"
                hidden={
                  selectedOption ===
                    "Alquiler de Oficinas o Consultorios Médicos" ||
                  selectedOption ===
                    "Venta de Oficinas o Consultorios Médicos" ||
                  selectedOption === "Alquiler de Bodegas o Similares" ||
                  selectedOption === "Alquiler de Locales Comerciales" ||
                  selectedOption === "Venta de Locales Comerciales" ||
                  selectedOption === "Alquiler de Casas y Apartamentos" ||
                  selectedOption === "Venta de Casas y Apartamentos" ||
                  selectedOption === "Venta de Bodegas o Similares" ||
                  selectedOption === ""
                }
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
              <Field
                as="select"
                defaultValue={property?.servicios}
                name="servicios"
                hidden={
                  selectedOption ===
                    "Alquiler de Oficinas o Consultorios Médicos" ||
                  selectedOption ===
                    "Venta de Oficinas o Consultorios Médicos" ||
                  selectedOption === "Alquiler de Bodegas o Similares" ||
                  selectedOption === "Venta de Bodegas o Similares" ||
                  selectedOption === "Alquiler de Edificios" ||
                  selectedOption === "Venta de Edificios" ||
                  selectedOption === "Alquiler de Locales Comerciales" ||
                  selectedOption === "Venta de Locales Comerciales" ||
                  selectedOption === "Alquiler de Casas y Apartamentos" ||
                  selectedOption === "Venta de Casas y Apartamentos" ||
                  selectedOption === ""
                }
                className="input-admin-property  m-2 w-80 sm:w-1/3 md:w-1/4 lg:w-1/6 p-2"
              >
                <option value="" label="">
                  {"Servicios"}
                </option>
                {Servicios.map((item) => (
                  <option value={item.value} label={item.label}>
                    {item.value}
                  </option>
                ))}
              </Field>
              <Field
                type="text"
                placeholder="Anunciante"
                defaultValue={property?.anunciante}
                name="anunciante"
                hidden={selectedOption === ""}
                className="input-admin-property  m-2 w-80 sm:w-1/3 md:w-1/4 lg:w-1/6 p-2"
              />
              <div className="space mb-2.5">
                {errors.anunciante && touched.anunciante ? (
                  <div className="errordiv text-xs">{errors.anunciante}</div>
                ) : null}
              </div>
            </div>
            <div className="flex m-4 content-center items-center justify-center ">
              <div className="flex flex-col w-fit sm:flex-col lg:flex-row content-center items-center justify-center">
                <div className="m-1 flex justify-center items-center content-center self-start">
                  <label class="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      value=""
                      disabled={
                        selectedOption ===
                          "Alquiler de Fincas, Lotes, Predios o Terrenos" ||
                        selectedOption === "Alquiler de Bodegas o Similares" ||
                        selectedOption === "Venta de Bodegas o Similares" ||
                        selectedOption === "Alquiler de Edificios" ||
                        selectedOption === "Venta de Edificios" ||
                        selectedOption ===
                          "Venta de Lotes, Fincas,Terrenos y Predios" ||
                        selectedOption === ""
                      }
                      defaultValue={property?.ley7600}
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
                      value=""
                      disabled={
                        selectedOption ===
                          "Alquiler de Fincas, Lotes, Predios o Terrenos" ||
                        selectedOption === "Alquiler de Bodegas o Similares" ||
                        selectedOption === "Venta de Bodegas o Similares" ||
                        selectedOption === "Alquiler de Edificios" ||
                        selectedOption === "Venta de Edificios" ||
                        selectedOption === "Alquiler de Locales Comerciales" ||
                        selectedOption === "Venta de Locales Comerciales" ||
                        selectedOption ===
                          "Venta de Lotes, Fincas,Terrenos y Predios" ||
                        selectedOption === "Alquiler de Casas y Apartamentos" ||
                        selectedOption === ""
                      }
                      defaultValue={property?.serviciosMedicos}
                      id="serviciosMedicos"
                      name="serviciosMedicos"
                      class="sr-only peer"
                    />
                    <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                    <span class="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                      Servicios médicos
                    </span>
                  </label>
                </div>
                <div className="m-1 justify-center items-center content-center flex self-start">
                  <label class="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      value=""
                      defaultValue={property?.areaCarga}
                      id="areaCarga"
                      disabled={
                        selectedOption === "Venta de Casas y Apartamentos" ||
                        selectedOption ===
                          "Alquiler de Fincas, Lotes, Predios o Terrenos" ||
                        selectedOption ===
                          "Venta de Oficinas o Consultorios Médicos" ||
                        selectedOption === "Alquiler de Edificios" ||
                        selectedOption === "Venta de Edificios" ||
                        selectedOption === "Alquiler de Locales Comerciales" ||
                        selectedOption === "Venta de Locales Comerciales" ||
                        selectedOption ===
                          "Venta de Lotes, Fincas,Terrenos y Predios" ||
                        selectedOption === "Alquiler de Casas y Apartamentos" ||
                        selectedOption === ""
                      }
                      name="areaCarga"
                      class="sr-only peer"
                    />
                    <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                    <span class="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                      Área carga
                    </span>
                  </label>
                </div>
              </div>
            </div>
            <Select
              className="categories lg:mx-80"
              name="amenidades"
              defaultValue={property?.amenidades}
              options={Amenidades}
              placeholder={"Amenidades"}
              isMulti
              isDisabled={
                selectedOption ===
                  "Alquiler de Fincas, Lotes, Predios o Terrenos" ||
                selectedOption ===
                  "Alquiler de Oficinas o Consultorios Médicos" ||
                selectedOption === "Venta de Oficinas o Consultorios Médicos" ||
                selectedOption === "Alquiler de Bodegas o Similares" ||
                selectedOption === "Venta de Bodegas o Similares" ||
                selectedOption === "Alquiler de Edificios" ||
                selectedOption === "Venta de Edificios" ||
                selectedOption === "Alquiler de Locales Comerciales" ||
                selectedOption === "Venta de Locales Comerciales" ||
                selectedOption ===
                  "Venta de Lotes, Fincas,Terrenos y Predios" ||
                selectedOption === ""
              }
              onChange={handleChangeAmenidades}
            />
            <div className="space mb-2.5">
              {errors.amenidades && touched.amenidades ? (
                <div className="errordiv text-xs">{errors.amenidades}</div>
              ) : null}
            </div>
            <Select
              className="categories lg:mx-80"
              name="jardinPatio"
              isDisabled={
                selectedOption ===
                  "Alquiler de Fincas, Lotes, Predios o Terrenos" ||
                selectedOption ===
                  "Alquiler de Oficinas o Consultorios Médicos" ||
                selectedOption === "Venta de Oficinas o Consultorios Médicos" ||
                selectedOption === "Alquiler de Bodegas o Similares" ||
                selectedOption === "Venta de Bodegas o Similares" ||
                selectedOption === "Alquiler de Edificios" ||
                selectedOption === "Venta de Edificios" ||
                selectedOption === "Alquiler de Locales Comerciales" ||
                selectedOption === "Venta de Locales Comerciales" ||
                selectedOption ===
                  "Venta de Lotes, Fincas,Terrenos y Predios" ||
                selectedOption === ""
              }
              defaultValue={property?.jardinPatio}
              options={PatioJardin}
              placeholder={"Patio"}
              isMulti
              onChange={handleChangePatioJardin}
            />
            <div className="space mb-2.5">
              {errors.jardinPatio && touched.jardinPatio ? (
                <div className="errordiv text-xs">{errors.jardinPatio}</div>
              ) : null}
            </div>
            <Select
              className="categories lg:mx-80"
              name="detallesInternos"
              isDisabled={
                selectedOption ===
                  "Alquiler de Fincas, Lotes, Predios o Terrenos" ||
                selectedOption ===
                  "Alquiler de Oficinas o Consultorios Médicos" ||
                selectedOption === "Venta de Oficinas o Consultorios Médicos" ||
                selectedOption === "Alquiler de Bodegas o Similares" ||
                selectedOption === "Venta de Bodegas o Similares" ||
                selectedOption === "Alquiler de Edificios" ||
                selectedOption === "Venta de Edificios" ||
                selectedOption === "Alquiler de Locales Comerciales" ||
                selectedOption === "Venta de Locales Comerciales" ||
                selectedOption ===
                  "Venta de Lotes, Fincas,Terrenos y Predios" ||
                selectedOption === ""
              }
              defaultValue={property?.detallesInternos}
              options={DetallesInternos}
              placeholder={"Detalles internos"}
              isMulti
              onChange={handleChangeDetallesInternos}
            />
            <div className="space mb-2.5">
              {errors.detallesInternos && touched.detallesInternos ? (
                <div className="errordiv text-xs">
                  {errors.detallesInternos}
                </div>
              ) : null}
            </div>
            <Select
              className="categories lg:mx-80"
              name="detallesExternos"
              defaultValue={property?.detallesExternos}
              options={DetallesExternos}
              placeholder={"Detalles externos"}
              isMulti
              isDisabled={
                selectedOption ===
                  "Alquiler de Fincas, Lotes, Predios o Terrenos" ||
                selectedOption ===
                  "Alquiler de Oficinas o Consultorios Médicos" ||
                selectedOption === "Venta de Oficinas o Consultorios Médicos" ||
                selectedOption === "Alquiler de Bodegas o Similares" ||
                selectedOption === "Venta de Bodegas o Similares" ||
                selectedOption === "Alquiler de Edificios" ||
                selectedOption === "Venta de Edificios" ||
                selectedOption === "Alquiler de Locales Comerciales" ||
                selectedOption === "Venta de Locales Comerciales" ||
                selectedOption ===
                  "Venta de Lotes, Fincas,Terrenos y Predios" ||
                selectedOption === ""
              }
              onChange={handleChangeDetallesExternos}
            />
            <div className="space mb-2.5">
              {errors.detallesExternos && touched.detallesExternos ? (
                <div className="errordiv text-xs">
                  {errors.detallesExternos}
                </div>
              ) : null}
            </div>
            <hr></hr>
            <div className="inset-y-0 mt-3 left-0 flex justify-center align-middle items-center pl-3">
              <div className="">
                <button
                  type="submit"
                  className="mr-2 mb-3 py-2 px-4 rounded bg-blue-700 text-white"
                >
                  Guardar los datos del inmueble
                </button>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default InsertProperty;
