import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

import { message } from "antd";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

import { API } from "../../constant";
import MySpinner from "../Spinner/spinner";
import enviarCorreo from "../../utils/email/send-email";
import enviarCorreoPersonalizadoOrigen from "../../utils/email/send-personalized-email-origin";

const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
const phoneRegex = /^(\d{2,}\s?)+$/;
const VisitSchema = Yup.object().shape({
  fullname: Yup.string().required("¡El nombre es requerido!"),
  email: Yup.string()
    .matches(emailRegex, "¡Correo inválido!")
    .required("¡El correo es requerido!"),
  phone: Yup.string()
    .matches(phoneRegex, "¡Teléfono invalido!")
    .min(8, "¡Teléfono invalido!")
    .max(18, "¡Teléfono invalido!")
    .required("¡El número de teléfono es requerido!"),
  managment: Yup.string().required("¡La gestión es requerida!"),
});

const VisitRecord = () => {
  const options = [
    { key: "DAR EN VENTA", value: "DAR EN VENTA", text: "DAR EN VENTA" },
    {
      key: "COMPRAR UN INMUEBLE",
      value: "COMPRAR UN INMUEBLE",
      text: "COMPRAR UN INMUEBLE",
    },
    {
      key: "DAR EN ALQUILER",
      value: "DAR EN ALQUILER",
      text: "DAR EN ALQUILER",
    },
    {
      key: "TOMAR EN ALQUILER",
      value: "TOMAR EN ALQUILER",
      text: "TOMAR EN ALQUILER",
    },
  ];
  const [initialData, setinitialData] = useState({
    fullname: "",
    email: "",
    phone: null,
    managment: "",
  });

  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);

  const onFinish = async (values) => {
    setIsLoading(true);
    const value = {
      fullname: values.fullname,
      email: values.email,
      phone: values.phone,
      managment: values.managment,
    };
    try {
      const response = await fetch(`${API}/records`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ data: { ...value } }),
      });

      message.success(
        `¡Bienvenido(a) al Sistema Costarricense de Consultas Inmobiliarias Centralizadas.!`
      );
      navigate("/home/banner/visiter", { replace: true });
      const body = `Hemos recibido una nueva visita al Sistema CIC.`;
      enviarCorreoPersonalizadoOrigen(
        "infosistemacic@gmail.com",
        body,
        value.email
      );
      enviarCorreo("infosistemacic@gmail.com", 3);
    } catch (error) {
      message.error("¡Ocurrió un error inesperado. Intente de nuevo!");
    } finally {
      setIsLoading(false);
    }
  };
  if (isLoading) {
    return <MySpinner />;
  }
  return (
    <div className="flex my-1 flex-col px-12 text-center sm:px-10 md:px-6 justify-center items-center bg-white">
      <div className="mb-0 mt-0 sm:my-2 flex flex-col">
        <label className="loginh my-2">Registro de visita</label>
        <label className="loginh5 w-72 mb-1">
          Si estás de visita y deseas realizar alguna acción, por favor rellena
          estos campos
        </label>
      </div>
      <Formik
        initialValues={initialData}
        validationSchema={VisitSchema}
        onSubmit={onFinish}
      >
        {({ errors, touched }) => (
          <Form onFinish={onFinish} autoComplete="off">
            <div className="relative mb-1">
              <Field
                type="text"
                className="peer m-0 text-sm block h-[58px] w-full rounded-xl border border-solid border-neutral-500 bg-transparent bg-clip-padding px-3 py-4  font-normal leading-tight text-neutral-700 transition duration-200 ease-linear placeholder:text-transparent focus:border-primary pt-[1.4rem] focus:pt-[1.4rem] focus:text-neutral-700 focus:outline-none peer-focus:text-primary"
                id="fullname"
                name="fullname"
                placeholder="Nombre completo"
              />
              <label
                for="fullname"
                className="pointer-events-none absolute text-xs left-0 top-0 origin-[0_0] border border-solid border-transparent px-3 py-5 text-neutral-500 transition-[opacity,_transform] duration-200 ease-linear peer-focus:-translate-y-2 peer-focus:translate-x-[0.15rem] peer-focus:scale-[0.85] peer-focus:text-primary peer-[:not(:placeholder-shown)]:-translate-y-2 peer-[:not(:placeholder-shown)]:translate-x-[0.15rem] peer-[:not(:placeholder-shown)]:scale-[0.85] motion-reduce:transition-none"
              >
                Nombre completo
              </label>
            </div>
            <div className="space">
              {errors.fullname && touched.fullname ? (
                <div className="errordivp text-xs">{errors.fullname}</div>
              ) : null}
            </div>
            <div className="relative mb-1">
              <Field
                type="text"
                className="peer m-0 text-sm block h-[58px] w-full rounded-xl border border-solid border-neutral-500 bg-transparent bg-clip-padding px-3 py-4  font-normal leading-tight text-neutral-700 transition duration-200 ease-linear placeholder:text-transparent focus:border-primary pt-[1.4rem] focus:pt-[1.4rem] focus:text-neutral-700 focus:outline-none peer-focus:text-primary"
                id="email"
                name="email"
                placeholder="Correo electrónico"
              />
              <label
                for="email"
                className="pointer-events-none absolute text-xs left-0 top-0 origin-[0_0] border border-solid border-transparent px-3 py-5 text-neutral-500 transition-[opacity,_transform] duration-200 ease-linear peer-focus:-translate-y-2 peer-focus:translate-x-[0.15rem] peer-focus:scale-[0.85] peer-focus:text-primary peer-[:not(:placeholder-shown)]:-translate-y-2 peer-[:not(:placeholder-shown)]:translate-x-[0.15rem] peer-[:not(:placeholder-shown)]:scale-[0.85] motion-reduce:transition-none"
              >
                Correo electrónico
              </label>
            </div>
            <div className="space">
              {errors.email && touched.email ? (
                <div className="errordivp text-xs">{errors.email}</div>
              ) : null}
            </div>
            <div className="relative mb-1">
              <Field
                type="text"
                className="peer m-0 text-sm block h-[58px] w-full rounded-xl border border-solid border-neutral-500 bg-transparent bg-clip-padding px-3 py-4  font-normal leading-tight text-neutral-700 transition duration-200 ease-linear placeholder:text-transparent focus:border-primary pt-[1.4rem] focus:pt-[1.4rem] focus:text-neutral-700 focus:outline-none peer-focus:text-primary"
                id="phone"
                name="phone"
                placeholder="Número de teléfono"
              />
              <label
                for="phone"
                className="pointer-events-none absolute text-xs left-0 top-0 origin-[0_0] border border-solid border-transparent px-3 py-5 text-neutral-500 transition-[opacity,_transform] duration-200 ease-linear peer-focus:-translate-y-2 peer-focus:translate-x-[0.15rem] peer-focus:scale-[0.85] peer-focus:text-primary peer-[:not(:placeholder-shown)]:-translate-y-2 peer-[:not(:placeholder-shown)]:translate-x-[0.15rem] peer-[:not(:placeholder-shown)]:scale-[0.85] motion-reduce:transition-none"
              >
                Número de teléfono
              </label>
            </div>
            <div className="space">
              {errors.phone && touched.phone ? (
                <div className="errordivp text-xs">{errors.phone}</div>
              ) : null}
            </div>
            <div className="mb-1 text-left">
              <label className="text-sm ml-2">
                ¿Qué gestión deseas hacer hoy?
              </label>
            </div>

            <div className="flex flex-col">
              <Field
                className="w-60 h-[58px] common-input"
                as="select"
                name="managment"
                id="type"
              >
                <option value="" label="">
                  {"OPCIONES"}
                </option>
                {options.map((item) => (
                  <option value={item.value} label={item.label}>
                    {item.value}
                  </option>
                ))}
              </Field>
            </div>
            <div className="space">
              {errors.managment && touched.managment ? (
                <div className="errordivp text-xs">{errors.managment}</div>
              ) : null}
            </div>
            <div className="text-left mt-2">
              <b className="text-s">Sistema CIC</b>
            </div>
            <div className="mb-0 text-left mt-0 flex flex-col">
              <label className="text-gray-600 text-xs w-72">
                Recuerda que esta es la herramienta número uno de trabajo de los
                Asesores Inmobiliarios en Costa Rica
              </label>
            </div>
            <div className="max-w-60 flex flex-col">
              <button
                className="button-signin max-w-full login_submit_btn"
                type="submit"
              >
                REGISTRARME
              </button>
            </div>
            <div className="flex flex-row mx-2 mt-2 justify-between">
              <label className="text-sm">¿Tienes una cuenta?</label>
              <Link to="/auth/signin" className="text-sm text-blue-800">
                Inicia sesión
              </Link>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default VisitRecord;
