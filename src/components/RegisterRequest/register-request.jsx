import React, { useEffect, useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { useMutation } from "react-query";

import { message } from "antd";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

import { API } from "../../constant";
import { userIntser } from "../../api/usersApi";
import MySpinner from "../Spinner/spinner";
import enviarCorreo from "../../utils/email/send-email";
import MetaData from "../Metadata/metadata";
import { BiHide, BiLock, BiShow } from "react-icons/bi";
import { AsesorTypes, TipoAsesor, types } from "../../BD/bd";

const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
const phoneRegex = /^(\d{2,}\s?)+$/;
const RegisterSchema = Yup.object().shape({
  username: Yup.string().required("¡El nombre es requerido!"),
  email: Yup.string()
    .matches(emailRegex, "¡Correo inválido!")
    .required("¡El correo es requerido!"),
  password: Yup.string()
    .min(6, "¡Debe ser más larga!")
    .max(50, "¡Demasiado larga!")
    .required("¡La contraseña es requerida!"),
  certifications: Yup.string().min(2, "¡Debe ser más larga!"),
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
    .min(8, "¡Teléfono invalido!")
    .max(18, "¡Teléfono invalido!"),
  mobile: Yup.string()
    .matches(phoneRegex, "¡Teléfono invalido!")
    .min(8, "¡Teléfono invalido!")
    .max(20, "¡Teléfono invalido!"),
  personalId: Yup.string().required("¡El identificador personal es requerido!"),
});

const RegisterRequest = () => {
  const [initialData, setinitialData] = useState({
    username: "",
    email: "",
    password: "",
    type: "",
    phone: "",
    company: "",
    address: "",
    mobile: "",
    personalId: "",
    acepted: false,
    certifications: "",
  });

  const location = useLocation();
  const [showPassword, setShowPassword] = useState(false);
  useEffect(() => {
    const data = location?.state?.acepted;
    data !== undefined ? setAcepted(true) : setAcepted(false);
  }, []);
  const {
    mutate: insertMutation,
    isLoading: isLoadingInsert,
    isError,
    errors,
  } = useMutation(userIntser);

  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [acepted, setAcepted] = useState(false);
  const [phoneNumber, setPhoneNumber] = React.useState();
  const [officePhoneNumber, setOfficePhoneNumber] = React.useState();
  const handlePhoneNumberChange = (value) => {
    setPhoneNumber(value);
  };
  const handleOfficePhoneNumberChange = (value) => {
    setOfficePhoneNumber(value);
  };
  const onFinish = async (values) => {
    setIsLoading(true);
    try {
      const value = {
        username: values.username,
        email: values.email,
        password: values.password,
        phone: officePhoneNumber,
        company: values.company,
        address: values.address,
        mobile: phoneNumber,
        personalId: values.personalId,
        type: values.type,
        acepted: acepted,
        certifications: values.certifications,
      };

      const userResponse = await fetch(`${API}/users`, {
        method: "GET",
      });

      const userData = await userResponse.json();

      const found = userData.find((userf) => userf.email === values.email);

      if (!acepted || acepted === undefined) {
        message.error("Debe aceptar los términos y condiciones");
        return;
      } else {
        //if the user is not found then register
        if (!found) {
          insertMutation(value, {
            onSuccess: () => {
              message.success("El usuario se registró exitosamente");
              enviarCorreo(value.email, 1);
              enviarCorreo("infosistemacic@gmail.com", 2);
              navigate("/user/sent-request", { replace: true });
            },
            onError: (error) => {
              message.error("Ocurrió un error inesperado");
            },
          });
        } else {
          navigate("/user/evaluating", { replace: true });
        }
      }
    } catch (error) {
      message.error("Ocurrió un error inesperado!");
    } finally {
      setIsLoading(false);
    }
  };
  console.log(acepted);
  if (isLoading) {
    return <MySpinner />;
  }
  return (
    <div className="flex my-1 flex-col px-12 text-center sm:px-10 md:px-6 justify-center items-center bg-white">
      <div className="border rounded-lg shadow border-gray-300 py-4 px-8">
        <MetaData
          title="Solicitud de registro"
          description="Solicitud de registro"
        />
        <div className="mb-0 mt-0 sm:my-2 flex flex-col">
          <label className="loginh my-2">Solicitud de Registro</label>
          <label className="loginh5 w-72 mb-1">
            Para ser un asesor inmobiliario verificado, debes rellenar este
            formulario y esperar la comprobación de los datos.
          </label>
        </div>
        <div className="flex mx-4 mb-2 flex-col -mt-6 justify-center items-center">
          {acepted ? null : (
            <label className="flex text-red-500 w-[250px] mb-1 items-center text-sm">
              Debe aceptar los términos y condiciones antes de continuar
            </label>
          )}
          <label className="flex items-center text-sm font-semibold">
            <a href="/user/terms">
              <span>Leer términos y condiciones</span>
            </a>
          </label>
        </div>
        <Formik
          initialValues={initialData}
          validationSchema={RegisterSchema}
          onSubmit={onFinish}
        >
          {({ errors, touched }) => (
            <Form onFinish={onFinish} autoComplete="off">
              <div className="relative mb-1">
                <Field
                  type="text"
                  className="peer m-0 text-sm block h-[58px] w-full rounded-xl border border-solid border-neutral-500 bg-transparent bg-clip-padding px-3 py-4  font-normal leading-tight text-neutral-700 transition duration-200 ease-linear placeholder:text-transparent focus:border-primary pt-[1.4rem] focus:pt-[1.4rem] focus:text-neutral-700 focus:outline-none peer-focus:text-primary"
                  id="username"
                  name="username"
                  placeholder="Nombre completo"
                />
                <label
                  for="username"
                  className="pointer-events-none absolute text-xs left-0 top-0 origin-[0_0] border border-solid border-transparent px-3 py-5 text-neutral-500 transition-[opacity,_transform] duration-200 ease-linear peer-focus:-translate-y-2 peer-focus:translate-x-[0.15rem] peer-focus:scale-[0.85] peer-focus:text-primary peer-[:not(:placeholder-shown)]:-translate-y-2 peer-[:not(:placeholder-shown)]:translate-x-[0.15rem] peer-[:not(:placeholder-shown)]:scale-[0.85] motion-reduce:transition-none"
                >
                  Nombre completo
                </label>
              </div>
              <div className="space">
                {errors.username && touched.username ? (
                  <div className="errordivp text-xs">{errors.username}</div>
                ) : null}
              </div>
              <div className="relative mb-1">
                <Field
                  type="text"
                  className="peer m-0 text-sm block h-[58px] w-full rounded-xl border border-solid border-neutral-500 bg-transparent bg-clip-padding px-3 py-4  font-normal leading-tight text-neutral-700 transition duration-200 ease-linear placeholder:text-transparent focus:border-primary pt-[1.4rem] focus:pt-[1.4rem] focus:text-neutral-700 focus:outline-none peer-focus:text-primary"
                  id="personalId"
                  name="personalId"
                  placeholder="Identificador personal"
                />
                <label
                  for="personalId"
                  className="pointer-events-none absolute text-xs left-0 top-0 origin-[0_0] border border-solid border-transparent px-3 py-5 text-neutral-500 transition-[opacity,_transform] duration-200 ease-linear peer-focus:-translate-y-2 peer-focus:translate-x-[0.15rem] peer-focus:scale-[0.85] peer-focus:text-primary peer-[:not(:placeholder-shown)]:-translate-y-2 peer-[:not(:placeholder-shown)]:translate-x-[0.15rem] peer-[:not(:placeholder-shown)]:scale-[0.85] motion-reduce:transition-none"
                >
                  Identificador personal
                </label>
              </div>
              <div className="space">
                {errors.personalId && touched.personalId ? (
                  <div className="errordivp text-xs">{errors.personalId}</div>
                ) : null}
              </div>

              <div className="relative mb-1">
                <Field
                  type="email"
                  className="peer m-0 text-sm block h-[58px] w-full rounded-xl border border-solid border-neutral-500 bg-transparent bg-clip-padding px-3 py-4  font-normal leading-tight text-neutral-700 transition duration-200 ease-linear placeholder:text-transparent focus:border-primary pt-[1.4rem] focus:pt-[1.4rem] focus:text-neutral-700 focus:outline-none peer-focus:text-primary"
                  id="email"
                  name="email"
                  placeholder="Correo electrónico"
                />
                <label
                  for="email"
                  className="pointer-events-none absolute text-xs left-0 top-0 origin-[0_0] border border-solid border-transparent px-3 py-5 text-neutral-500 transition-[opacity,_transform] duration-200 ease-linear peer-focus:-translate-y-2 peer-focus:translate-x-[0.15rem] peer-focus:scale-[0.85] peer-focus:text-primary peer-[:not(:placeholder-shown)]:-translate-y-2 peer-[:not(:placeholder-shown)]:translate-x-[0.15rem] peer-[:not(:placeholder-shown)]:scale-[0.85] motion-reduce:transition-none"
                >
                  Correo electrónico
                </label>
              </div>
              <div className="space">
                {errors.email && touched.email ? (
                  <div className="errordivp text-xs">{errors.email}</div>
                ) : null}
              </div>
              <div className="relative mb-1">
                <Field
                  type="text"
                  className="peer m-0 text-sm block h-[58px] w-full rounded-xl border border-solid border-neutral-500 bg-transparent bg-clip-padding px-3 py-4  font-normal leading-tight text-neutral-700 transition duration-200 ease-linear placeholder:text-transparent focus:border-primary pt-[1.4rem] focus:pt-[1.4rem] focus:text-neutral-700 focus:outline-none peer-focus:text-primary"
                  id="certifications"
                  name="certifications"
                  placeholder="Certificaciones"
                />
                <label
                  for="certifications"
                  className="pointer-events-none absolute text-xs left-0 top-0 origin-[0_0] border border-solid border-transparent px-3 py-5 text-neutral-500 transition-[opacity,_transform] duration-200 ease-linear peer-focus:-translate-y-2 peer-focus:translate-x-[0.15rem] peer-focus:scale-[0.85] peer-focus:text-primary peer-[:not(:placeholder-shown)]:-translate-y-2 peer-[:not(:placeholder-shown)]:translate-x-[0.15rem] peer-[:not(:placeholder-shown)]:scale-[0.85] motion-reduce:transition-none"
                >
                  Certificaciones
                </label>
              </div>
              <div className="space">
                {errors.certifications && touched.certifications ? (
                  <div className="errordivp text-xs">
                    {errors.certifications}
                  </div>
                ) : null}
              </div>

              <div className="relative w-full -mt-5 -ml-5 -mb-1">
                <PhoneInput
                  placeholder="Teléfono de la oficina"
                  country={"cr"}
                  required
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
                  value={officePhoneNumber}
                  onChange={handleOfficePhoneNumberChange}
                  inputProps={{
                    name: "phone",
                    required: true,
                  }}
                />
              </div>
              <div className="relative w-full -mb-1 -ml-5">
                <PhoneInput
                  placeholder="Teléfono celular"
                  country={"cr"}
                  required
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
                  value={phoneNumber}
                  onChange={handlePhoneNumberChange}
                  inputProps={{
                    name: "mobile",
                    required: true,
                  }}
                />
              </div>

              <div className="relative mb-1">
                <Field
                  type="text"
                  className="peer m-0 text-sm block h-[58px] w-full rounded-xl border border-solid border-neutral-500 bg-transparent bg-clip-padding px-3 py-4  font-normal leading-tight text-neutral-700 transition duration-200 ease-linear placeholder:text-transparent focus:border-primary pt-[1.4rem] focus:pt-[1.4rem] focus:text-neutral-700 focus:outline-none peer-focus:text-primary"
                  id="company"
                  name="company"
                  placeholder="Nombre de la empresa"
                />
                <label
                  for="company"
                  className="pointer-events-none absolute text-xs left-0 top-0 origin-[0_0] border border-solid border-transparent px-3 py-5 text-neutral-500 transition-[opacity,_transform] duration-200 ease-linear peer-focus:-translate-y-2 peer-focus:translate-x-[0.15rem] peer-focus:scale-[0.85] peer-focus:text-primary peer-[:not(:placeholder-shown)]:-translate-y-2 peer-[:not(:placeholder-shown)]:translate-x-[0.15rem] peer-[:not(:placeholder-shown)]:scale-[0.85] motion-reduce:transition-none"
                >
                  Nombre de la empresa
                </label>
              </div>
              <div className="space">
                {errors.company && touched.company ? (
                  <div className="errordivp text-xs">{errors.company}</div>
                ) : null}
              </div>
              <div className="relative mb-1">
                <Field
                  as="textarea"
                  className="peer m-0 text-sm block h-[80px] w-full rounded-xl border border-solid border-neutral-500 bg-transparent bg-clip-padding px-3 py-2  font-normal leading-tight text-neutral-700 transition duration-200 ease-linear focus:border-primary pt-[1.4rem] focus:pt-[1.4rem] focus:text-neutral-700 focus:outline-none peer-focus:text-primary"
                  id="address"
                  name="address"
                  placeholder="Dirección física"
                />
              </div>
              <div className="space">
                {errors.address && touched.address ? (
                  <div className="errordivp text-xs">{errors.address}</div>
                ) : null}
              </div>
              <div className="relative w-80 mb-1">
                <Field
                  placeholder="Contraseña"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  className="block w-full p-4 pl-3 text-xs h-[58px] rounded-lg"
                />
                <button
                  type="button"
                  className="text-white absolute right-2.5 bottom-3  px-2 py-1"
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
              <div className="mb-1 mt-0 text-left">
                <label className="text-sm ml-2">
                  Tipo de asesor inmobiliario
                </label>
              </div>

              <Field
                className="rounded-lg text-[13px] w-80 mb-1 h-[58px]"
                as="select"
                name="type"
                id="type"
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
                  <div className="errordivp text-xs">{errors.type}</div>
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
    </div>
  );
};

export default RegisterRequest;
