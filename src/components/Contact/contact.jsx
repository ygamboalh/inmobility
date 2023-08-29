import { useFormik } from "formik";
import enviarCorreoComunOrigen from "../../utils/email/send-common-email-origin";
import Thumbnail from "../Thumbnail/thumbnail";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import * as Yup from "yup";
import React, { useEffect, useState } from "react";
import { message } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import { BiMailSend, BiPhone, BiUserCircle } from "react-icons/bi";
import AxiosInstance from "../../api/AxiosInstance";
import MySpinner from "../Spinner/spinner";
import MetaData from "../Metadata/metadata";
import { createNotification } from "../../utils/helpers";

const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
const Contact = () => {
  const location = useLocation();
  const adviser = location.state;
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [imageUrl, setImageUrl] = useState(
    "https://backend.siccic.com/uploads/userinfo_dac703068b.png"
  );
  const [phoneNumber, setPhoneNumber] = useState();
  const handlePhoneNumberChange = (value) => {
    setPhoneNumber(value);
  };
  const goBack = () => {
    navigate(-1);
  };
  useEffect(() => {
    const user = AxiosInstance.get(`users/${adviser?.id}?populate=photo`).then(
      (data) => {
        const image = data?.data?.photo?.url;
        const url = `https://backend.siccic.com${image}`;
        setImageUrl(url);
      }
    );
  }, []);
  const buttonStyle = {
    backgroundImage: `url("${imageUrl}")`,
    backgroundSize: "cover",
    width: "100px",
    height: "100px",
    borderRadius: "100px",
  };
  const { handleChange, handleSubmit, values, errors, touched } = useFormik({
    initialValues: {
      name: "",
      email: "",
      message: "",
      mobile: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("*").min(6, "*").max(150, "*"),
      message: Yup.string().min(10, "*").max(1000, "*"),
      email: Yup.string()
        .matches(emailRegex, "¡Correo inválido!")
        .required("¡El correo es requerido!"),
    }),
    onSubmit: async (values) => {
      setIsLoading(true);
      const body = `Ha recibido el siguiente mensaje desde el Sistema CIC: "${values.message}" Estos son los datos de contacto: ${values.name}, ${values.email}, ${phoneNumber}`;
      try {
        const value = {
          name: values.name,
          email: values.email,
          message: values.message,
          mobile: phoneNumber,
        };
        enviarCorreoComunOrigen(adviser.email, body, "Cliente interesado");
        createNotification(
          "Correo electrónico recibido",
          `Se ha enviado un nuevo correo electrónico a través de ficha de contacto.`,
          null,
          adviser.email
        );
        message.success("¡Su mensaje fue enviado correctamente!");
        goBack();
      } catch (error) {
        message.error("¡Ocurrió un error inesperado!");
      } finally {
        setIsLoading(false);
      }
    },
  });
  if (isLoading || !adviser) {
    return <MySpinner />;
  }

  return (
    <div className="flex my-1 flex-col px-12 text-center sm:px-10 md:px-6 justify-center items-center bg-white">
      <MetaData title="Contacto" description="Contacto" />
      {adviser ? (
        <div className="bg-white  p-4 border rounded-lg shadow border-gray-300 mt-2">
          <div className="mb-4 mt-0 sm:my-2 flex flex-col">
            <div className="flex flex-col">
              <div className="mb-2 flex justify-center">
                <div className="">
                  <button
                    className="user-info-button"
                    style={buttonStyle}
                  ></button>
                </div>
              </div>
              <div className="flex flex-col">
                <div className="flex flex-row justify-center align-middle">
                  <BiUserCircle size={25} />
                  {adviser?.username}
                </div>
                <hr />
                <div className="flex flex-row justify-center align-middle items-center">
                  <BiPhone size={25} />
                  {adviser?.mobile}
                </div>
                <hr />
                <div className="flex flex-row justify-center align-middle items-center">
                  <BiMailSend size={25} />
                  {adviser?.email}
                </div>
                <hr />
              </div>
            </div>
            <label className="loginh my-2">Contacte con nosotros</label>
          </div>
          <form onSubmit={handleSubmit} autoComplete="off">
            <div>
              <div className="my-2">
                <input
                  placeholder="Escriba su nombre"
                  type="text"
                  name="name"
                  onChange={handleChange}
                  className="common-input h-[55px]"
                />
              </div>
              <div className="my-2">
                <input
                  placeholder="Escriba su correo electrónico"
                  name="email"
                  type="email"
                  onChange={handleChange}
                  className="common-input h-[55px]"
                />
              </div>

              <div className="relative flex w-[340px] -my-2">
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
              <div className="my-2">
                <textarea
                  aria-multiline
                  onChange={handleChange}
                  placeholder="Escriba aquí su mensaje"
                  name="message"
                  className="common-input mb-2"
                />
              </div>

              <div className="max-w-40 flex flex-col justify-center items-center">
                <button className="button-signin w-[300px]" type="submit">
                  Enviar mensaje
                </button>
              </div>
            </div>
          </form>
        </div>
      ) : (
        <div>
          <span className="text-lg font-semibold">
            No se han podido cargar los datos del asesor
          </span>
        </div>
      )}
    </div>
  );
};

export default Contact;
