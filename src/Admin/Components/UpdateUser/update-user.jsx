import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { message } from "antd";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

import { Estado, TipoAsesor } from "../../../BD/bd";
import { API } from "../../../constant";
import { authUserData } from "../../../api/usersApi";
import AxiosInstance from "../../../api/AxiosInstance";
import MySpinner from "../../../components/Spinner/spinner";

const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
const phoneRegex = /^[0-9]+$/;
const RegisterSchema = Yup.object().shape({
  username: Yup.string().required("¡El nombre es requerido!"),
  email: Yup.string()
    .matches(emailRegex, "¡Correo inválido!")
    .required("¡El correo es requerido!"),
  password: Yup.string()
    .min(6, "¡Debe ser más larga!")
    .max(50, "¡Demasiado larga!")
    .required("¡La contraseña es requerida!"),
  company: Yup.string()
    .min(4, "¡Debe ser más larga!")
    .max(50, "¡Demasiado larga!")
    .required("¡El nombre de la empresa es requerido!"),
  address: Yup.string()
    .min(4, "¡Debe ser más larga!")
    .max(50, "¡Demasiado larga!")
    .required("¡Su dirección es requerida!"),
  type: Yup.string().required("¡El tipo de asesor es requerido!"),
  active: Yup.string().required("¡El estado es requerido!"),
  acept: Yup.boolean().oneOf([true], "¡Debe aceptar los términos!"),
  phone: Yup.string()
    .matches(phoneRegex, "¡Teléfono invalido!")
    .min(10, "¡Teléfono invalido!")
    .max(15, "¡Teléfono invalido!")
    .required("¡El teléfono de la oficina es requerido!"),
  mobile: Yup.string()
    .matches(phoneRegex, "¡Teléfono invalido!")
    .min(10, "¡Teléfono invalido!")
    .max(15, "¡Teléfono invalido!")
    .required("¡El teléfono celular es requerido!"),
  personalId: Yup.string().required("¡El identificador personal es requerido!"),
});

