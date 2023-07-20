import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { message } from "antd";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

import { API } from "../../constant";
import MySpinner from "../Spinner/spinner";
import { BiUserCircle } from "react-icons/bi";
import enviarCorreoPersonalizadoOrigen from "../../utils/email/send-personalized-email-origin";
import enviarCorreoComunOrigen from "../../utils/email/send-common-email-origin";
import { generateRandomCode } from "../../utils/helpers";
import axios from "axios";

const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
const ForgotSchema = Yup.object().shape({
  email: Yup.string()
    .matches(emailRegex, "¡Correo inválido!")
    .required("¡El correo es requerido!"),
});

const ForgotPassword = () => {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);

  const onFinish = async (values) => {
    setIsLoading(true);
    try {
      const value = {
        email: values.email,
      };
      //Enviar el codigo por correo
      const codigo = generateRandomCode();
      const asunto = `Código de verificación`;
      const body = `Este es el código de verificación para el cambio de contraseña: ${codigo}`;

      const response = axios
        .get(`${API}users?filters[email][$eq]=${value.email}`)
        .then((response) => {
          console.log("respuesta", response);
          if (response.data.length > 0) {
            enviarCorreoComunOrigen(value.email, body, asunto);

            navigate("/auth/reset-password", {
              state: { codigo: codigo, user: response.data[0] },
            });
          } else {
            message.error(
              `¡Usted no tiene un usuario activo en nuestro sistema!`
            );
          }
        })
        .catch((error) => {
          console.log("el error", error);
        });
    } catch (error) {
      message.error("¡Ocurrió un error. Intente de nuevo!");
    } finally {
      setIsLoading(false);
    }
  };
  if (isLoading) {
    return <MySpinner />;
  }

  return (
    <div className="flex my-6 flex-col px-12 text-center sm:px-10 md:px-6 justify-center items-center bg-white">
      <div className="my-20 lg:my-3 sm:my-6 flex flex-col">
        <label className="loginh">Recuperación de contraseña</label>
        <label className="loginh5">
          Se enviará un código a tu correo para cambiar la contraseña
        </label>
      </div>
      <Formik
        initialValues={{
          email: "",
        }}
        validationSchema={ForgotSchema}
        onSubmit={onFinish}
      >
        {({ errors, touched }) => (
          <Form onFinish={onFinish} autoComplete="off">
            <div className="relative w-80">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <BiUserCircle size={25} />
              </div>
              <Field
                placeholder="Correo electrónico"
                type="email"
                name="email"
                className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>
            <div className="space">
              {errors.email && touched.email ? (
                <div className="errordivp text-xs">{errors.email}</div>
              ) : null}
            </div>
            <div className="max-w-60 flex flex-col">
              <button
                className="button-signin max-w-full login_submit_btn mb-4"
                type="submit"
              >
                ENVIAR CÓDIGO POR CORREO
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ForgotPassword;
