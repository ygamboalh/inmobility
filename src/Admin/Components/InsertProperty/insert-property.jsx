import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as Yup from "yup";

import { Alert, message, Spin } from "antd";
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
  DetallesExternosMulti,
  CategoriaInmueble,
} from "../../../BD/bd";
import Select from "react-select";

const InsertProperty = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const InsertPropertySchema = Yup.object().shape({
    provincia: Yup.string().required("*"),
    canton: Yup.string().required("*"),
    distrito: Yup.string().required("*"),
    precio: Yup.number().required("*"),
    tipoPropiedad: Yup.string().required("*"),
    amenidades: Yup.object().required("*"),
    areaContruccion: Yup.number().required("*"),
    habitaciones: Yup.number().required("*"),
    banos: Yup.number().required("*"),
    jardinPatio: Yup.object().required("*"),
    ley7600: Yup.boolean().oneOf([true, false]).required("*"),
    detallesInternos: Yup.object().required("*"),
    detallesExternos: Yup.object().required("*"),
    amueblado: Yup.string().required("*"),
    aptoHijos: Yup.string().required("*"),
    aptoMascotas: Yup.string().required("*"),
    cuotaMantenimiento: Yup.number().required("*"),
    areaBodega: Yup.number().required("*"),
    altura: Yup.number().required("*"),
    concepcionElectrica: Yup.string().required("*"),
    areaCarga: Yup.boolean().oneOf([true, false]).required("*"),
    areaPlantas: Yup.number().required("*"),
    areaTerreno: Yup.number().required("*"),
    numeroPlantas: Yup.number().required("*"),
    propositoTerreno: Yup.string().required("*"),
    ubicacionCastral: Yup.string().required("*"),
    ubicacionDemografica: Yup.string().required("*"),
    ubicacionGeografica: Yup.string().required("*"),
    areaMesanini: Yup.number().required("*"),
    areaSotano: Yup.number().required("*"),
    tipoDensidad: Yup.string().required("*"),
    servicios: Yup.string().required("*"),
    serviciosMedicos: Yup.boolean().oneOf([true, false]).required("*"),
    anunciante: Yup.string().required("*"),
    active: Yup.string().required("*"),
    categories: Yup.array().required("*"),
  });

  const [image, setImage] = useState(null);
  const handleChange = (event) => {
    console.log(event.target.files[0]);
    setImage(event.target.files[0]);
  };

  const [category, setCategory] = useState({});
  const [categoriesDB, setCategoriesDB] = useState({});
  const [amenidades, setAmenidades] = useState({});
  const [patio, setPatio] = useState({});
  const [detallesInternos, setDetallesInternos] = useState({});
  const [detallesExternos, setDetallesExternos] = useState({});

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

  const [initialData, setinitialData] = useState({
    provincia: "",
    canton: "",
    distrito: "",
    precio: 0,
    tipoPropiedad: "",
    amenidades: amenidades,
    areaContruccion: 0,
    habitaciones: 0,
    banos: 0,
    jardinPatio: patio,
    ley7600: false,
    detallesInternos: detallesInternos,
    detallesExternos: detallesExternos,
    amueblado: "",
    aptoHijos: "",
    aptoMascotas: "",
    cuotaMantenimiento: 0,
    areaBodega: 0,
    altura: 0,
    concepcionElectrica: "",
    areaCarga: false,
    areaPlantas: 0,
    numeroPlantas: 0,
    propositoTerreno: "",
    ubicacionCastral: "",
    ubicacionDemografica: "",
    ubicacionGeografica: "",
    areaMesanini: 0,
    areaSotano: 0,
    tipoDensidad: "",
    servicios: "",
    serviciosMedicos: false,
    anunciante: "",
    categories: [],
    active: "",
    areaTerreno: 0,
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
      //Busca las coincidencias entre las categorias de la base de datos y la del frontend
      categoriesDB?.filter((categoria) => {
        const cat = category?.find((c) => c.label === categoria.nombre);
        if (cat) {
          catFounded.push(categoria.id);
        }
      });
      console.log(catFounded);

      const value = {
        provincia: values.provincia,
        canton: values.canton,
        distrito: values.distrito,
        precio: values.precio,
        tipoPropiedad: values.tipoPropiedad,
        amenidades: amenidades,
        areaContruccion: values.areaContruccion,
        habitaciones: values.habitaciones,
        banos: values.banos,
        jardinPatio: patio,
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
      };

      if (!id) {
        const response = await AxiosInstance.post("/properties", {
          data: value,
        });

        if (response.status === 200) {
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
      console.log(error);
      message.error("¡Ocurrió un error inesperado!");
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <Spin className="spinner" size="large" />;
  }

  return (
    <div className="flex flex-col h-fit">
      <div className="inset-y-0 mb-20 left-0 flex h-fit justify-center align-middle items-center pl-3"></div>
      <Formik
        initialValues={initialData}
        validationSchema={InsertPropertySchema}
        onSubmit={onFinish}
      >
        {({ errors, touched }) => (
          <Form /* onFinish={onFinish} */ autoComplete="off">
            <div className="flex mt-3 justify-center align-middle items-center w-full">
              <label className="font-semibold text-xl">
                Crear una nueva propiedad
              </label>
            </div>
            {/* <div className="flex mt-3 justify-center align-middle items-center w-full">
              <Field
                type="file"
                name="imagenes"
                placeholder="Imágenes"
                className="input-admin-property m-2 w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/6 p-2"
              />
            </div> */}
            <div className="flex flex-wrap justify-center m-3">
              <Field
                type="text"
                name="provincia"
                placeholder="Provincia"
                className="input-admin-property m-2 w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/6 p-2"
              />
              <div className="space mb-2.5">
                {errors.provincia && touched.provincia ? (
                  <div className="errordiv text-xs">{errors.provincia}</div>
                ) : null}
              </div>
              <Field
                type="text"
                name="canton"
                placeholder="Canton"
                className="input-admin-property m-2 w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/6 p-2"
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
                className="input-admin-property m-2 w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/6 p-2"
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
                className="input-admin-property m-2 w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/6 p-2"
              />
              <div className="space mb-2.5">
                {errors.precio && touched.precio ? (
                  <div className="errordiv text-xs">{errors.precio}</div>
                ) : null}
              </div>
              <Field
                as="select"
                name="tipoPropiedad"
                placeholder="Tipo de propiedad"
                className="input-admin-property m-2 w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/6 p-2"
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
              <div className="space mb-2.5">
                {errors.tipoPropiedad && touched.tipoPropiedad ? (
                  <div className="errordiv text-xs">{errors.tipoPropiedad}</div>
                ) : null}
              </div>

              <Field
                type="number"
                name="areaContruccion"
                placeholder="Área construcción"
                className="input-admin-property m-2 w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/6 p-2"
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
                placeholder="Habitaciones"
                className="input-admin-property m-2 w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/6 p-2"
              />
              <div className="space mb-2.5">
                {errors.habitaciones && touched.habitaciones ? (
                  <div className="errordiv text-xs">{errors.habitaciones}</div>
                ) : null}
              </div>
              <Field
                type="number"
                name="banos"
                placeholder="Baños"
                className="input-admin-property m-2 w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/6 p-2"
              />
              <div className="space mb-2.5">
                {errors.banos && touched.banos ? (
                  <div className="errordiv text-xs">{errors.banos}</div>
                ) : null}
              </div>

              <Field
                type="number"
                name="areaTerreno"
                placeholder="Área terreno"
                className="input-admin-property m-2 w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/6 p-2"
              />
              <div className="space mb-2.5">
                {errors.areaTerreno && touched.areaTerreno ? (
                  <div className="errordiv text-xs">{errors.areaTerreno}</div>
                ) : null}
              </div>

              <Field
                as="select"
                name="amueblado"
                id="amueblado"
                placeholder="Amueblado"
                className="input-admin-property m-2 w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/6 p-2"
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
                id="aptoHijos"
                placeholder="Apto hijos"
                className="input-admin-property m-2 w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/6 p-2"
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
                name="aptoMascotas"
                id="aptoMascotas"
                placeholder="Apto mascotas"
                className="input-admin-property m-2 w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/6 p-2"
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
                placeholder="Cuota mantenimiento"
                className="input-admin-property m-2 w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/6 p-2"
              />
              <div className="space mb-2.5">
                {errors.cuotaMantenimiento && touched.cuotaMantenimiento ? (
                  <div className="errordiv text-xs">
                    {errors.cuotaMantenimiento}
                  </div>
                ) : null}
              </div>
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
                placeholder="Área bodega"
                className="input-admin-property m-2 w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/6 p-2"
              />
              <div className="space mb-2.5">
                {errors.areaBodega && touched.areaBodega ? (
                  <div className="errordiv text-xs">{errors.areaBodega}</div>
                ) : null}
              </div>
              <Field
                type="number"
                name="altura"
                placeholder="Altura"
                className="input-admin-property m-2 w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/6 p-2"
              />
              <div className="space mb-2.5">
                {errors.altura && touched.altura ? (
                  <div className="errordiv text-xs">{errors.altura}</div>
                ) : null}
              </div>
              <Field
                as="select"
                name="concepcionElectrica"
                id="concepcionElectrica"
                placeholder="Concepción eléctrica"
                className="input-admin-property m-2 w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/6 p-2"
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
                placeholder="Área plantas"
                className="input-admin-property m-2 w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/6 p-2"
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
                className="input-admin-property m-2 w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/6 p-2"
              />
              <div className="space mb-2.5">
                {errors.numeroPlantas && touched.numeroPlantas ? (
                  <div className="errordiv text-xs">{errors.numeroPlantas}</div>
                ) : null}
              </div>
              <Field
                type="text"
                name="propositoTerreno"
                placeholder="Propósito terreno"
                className="input-admin-property m-2 w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/6 p-2"
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
                placeholder="Ubicación castral"
                className="input-admin-property m-2 w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/6 p-2"
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
                className="input-admin-property m-2 w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/6 p-2"
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
                className="input-admin-property m-2 w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/6 p-2"
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
                id="active"
                placeholder="Activa"
                className="input-admin-property m-2 w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/6 p-2"
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
                placeholder="Área mesanini"
                className="input-admin-property m-2 w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/6 p-2"
              />
              <div className="space mb-2.5">
                {errors.areaMesanini && touched.areaMesanini ? (
                  <div className="errordiv text-xs">{errors.areaMesanini}</div>
                ) : null}
              </div>
              <Field
                type="number"
                name="areaSotano"
                placeholder="Área sótano"
                className="input-admin-property m-2 w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/6 p-2"
              />
              <div className="space mb-2.5">
                {errors.areaSotano && touched.areaSotano ? (
                  <div className="errordiv text-xs">{errors.areaSotano}</div>
                ) : null}
              </div>
              <Field
                type="text"
                name="tipoDensidad"
                placeholder="Tipo densidad"
                className="input-admin-property m-2 w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/6 p-2"
              />
              <div className="space mb-2.5">
                {errors.tipoDensidad && touched.tipoDensidad ? (
                  <div className="errordiv text-xs">{errors.tipoDensidad}</div>
                ) : null}
              </div>
              <Field
                type="text"
                placeholder="Anunciante"
                name="anunciante"
                className="input-admin-property m-2 w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/6 p-2"
              />
              <div className="space mb-2.5">
                {errors.anunciante && touched.anunciante ? (
                  <div className="errordiv text-xs">{errors.anunciante}</div>
                ) : null}
              </div>
              <Field
                type="text"
                placeholder="Servicios"
                name="servicios"
                className="input-admin-property m-2 w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/6 p-2"
              />
              <div className="space mb-2.5">
                {errors.servicios && touched.servicios ? (
                  <div className="errordiv text-xs">{errors.servicios}</div>
                ) : null}
              </div>
              <div className="flex flex-row  w-full justify-center">
                <div className="m-2 w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/6 p-2">
                  <Field
                    type="checkbox"
                    name="ley7600"
                    id="ley7600"
                    value="Ley 7600"
                    className="mr-1"
                    placeholder="Ley 7600"
                  />
                  <label>Ley 7600</label>
                </div>
                <div className="m-2 w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/6 p-2">
                  <Field
                    type="checkbox"
                    name="serviciosMedicos"
                    id="serviciosMedicos"
                    className="mr-1"
                    value="Servicios médicos"
                    placeholder="Servicios médicos"
                  />
                  <label htmlFor="serviciosMedicos">Servicios médicos</label>
                </div>
                <div className="space mb-2.5">
                  {errors.serviciosMedicos && touched.serviciosMedicos ? (
                    <div className="errordiv text-xs">
                      {errors.serviciosMedicos}
                    </div>
                  ) : null}
                </div>
                <div className="m-2 w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/6 p-2">
                  <Field
                    type="checkbox"
                    name="areaCarga"
                    id="areaCarga"
                    className="mr-1"
                    value="Área carga"
                    placeholder="Área carga"
                  />
                  <label htmlFor="areaCarga">Área carga</label>
                </div>
                <div className="space mb-2.5">
                  {errors.areaCarga && touched.areaCarga ? (
                    <div className="errordiv text-xs">{errors.areaCarga}</div>
                  ) : null}
                </div>
              </div>
            </div>

            <Select
              className="categories"
              name="categories"
              options={categories}
              placeholder={"Seleccione las categorías"}
              isMulti
              onChange={handleChangeCategory}
            />
            <div className="space mb-2.5">
              {errors.categories && touched.categories ? (
                <div className="errordiv text-xs">{errors.categories}</div>
              ) : null}
            </div>
            <Select
              className="categories"
              name="amenidades"
              options={Amenidades}
              placeholder={"Seleccione las amenidades"}
              isMulti
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
              options={PatioJardin}
              placeholder={"Seleccione opciones de patio"}
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
              options={DetallesInternos}
              placeholder={"Seleccione los detalles internos"}
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
              options={DetallesExternos}
              placeholder={"Seleccione los detalles externos"}
              isMulti
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
