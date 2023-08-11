import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { message } from "antd";
import { useFormik } from "formik";
import * as Yup from "yup";
import { BiShow, BiHide, BiLock, BiUserCircle } from "react-icons/bi";

import { API } from "../../constant";
import MySpinner from "../Spinner/spinner";
import { useMutation } from "react-query";
import { channgePassword, resetPassword } from "../../api/usersApi";
import axios from "axios";
import MetaData from "../Metadata/metadata";

const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
const RecoverySchema = Yup.object().shape({
  code: Yup.string()
    .required("¡El código es requerido!")
    .min(6, "¡El código no es válido!")
    .max(6, "¡El código no es válido!"),
  password: Yup.string()
    .min(6, "¡Debe ser más larga!")
    .max(50, "¡Demasiado larga!")
    .required("¡La contraseña es requerida!"),
  passwordConfirmation: Yup.string()
    .required("¡La contraseña es requerida!")
    .oneOf([Yup.ref("password"), null], "¡Las contraseñas deben coincidir!"),
});

const ResetPassword = () => {
  const location = useLocation();
  const codigo = location.state.codigo;
  const user = location.state.user;

  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      code: undefined,
      password: "",
      passwordConfirmation: "",
    },
    validationSchema: Yup.object({
      code: Yup.number().required("¡El código es requerido!"),
      password: Yup.string()
        .required("¡La contraseña es requerida!")
        .min(6, "¡Demasiado corta!")
        .max(50, "¡Demasiado larga!"),
      passwordConfirmation: Yup.string().oneOf(
        [Yup.ref("password"), null],
        "¡Las contraseñas deben coincidir!"
      ),
    }),
    onSubmit: async (values) => {
      const value = {
        code: values.code,
        password: values.password,
        passwordConfirmation: values.passwordConfirmation,
        username: user.username,
        email: user.email,
        company: user.company,
        address: user.address,
        mobile: user.mobile,
        personalId: user.personalId,
        phone: user.phone,
        active: user.active,
        type: user.type,
      };

      const code = values.code.toString();

      if (codigo === code) {
        const response = axios(`${API}users/${user.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(value),
        })
          .then((response) => {
            message.success(`¡La contraseña fue cambiada exitosamente!`);
            navigate("/auth/signin");
          })
          .catch((error) => {
            message.error(`¡Ocurrió un error. Intente de nuevo!`);
          });
      } else {
        message.error(`¡El código introducido no es válido!`);
        return;
      }
    },
  });

  if (isLoading) {
    return <MySpinner />;
  }
  return (
    <div className="flex my-10 flex-col px-12 text-center sm:px-10 md:px-6 justify-center items-center bg-white">
      <MetaData title="Reiniciar clave" description="Reiniciar clave" />
      <div className="lg:my-2.5 flex flex-col">
        <label className="loginh">Recuperación de contraseña</label>
        <label className="loginh5">Introduzca los datos requeridos</label>
      </div>
      <form onSubmit={formik.handleSubmit} autoComplete="off">
        <div className="relative w-80">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 mb-0 pointer-events-none">
            <BiLock size={25} />
          </div>
          <input
            value={formik.values.password}
            onChange={formik.handleChange}
            placeholder="Nueva contraseña"
            type={showPassword ? "text" : "password"}
            name="password"
            className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />

          <button
            type="button"
            className="text-white absolute right-2.5 bottom-2.5  px-2 pb-1"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <BiShow size={25} color="#84a8e1" />
            ) : (
              <BiHide size={25} color="#84a8e1" />
            )}
          </button>
        </div>
        <div className="space -mt-4 mb-3">
          {formik.errors.password && formik.touched.password ? (
            <div className="errordivp text-xs">{formik.errors.password}</div>
          ) : null}
        </div>
        <div className="relative w-80">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 mb-1 pointer-events-none">
            <BiLock size={25} />
          </div>
          <input
            value={formik.values.passwordConfirmation}
            onChange={formik.handleChange}
            placeholder="Confirme la nueva contraseña"
            type={showPassword ? "text" : "password"}
            name="passwordConfirmation"
            className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />

          <button
            type="button"
            className="text-white absolute right-2.5 bottom-2.5  px-2 mb-1 "
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <BiShow size={25} color="#84a8e1" />
            ) : (
              <BiHide size={25} color="#84a8e1" />
            )}
          </button>
        </div>
        <div className="space -mt-4 mb-3">
          {formik.errors.passwordConfirmation &&
          formik.touched.passwordConfirmation ? (
            <div className="errordivp text-xs">
              {formik.errors.passwordConfirmation}
            </div>
          ) : null}
        </div>
        <input
          value={formik.values.code}
          onChange={formik.handleChange}
          placeholder="Código recibido"
          type="number"
          maxLength="6"
          name="code"
          className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />

        <div className="space -mt-4 mb-3">
          {formik.errors.code && formik.touched.code ? (
            <div className="errordivp text-xs">{formik.errors.code}</div>
          ) : null}
        </div>

        <div className="max-w-60 flex flex-col -mt-5">
          <button
            className="button-signin max-w-full login_submit_btn"
            type="submit"
          >
            CAMBIAR LA CONTRASEÑA
          </button>
        </div>
      </form>
    </div>
  );
};

export default ResetPassword;
