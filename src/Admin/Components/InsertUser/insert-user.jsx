import React, { useState } from "react";
import { useMutation, useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";

import { message } from "antd";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

import { Estado, TipoAsesor } from "../../../BD/bd";
import AxiosInstance from "../../../api/AxiosInstance";
import { authUserData, passedUser, userIntser } from "../../../api/usersApi";
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
    .max(500, "¡Demasiado larga!")
    .required("¡Su dirección es requerida!"),
  type: Yup.string().required("¡El tipo de asesor es requerido!"),
  active: Yup.string().required("¡El estado es requerido!"),
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
  personalId: Yup.string()
    .min(9, "¡Debe ser más larga!")
    .max(20, "¡Demasiado larga!")
    .required("¡El identificador personal es requerido!"),
});

const InsertUser = () => {
  const { id } = useParams();
  const {
    mutate: insertMutation,
    isLoading: isLoadingInsert,
    isError,
    errors,
  } = useMutation(userIntser);

  const { data: pasedUser } = useQuery(["id", id], () => passedUser(id));
  const { data: userData } = useQuery("profile", authUserData);
  const role = userData?.role.name;
  const userImg = pasedUser?.photo?.url;
  //setUserImage(userImg);
  const [initialData, setinitialData] = useState({
    username: pasedUser?.username,
    email: pasedUser?.email,
    password: pasedUser?.password,
    type: pasedUser?.type,
    phone: pasedUser?.phone,
    company: pasedUser?.company,
    address: pasedUser?.address,
    mobile: pasedUser?.mobile,
    personalId: pasedUser?.personalId,
    active: pasedUser?.active,
    photo: pasedUser?.photo,
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
        type: values.type,
        phone: values.phone,
        company: values.company,
        address: values.address,
        mobile: values.mobile,
        personalId: values.personalId,
        active: values.active,
        photo: values.photo,
        role: values.role,
      };

      //si trae un id modificar, sino crear un nuevo registro
      if (pasedUser) {
        /* pasedUser.role = {
          disconnect: [
            {
              id: 1,
            },
          ],
        }; */
        const response = await AxiosInstance.put(`users/${pasedUser.id}`, value)
          .then((response) => {
            message.success("El usuario se actualizó exitosamente");
            console.log(pasedUser);
            navigate("/admin/users");
          })
          .catch((err) => {
            message.error("El usuario no se pudo actualizar");
            console.log("error desde actualizar", err);
            return;
          });
      } else {
        insertMutation(value, {
          onSuccess: () => {
            message.success("El usuario se registró exitosamente");
            navigate("/admin/users");
          },
          onError: (error) => {
            console.log("error desde la mutacion", error);
            message.error("Ocurrió un error inesperado.Intente de nuevo");
          },
        });
      }
    } catch (error) {
      console.log("error desde la exception", error);
      message.error("Ocurrió un error inesperado!");
    } finally {
      setIsLoading(false);
    }
  };
  if (isLoading) {
    return <MySpinner />;
  }
  return (
    <div className="flex flex-col border px-12 pt-12 text-center sm:px-10 md:px-6 justify-center items-center bg-white">
      <Formik
        initialValues={{
          username: pasedUser?.username,
          email: pasedUser?.email,
          password: pasedUser?.password,
          type: pasedUser?.type,
          phone: pasedUser?.phone,
          company: pasedUser?.company,
          address: pasedUser?.address,
          mobile: pasedUser?.mobile,
          personalId: pasedUser?.personalId,
          active: pasedUser?.active,
          photo: pasedUser?.photo,
        }}
        validationSchema={RegisterSchema}
        onSubmit={onFinish}
      >
        {({ errors, touched }) => (
          <Form onFinish={onFinish} autoComplete="off">
            <div className="flex flex-col mx-20 mt-40 align-middle lg:flex-row items-center justify-center ">
              <div className="lg:w-1/3 align-top  flex flex-col mb-4 -mt-20">
                <div className="flex flex-col justify-center">
                  {role === "Authenticated" ? (
                    <div className="flex flex-col">
                      {userImg ? (
                        <div
                          className="w-16 h-16 rounded-full"
                          style={{
                            backgroundImage: `url('https://siccic.com/backend${userImg?.url}')`,
                            backgroundPosition: "center",
                            backgroundSize: "100%",
                            backgroundRepeat: "no-repeat",
                          }}
                        ></div>
                      ) : (
                        <div
                          alt="perfil"
                          className="w-16 h-16 rounded-full"
                          style={{
                            backgroundImage: `url('../../../assets/images/userinfo.png')`,
                            backgroundPosition: "cover",
                            backgroundSize: "100%",
                            backgroundRepeat: "no-repeat",
                          }}
                        />
                      )}
                    </div>
                  ) : (
                    <span></span>
                  )}
                </div>
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
                    <div className="errordivp text-xs">{errors.username}</div>
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
                    <div className="errordivp text-xs">{errors.personalId}</div>
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
                    <div className="errordivp text-xs">{errors.email}</div>
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
                    <div className="errordivp text-xs">{errors.phone}</div>
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
                    <div className="errordivp text-xs">{errors.mobile}</div>
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
                    <div className="errordivp text-xs">{errors.company}</div>
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
                    <div className="errordivp text-xs">{errors.password}</div>
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
                    <div className="errordivp text-xs">{errors.type}</div>
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
                    <div className="errordivp text-xs">{errors.active}</div>
                  ) : null}
                </div>
                <Field
                  as="textarea"
                  name="address"
                  className="w-full input-admin-property"
                  placeholder="Dirección física"
                />
                <div className="space">
                  {errors.address && touched.address ? (
                    <div className="errordivp text-xs">{errors.address}</div>
                  ) : null}
                </div>
              </div>
            </div>
            <div></div>
            <div className="flex flex-row align-middle justify-center content-center">
              <div className="max-w-60 flex flex-col">
                <button
                  type="button"
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
                  Guardar
                </button>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default InsertUser;
