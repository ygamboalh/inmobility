import React, { useState } from "react";

import { useFormik } from "formik";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import * as Yup from "yup";
import { message } from "antd";
import { BiMailSend } from "react-icons/bi";

import enviarCorreoComunOrigen from "../../utils/email/send-common-email-origin";
import MySpinner from "../Spinner/spinner";
import MetaData from "../Metadata/metadata";
import { createNotification } from "../../utils/helpers";
import { TipoContacto } from "../../BD/bd";

const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
const ContactVisiter = () => {
  const [isLoading, setIsLoading] = useState(false);

  const [phoneNumber, setPhoneNumber] = useState();
  const handlePhoneNumberChange = (value) => {
    setPhoneNumber(value);
  };

  const { handleChange, handleSubmit, values, errors, touched } = useFormik({
    initialValues: {
      name: "",
      email: "",
      message: "",
      mobile: "",
      contactType: "",
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .required("¡El nombre es requerido!")
        .min(2, "¡El nombre es muy corto!")
        .max(150, "¡El nombre es demasiado largo!"),
      message: Yup.string()
        .min(10, "¡El mensaje es muy corto!")
        .max(1000, "¡El mensaje es demasiado largo!")
        .required("¡El mensaje es requerido!"),
      email: Yup.string()
        .matches(emailRegex, "¡Correo inválido!")
        .required("¡El correo es requerido!"),
    }),
    onSubmit: async (values) => {
      setIsLoading(true);
      const body = `Ha recibido el siguiente mensaje desde el Sistema CIC: "${values.contactType}: ${values.message}" Estos son los datos de contacto: ${values.name}, ${values.email}, ${phoneNumber}`;
      try {
        const value = {
          name: values.name,
          email: values.email,
          message: values.message,
          mobile: phoneNumber,
        };
        enviarCorreoComunOrigen(
          "infosistemacic@gmail.com",
          body,
          "Cliente en contacto"
        );
        //Esta notificacion va al correo que tenga el admin, pues el mensajes es para el
        createNotification(
          "Correo electrónico recibido",
          `Se ha enviado un nuevo correo electrónico a través del formulario de sugerencias.`,
          null,
          "infosistemacic@gmail.com"
        );

        message.success("¡Su mensaje fue enviado correctamente!");
        window.location.reload(true);
      } catch (error) {
        message.error("¡Ocurrió un error inesperado!");
      } finally {
        setIsLoading(false);
      }
    },
  });
  if (isLoading) {
    return <MySpinner />;
  }

  return (
    <div className="flex my-1 flex-col px-12 text-center sm:px-10 md:px-6 justify-center items-center bg-white">
      <MetaData title="Contactar" description="Contactar" />
      <div className="bg-white  p-4 border rounded-lg shadow border-gray-300 mt-2">
        <div className="flex justify-center -mb-4">
          <BiMailSend size={50} />
        </div>
        <div className="mb-4 mt-0 sm:my-2 flex flex-col">
          <label className="loginh my-2">Contacte con nosotros</label>
        </div>
        <div className="mb-4 mt-0 sm:my-2 flex flex-col">
          <label className="text-md my-2">
            Introduzca los datos siguientes
          </label>
        </div>
        <form onSubmit={handleSubmit} autoComplete="off">
          <div>
            <div className="mt-2">
              <input
                placeholder="Escriba su nombre"
                type="text"
                name="name"
                onChange={handleChange}
                className="common-input h-[55px]"
              />
            </div>
            <div className="space -mb-2 mt-6">
              {errors.name && touched.name ? (
                <div className="errordivp text-xs">{errors.name}</div>
              ) : null}
            </div>
            <div className="mb-2 mt-2">
              <input
                placeholder="Escriba su correo electrónico"
                name="email"
                type="email"
                onChange={handleChange}
                className="common-input h-[55px]"
              />
            </div>
            <div className="space -mb-2 mt-6">
              {errors.email && touched.email ? (
                <div className="errordivp text-xs">{errors.email}</div>
              ) : null}
            </div>
            <div className="relative flex w-[340px] -mb-3 -mt-6 ">
              <PhoneInput
                placeholder="Escriba su teléfono"
                country={"cr"}
                value={phoneNumber}
                onChange={handlePhoneNumberChange}
                required
                name="mobile"
                inputStyle={{
                  height: "55px",
                  width: "100%",
                  borderRadius: "10px",
                  borderColor: "gray",
                  borderWidth: "1px",
                  color: "gray",
                }}
                containerStyle={{ margin: "20px" }}
                buttonStyle={{
                  padding: "5px",
                  border: "1px",
                  borderTopLeftRadius: "10px",
                  borderBottomLeftRadius: "10px",
                  borderTopLeftColor: "black",
                  borderBottomLeftColor: "black",
                  alignItems: "left",
                  margin: "1px",
                }}
                searchClass="input-search-class"
                inputProps={{
                  name: "mobile",
                  required: true,
                }}
              />
            </div>
            <div className="my-2 mb-2.5 rounded-md">
              <select
                className="rounded-lg border-gray-400 text-gray-500 border text-[13px] w-[300px] mb-1 h-[58px]"
                name="contactType"
                id="contactType"
              >
                <option value="" label="">
                  {"Seleccione el tipo de contacto"}
                </option>
                {TipoContacto.map((item) => (
                  <option value={item.value} label={item.label}>
                    {item.value}
                  </option>
                ))}
              </select>
            </div>
            <div className="mt-2">
              <textarea
                aria-multiline
                onChange={handleChange}
                placeholder="Escriba aquí su mensaje"
                name="message"
                className="common-input mb-0"
              />
            </div>
            <div className="space mb-0 -mt-1">
              {errors.message && touched.message ? (
                <div className="errordivp text-xs">{errors.message}</div>
              ) : null}
            </div>
            <div className="max-w-40 flex flex-col justify-center items-center">
              <button className="button-signin w-[300px]" type="submit">
                Enviar mensaje
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContactVisiter;
