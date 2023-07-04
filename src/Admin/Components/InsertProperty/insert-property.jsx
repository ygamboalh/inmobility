import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as Yup from "yup";

import { Spin, message } from "antd";
import { Formik, Form, Field } from "formik";

import { API } from "../../../constant";
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
} from "../../../BD/bd";
import Select from "react-select";
import PropertyLoadImage from "../../../components/UploadImage/property-upload-image";
import MySpinner from "../../../components/Spinner/spinner";
import axios from "axios";
import { getToken } from "../../../utils/helpers";

const InsertProperty = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const InsertPropertySchema = Yup.object().shape({
    provincia: Yup.string().required("*").min(6, "*").max(150, "*"),
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
    cuotaMantenimiento: Yup.number().min(0, "*").max(15, "*"),
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

  const [selectedPropertyType, setSelectedPropertyType] = useState("");

  const handleImageChange = (event) => {
    setImages(event.target.files);
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

  /* const [SelectedPropertyType, setSelectedPropertyType] = useState();
  const SelectedPropertyTypeF = (selected) => {
    switch (selected) {
      case selected.includes("Casa") ||
        selected.includes("Apartamento") ||
        selected.includes("Loft") ||
        selected.includes("Chalet"):
        setSelectedPropertyType(selected);
        return selected;
      case selected.includes("Lote") ||
        selected.includes("Finca") ||
        selected.includes("Terreno") ||
        selected.includes("Predio"):
        setSelectedPropertyType(selected);
        return selected;
      case selected.includes("Local") || selected.includes("Todo"):
        setSelectedPropertyType(selected);
        return selected;
      case selected.includes("Edificio"):
        setSelectedPropertyType(selected);
        return selected;
      case selected.includes("Bodega"):
        setSelectedPropertyType(selected);
        return selected;
      case selected.includes("Oficina") || selected.includes("Consultorio"):
        setSelectedPropertyType(selected);
        return selected;
      default:
        break;
    }
  }; */
  const handleImageSubmit = async (id) => {
    const formData = new FormData();
    for (let i = 0; i < images.length; i++) {
      formData.append(`${id}-imagen-${i}`, images[0]);
    }
    //formData.append("files", images);
    formData.append("ref", "api::property.property");
    formData.append("refId", id);
    formData.append("field", "photos");

    const upload = await axios({
      method: "POST",
      url: `${API}upload`,
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
      formData,
    });
  };
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
        photos: images,
      };

      if (!id) {
        const response = await AxiosInstance.post("/properties", {
          data: value,
        });

        if (response.status === 200) {
          /* const id = response.data.data.id;
          const handleResponse = handleImageSubmit(id);
          console.log(handleResponse); */

          message.success("¡La propiedad fue creada correctamente!");
          navigate("/admin/properties", { replace: true });
        } else {
          message.error("¡Ocurrió un error inesperado. Intente de nuevo!");
        }
      } else {
        const response = await AxiosInstance.put(`/properties/${id}`, {
          data: value,
        });
        if (response.status === 200) {
          message.success("¡La propiedad fue actualizada correctamente!");
          navigate("/admin/properties", { replace: true });
        } else {
          message.error("¡Ocurrió un error inesperado. Intente de nuevo!");
        }
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

      {/* <PropertyLoadImage /> */}

      <Formik
        initialValues={initialData}
        validationSchema={InsertPropertySchema}
        onSubmit={onFinish}
      >
        {({ errors, touched }) => (
          <Form onFinish={onFinish} autoComplete="off">
            <div className="items-center justify-center flex flex-row">
              <div className="profile-photo flex items-center w-fit justify-center">
                <label
                  for="dropzone-file"
                  className="flex flex-col items-center justify-center w-full h-24 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                >
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <svg
                      aria-hidden="true"
                      class="w-10 h-10 mb-3 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                      ></path>
                    </svg>
                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                      <span className="font-semibold">Agregar imagen</span>
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {images?.length === 0 || !images ? (
                        <span className="px-6">No hay imágenes</span>
                      ) : (
                        <span className="font-semibold px-6">{`${images?.length} imágenes seleccionadas`}</span>
                      )}
                    </p>
                  </div>
                  <input
                    id="dropzone-file"
                    type="file"
                    multiple
                    className="hidden"
                    name="files"
                    accept=".jpg,.png"
                    onChange={handleImageChange}
                  />
                </label>
              </div>
            </div>

            <div className="flex justify-center w-screen flex-row content-center items-center">
              <Field
                as="select"
                name="categories"
                value={selectedOption}
                onChange={handleOptionSelectChange}
                className="input-admin-property  m-2 w-80 sm:w-1/3 md:w-1/4 lg:w-1/3 p-2"
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
              {/*  <div class="relative mb-6">
                <input
                  type="text"
                  class=" border  border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full pl-2 p-2.5 "
                  placeholder="name@flowbite.com"
                />
                <div class="absolute inset-y-0 right-2 flex items-center pl-3 pointer-events-none">
                  m<sup>2</sup>
                </div>
              </div> */}
              <Field
                type="text"
                hidden={selectedOption === ""}
                name="provincia"
                defaultInputValue={property?.provincia}
                placeholder="Provincia"
                className="input-admin-property  m-2 w-80 sm:w-1/3 md:w-1/4 lg:w-1/6 p-2"
              />

              <div className="space mb-2.5">
                {errors.provincia && touched.provincia ? (
                  <div className="errordiv text-xs">{errors.provincia}</div>
                ) : null}
              </div>
              <Field
                type="text"
                hidden={selectedOption === ""}
                name="canton"
                defaultInputValue={property?.canton}
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
                defaultInputValue={property?.distrito}
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
                defaultInputValue={property?.precio}
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
                defaultInputValue={property?.areaTerreno}
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
                defaultInputValue={property?.tipoPropiedad}
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
                defaultInputValue={property?.tipoBodega}
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
                defaultInputValue={property?.tipoLote}
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
                defaultInputValue={property?.tipoOficina}
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
                defaultInputValue={property?.areaPropiedad}
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
                defaultInputValue={property?.tipoEdificio}
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
                defaultInputValue={property?.tipoLocal}
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
                defaultInputValue={property?.cochera}
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
                defaultInputValue={property?.areaContruccion}
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
                defaultInputValue={property?.habitaciones}
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
                defaultInputValue={property?.banos}
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
                defaultInputValue={property?.amueblado}
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
                defaultInputValue={property?.aptoHijos}
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
                defaultInputValue={property?.parqueo}
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
                defaultInputValue={property?.aptoMascotas}
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
                defaultInputValue={property?.cuotaMantenimiento}
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
                defaultInputValue={property?.areaBodega}
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
                defaultInputValue={property?.altura}
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
                defaultInputValue={property?.concepcionElectrica}
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
                defaultInputValue={property?.areaPlantas}
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
                defaultInputValue={property?.numeroPlantas}
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
                defaultInputValue={property?.propositoTerreno}
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
                defaultInputValue={property?.ubicacionCastral}
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
                defaultInputValue={property?.ubicacionDemografica}
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
                defaultInputValue={property?.ubicacionGeografica}
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
                defaultInputValue={property?.active}
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
                defaultInputValue={property?.areaMesanini}
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
                defaultInputValue={property?.areaSotano}
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
                className="input-admin-property  m-2 w-80 sm:w-1/3 md:w-1/4 lg:w-1/3 p-2"
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
                className="input-admin-property  m-2 w-80 sm:w-1/3 md:w-1/4 lg:w-1/3 p-2"
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
                defaultInputValue={property?.anunciante}
                name="anunciante"
                hidden={selectedOption === ""}
                className="input-admin-property  m-2 w-80 sm:w-1/3 md:w-1/4 lg:w-1/6 p-2"
              />
              <div className="space mb-2.5">
                {errors.anunciante && touched.anunciante ? (
                  <div className="errordiv text-xs">{errors.anunciante}</div>
                ) : null}
              </div>
              <div className="flex flex-wrap  w-full justify-center">
                <div className="m-1 w-60 sm:w-1/3 md:w-1/4 lg:w-1/6 p-2">
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
                <div className="m-1 w-60 sm:w-1/3 md:w-1/4 lg:w-1/6 p-2">
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
                <div className="m-1 w-60 sm:w-1/3 md:w-1/4 lg:w-1/6 p-2">
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
            {/* <Select
              className="categories "
              name="categories"
              defaultInputValue={property?.categories}
              options={categories}
              placeholder={"Categorías"}
              isMulti
              onChange={handleChangeCategory}
            />
            <div className="space mb-2.5 ">
              {errors.categories && touched.categories ? (
                <div className="errordiv text-xs">{errors.categories}</div>
              ) : null}
            </div> */}
            <Select
              className="categories"
              name="amenidades"
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
              className="categories"
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
              defaultInputValue={property?.jardinPatio}
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
              className="categories"
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
              defaultInputValue={property?.detallesInternos}
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
              className="categories"
              name="detallesExternos"
              defaultInputValue={property?.detallesExternos}
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
