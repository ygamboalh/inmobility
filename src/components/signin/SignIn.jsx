import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "react-query";
import { useSignIn } from "react-auth-kit";

import { message } from "antd";
import { useFormik } from "formik";
import * as Yup from "yup";
import { BiShow, BiHide, BiUserCircle, BiLock } from "react-icons/bi";

import { authUser } from "../../api/usersApi";
import MySpinner from "../Spinner/spinner";
import MetaData from "../Metadata/metadata";

const SignIn = () => {
  const signIn = useSignIn();
  const [showPassword, setShowPassword] = useState(false);

  const {
    mutate: loginMutation,
    isLoading,
    isError,
    error,
  } = useMutation(authUser);

  const formik = useFormik({
    initialValues: {
      identifier: "",
      password: "",
    },
    validationSchema: Yup.object({
      identifier: Yup.string()
        .email("El correo no es válido")
        .required("El correo es requerido"),
      password: Yup.string().required("La contraseña es requerida"),
    }),
    onSubmit: async (values) => {
      loginMutation(values, {
        onSuccess: (data) => {
          signIn({
            token: data.jwt,
            expiresIn: 180,
            tokenType: "Bearer",
            authState: data.user,
          });

          window.location.reload(true);
          message.success(
            `¡Bienvenido(a) al Sistema Costarricense de Consultas Inmobiliarias Centralizadas.!`
          );
        },
        onError: (error) => {
          message.error(`¡Ocurrió un error. Vuelva a intentarlo!`);
        },
      });
    },
  });

  if (isLoading) {
    return <MySpinner />;
  }
  return (
    <div className="flex my-6 flex-col px-12 text-center sm:px-10 md:px-6 justify-center items-center bg-white">
      <div className="border rounded-lg shadow border-gray-300 p-4">
        <MetaData title="Iniciar sesión" content={"Iniciar sesión"} />
        <div className="my-20 lg:my-3 sm:my-6 flex flex-col">
          <label className="loginh">Iniciar sesión</label>
          <label className="loginh5">Ingresa tus datos</label>
        </div>
        <form onSubmit={formik.handleSubmit} autoComplete="off">
          <div className="relative w-80">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <BiUserCircle size={25} />
            </div>
            <input
              value={formik.values.identifier}
              onChange={formik.handleChange}
              placeholder="Correo electrónico"
              type="email"
              name="identifier"
              className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>
          <div className="space -mt-4 mb-3">
            {formik.errors.identifier && formik.touched.identifier ? (
              <div className="errordiv text-xs">{formik.errors.identifier}</div>
            ) : null}
          </div>

          <div className="relative w-80">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <BiLock size={25} />
            </div>
            <input
              value={formik.values.password}
              onChange={formik.handleChange}
              placeholder="Contraseña"
              type={showPassword ? "text" : "password"}
              name="password"
              className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
            <button
              type="button"
              className="text-white absolute right-2.5 bottom-2.5  px-2 py-1"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <BiShow size={25} color="#84a8e1" />
              ) : (
                <BiHide size={25} color="#84a8e1" />
              )}
            </button>
          </div>
          <div className="space -mt-4">
            {formik.errors.password && formik.touched.password ? (
              <div className="errordiv text-xs">{formik.errors.password}</div>
            ) : null}
          </div>
          <div className="flex mx-4 my-2 justify-between items-center">
            <Link to="/auth/forgot-password" className="text-xs text-red-700">
              ¿Olvidó su contraseña?
            </Link>
          </div>
          <div className="max-w-60 flex flex-col">
            <button
              className="button-signin max-w-full login_submit_btn"
              type="submit"
            >
              INICIAR SESIÓN
            </button>
            <label className="text-md my-4">¿No tienes una cuenta?</label>
            <Link to="/auth/register-request" link-to className="button-rq">
              Solicitar una cuenta
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
