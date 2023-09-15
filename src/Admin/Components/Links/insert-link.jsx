import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import * as Yup from "yup";
import { message } from "antd";
import { Formik, Form, Field } from "formik";

import AxiosInstance from "../../../api/AxiosInstance";
import MySpinner from "../../../components/Spinner/spinner";
import MetaData from "../../../components/Metadata/metadata";

const InsertLink = () => {
  const navigate = useNavigate();

  const urlRegex = "^(http|https|ftp)://.*";
  const InsertLinkSchema = Yup.object().shape({
    url: Yup.string().matches(urlRegex, "*").required("*"),
  });

  const [initialData, setinitialData] = useState({
    url: "",
    descripcion: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const onFinish = async (values) => {
    setIsLoading(true);
    try {
      const value = {
        url: values.url,
        descripcion: values.descripcion,
      };

      const response = await AxiosInstance.post("/links", {
        data: value,
      });

      if (response.status === 200) {
        message.success("¡El enlace fue creado correctamente!");
        navigate("/admin/links", { replace: true });
      } else {
        message.error("¡Ocurrió un error inesperado. Intente de nuevo!");
      }
    } catch (error) {
      message.error("¡Ocurrió un error inesperado!");
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <MySpinner />;
  }

  return (
    <div className="flex flex-col ">
      <MetaData title="Insertar enlace" description="Insertar enlace" />
      <div className="inset-y-0 mb-20 left-0 flex justify-center align-middle items-center pl-3"></div>
      <Formik
        initialValues={initialData}
        validationSchema={InsertLinkSchema}
        onSubmit={onFinish}
      >
        {({ errors, touched }) => (
          <Form>
            <div className="flex mt-3 justify-center align-middle items-center w-full">
              <label className="font-semibold text-xl">
                Crear un nuevo enlace
              </label>
            </div>
            <div className="flex flex-wrap justify-center m-3">
              <Field
                type="text"
                name="url"
                placeholder="URL"
                className="input-admin-property m-2 w-80 p-2"
              />
              <div className="space mb-2.5">
                {errors.url && touched.url ? (
                  <div className="errordiv text-xs">{errors.url}</div>
                ) : null}
              </div>
              <Field
                type="text"
                name="descripcion"
                placeholder="Descripción"
                className="input-admin-property m-2 w-80 p-2"
              />
              <div className="space mb-2.5">
                {errors.descripcion && touched.descripcion ? (
                  <div className="errordiv text-xs">{errors.descripcion}</div>
                ) : null}
              </div>
            </div>

            <hr></hr>
            <div className="inset-y-0 mt-3 left-0 flex justify-center align-middle items-center pl-3">
              <div className="">
                <button
                  type="button"
                  onClick={() => navigate("/admin/links")}
                  className="mr-2 mb-3 py-2 px-4 rounded bg-red-700 text-white"
                >
                  Regresar
                </button>
              </div>
              <div className="">
                <button
                  type="submit"
                  className="mr-2 mb-3 py-2 px-4 rounded bg-blue-700 text-white"
                >
                  Guardar el enlace
                </button>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default InsertLink;
