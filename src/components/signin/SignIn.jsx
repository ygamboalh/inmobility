import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useMutation, useQuery } from "react-query";
import { useSignIn, useSignOut } from "react-auth-kit";

import { message } from "antd";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  BiShow,
  BiHide,
  BiUserCircle,
  BiLock,
  BiLogInCircle,
} from "react-icons/bi";

import { authUser, authUserData } from "../../api/usersApi";
import MySpinner from "../Spinner/spinner";
import MetaData from "../Metadata/metadata";
import AxiosInstance from "../../api/AxiosInstance";
import { deleteZero, getUserTokenDate } from "../../utils/helpers";

const SignIn = () => {
  const signIn = useSignIn();
  const [showPassword, setShowPassword] = useState(false);
  const { data: userData } = useQuery("profile", authUserData);
  const signOut = useSignOut();
  const navigate = useNavigate();

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
      });
    },
  });
  useEffect(() => {
    const id = userData?.id;
    if (id) {
      forcedLogOut();
    }
  }, []);
  const forcedLogOut = () => {
    const token = getUserTokenDate();
    const currentDate = new Date();
    const currentDateString = currentDate.toISOString().split("T")[0];
    const currentTimeString = currentDate
      .toISOString()
      .split("T")[1]
      .split(".")[0];
    const fecha = token?.slice(0, 10);
    const hora = token?.slice(11, 16);
    const horaCreado = deleteZero(hora?.slice(0, 2));
    const horaActual = deleteZero(currentTimeString?.slice(0, 2));
    const diaCreado = parseInt(deleteZero(fecha?.slice(5, 7)));
    const diaActual = parseInt(deleteZero(currentDateString?.slice(5, 7)));
    const result = horaActual - horaCreado;
    const dias = diaActual - diaCreado;

    //Si es el mismo dia
    if (currentDateString === fecha && result >= 3) {
      const response = AxiosInstance.put(`/users/${userData?.id}`, {
        isLoggedIn: false,
      })
        .then((res) => {
          signOut();
          navigate("/");
        })
        .catch((err) => {
          return err;
        });
    } else if (dias > 1) {
      //Si ha pasado mas de un dia
      const response = AxiosInstance.put(`/users/${userData?.id}`, {
        isLoggedIn: false,
      })
        .then((res) => {
          signOut();
          navigate("/");
        })
        .catch((err) => {
          return err;
        });
    } else if (
      dias === 1 &&
      horaCreado >= 21 &&
      horaCreado <= 23 &&
      result > -21
    ) {
      //Si paso de dia e inicio sesion entre las 21 y las 23 y ademas es entre las 0 y las 2 horas del dia que inicio sesion
      const response = AxiosInstance.put(`/users/${userData?.id}`, {
        isLoggedIn: false,
      })
        .then((res) => {
          signOut();
          navigate("/");
        })
        .catch((err) => {
          return err;
        });
    } else if (dias > 0) {
      //Si no se cumplen los anteriores y paso de dia
      const response = AxiosInstance.put(`/users/${userData?.id}`, {
        isLoggedIn: false,
      })
        .then((res) => {
          signOut();
          navigate("/");
        })
        .catch((err) => {
          return err;
        });
    }
  };

  if (isLoading) {
    return <MySpinner />;
  }
  return (
    <div className="flex my-6 flex-col px-12 text-center sm:px-10 md:px-6 justify-center items-center bg-white">
      <div className="border rounded-lg shadow border-gray-300 p-4">
        <MetaData title="Iniciar sesión" content={"Iniciar sesión"} />
        <div className="flex justify-center">
          <BiLogInCircle size={50} />
        </div>
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
              className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
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