const UpdateUser = () => {
  const [initialData, setinitialData] = useState({
    username: "",
    email: "",
    password: "",
    type: "",
    acept: true,
    phone: null,
    company: "",
    address: "",
    mobile: "",
    personalId: "",
    active: "",
  });

  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);

  const onFinish = async (values) => {
    setIsLoading(true);
    try {
      const value = {
        username: values.username,
        email: values.email,
        password: values.password,
        phone: values.phone,
        company: values.company,
        address: values.address,
        mobile: values.mobile,
        personalId: values.personalId,
        type: values.type,
        active: values.active,
        acept: true,
      };
      const user = authUserData();
      const axios = AxiosInstance();
      if (user) {
        const response = await axios.put(`${API}/users/${user.id}`, value);

        if (response) {
          message.success("¡Datos actualizados correctamente!");
          navigate("/user/logout");
        }
      } else {
        message.error("¡Ocurrió un error. Inténtelo de nuevo!");
      }
    } catch (error) {
      message.error("Ocurrió un error inesperado!");
    } finally {
      setIsLoading(false);
    }
  };
  if (isLoading) {
    return <MySpinner />;
  }

  return (
    <div className="flex flex-col px-12 pt-12 text-center sm:px-10 md:px-6 justify-center items-center bg-white">
      <Formik
        initialValues={initialData}
        validationSchema={RegisterSchema}
        onSubmit={onFinish}
      >
        {({ errors, touched }) => (
          <Form onFinish={onFinish} autoComplete="off">
            <div className="flex flex-col mx-20 mt-40 align-middle lg:flex-row items-center justify-center ">
              <div className="lg:w-1/3 align-middle">
                <img
                  src="ruta_de_la_imagen.jpg"
                  alt="Imagen"
                  className="w-full h-auto"
                />
              </div>

              <div className="lg:w-1/3 px-10">
                <Field
                  type="text"
                  name="username"
                  className="w-full input-admin-property"
                  placeholder="Nombre completo"
                />
                <div className="space">
                  {errors.username && touched.username ? (
                    <div className="errordiv text-xs">{errors.username}</div>
                  ) : null}
                </div>
                <Field
                  type="text"
                  name="personalId"
                  className="w-full input-admin-property"
                  placeholder="Identificador personal"
                />
                <div className="space">
                  {errors.personalId && touched.personalId ? (
                    <div className="errordiv text-xs">{errors.personalId}</div>
                  ) : null}
                </div>
                <Field
                  type="text"
                  name="email"
                  className="w-full input-admin-property"
                  placeholder="Correo electrónico"
                />
                <div className="space">
                  {errors.email && touched.email ? (
                    <div className="errordiv text-xs">{errors.email}</div>
                  ) : null}
                </div>
                <Field
                  type="text"
                  name="phone"
                  className="w-full input-admin-property"
                  placeholder="Teléfono oficina"
                />
                <div className="space">
                  {errors.phone && touched.phone ? (
                    <div className="errordiv text-xs">{errors.phone}</div>
                  ) : null}
                </div>
                <Field
                  type="text"
                  name="mobile"
                  className="w-full input-admin-property"
                  placeholder="Teléfono celular"
                />
                <div className="space">
                  {errors.mobile && touched.mobile ? (
                    <div className="errordiv text-xs">{errors.mobile}</div>
                  ) : null}
                </div>
              </div>
              <div className="lg:w-1/3 px-10">
                <Field
                  type="text"
                  name="company"
                  className="w-full input-admin-property"
                  placeholder="Nombre de la empresa"
                />
                <div className="space">
                  {errors.company && touched.company ? (
                    <div className="errordiv text-xs">{errors.company}</div>
                  ) : null}
                </div>
                <Field
                  type="text"
                  name="address"
                  className="w-full input-admin-property"
                  placeholder="Dirección física"
                />
                <div className="space">
                  {errors.address && touched.address ? (
                    <div className="errordiv text-xs">{errors.address}</div>
                  ) : null}
                </div>
                <Field
                  type="password"
                  name="password"
                  className="w-full input-admin-property"
                  placeholder="Contraseña"
                />
                <div className="space">
                  {errors.password && touched.password ? (
                    <div className="errordiv text-xs">{errors.password}</div>
                  ) : null}
                </div>
                <Field
                  as="select"
                  id="type"
                  name="type"
                  className="w-full input-admin-property"
                  placeholder="Tipo de asesor"
                >
                  <option value="" label="">
                    {"Seleccione el tipo de asesor"}
                  </option>
                  {TipoAsesor.map((item) => (
                    <option value={item.value} label={item.label}>
                      {item.value}
                    </option>
                  ))}
                </Field>
                <div className="space">
                  {errors.type && touched.type ? (
                    <div className="errordiv text-xs">{errors.type}</div>
                  ) : null}
                </div>
                <Field
                  as="select"
                  name="active"
                  id="active"
                  className="w-full input-admin-property"
                  placeholder="Estado"
                >
                  <option value="" label="">
                    {"Seleccione un estado"}
                  </option>
                  {Estado.map((item) => (
                    <option value={item.value} label={item.label}>
                      {item.value}
                    </option>
                  ))}
                </Field>
                <div className="space">
                  {errors.active && touched.active ? (
                    <div className="errordiv text-xs">{errors.active}</div>
                  ) : null}
                </div>
              </div>
            </div>
            <div className="flex flex-row align-middle justify-center content-center">
              <div className="max-w-60 flex flex-col">
                <button
                  type="submit"
                  onClick={() => navigate("/admin/users")}
                  className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                >
                  Cancelar
                </button>
              </div>
              <div className="max-w-60 flex flex-col">
                <button
                  type="submit"
                  className="focus:outline-none text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2"
                >
                  Agregar
                </button>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default UpdateUser;
