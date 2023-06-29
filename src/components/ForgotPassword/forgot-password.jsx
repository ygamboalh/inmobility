import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { message } from "antd";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

import { API } from "../../constant";
import MySpinner from "../Spinner/spinner";

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
      const response = await fetch(`${API}/auth/forgot-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(value),
      });

      const data = await response.json();
      if (data?.error) {
        throw data?.error;
      } else {
        navigate("/auth/forgot-password", { replace: true });
      }
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
          Se enviará un enlace a tu correo para cambiar la contraseña
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
            <div className="div">
              <span className="image-container">
                <img className="image-email" />
              </span>
              <div className="flex flex-col text-gray-500 text-left">
                <label className="email-title-email">Correo</label>
                <Field
                  placeholder="Correo electrónico"
                  type="email"
                  name="email"
                  className="input signin-email"
                />
              </div>
            </div>
            <div className="space">
              {errors.email && touched.email ? (
                <div className="errordiv text-xs">{errors.email}</div>
              ) : null}
            </div>
            <div className="max-w-60 flex flex-col">
              <button
                className="button-signin max-w-full login_submit_btn"
                type="submit"
              >
                ENVIAR ENLACE
              </button>
              <Link to="/register-request" className="text-sm my-4">
                ¿No tienes una cuenta?
              </Link>
              <Link to="/signin" link-to className="button-rq">
                Iniciar sesión
              </Link>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ForgotPassword;
