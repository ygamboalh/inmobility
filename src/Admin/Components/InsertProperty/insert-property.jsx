import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import * as Yup from "yup";
import Select from "react-select";
import { message } from "antd";
import { Formik, useFormik } from "formik";

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
  PropertyEstado,
  TipoPiso,
  TipoVivienda,
} from "../../../BD/bd";

import MySpinner from "../../../components/Spinner/spinner";
import axios from "axios";
import { createNotification, getToken } from "../../../utils/helpers";
import { useQuery } from "react-query";
import { authUserData } from "../../../api/usersApi";
import enviarCorreoPersonalizado from "../../../utils/email/send-personalized-email";
import MetaData from "../../../components/Metadata/metadata";

const InsertProperty = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const idregex = /^[a-zA-Z0-9-]+$/;

  const [selectedOption, setSelectedOption] = useState("");

  const [category, setCategory] = useState();
  const [categoriesDB, setCategoriesDB] = useState({});
  const [amenidades, setAmenidades] = useState({});
  const [patio, setPatio] = useState({});
  const [detallesInternos, setDetallesInternos] = useState({});
  const [detallesExternos, setDetallesExternos] = useState({});
  const [property, setProperty] = useState();
  const [menuIsOpen, setMenuIsOpen] = useState(false);

  const [createdPropertyId, setCreatedPropertyId] = useState(null);
  const [userRole, setUserRole] = useState();
  const [selectedPropertyType, setSelectedPropertyType] = useState("");
  const { data: userData } = useQuery("profile", authUserData);
  const userId = userData?.id;
  const anunciante = userData?.email;

  const response = axios(`${API}/users/me?populate=role`, {
    method: "GET",
    headers: { Authorization: `${BEARER} ${getToken()}` },
  }).then((response) => {
    setUserRole(response.data.role.name);
  });

  const handleHouseProperty = (event) => {
    const option = event.target.value;
    setSelectedPropertyType(option);
  };
  const handleFincaProperty = (event) => {
    const option = event.target.value;

    if (option) {
      setSelectedPropertyType(option);
    }
  };
  const handleLocalesProperty = (event) => {
    const option = event.target.value;

    if (option) {
      setSelectedPropertyType(option);
    }
  };
  const handleBodegasProperty = (event) => {
    const option = event.target.value;

    if (option) {
      setSelectedPropertyType(option);
    }
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

  const handleChangeAmenidades = (selectedOption) => {
    setAmenidades(selectedOption);
  };
  const handleChangePatioJardin = (selectedOption) => {
    setPatio(selectedOption);

    if (patio.length === 3) {
      setMenuIsOpen(false);
    }
  };
  const handleChangeDetallesInternos = (selectedOption) => {
    setDetallesInternos(selectedOption);
  };
  const handleChangeDetallesExternos = (selectedOption) => {
    setDetallesExternos(selectedOption);
  };

  const { handleChange, handleSubmit, values, errors, touched } = useFormik({
    initialValues: {
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
      Anunciante: property?.anunciante,
      categories:
        property?.data?.data?.attributes?.categories?.data[0]?.attributes
          ?.nombre,

      active: property?.active,
      areaTerreno: property?.areaTerreno,
      uniqueId: property?.uniqueId,
      descripcion: property?.descripcion,
      moneda: property?.moneda,
      monedaAlquiler: property?.monedaAlquiler,
      monedaAlquilerCompra: property?.monedaAlquilerCompra,
      monedaCuotaMantenimiento: property?.monedaCuotaMantenimiento,
      ubicacionDetallada: property?.ubicacionDetallada,
      vistaPanoramica: property?.vistaPanoramica,
      tomadaExclusividad: property?.tomadaExclusividad,
      precioAlquiler: property?.precioAlquiler,
      precioAlquilerCompra: property?.precioAlquilerCompra,
      tipoPiso: property?.tipoPiso,
      duenoFinanciaCompra: property?.duenoFinanciaCompra,
      duenoRecibeVehiculo: property?.duenoRecibeVehiculo,
      tieneCuotaMantenimiento: property?.tieneCuotaMantenimiento,
      avaluo: property?.avaluo,
      avaluoMoneda: property?.avaluoMoneda,
      ivaVenta: property?.ivaVenta,
      ivaAlquiler: property?.ivaAlquiler,
      tipoVivienda: property?.tipoVivienda,
    },
    validationSchema: Yup.object({
      provincia: Yup.string().required("*"),
      canton: Yup.string().required("*").min(6, "*").max(150, "*"),
      descripcion: Yup.string().min(10, "*").max(1000, "*"),
      distrito: Yup.string().required("*").min(6, "*").max(150, "*"),
      precio: Yup.number().required("*").min(0, "*").max(2000000, "*"),
      areaTerreno: Yup.number().required("*").min(0, "*").max(500000, "*"),

      uniqueId: Yup.string()
        .matches(idregex, "*")
        .required("*")
        .min(1, "*")
        .max(20, "*"),
      //active: Yup.string().required("*"),
      //habitaciones: Yup.number().min(0, "*").max(15, "*"),
      //areaPropiedad: Yup.string().min(0, "*").max(10000, "*"),
      //areaContruccion: Yup.number().min(0, "*").max(100000, "*"),
      //banos: Yup.number().min(0, "*").max(10, "*"),
      //cuotaMantenimiento: Yup.number().min(0, "*").max(500000, "*"),
      //areaBodega: Yup.number().min(0, "*").max(10000000, "*"),
      //altura: Yup.number().min(0, "*").max(500, "*"),
      //areaPlantas: Yup.number().min(0, "*").max(100000, "*"),
      //numeroPlantas: Yup.number().min(0, "*").max(100, "*"),
      //areaMesanini: Yup.number().min(0, "*").max(6000, "*"),
      //areaSotano: Yup.number().min(0, "*").max(6000, "*"),
    }),
    enableReinitialize: id ? true : false,
    onSubmit: async (values) => {
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
          areaTerreno: values.areaTerreno,
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
          Anunciante: anunciante,
          categories: catFounded,
          active: values.active,
          creadoPor: userId,
          uniqueId: values.uniqueId,
          descripcion: values.descripcion,
          moneda: values.moneda,
          monedaAlquiler: values?.monedaAlquiler,
          monedaAlquilerCompra: values?.monedaAlquilerCompra,
          monedaCuotaMantenimiento: values?.monedaCuotaMantenimiento,
          ubicacionDetallada: values.ubicacionDetallada,
          vistaPanoramica: values.vistaPanoramica,
          tomadaExclusividad: values.tomadaExclusividad,
          precioAlquiler: values.precioAlquiler,
          precioAlquilerCompra: values.precioAlquilerCompra,
          tipoPiso: values.tipoPiso,
          duenoFinanciaCompra: values.duenoFinanciaCompra,
          duenoRecibeVehiculo: values.duenoRecibeVehiculo,
          tieneCuotaMantenimiento: values?.tieneCuotaMantenimiento,
          avaluo: values?.avaluo,
          avaluoMoneda: values?.avaluoMoneda,
          ivaVenta: values?.ivaVenta,
          ivaAlquiler: values?.ivaAlquiler,
          tipoVivienda: values?.tipoVivienda,
        };

        if (!id) {
          console.log("valores", value);
          const response = await AxiosInstance.post("/properties", {
            data: value,
          })
            .then((respons) => {
              message.success("¡La propiedad fue creada correctamente!");

              const property = respons.data.data.attributes;
              const body = `El siguiente inmueble fue creado por el usuario: ${userData.email}`;
              enviarCorreoPersonalizado(
                "infosistemacic@gmail.com",
                property,
                body
              );
              const propertyId = respons.data.data.id;
              setCreatedPropertyId(propertyId);
              createNotification(
                "Creación",
                `Se ha creado la propiedad ${respons.data.data.attributes.uniqueId}`,
                propertyId,
                null
              );
              if (userRole === "SuperAdmin") {
                navigate(`/admin/upload/${propertyId}`, { replace: true });
              } else {
                navigate(`/home/upload/${propertyId}`, { replace: true });
              }
            })
            .catch((error) => {
              console.log(error);
              message.error("¡Ocurrió un error inesperado. Intente de nuevo!");
            });
        } else {
          let tipo = "";
          selectedPropertyType !== ""
            ? (tipo = selectedPropertyType)
            : (tipo = values?.tipoPropiedad);
          let newAmenidades = {};
          Object.keys(amenidades).length !== 0
            ? (newAmenidades = amenidades)
            : (newAmenidades = property?.amenidades);
          let newPatio = {};
          Object.keys(patio).length !== 0
            ? (newPatio = patio)
            : (newPatio = property?.jardinPatio);
          let newDetallesInternos = {};
          Object.keys(detallesInternos).length !== 0
            ? (newDetallesInternos = detallesInternos)
            : (newDetallesInternos = property?.detallesInternos);
          let newDetallesExternos = {};
          Object.keys(detallesExternos).length !== 0
            ? (newDetallesExternos = detallesExternos)
            : (newDetallesExternos = property?.detallesExternos);
          const value = {
            provincia: values.provincia,
            canton: values.canton,
            distrito: values.distrito,
            precio: values.precio,
            tipoPropiedad: tipo,
            amenidades: newAmenidades,
            areaPropiedad: values.areaPropiedad,
            areaTerreno: values.areaTerreno,
            areaContruccion: values.areaContruccion,
            habitaciones: values.habitaciones,
            cochera: values.cochera,
            usoDeSuelo: values.usoDeSuelo,
            banos: values.banos,
            jardinPatio: newPatio,
            parqueo: values.parqueo,
            ley7600: values.ley7600,
            detallesInternos: newDetallesInternos,
            detallesExternos: newDetallesExternos,
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
            Anunciante: anunciante,
            categories: [property?.categories.data[0].id],
            active: values.active,
            creadoPor: userId,
            uniqueId: values.uniqueId,
            descripcion: values.descripcion,
            moneda: values.moneda,
            monedaAlquiler: values?.monedaAlquiler,
            monedaAlquilerCompra: values?.monedaAlquilerCompra,
            monedaCuotaMantenimiento: values?.monedaCuotaMantenimiento,
            ubicacionDetallada: values.ubicacionDetallada,
            vistaPanoramica: values.vistaPanoramica,
            tomadaExclusividad: values.tomadaExclusividad,
            precioAlquiler: values.precioAlquiler,
            precioAlquilerCompra: values.precioAlquilerCompra,
            tipoPiso: values.tipoPiso,
            tieneCuotaMantenimiento: values?.tieneCuotaMantenimiento,
            avaluo: values.avaluo,
            avaluoMoneda: values.avaluoMoneda,
            ivaVenta: values.ivaVenta,
            ivaAlquiler: values.ivaAlquiler,
            tipoVivienda: values?.tipoVivienda,
          };
          const response = await AxiosInstance.put(`/properties/${id}`, {
            data: value,
          })
            .then((response) => {
              message.success("¡La propiedad fue actualizada correctamente!");
              createNotification(
                "Actualización",
                `Se ha actualizado la propiedad ${response.data.data.attributes.uniqueId}`,
                id,
                null
              );
              const property = response.data.data.attributes;
              const body = `El siguiente inmueble fue modificado por el usuario: ${userData.email}`;
              enviarCorreoPersonalizado(
                "infosistemacic@gmail.com",
                property,
                body
              );
              if (
                userRole === "SuperAdmin" ||
                userData.active === "Super Administrador"
              ) {
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
    },
  });
  useEffect(() => {
    console.log("el id", id);
    if (!id) {
      handleSubmit();
    }
    const response = AxiosInstance.get(`properties/${id}?populate=*`)
      .then((property) => {
        setProperty(property?.data?.data?.attributes);
        const category =
          property?.data?.data?.attributes.categories.data[0].attributes.nombre;
        setCategory(category);
        setSelectedOption(category);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    fetch(`${API}categories`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`,
      },
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

  if (isLoading || (id && !property)) {
    return <MySpinner />;
  }

  return (
    <div className="flex flex-col justify-center items-center h-fit">
      <MetaData
        title="Insertar o editar propiedad"
        description="Insertar o editar propiedad"
      />
      <div className="inset-y-0 mb-20 left-0 flex h-fit justify-center align-middle items-center pl-3"></div>
      <div className="flex mt-3 justify-center align-middle items-center w-full">
        <label className="font-semibold text-xl">
          Crear o editar una propiedad
        </label>
      </div>
      <form onSubmit={handleSubmit} autoComplete="off">
        <div className="flex justify-center  flex-row content-center items-center">
          <select
            name="categories"
            value={selectedOption}
            disabled={category}
            defaultValue={category}
            onChange={handleOptionSelectChange}
            className="categories m-2 w-full text-gray-500  md:w-fit lg:mx-80"
          >
            <option value="" label="">
              {"Seleccione la categoría"}
            </option>
            {categories.map((item) => (
              <option value={item.value} label={item.label}>
                {item.value}
              </option>
            ))}
          </select>
          <div className={selectedOption === "" ? "hidden" : "space mb-2.5"}>
            {errors.categories && touched.categories ? (
              <div className="-ml-1.5 text-red-500 mt-4 text-xs">
                {errors.categories}
              </div>
            ) : null}
          </div>
        </div>
        <div className="flex flex-wrap justify-center m-3">
          <input
            type="text"
            defaultValue={property?.uniqueId}
            value={values.uniqueId}
            onChange={handleChange}
            hidden={selectedOption === ""}
            name="uniqueId"
            placeholder="Identificador único"
            className="input-admin-property text-gray-500 ml-1 m-2 w-80 sm:w-1/3 md:w-1/4 lg:w-1/6 p-2"
          />
          <div className={selectedOption === "" ? "hidden" : "space mb-2.5"}>
            {errors.uniqueId && touched.uniqueId ? (
              <div className="errordiv text-xs">{errors.uniqueId}</div>
            ) : null}
          </div>
          <select
            defaultValue={property?.provincia}
            hidden={selectedOption === ""}
            name="provincia"
            onChange={handleChange}
            selectedOption={property?.provincia}
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
          <div className={selectedOption === "" ? "hidden" : "space mb-2.5"}>
            {errors.provincia && touched.provincia ? (
              <div className="errordiv text-xs">{errors.provincia}</div>
            ) : null}
          </div>

          <input
            type="text"
            defaultValue={property?.canton}
            onChange={handleChange}
            hidden={selectedOption === ""}
            name="canton"
            placeholder="Cantón"
            className="input-admin-property text-gray-500 m-2 w-80 sm:w-1/3 md:w-1/4 lg:w-1/6 p-2"
          />
          <div className={selectedOption === "" ? "hidden" : "space mb-2.5"}>
            {errors.canton && touched.canton ? (
              <div className="errordiv text-xs">{errors.canton}</div>
            ) : null}
          </div>
          <input
            type="text"
            onChange={handleChange}
            hidden={selectedOption === ""}
            name="distrito"
            defaultValue={property?.distrito}
            placeholder="Distrito"
            className="input-admin-property text-gray-500 m-2 w-80 sm:w-1/3 md:w-1/4 lg:w-1/6 p-2"
          />
          <div className={selectedOption === "" ? "hidden" : "space mb-2.5"}>
            {errors.distrito && touched.distrito ? (
              <div className="errordiv text-xs">{errors.distrito}</div>
            ) : null}
          </div>
          <input
            type="text"
            name="ubicacionDetallada"
            defaultValue={property?.ubicacionDetallada}
            placeholder="Ubicación detallada"
            hidden={selectedOption === ""}
            className="input-admin-property text-gray-500 m-2 w-80 sm:w-1/3 md:w-1/4 lg:w-1/6 p-2"
          />
          {/* <div className="space mb-2.5">
            {errors.ubicacionDetallada && touched.ubicacionDetallada ? (
              <div className="errordiv text-xs">
                {errors.ubicacionDetallada}
              </div>
            ) : null}
          </div> */}
          <input
            type="number"
            hidden={selectedOption === ""}
            name="areaTerreno"
            onChange={handleChange}
            defaultValue={property?.areaTerreno}
            placeholder="Área del terreno"
            className="input-admin-property text-gray-500 m-2 w-80 sm:w-1/3 md:w-1/4 lg:w-1/6 p-2"
          />
          <div className={selectedOption === "" ? "hidden" : "space mb-2.5"}>
            {errors.areaTerreno && touched.areaTerreno ? (
              <div className="errordiv text-xs">{errors.areaTerreno}</div>
            ) : null}
          </div>
          <select
            hidden={
              selectedOption === "" ||
              selectedOption === "Venta de Lotes, Fincas,Terrenos y Predios" ||
              selectedOption ===
                "Alquiler de Fincas, Lotes, Predios o Terrenos" ||
              selectedOption === "Venta de Locales Comerciales" ||
              selectedOption === "Alquiler de Locales Comerciales" ||
              selectedOption === "Venta de Edificios" ||
              selectedOption === "Alquiler de Edificios" ||
              selectedOption === "Venta de Bodegas o Similares" ||
              selectedOption === "Alquiler de Bodegas o Similares" ||
              selectedOption === "Venta de Oficinas o Consultorios Médicos" ||
              selectedOption === "Alquiler de Oficinas o Consultorios Médicos"
            }
            name="tipoPropiedad"
            onChange={handleHouseProperty}
            defaultValue={property?.tipoPropiedad}
            placeholder="Tipo de propiedad"
            className="input-admin-property text-gray-500 m-2 w-80 sm:w-1/3 md:w-1/4 lg:w-1/6 p-2"
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
          <select
            hidden={selectedOption === ""}
            name="tipoPiso"
            onChange={handleChange}
            defaultValue={property?.tipoPiso}
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
          <select
            hidden={
              selectedOption === "Venta de Oficinas o Consultorios Médicos" ||
              selectedOption === "" ||
              selectedOption === "Venta de Casas y Apartamentos" ||
              selectedOption === "Alquiler de Casas y Apartamentos" ||
              selectedOption === "Venta de Lotes, Fincas,Terrenos y Predios" ||
              selectedOption ===
                "Alquiler de Fincas, Lotes, Predios o Terrenos" ||
              selectedOption === "Venta de Locales Comerciales" ||
              selectedOption === "Alquiler de Locales Comerciales" ||
              selectedOption === "Venta de Edificios" ||
              selectedOption === "Alquiler de Edificios" ||
              selectedOption === "Alquiler de Oficinas o Consultorios Médicos"
            }
            onChange={handleBodegasProperty}
            name="tipoBodega"
            defaultValue={property?.tipoPropiedad}
            className="input-admin-property text-gray-500 m-2 w-80 sm:w-1/3 md:w-1/4 lg:w-1/6 p-2"
          >
            <option value="" label="">
              {"Tipo de inmueble ( Bodega )"}
            </option>
            {Bodega.map((item) => (
              <option value={item.value} label={item.label}>
                {item.value}
              </option>
            ))}
          </select>
          <select
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
              selectedOption === "Venta de Oficinas o Consultorios Médicos" ||
              selectedOption === "Alquiler de Oficinas o Consultorios Médicos"
            }
            onChange={handleFincaProperty}
            name="tipoLote"
            defaultValue={property?.tipoPropiedad}
            className="input-admin-property text-gray-500 m-2 w-80 sm:w-1/3 md:w-1/4 lg:w-1/6 p-2"
          >
            <option value="" label="">
              {"Tipo de inmueble ( Lotes )"}
            </option>
            {TipoLote.map((item) => (
              <option value={item.value} label={item.label}>
                {item.value}
              </option>
            ))}
          </select>
          {/*  <div className={selectedOption === "" ? "hidden" : "space mb-2.5"}>
            {errors.tipoLote && touched.tipoLote ? (
              <div className="errordiv text-xs">{errors.tipoLote}</div>
            ) : null}
          </div> */}
          <select
            hidden={
              selectedOption === "" ||
              selectedOption === "Venta de Casas y Apartamentos" ||
              selectedOption === "Alquiler de Casas y Apartamentos" ||
              selectedOption === "Venta de Lotes, Fincas,Terrenos y Predios" ||
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
            defaultValue={property?.tipoPropiedad}
            className="input-admin-property text-gray-500 m-2 w-80 sm:w-1/3 md:w-1/4 lg:w-1/6 p-2"
          >
            <option value="" label="">
              {"Tipo de inmueble ( Oficina )"}
            </option>
            {Oficina.map((item) => (
              <option value={item.value} label={item.label}>
                {item.value}
              </option>
            ))}
          </select>
          <input
            type="number"
            name="areaPropiedad"
            defaultValue={property?.areaPropiedad}
            onChange={handleChange}
            max={10000}
            placeholder="Área de la propiedad"
            hidden={
              selectedOption ===
                "Alquiler de Fincas, Lotes, Predios o Terrenos" ||
              selectedOption === "Venta de Locales Comerciales" ||
              selectedOption === "Venta de Lotes, Fincas,Terrenos y Predios" ||
              selectedOption === "Alquiler de Casas y Apartamentos" ||
              selectedOption === "Venta de Casas y Apartamentos" ||
              selectedOption === ""
            }
            className="input-admin-property text-gray-500 m-2 w-80 sm:w-1/3 md:w-1/4 lg:w-1/6 p-2"
          />
          {/*  <div className="space mb-2.5">
            {errors.areaPropiedad && touched.areaPropiedad ? (
              <div className="errordiv text-xs">{errors.areaPropiedad}</div>
            ) : null}
          </div> */}

          <select
            name="tipoEdificio"
            hidden={
              selectedOption ===
                "Alquiler de Oficinas o Consultorios Médicos" ||
              selectedOption === "Venta de Oficinas o Consultorios Médicos" ||
              selectedOption === "Alquiler de Bodegas o Similares" ||
              selectedOption === "" ||
              selectedOption === "Venta de Casas y Apartamentos" ||
              selectedOption === "Alquiler de Casas y Apartamentos" ||
              selectedOption === "Venta de Lotes, Fincas,Terrenos y Predios" ||
              selectedOption ===
                "Alquiler de Fincas, Lotes, Predios o Terrenos" ||
              selectedOption === "Venta de Locales Comerciales" ||
              selectedOption === "Alquiler de Locales Comerciales" ||
              selectedOption === "Venta de Bodegas o Similares"
            }
            onChange={handleEdificioProperty}
            defaultValue={property?.tipoPropiedad}
            className="input-admin-property text-gray-500 m-2 w-80 sm:w-1/3 md:w-1/4 lg:w-1/6 p-2"
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
          <select
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
              selectedOption === "Venta de Lotes, Fincas,Terrenos y Predios" ||
              selectedOption ===
                "Alquiler de Fincas, Lotes, Predios o Terrenos" ||
              selectedOption === "Venta de Edificios" ||
              selectedOption === "Alquiler de Edificios" ||
              selectedOption === "Venta de Bodegas o Similares" ||
              selectedOption === "Alquiler de Bodegas o Similares" ||
              selectedOption === "Venta de Oficinas o Consultorios Médicos" ||
              selectedOption === "Alquiler de Oficinas o Consultorios Médicos"
            }
            defaultValue={property?.tipoPropiedad}
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
          {/* <div className="space mb-2.5">
            {errors.tipoLocal && touched.tipoLocal ? (
              <div className="errordiv text-xs">{errors.tipoLocal}</div>
            ) : null}
          </div> */}
          <select
            name="tipoVivienda"
            onChange={handleChange}
            hidden={
              selectedOption === "" ||
              selectedOption === "Venta de Lotes, Fincas,Terrenos y Predios" ||
              selectedOption ===
                "Alquiler de Fincas, Lotes, Predios o Terrenos" ||
              selectedOption === "Venta de Edificios" ||
              selectedOption === "Venta de Locales Comerciales" ||
              selectedOption === "Alquiler de Locales Comerciales" ||
              selectedOption === "Alquiler de Edificios" ||
              selectedOption === "Venta de Bodegas o Similares" ||
              selectedOption === "Alquiler de Bodegas o Similares" ||
              selectedOption === "Venta de Oficinas o Consultorios Médicos" ||
              selectedOption === "Alquiler de Oficinas o Consultorios Médicos"
            }
            defaultValue={property?.tipoVivienda}
            className="input-admin-property text-gray-500 m-2 w-80 sm:w-1/3 md:w-1/4 lg:w-1/6 p-2"
          >
            <option value="" label="">
              {"Tipo de vivienda"}
            </option>
            {TipoVivienda.map((item) => (
              <option value={item.value} label={item.label}>
                {item.value}
              </option>
            ))}
          </select>
          <select
            hidden={
              selectedOption === "Alquiler de Edificios" ||
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
              selectedOption === "Venta de Lotes, Fincas,Terrenos y Predios" ||
              selectedOption === ""
            }
            name="cochera"
            defaultValue={property?.cochera}
            onChange={handleChange}
            className="input-admin-property text-gray-500 m-2 w-80 sm:w-1/3 md:w-1/4 lg:w-1/6 p-2"
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
          {/* <div className="space mb-2.5">
            {errors.cochera && touched.cochera ? (
              <div className="errordiv text-xs">{errors.cochera}</div>
            ) : null}
          </div> */}
          <input
            type="number"
            hidden={
              selectedOption ===
                "Alquiler de Fincas, Lotes, Predios o Terrenos" ||
              selectedOption ===
                "Alquiler de Oficinas o Consultorios Médicos" ||
              selectedOption === "Venta de Oficinas o Consultorios Médicos" ||
              selectedOption === "Alquiler de Locales Comerciales" ||
              selectedOption === "Venta de Lotes, Fincas,Terrenos y Predios" ||
              selectedOption === "Alquiler de Casas y Apartamentos" ||
              selectedOption === ""
            }
            name="areaContruccion"
            defaultValue={property?.areaContruccion}
            placeholder="Área construcción"
            onChange={handleChange}
            max={100000}
            className="input-admin-property text-gray-500  m-2 w-80 sm:w-1/3 md:w-1/4 lg:w-1/6 p-2"
          />
          {/* <div className="space mb-2.5">
            {errors.areaContruccion && touched.areaContruccion ? (
              <div className="errordiv text-xs">{errors.areaContruccion}</div>
            ) : null}
          </div> */}
          <input
            type="number"
            name="habitaciones"
            defaultValue={property?.habitaciones}
            onChange={handleChange}
            placeholder="Habitaciones"
            max={15}
            hidden={
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
              selectedOption === "Venta de Lotes, Fincas,Terrenos y Predios" ||
              selectedOption === ""
            }
            className="input-admin-property text-gray-500 m-2 w-80 sm:w-1/3 md:w-1/4 lg:w-1/6 p-2"
          />
          {/* <div className="space mb-2.5">
            {errors.habitaciones && touched.habitaciones ? (
              <div className="errordiv text-xs">{errors.habitaciones}</div>
            ) : null}
          </div> */}
          <input
            type="number"
            name="banos"
            onChange={handleChange}
            defaultValue={property?.banos}
            placeholder="Baños"
            max={10}
            hidden={
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
              selectedOption === "Venta de Lotes, Fincas,Terrenos y Predios" ||
              selectedOption === ""
            }
            className="input-admin-property text-gray-500 m-2 w-80 sm:w-1/3 md:w-1/4 lg:w-1/6 p-2"
          />
          {/* <div className="space mb-2.5">
            {errors.banos && touched.banos ? (
              <div className="errordiv text-xs">{errors.banos}</div>
            ) : null}
          </div> */}

          <select
            name="amueblado"
            id="amueblado"
            defaultValue={property?.amueblado}
            onChange={handleChange}
            placeholder="Amueblado"
            hidden={selectedOption !== "Alquiler de Casas y Apartamentos"}
            className="input-admin-property text-gray-500  m-2 w-80 sm:w-1/3 md:w-1/4 lg:w-1/6 p-2"
          >
            <option value="" label="">
              {"Amueblado"}
            </option>
            {Amueblado.map((item) => (
              <option value={item.value} label={item.label}>
                {item.value}
              </option>
            ))}
          </select>
          {/* <div className="space mb-2.5">
            {errors.amueblado && touched.amueblado ? (
              <div className="errordiv text-xs">{errors.amueblado}</div>
            ) : null}
          </div> */}
          <select
            name="aptoHijos"
            hidden={
              selectedOption === "Venta de Oficinas o Consultorios Médicos" ||
              selectedOption === "Alquiler de Bodegas o Similares" ||
              selectedOption === "Venta de Bodegas o Similares" ||
              selectedOption === "Alquiler de Edificios" ||
              selectedOption === "" ||
              selectedOption === "Venta de Casas y Apartamentos" ||
              selectedOption === "Venta de Lotes, Fincas,Terrenos y Predios" ||
              selectedOption ===
                "Alquiler de Fincas, Lotes, Predios o Terrenos" ||
              selectedOption === "Venta de Locales Comerciales" ||
              selectedOption === "Alquiler de Locales Comerciales" ||
              selectedOption === "Venta de Edificios" ||
              selectedOption === "Alquiler de Oficinas o Consultorios Médicos"
            }
            defaultValue={property?.aptoHijos}
            onChange={handleChange}
            id="aptoHijos"
            placeholder="Apto hijos"
            className="input-admin-property text-gray-500 m-2 w-80 sm:w-1/3 md:w-1/4 lg:w-1/6 p-2"
          >
            <option value="" label="">
              {"Apto hijos"}
            </option>
            {AptoNinos.map((item) => (
              <option value={item.value} label={item.label}>
                {item.value}
              </option>
            ))}
          </select>
          {/* <div className="space mb-2.5">
            {errors.aptoHijos && touched.aptoHijos ? (
              <div className="errordiv text-xs">{errors.aptoHijos}</div>
            ) : null}
          </div> */}
          <select
            name="parqueo"
            hidden={
              selectedOption ===
                "Alquiler de Fincas, Lotes, Predios o Terrenos" ||
              selectedOption === "Venta de Lotes, Fincas,Terrenos y Predios" ||
              selectedOption === "Alquiler de Casas y Apartamentos" ||
              selectedOption === "Venta de Casas y Apartamentos" ||
              selectedOption === ""
            }
            defaultValue={property?.parqueo}
            id="parqueo"
            onChange={handleChange}
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
          {/* <div className="space mb-2.5">
            {errors.parqueo && touched.parqueo ? (
              <div className="errordiv text-xs">{errors.parqueo}</div>
            ) : null}
          </div> */}
          <select
            hidden={
              selectedOption === "Alquiler de Edificios" ||
              selectedOption === "Venta de Casas y Apartamentos" ||
              selectedOption === "" ||
              selectedOption === "Venta de Lotes, Fincas,Terrenos y Predios" ||
              selectedOption ===
                "Alquiler de Fincas, Lotes, Predios o Terrenos" ||
              selectedOption === "Venta de Locales Comerciales" ||
              selectedOption === "Alquiler de Locales Comerciales" ||
              selectedOption === "Venta de Edificios" ||
              selectedOption === "Venta de Bodegas o Similares" ||
              selectedOption === "Alquiler de Bodegas o Similares" ||
              selectedOption === "Venta de Oficinas o Consultorios Médicos" ||
              selectedOption === "Alquiler de Oficinas o Consultorios Médicos"
            }
            name="aptoMascotas"
            defaultValue={property?.aptoMascotas}
            onChange={handleChange}
            id="aptoMascotas"
            placeholder="Apto mascotas"
            className="input-admin-property text-gray-500 m-2 w-80 sm:w-1/3 md:w-1/4 lg:w-1/6 p-2"
          >
            <option value="" label="">
              {"Apto mascotas"}
            </option>
            {AptoMascotas.map((item) => (
              <option value={item.value} label={item.label}>
                {item.value}
              </option>
            ))}
          </select>
          <div className="space mb-2.5">
            {errors.aptoMascotas && touched.aptoMascotas ? (
              <div className="errordiv text-xs">{errors.aptoMascotas}</div>
            ) : null}
          </div>
          <input
            type="number"
            name="areaBodega"
            defaultValue={property?.areaBodega}
            max={10000000}
            onChange={handleChange}
            placeholder="Área bodega"
            hidden={
              selectedOption ===
                "Alquiler de Fincas, Lotes, Predios o Terrenos" ||
              selectedOption ===
                "Alquiler de Oficinas o Consultorios Médicos" ||
              selectedOption ===
                "Alquiler de Oficinas o Consultorios Médicos" ||
              selectedOption === "Venta de Oficinas o Consultorios Médicos" ||
              selectedOption === "Alquiler de Edificios" ||
              selectedOption === "Venta de Edificios" ||
              selectedOption === "Alquiler de Locales Comerciales" ||
              selectedOption === "Venta de Locales Comerciales" ||
              selectedOption === "Venta de Lotes, Fincas,Terrenos y Predios" ||
              selectedOption === "Alquiler de Casas y Apartamentos" ||
              selectedOption === "Venta de Casas y Apartamentos" ||
              selectedOption === ""
            }
            className="input-admin-property text-gray-500 m-2 w-80 sm:w-1/3 md:w-1/4 lg:w-1/6 p-2"
          />
          {/* <div className="space mb-2.5">
            {errors.areaBodega && touched.areaBodega ? (
              <div className="errordiv text-xs">{errors.areaBodega}</div>
            ) : null}
          </div> */}
          <input
            type="number"
            name="altura"
            max={500}
            hidden={
              selectedOption ===
                "Alquiler de Fincas, Lotes, Predios o Terrenos" ||
              selectedOption ===
                "Alquiler de Oficinas o Consultorios Médicos" ||
              selectedOption === "Venta de Oficinas o Consultorios Médicos" ||
              selectedOption === "Alquiler de Edificios" ||
              selectedOption === "Venta de Edificios" ||
              selectedOption === "Alquiler de Locales Comerciales" ||
              selectedOption === "Venta de Locales Comerciales" ||
              selectedOption === "Venta de Lotes, Fincas,Terrenos y Predios" ||
              selectedOption === "Alquiler de Casas y Apartamentos" ||
              selectedOption === "Venta de Casas y Apartamentos" ||
              selectedOption === ""
            }
            defaultValue={property?.altura}
            onChange={handleChange}
            placeholder="Altura"
            className="input-admin-property text-gray-500 m-2 w-80 sm:w-1/3 md:w-1/4 lg:w-1/6 p-2"
          />
          {/* <div className="space mb-2.5">
            {errors.altura && touched.altura ? (
              <div className="errordiv text-xs">{errors.altura}</div>
            ) : null}
          </div> */}
          <select
            name="concepcionElectrica"
            hidden={
              selectedOption ===
                "Alquiler de Fincas, Lotes, Predios o Terrenos" ||
              selectedOption === "Venta de Lotes, Fincas,Terrenos y Predios" ||
              selectedOption === "Alquiler de Casas y Apartamentos" ||
              selectedOption === "Venta de Casas y Apartamentos" ||
              selectedOption === ""
            }
            defaultValue={property?.concepcionElectrica}
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
          {/* <div className="space mb-2.5">
            {errors.concepcionElectrica && touched.concepcionElectrica ? (
              <div className="errordiv text-xs">
                {errors.concepcionElectrica}
              </div>
            ) : null}
          </div> */}
          <input
            type="number"
            name="areaPlantas"
            max={100000}
            hidden={
              selectedOption ===
                "Alquiler de Fincas, Lotes, Predios o Terrenos" ||
              selectedOption ===
                "Alquiler de Oficinas o Consultorios Médicos" ||
              selectedOption === "Venta de Oficinas o Consultorios Médicos" ||
              selectedOption === "Alquiler de Bodegas o Similares" ||
              selectedOption === "Venta de Bodegas o Similares" ||
              selectedOption === "Venta de Edificios" ||
              selectedOption === "Alquiler de Locales Comerciales" ||
              selectedOption === "Venta de Locales Comerciales" ||
              selectedOption === "Venta de Lotes, Fincas,Terrenos y Predios" ||
              selectedOption === "Alquiler de Casas y Apartamentos" ||
              selectedOption === "Venta de Casas y Apartamentos" ||
              selectedOption === ""
            }
            defaultValue={property?.areaPlantas}
            onChange={handleChange}
            placeholder="Área por plantas"
            className="input-admin-property text-gray-500  m-2 w-80 sm:w-1/3 md:w-1/4 lg:w-1/6 p-2"
          />
          {/*  <div className="space mb-2.5">
            {errors.areaPlantas && touched.areaPlantas ? (
              <div className="errordiv text-xs">{errors.areaPlantas}</div>
            ) : null}
          </div> */}
          <input
            type="number"
            name="numeroPlantas"
            max={100}
            hidden={
              selectedOption ===
                "Alquiler de Fincas, Lotes, Predios o Terrenos" ||
              selectedOption ===
                "Alquiler de Oficinas o Consultorios Médicos" ||
              selectedOption === "Venta de Oficinas o Consultorios Médicos" ||
              selectedOption === "Alquiler de Bodegas o Similares" ||
              selectedOption === "Venta de Bodegas o Similares" ||
              selectedOption === "Alquiler de Locales Comerciales" ||
              selectedOption === "Venta de Locales Comerciales" ||
              selectedOption === "Venta de Lotes, Fincas,Terrenos y Predios" ||
              selectedOption === "Alquiler de Casas y Apartamentos" ||
              selectedOption === "Venta de Casas y Apartamentos" ||
              selectedOption === ""
            }
            defaultValue={property?.numeroPlantas}
            placeholder="Número de plantas"
            className="input-admin-property text-gray-500 m-2 w-80 sm:w-1/3 md:w-1/4 lg:w-1/6 p-2"
          />
          {/*  <div className="space mb-2.5">
            {errors.numeroPlantas && touched.numeroPlantas ? (
              <div className="errordiv text-xs">{errors.numeroPlantas}</div>
            ) : null}
          </div> */}
          <input
            type="text"
            name="propositoTerreno"
            defaultValue={property?.propositoTerreno}
            placeholder="Propósito terreno"
            hidden
            className="input-admin-property text-gray-500 m-2 w-80 sm:w-1/3 md:w-1/4 lg:w-1/6 p-2"
          />
          {/* <div className="space mb-2.5">
            {errors.propositoTerreno && touched.propositoTerreno ? (
              <div className="errordiv text-xs">{errors.propositoTerreno}</div>
            ) : null}
          </div> */}

          <select
            name="tomadaExclusividad"
            id="tomadaExclusividad"
            hidden={selectedOption === ""}
            defaultValue={property?.tomadaExclusividad}
            onChange={handleChange}
            placeholder="Tomada con exclusividad"
            className="input-admin-property text-gray-500 m-2 w-80 sm:w-1/3 md:w-1/4 lg:w-1/6 p-2"
          >
            <option value="" label="">
              {"¿Tomada con exclusividad?"}
            </option>
            <option value={true} label="Si">
              Si
            </option>
            <option value={false} label="No">
              No
            </option>
          </select>
          <select
            name="vistaPanoramica"
            id="vistaPanoramica"
            hidden={selectedOption === ""}
            defaultValue={property?.vistaPanoramica}
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
          <select
            hidden={
              selectedOption === "" ||
              selectedOption === "Venta de Lotes, Fincas,Terrenos y Predios" ||
              selectedOption ===
                "Alquiler de Fincas, Lotes, Predios o Terrenos" ||
              selectedOption === "Venta de Locales Comerciales" ||
              selectedOption === "Alquiler de Locales Comerciales" ||
              selectedOption === "Venta de Edificios" ||
              selectedOption === "Alquiler de Edificios" ||
              selectedOption === "Venta de Bodegas o Similares" ||
              selectedOption === "Alquiler de Bodegas o Similares" ||
              selectedOption === "Venta de Oficinas o Consultorios Médicos" ||
              selectedOption === "Alquiler de Oficinas o Consultorios Médicos"
            }
            name="duenoFinanciaCompra"
            defaultValue={property?.duenoFinanciaCompra}
            onChange={handleChange}
            placeholder="Dueño financia compra"
            className="input-admin-property text-gray-500 m-2 w-80 sm:w-1/3 md:w-1/4 lg:w-1/6 p-2"
          >
            <option value="" label="">
              {"¿Dueño financia compra?"}
            </option>
            <option value={true} label="Si">
              Si
            </option>
            <option value={false} label="No">
              No
            </option>
          </select>
          <select
            hidden={
              selectedOption === "" ||
              selectedOption === "Venta de Lotes, Fincas,Terrenos y Predios" ||
              selectedOption ===
                "Alquiler de Fincas, Lotes, Predios o Terrenos" ||
              selectedOption === "Venta de Locales Comerciales" ||
              selectedOption === "Alquiler de Locales Comerciales" ||
              selectedOption === "Venta de Edificios" ||
              selectedOption === "Alquiler de Edificios" ||
              selectedOption === "Venta de Bodegas o Similares" ||
              selectedOption === "Alquiler de Bodegas o Similares" ||
              selectedOption === "Venta de Oficinas o Consultorios Médicos" ||
              selectedOption === "Alquiler de Oficinas o Consultorios Médicos"
            }
            name="duenoRecibeVehiculo"
            defaultValue={property?.duenoRecibeVehiculo}
            onChange={handleChange}
            placeholder="Dueño recibe vehiculo"
            className="input-admin-property text-gray-500 m-2 w-80 sm:w-1/3 md:w-1/4 lg:w-1/6 p-2"
          >
            <option value="" label="">
              {"¿Dueño recibe vehiculo como parte del pago?"}
            </option>
            <option value={true} label="Si">
              Si
            </option>
            <option value={false} label="No">
              No
            </option>
          </select>
          <select
            name="ubicacionCastral"
            id="ubicacionCastral"
            hidden={selectedOption === ""}
            defaultValue={property?.ubicacionCastral}
            onChange={handleChange}
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
          {/* <div className="space mb-2.5">
            {errors.ubicacionCastral && touched.ubicacionCastral ? (
              <div className="errordiv text-xs">{errors.ubicacionCastral}</div>
            ) : null}
          </div> */}
          <select
            name="ubicacionDemografica"
            id="ubicacionDemografica"
            hidden={selectedOption === ""}
            defaultValue={property?.ubicacionDemografica}
            onChange={handleChange}
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
          {/* <div className="space mb-2.5">
            {errors.ubicacionDemografica && touched.ubicacionDemografica ? (
              <div className="errordiv text-xs">
                {errors.ubicacionDemografica}
              </div>
            ) : null}
          </div> */}
          <select
            name="ubicacionGeografica"
            hidden={selectedOption === ""}
            defaultValue={property?.ubicacionGeografica}
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
          <div
            className={
              selectedOption ===
                "Alquiler de Oficinas o Consultorios Médicos" ||
              selectedOption === "Venta de Oficinas o Consultorios Médicos" ||
              selectedOption === "Alquiler de Bodegas o Similares" ||
              selectedOption === "Venta de Bodegas o Similares" ||
              selectedOption === "Alquiler de Locales Comerciales" ||
              selectedOption === "Venta de Locales Comerciales" ||
              selectedOption === "Alquiler de Casas y Apartamentos" ||
              selectedOption === "Venta de Casas y Apartamentos" ||
              selectedOption === ""
                ? "hidden"
                : "space mb-2.5"
            }
          >
            {errors.ubicacionGeografica && touched.ubicacionGeografica ? (
              <div className="errordiv text-xs">
                {errors.ubicacionGeografica}
              </div>
            ) : null}
          </div>

          <select
            name="active"
            defaultValue={property?.active}
            onChange={handleChange}
            id="active"
            hidden={selectedOption === ""}
            placeholder="Activa"
            className="input-admin-property text-gray-500 m-2 w-80 sm:w-1/3 md:w-1/4 lg:w-1/6 p-2"
          >
            <option value="" label="">
              {"Estado"}
            </option>
            {PropertyEstado.map((item) => (
              <option value={item.value} label={item.label}>
                {item.value}
              </option>
            ))}
          </select>
          <input
            type="number"
            name="areaMesanini"
            max={6000}
            hidden={
              selectedOption ===
                "Alquiler de Fincas, Lotes, Predios o Terrenos" ||
              selectedOption ===
                "Alquiler de Oficinas o Consultorios Médicos" ||
              selectedOption === "Venta de Oficinas o Consultorios Médicos" ||
              selectedOption === "Alquiler de Bodegas o Similares" ||
              selectedOption === "Venta de Bodegas o Similares" ||
              selectedOption === "Alquiler de Edificios" ||
              selectedOption === "Venta de Edificios" ||
              selectedOption === "Venta de Lotes, Fincas,Terrenos y Predios" ||
              selectedOption === "Alquiler de Casas y Apartamentos" ||
              selectedOption === "Venta de Casas y Apartamentos" ||
              selectedOption === ""
            }
            defaultValue={property?.areaMesanini}
            onChange={handleChange}
            placeholder="Área mezanine"
            className="input-admin-property text-gray-500 m-2 w-80 sm:w-1/3 md:w-1/4 lg:w-1/6 p-2"
          />
          {/*  <div className="space mb-2.5">
            {errors.areaMesanini && touched.areaMesanini ? (
              <div className="errordiv text-xs">{errors.areaMesanini}</div>
            ) : null}
          </div> */}
          <input
            type="number"
            name="areaSotano"
            max={6000}
            hidden={
              selectedOption ===
                "Alquiler de Fincas, Lotes, Predios o Terrenos" ||
              selectedOption ===
                "Alquiler de Oficinas o Consultorios Médicos" ||
              selectedOption === "Venta de Oficinas o Consultorios Médicos" ||
              selectedOption === "Alquiler de Bodegas o Similares" ||
              selectedOption === "Venta de Bodegas o Similares" ||
              selectedOption === "Alquiler de Edificios" ||
              selectedOption === "Venta de Edificios" ||
              selectedOption === "Venta de Lotes, Fincas,Terrenos y Predios" ||
              selectedOption === "Alquiler de Casas y Apartamentos" ||
              selectedOption === "Venta de Casas y Apartamentos" ||
              selectedOption === ""
            }
            defaultValue={property?.areaSotano}
            onChange={handleChange}
            placeholder="Área sótano"
            className="input-admin-property text-gray-500 m-2 w-80 sm:w-1/3 md:w-1/4 lg:w-1/6 p-2"
          />
          {/* <div className="space mb-2.5">
            {errors.areaSotano && touched.areaSotano ? (
              <div className="errordiv text-xs">{errors.areaSotano}</div>
            ) : null}
          </div> */}

          <select
            name="tipoDensidad"
            hidden={
              selectedOption ===
                "Alquiler de Oficinas o Consultorios Médicos" ||
              selectedOption === "Venta de Oficinas o Consultorios Médicos" ||
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
            className="input-admin-property text-gray-500 m-2 w-80 sm:w-1/3 md:w-1/4 lg:w-1/6 p-2"
          >
            <option value="" label="">
              {"Tipo de densidad"}
            </option>
            {Densidad.map((item) => (
              <option value={item.value} label={item.label}>
                {item.value}
              </option>
            ))}
          </select>
          <select
            name="usoDeSuelo"
            defaultValue={property?.usoDeSuelo}
            onChange={handleChange}
            className="input-admin-property text-gray-500 m-2 w-80 sm:w-1/3 md:w-1/4 lg:w-1/6 p-2"
            hidden={selectedOption === ""}
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
          {/* <div className="space mb-2.5">
            {errors.usoDeSuelo && touched.usoDeSuelo ? (
              <div className="errordiv text-xs">{errors.usoDeSuelo}</div>
            ) : null}
          </div> */}
          {selectedOption === "" ? null : (
            <div class="flex flex-row w-fit border rounded-lg pl-1 max-[500px]:mb-2 border-gray-300 input-admin-property ml-1 mr-1 py-2">
              <select
                id="dropdown-button"
                name="moneda"
                onChange={handleChange}
                defaultValue={property?.moneda}
                class="flex-shrink-0 inline-flex text-gray-500 items-center pl-2 text-sm h-[42px] w-18 font-medium text-center bg-gray-100 border rounded-l-md hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-300 "
              >
                <option value="$">USD</option>
                <option value="₡">CRC</option>
              </select>
              <div class="relative w-full">
                <input
                  type="number"
                  min={0}
                  onChange={handleChange}
                  name="precio"
                  defaultValue={property?.precio}
                  placeholder="Precio de venta"
                  id="search-dropdown"
                  className="block max-[450px]:w-[145px] text-gray-500 min-[500px]:w-[145px] min-[650px]:w-[145px] p-2.5 w-[145px] bg-transparent z-20 text-sm rounded-r-md border-l-transparent border focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div className="m-1 flex justify-center items-center content-center mt-2.5 self-start">
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    value=""
                    defaultValue={property?.ivaVenta}
                    defaultChecked={property?.ivaVenta}
                    onChange={handleChange}
                    id="ivaVenta"
                    name="ivaVenta"
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                  <span className="ml-3 text-sm text-gray-500 font-semibold ">
                    +IVA
                  </span>
                </label>
              </div>
            </div>
          )}
          {selectedOption === "" ? null : (
            <div class="flex flex-row w-fit border rounded-lg pl-1 border-gray-300 input-admin-property ml-1 mr-1 py-2">
              <select
                id="dropdown-button"
                name="monedaAlquiler"
                onChange={handleChange}
                defaultValue={property?.monedaAlquiler}
                class="flex-shrink-0 inline-flex text-gray-500 items-center pl-2 text-sm h-[42px] w-18 font-medium text-center bg-gray-100 border rounded-l-md hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-300 "
              >
                <option value="$">USD</option>
                <option value="₡">CRC</option>
              </select>
              <div class="relative w-full">
                <input
                  type="number"
                  min={0}
                  onChange={handleChange}
                  name="precioAlquiler"
                  defaultValue={property?.precioAlquiler}
                  placeholder="Precio de alquiler"
                  id="search-dropdown"
                  className="block max-[450px]:w-[145px] text-gray-500 min-[500px]:w-[145px] min-[650px]:w-[145px] p-2.5 w-[145px] bg-transparent z-20 text-sm rounded-r-md border-l-transparent border focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div className="m-1 flex justify-center items-center content-center mt-2.5 self-start">
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    value=""
                    defaultValue={property?.ivaAlquiler}
                    defaultChecked={property?.ivaAlquiler}
                    onChange={handleChange}
                    id="ivaAlquiler"
                    name="ivaAlquiler"
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                  <span className="ml-3 text-sm text-gray-500 font-semibold ">
                    +IVA
                  </span>
                </label>
              </div>
            </div>
          )}

          {selectedOption === "" ? null : (
            <div class="flex flex-row input-admin-property ml-1 mr-1 py-2">
              <select
                name="monedaAlquilerVenta"
                onChange={handleChange}
                defaultValue={property?.monedaAlquilerCompra}
                class="flex-shrink-0 inline-flex items-center pl-2 text-sm h-[42px] w-18 font-medium text-center text-gray-500 bg-gray-100 border rounded-l-md hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-300 "
              >
                <option value="$">USD</option>
                <option value="₡">CRC</option>
              </select>
              <div class="relative w-full">
                <input
                  type="number"
                  onChange={handleChange}
                  min={0}
                  name="precioAlquilerCompra"
                  defaultValue={property?.precioAlquilerCompra}
                  placeholder="Precio de alquiler compra"
                  className="block max-[450px]:w-[243px] text-gray-500 min-[500px]:w-[243px] max-[640px]:w-[243px] min-[641px]:w-[200px] p-2.5 w-[243px] bg-transparent z-20 text-sm rounded-r-md border-l-transparent border focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
          )}
          <select
            name="tieneCuotaMantenimiento"
            hidden={selectedOption === ""}
            defaultValue={property?.tieneCuotaMantenimiento}
            onChange={handleChange}
            placeholder="¿Tiene cuota mantenimiento?"
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
          {selectedOption === "" ? null : (
            <div class="flex flex-row input-admin-property ml-1 mr-1 py-2">
              <select
                id="dropdown-button"
                name="monedaCuotaMantenimiento"
                defaultValue={property?.monedaCuotaMantenimiento}
                onChange={handleChange}
                class="flex-shrink-0 inline-flex text-gray-500 items-center pl-2 text-sm h-[42px] w-18 font-medium text-center bg-gray-100 border rounded-l-md hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-300 "
              >
                <option value="$">USD</option>
                <option value="₡">CRC</option>
              </select>
              <div class="relative w-full">
                <input
                  type="number"
                  min={0}
                  onChange={handleChange}
                  name="cuotaMantenimiento"
                  defaultValue={property?.cuotaMantenimiento}
                  placeholder="Cuota de mantenimiento"
                  id="search-dropdown"
                  className="block max-[450px]:w-[243px] text-gray-500 min-[500px]:w-[243px] max-[640px]:w-[243px] min-[641px]:w-[200px] p-2.5 w-[243px] bg-transparent z-20 text-sm rounded-r-md border-l-transparent border focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
          )}
          {selectedOption === "" ? null : (
            <div class="flex input-admin-property ml-1 mr-1 py-2">
              <select
                name="avaluoMoneda"
                id="avaluoMoneda"
                onChange={handleChange}
                defaultValue={property?.avaluoMoneda}
                class="flex-shrink-0 inline-flex items-center pl-2 text-sm h-[42px] w-18 font-medium text-center text-gray-500 bg-gray-100 border rounded-l-md hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-300 "
              >
                <option value="$">USD</option>
                <option value="₡">CRC</option>
              </select>
              <div class="relative w-full">
                <input
                  type="number"
                  onChange={handleChange}
                  min={0}
                  name="avaluo"
                  defaultValue={property?.avaluo}
                  placeholder="Valor según avalúo"
                  className="block max-[450px]:w-[243px] text-gray-500 min-[500px]:w-[243px] max-[640px]:w-[243px] min-[641px]:w-[200px] p-2.5 w-[243px] bg-transparent z-20 text-sm rounded-r-md border-l-transparent border focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
          )}
          <select
            defaultValue={property?.servicios}
            onChange={handleChange}
            name="servicios"
            hidden={selectedOption === ""}
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
        </div>
        <div className="flex m-4 content-center items-center justify-center ">
          <div className="flex flex-col w-fit sm:flex-col lg:flex-row content-center items-center justify-center">
            <div
              className={
                selectedOption === ""
                  ? "hidden"
                  : "m-1 flex justify-center items-center content-center self-start"
              }
            >
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  value=""
                  defaultChecked={property?.ley7600}
                  defaultValue={property?.ley7600}
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
            <div
              className={
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
                  ? "hidden"
                  : "m-1 justify-center items-center content-center flex self-start"
              }
            >
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  value=""
                  defaultChecked={property?.serviciosMedicos}
                  defaultValue={property?.serviciosMedicos}
                  onChange={handleChange}
                  id="serviciosMedicos"
                  name="serviciosMedicos"
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                <span className="ml-3 text-sm font-medium text-gray-500 dark:text-gray-300">
                  Servicios médicos
                </span>
              </label>
            </div>
            <div
              className={
                selectedOption === "Venta de Casas y Apartamentos" ||
                selectedOption ===
                  "Alquiler de Fincas, Lotes, Predios o Terrenos" ||
                selectedOption === "Venta de Oficinas o Consultorios Médicos" ||
                selectedOption === "Alquiler de Edificios" ||
                selectedOption === "Venta de Edificios" ||
                selectedOption === "Alquiler de Locales Comerciales" ||
                selectedOption === "Venta de Locales Comerciales" ||
                selectedOption ===
                  "Venta de Lotes, Fincas,Terrenos y Predios" ||
                selectedOption === "Alquiler de Casas y Apartamentos" ||
                selectedOption === ""
                  ? "hidden"
                  : "m-1 justify-center items-center content-center flex self-start"
              }
            >
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  value=""
                  defaultValue={property?.areaCarga}
                  defaultChecked={property?.areaCarga}
                  onChange={handleChange}
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
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                <span className="ml-3 text-sm font-medium text-gray-500 dark:text-gray-300">
                  Área carga
                </span>
              </label>
            </div>
          </div>
        </div>

        <div
          className={
            selectedOption ===
              "Alquiler de Fincas, Lotes, Predios o Terrenos" ||
            selectedOption === "Alquiler de Oficinas o Consultorios Médicos" ||
            selectedOption === "Venta de Oficinas o Consultorios Médicos" ||
            selectedOption === "Alquiler de Bodegas o Similares" ||
            selectedOption === "Venta de Bodegas o Similares" ||
            selectedOption === "Alquiler de Edificios" ||
            selectedOption === "Venta de Edificios" ||
            selectedOption === "Alquiler de Locales Comerciales" ||
            selectedOption === "Venta de Locales Comerciales" ||
            selectedOption === "Venta de Lotes, Fincas,Terrenos y Predios" ||
            selectedOption === ""
              ? "hidden"
              : null
          }
        >
          <Select
            name="amenidades"
            noOptionsMessage={() => null}
            closeMenuOnSelect={false}
            defaultValue={property?.amenidades}
            options={Amenidades}
            placeholder={"Amenidades"}
            isMulti
            className="categories lg:mx-80 my-1"
            onChange={handleChangeAmenidades}
          />
          {/* <div className="space mb-2.5">
            {errors.amenidades && touched.amenidades ? (
              <div className="errordiv text-xs">{errors.amenidades}</div>
            ) : null}
          </div> */}
        </div>
        <div
          className={
            selectedOption ===
              "Alquiler de Fincas, Lotes, Predios o Terrenos" ||
            selectedOption === "Alquiler de Oficinas o Consultorios Médicos" ||
            selectedOption === "Venta de Oficinas o Consultorios Médicos" ||
            selectedOption === "Alquiler de Bodegas o Similares" ||
            selectedOption === "Venta de Bodegas o Similares" ||
            selectedOption === "Alquiler de Edificios" ||
            selectedOption === "Venta de Edificios" ||
            selectedOption === "Alquiler de Locales Comerciales" ||
            selectedOption === "Venta de Locales Comerciales" ||
            selectedOption === "Venta de Lotes, Fincas,Terrenos y Predios" ||
            selectedOption === ""
              ? "hidden"
              : null
          }
        >
          <Select
            noOptionsMessage={() => null}
            closeMenuOnSelect={false}
            className="categories lg:mx-80 my-1"
            name="jardinPatio"
            defaultValue={property?.jardinPatio}
            options={PatioJardin}
            placeholder={"Patio"}
            isMulti
            onChange={handleChangePatioJardin}
          />
          {/* <div className="space mb-2.5">
            {errors.jardinPatio && touched.jardinPatio ? (
              <div className="errordiv text-xs">{errors.jardinPatio}</div>
            ) : null}
          </div> */}
        </div>
        <div
          className={
            selectedOption ===
              "Alquiler de Fincas, Lotes, Predios o Terrenos" ||
            selectedOption === "Alquiler de Oficinas o Consultorios Médicos" ||
            selectedOption === "Venta de Oficinas o Consultorios Médicos" ||
            selectedOption === "Alquiler de Bodegas o Similares" ||
            selectedOption === "Venta de Bodegas o Similares" ||
            selectedOption === "Alquiler de Edificios" ||
            selectedOption === "Venta de Edificios" ||
            selectedOption === "Alquiler de Locales Comerciales" ||
            selectedOption === "Venta de Locales Comerciales" ||
            selectedOption === "Venta de Lotes, Fincas,Terrenos y Predios" ||
            selectedOption === ""
              ? "hidden"
              : null
          }
        >
          <Select
            className="categories lg:mx-80 mt-1"
            name="detallesInternos"
            noOptionsMessage={() => null}
            closeMenuOnSelect={false}
            defaultValue={property?.detallesInternos}
            options={DetallesInternos}
            placeholder={"Detalles internos"}
            isMulti
            onChange={handleChangeDetallesInternos}
          />
          {/* <div className="space mb-2.5">
            {errors.detallesInternos && touched.detallesInternos ? (
              <div className="errordiv text-xs">{errors.detallesInternos}</div>
            ) : null}
          </div> */}
        </div>
        <div
          className={
            selectedOption ===
              "Alquiler de Fincas, Lotes, Predios o Terrenos" ||
            selectedOption === "Alquiler de Oficinas o Consultorios Médicos" ||
            selectedOption === "Venta de Oficinas o Consultorios Médicos" ||
            selectedOption === "Alquiler de Bodegas o Similares" ||
            selectedOption === "Venta de Bodegas o Similares" ||
            selectedOption === "Alquiler de Edificios" ||
            selectedOption === "Venta de Edificios" ||
            selectedOption === "Alquiler de Locales Comerciales" ||
            selectedOption === "Venta de Locales Comerciales" ||
            selectedOption === "Venta de Lotes, Fincas,Terrenos y Predios" ||
            selectedOption === ""
              ? "hidden"
              : null
          }
        >
          <Select
            className="categories lg:mx-80 mt-1"
            name="detallesExternos"
            noOptionsMessage={() => null}
            closeMenuOnSelect={false}
            defaultValue={property?.detallesExternos}
            options={DetallesExternos}
            placeholder={"Detalles externos"}
            isMulti
            onChange={handleChangeDetallesExternos}
          />
          {/* <div className="space mb-2.5">
            {errors.detallesExternos && touched.detallesExternos ? (
              <div className="errordiv text-xs">{errors.detallesExternos}</div>
            ) : null}
          </div> */}
        </div>
        <div className="flex justify-center w-full mb-2">
          <textarea
            hidden={selectedOption === ""}
            name="descripcion"
            defaultValue={property?.descripcion}
            onChange={handleChange}
            placeholder="Descripción de la propiedad"
            className="input-admin-property mx-12 m-2 w-full sm:w-1/2 md:w-1/2 lg:w-1/3 p-2"
          />
          {/* <div className="space mb-2.5">
            {errors.descripcion && touched.descripcion ? (
              <div className="errordiv text-xs">{errors.descripcion}</div>
            ) : null}
          </div> */}
        </div>
        <div
          className={
            selectedOption === undefined || selectedOption === ""
              ? "hidden"
              : null
          }
        >
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
        </div>
      </form>
    </div>
  );
};

export default InsertProperty;
