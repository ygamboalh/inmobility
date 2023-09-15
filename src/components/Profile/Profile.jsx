import React, { useState } from "react";
import { useQuery } from "react-query";

import { message } from "antd";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { BiHide, BiShow } from "react-icons/bi";

import { API, BEARER } from "../../constant";
import { getToken } from "../../utils/helpers";
import { authUserData } from "../../api/usersApi";
import { TipoAsesor } from "../../BD/bd";
import LoadImage from "../UploadImage/my-upload-image";
import Thumbnail from "../Thumbnail/thumbnail";
import MySpinner from "../Spinner/spinner";
import MetaData from "../Metadata/metadata";

const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
const phoneRegex = /^[0-9]+$/;
const ProfileSchema = Yup.object().shape({
  username: Yup.string().required("¡El nombre es requerido!"),
  email: Yup.string()
    .matches(emailRegex, "¡Correo inválido!")
    .required("¡El correo es requerido!"),
  password: Yup.string()
    .min(6, "¡Debe ser más larga!")
    .max(50, "¡Demasiado larga!"),
  company: Yup.string()
    .min(4, "¡Debe ser más larga!")
    .max(50, "¡Demasiado larga!")
    .required("¡El nombre de la empresa es requerido!"),
  address: Yup.string()
    .min(4, "¡Debe ser más larga!")
    .max(500, "¡Demasiado larga!")
    .required("¡Su dirección es requerida!"),
  type: Yup.string().required("¡El tipo de asesor es requerido!"),
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
  certifications: Yup.string().min(2, "¡Debe ser más larga!"),
});

const Profile = () => {
  const { data: userData } = useQuery("profile", authUserData);

  const [image, setImage] = useState();

  const [initialData, setinitialData] = useState({
    username: userData?.username,
    email: userData?.email,
    password: "",
    phone: userData?.phone,
    company: userData?.company,
    address: userData?.address,
    mobile: userData?.mobile,
    type: userData?.type,
    personalId: userData?.personalId,
    photo: userData?.photo,
    certifications: userData?.certifications,
  });

  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const onFinish = async (values) => {
    const token = getToken();
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
        photo: image,
        type: values.type,
        certifications: values.certifications,
      };
      //find the user that is logged in
      const response = await fetch(`${API}/users/me?populate=role`, {
        method: "GET",
        headers: { Authorization: `${BEARER} ${token}` },
      });
      const data = await response?.json();

      if (response.ok || data.role.name === "SuperAdmin") {
        const response = await fetch(`${API}/users/${data.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `${BEARER} ${token}`,
          },
          body: JSON.stringify(value),
        });
        message.success("¡Datos actualizados correctamente!");
        window.location.reload(true);
      } else {
        message.error("¡Ocurrió un error. Inténtelo de nuevo!");
      }
    } catch (error) {
      message.error("¡Ocurrió un error inesperado!");
    }
  };

  if (isLoading || !userData) {
    return <MySpinner />;
  }

  return (
    <div className="flex my-1 flex-col px-12 text-center sm:px-10 md:px-6 justify-center items-center bg-white">
      <div className="border rounded-lg shadow border-gray-300 py-4 px-8">
        <MetaData title="Mi perfil" description="Mi perfil" />
        <div className="mb-4 mt-0 sm:my-2 flex flex-col">
          <label className="loginh my-2">Actualizar perfil</label>
          <div className="flex flex-col">
            <div className="mb-20">
              <Thumbnail />
            </div>
            <div>
              <LoadImage />
            </div>
          </div>
        </div>
        <Formik
          initialValues={{
            username: userData?.username,
            email: userData?.email,
            password: userData?.password,
            phone: userData?.phone,
            company: userData?.company,
            address: userData?.address,
            mobile: userData?.mobile,
            personalId: userData?.personalId,
            type: userData?.type,
            photo: userData?.photo,
          }}
          validationSchema={ProfileSchema}
          onSubmit={onFinish}
        >
          {({ errors, touched }) => (
            <Form onFinish={onFinish} autoComplete="off">
              <Field
                placeholder="Nombre completo"
                defaultValue={userData?.username}
                type="text"
                name="username"
                className="common-input"
              />

              <div className="space">
                {errors.username && touched.username ? (
                  <div className="errordivp text-xs">{errors.username}</div>
                ) : null}
              </div>

              <Field
                defaultValue={userData?.personalId}
                placeholder="Identificador personal"
                type="text"
                name="personalId"
                className="common-input"
              />

              <div className="space">
                {errors.personalId && touched.personalId ? (
                  <div className="errordivp text-xs">{errors.personalId}</div>
                ) : null}
              </div>

              <Field
                defaultValue={userData?.email}
                placeholder="Correo electrónico"
                name="email"
                type="email"
                className="common-input"
              />

              <div className="space">
                {errors.email && touched.email ? (
                  <div className="errordivp text-xs">{errors.email}</div>
                ) : null}
              </div>
              <Field
                as="textarea"
                defaultValue={userData?.certifications}
                className="peer m-0 text-sm block h-[80px] w-full rounded-xl border border-solid border-neutral-500 bg-transparent bg-clip-padding px-3 py-2  font-normal leading-tight text-neutral-700 transition duration-200 ease-linear focus:border-primary pt-[1.4rem] focus:pt-[1.4rem] focus:text-neutral-700 focus:outline-none peer-focus:text-primary"
                id="certifications"
                name="certifications"
                placeholder="Anote aquí sus licencias o certificaciones"
              />
              <div className="space">
                {errors.certifications && touched.certifications ? (
                  <div className="errordivp text-xs">
                    {errors.certifications}
                  </div>
                ) : null}
              </div>

              <Field
                defaultValue={userData?.phone}
                placeholder="Teléfono de la oficina"
                name="phone"
                type="text"
                className="common-input"
              />

              <div className="space">
                {errors.phone && touched.phone ? (
                  <div className="errordivp text-xs">{errors.phone}</div>
                ) : null}
              </div>

              <Field
                defaultValue={userData?.mobile}
                placeholder="Teléfono celular"
                name="mobile"
                type="text"
                className="common-input"
              />

              <div className="space">
                {errors.mobile && touched.mobile ? (
                  <div className="errordivp text-xs">{errors.mobile}</div>
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
                  <div className="errordivp text-xs">{errors.company}</div>
                ) : null}
              </div>

              <Field
                as="textarea"
                defaultValue={userData?.address}
                placeholder="Dirección física"
                type="text"
                name="address"
                className="common-input -mb-2"
              />

              <div className="space">
                {errors.address && touched.address ? (
                  <div className="errordivp text-xs">{errors.address}</div>
                ) : null}
              </div>
              <div className="relative w-70">
                <Field
                  placeholder="Contraseña"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  className="common-input"
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
              <div className="space">
                {errors.password && touched.password ? (
                  <div className="errordivp text-xs">{errors.password}</div>
                ) : null}
              </div>

              <div className="mb-1 -mt-3 text-left">
                <label className="text-sm ml-2">
                  Tipo de asesor inmobiliario
                </label>
              </div>

              <div className="flex flex-col">
                <Field
                  className="w-60 common-input"
                  as="select"
                  name="type"
                  id="type"
                  defaultValue={userData?.type}
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
              </div>

              <div className="space">
                {errors.type && touched.type ? (
                  <div className="errordivp text-xs">{errors.type}</div>
                ) : null}
              </div>
              <div className="max-w-60 flex flex-col">
                <button className="button-signin max-w-full" type="submit">
                  GUARDAR
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Profile;
