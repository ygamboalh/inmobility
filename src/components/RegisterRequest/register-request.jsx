import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useMutation } from "react-query";

import { message } from "antd";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

import { API } from "../../constant";
import { userIntser } from "../../api/usersApi";
import MySpinner from "../Spinner/spinner";

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
  acept: Yup.boolean().oneOf([true], "¡Debe aceptar los términos!"),
  phone: Yup.string()
    .matches(phoneRegex, "¡Teléfono invalido!")
    .min(8, "¡Teléfono invalido!")
    .max(15, "¡Teléfono invalido!")
    .required("¡El teléfono de la oficina es requerido!"),
  mobile: Yup.string()
    .matches(phoneRegex, "¡Teléfono invalido!")
    .min(8, "¡Teléfono invalido!")
    .max(15, "¡Teléfono invalido!")
    .required("¡El teléfono celular es requerido!"),
  personalId: Yup.string().required("¡El identificador personal es requerido!"),
});

const RegisterRequest = () => {
  const types = [
    {
      key: "Asesor Inmobiliario Independiente",
      value: "Asesor Inmobiliario Independiente",
      text: "Asesor Inmobiliario Independiente",
    },
    {
      key: "Asesor Agremiado a una cámara, federación de Bienes",
      value: "Asesor Agremiado a una cámara, federación de Bienes",
      text: "Asesor Agremiado a una cámara, federación de Bienes",
    },
    {
      key: "Dueño de Franquicia Inmobiliaria",
      value: "Dueño de Franquicia Inmobiliaria",
      text: "Dueño de Franquicia Inmobiliaria",
    },
    {
      key: "Asesor colaborador en una empresa de Bienes Raíces",
      value: "Asesor colaborador en una empresa de Bienes Raíces",
      text: "Asesor colaborador en una empresa de Bienes Raíces",
    },
    {
      key: "Dueño de una oficina de Bienes Raíces con varios colaboradores",
      value: "Dueño de una oficina de Bienes Raíces con varios colaboradores",
      text: "Dueño de una oficina de Bienes Raíces con varios colaboradores",
    },
    {
      key: "Colaborador en una Institución Financiera con Bienes Adjudicados",
      value: "Colaborador en una Institución Financiera con Bienes Adjudicados",
      text: "Colaborador en una Institución Financiera con Bienes Adjudicados",
    },
    {
      key: "Asistente de Asesor Inmobiliario",
      value: "Asistente de Asesor Inmobiliario",
      text: "Asistente de Asesor Inmobiliario",
    },
  ];
  const [initialData, setinitialData] = useState({
    username: "",
    email: "",
    password: "",
    type: "",
    acept: false,
    phone: null,
    company: "",
    address: "",
    mobile: "",
    personalId: "",
  });

  const {
    mutate: insertMutation,
    isLoading: isLoadingInsert,
    isError,
    errors,
  } = useMutation(userIntser);

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
      };

      const userResponse = await fetch(`${API}/users`, {
        method: "GET",
      });

      const userData = await userResponse.json();

      const found = userData.find((userf) => userf.email === values.email);

      //if the user is not found then register
      if (!found) {
        insertMutation(value, {
          onSuccess: () => {
            message.success("El usuario se registró exitosamente");
            navigate("/home/banner");
          },
          onError: (error) => {
            message.error("Ocurrió un error inesperado");
            //(error.response.data.error.message);
          },
        });

        navigate("/user/sent-request", { replace: true });
      }
      //if he is waiting for approval say you are evaluating the case
      else {
        navigate("/user/evaluating", { replace: true });
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
    <div className="flex my-1 flex-col px-12 text-center sm:px-10 md:px-6 justify-center items-center bg-white">
      <div className="mb-0 mt-0 sm:my-2 flex flex-col">
        <label className="loginh my-2">Solicitud de Registro</label>
        <label className="loginh5 w-72 mb-1">
          Para ser un asesor inmobiliario verificado, debes rellenar este
          formulario y esperar la comprobación de los datos.
        </label>
      </div>
      <Formik
        initialValues={initialData}
        validationSchema={RegisterSchema}
        onSubmit={onFinish}
      >
        {({ errors, touched }) => (
          <Form onFinish={onFinish} autoComplete="off">
            <Field
              placeholder="Nombre completo"
              type="text"
              name="username"
              className="common-input"
            />
            <div className="space">
              {errors.username && touched.username ? (
                <div className="errordiv text-xs">{errors.username}</div>
              ) : null}
            </div>

            <Field
              placeholder="Identificador personal"
              type="text"
              name="personalId"
              className="common-input"
            />

            <div className="space">
              {errors.personalId && touched.personalId ? (
                <div className="errordiv text-xs">{errors.personalId}</div>
              ) : null}
            </div>

            <Field
              placeholder="Correo electrónico"
              name="email"
              type="email"
              className="common-input"
            />

            <div className="space">
              {errors.email && touched.email ? (
                <div className="errordiv text-xs">{errors.email}</div>
              ) : null}
            </div>

            <Field
              placeholder="Teléfono de la oficina"
              name="phone"
              type="text"
              className="common-input"
            />

            <div className="space">
              {errors.phone && touched.phone ? (
                <div className="errordiv text-xs">{errors.phone}</div>
              ) : null}
            </div>

            <Field
              placeholder="Teléfono celular"
              name="mobile"
              type="text"
              className="common-input"
            />

            <div className="space">
              {errors.mobile && touched.mobile ? (
                <div className="errordiv text-xs">{errors.mobile}</div>
              ) : null}
            </div>

            <Field
              placeholder="Nombre de la empresa"
              type="text"
              name="company"
              className="common-input"
            />

            <div className="space">
              {errors.company && touched.company ? (
                <div className="errordiv text-xs">{errors.company}</div>
              ) : null}
            </div>

            <Field
              placeholder="Dirección física"
              type="text"
              name="address"
              className="common-input"
            />

            <div className="space">
              {errors.address && touched.address ? (
                <div className="errordiv text-xs">{errors.address}</div>
              ) : null}
            </div>

            <Field
              placeholder="Contraseña"
              name="password"
              type="password"
              className="common-input"
            />

            <div className="space">
              {errors.password && touched.password ? (
                <div className="errordiv text-xs">{errors.password}</div>
              ) : null}
            </div>
            <div className="mb-1 mt-1 text-left">
              <label className="text-sm ml-2">
                Tipo de asesor inmobiliario
              </label>
            </div>

            <Field
              className="common-input mb-2"
              as="select"
              name="type"
              id="type"
            >
              <option value="" label="">
                {"Seleccione el tipo de asesor"}
              </option>
              {types.map((item) => (
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
            <div className="flex mx-4 justify-between items-center">
              <label className="flex items-center text-xs">
                <Field type="checkbox" name="acept" className="mr-2" />
                <a href="/user/terms">
                  <span>Acepto términos y condiciones</span>
                </a>
              </label>
            </div>
            <div className="space">
              {errors.acept && touched.acept ? (
                <div className="errordiv text-xs">{errors.acept}</div>
              ) : null}
            </div>
            <div className="max-w-60 flex flex-col">
              <button className="button-signin max-w-full" type="submit">
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

export default RegisterRequest;
