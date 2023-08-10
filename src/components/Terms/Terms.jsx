import { message } from "antd";
import { Field, Form, Formik } from "formik";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import MetaData from "../Metadata/metadata";
const Terms = () => {
  const navigate = useNavigate();
  const TermsSchema = Yup.object().shape({
    primero: Yup.boolean().oneOf(
      [true],
      "¡Debe aceptar este término o condición!"
    ),
    segundo: Yup.boolean().oneOf(
      [true],
      "¡Debe aceptar este término o condición!"
    ),
    tercero: Yup.boolean().oneOf(
      [true],
      "¡Debe aceptar este término o condición!"
    ),
    cuarto: Yup.boolean().oneOf(
      [true],
      "¡Debe aceptar este término o condición!"
    ),
    quinto: Yup.boolean().oneOf(
      [true],
      "¡Debe aceptar este término o condición!"
    ),
    sexto: Yup.boolean().oneOf(
      [true],
      "¡Debe aceptar este término o condición!"
    ),
    septimo: Yup.boolean().oneOf(
      [true],
      "¡Debe aceptar este término o condición!"
    ),
  });

  const onFinish = async (values) => {
    navigate("/auth/register-request", { state: { acepted: true } });
  };
  const [initialData, setinitialData] = useState({
    primero: false,
    segundo: false,
    tercero: false,
    cuarto: false,
    quinto: false,
    sexto: false,
    septimo: false,
  });

  return (
    <div className="flex flex-col items-center justify-left min-h-screen">
      <MetaData
        title="Términos y condiciones"
        description="Términos y condiciones"
      />
      <Formik
        initialValues={initialData}
        validationSchema={TermsSchema}
        onSubmit={onFinish}
      >
        {({ errors, touched }) => (
          <Form onFinish={onFinish} autoComplete="off">
            <div className="max-w-3xl mb-1 px-4 pt-4 font-bold text-xl mt-5 text-center">
              Términos y condiciones
            </div>
            <div className="max-w-3xl px-4 pt-4 text-left">
              <Field
                type="checkbox"
                id="primero"
                name="primero"
                className="mr-2"
              />
              <label htmlFor="primero">
                Acepto compartir el 50% de la comisión debidamente pactada y
                ratificada; a todo aquel ASESOR INMOBILIARIO inscrito en el
                SISTEMA CIC que me presente un cliente inversionista que
                efectivamente concrete una compra o alquiler de unos de mis
                inmuebles captados.
              </label>
            </div>
            <div className="space ml-6 -mb-4">
              {errors.primero && touched.primero ? (
                <div className="errordivp text-xs">{errors.primero}</div>
              ) : null}
            </div>
            <div className="max-w-3xl px-4 pt-4 text-left">
              <Field
                type="checkbox"
                id="segundo"
                name="segundo"
                className="mr-2"
              />
              <label htmlFor="segundo">
                Acepto que subiré a la base de datos solo aquellos inmuebles de
                los cuales tengo un documento firmado por el dueño (o dueños
                registrales o representantes legales) donde se ratifica que
                aceptan pagar la comisión por el servicio de intermediación del
                asesor inmobiliario.
              </label>
            </div>
            <div className="space ml-6 -mb-4">
              {errors.segundo && touched.segundo ? (
                <div className="errordivp text-xs">{errors.segundo}</div>
              ) : null}
            </div>
            <div className="max-w-3xl px-4 pt-4 text-left">
              <Field
                type="checkbox"
                id="tercero"
                name="tercero"
                className="mr-2"
              />
              <label htmlFor="tercero">
                Acepto que subiré a la base de datos del SISTEMA CIC solo
                aquellos inmuebles que están sujetos a una comisión de un 5%
                sobre el precio real de la venta más el 13% del IVA y en caso de
                alquileres una comisión de un mes promedio de arrendamiento más
                el 13 % del IVA. (No trabajamos con sobre precios).
              </label>
            </div>
            <div className="space ml-6 -mb-4">
              {errors.tercero && touched.tercero ? (
                <div className="errordivp text-xs">{errors.tercero}</div>
              ) : null}
            </div>
            <div className="max-w-3xl px-4 pt-4 text-left">
              <Field
                type="checkbox"
                id="cuarto"
                name="cuarto"
                className="mr-2"
              />
              <label htmlFor="cuarto">
                Acepto que entregaré factura electrónica cuando el dueño
                registral o el asesor inmobiliario así me lo solicite por la
                comisión que recibí al realizar la intermediación.
              </label>
            </div>
            <div className="space ml-6 -mb-4">
              {errors.cuarto && touched.cuarto ? (
                <div className="errordivp text-xs">{errors.cuarto}</div>
              ) : null}
            </div>
            <div className="max-w-3xl px-4 pt-4 text-left">
              <Field
                type="checkbox"
                id="quinto"
                name="quinto"
                className="mr-2"
              />
              <label htmlFor="quinto">
                Acepto que el resto de asesores inmobiliarios registrados en el
                SISTEMA CIC puedan publicar como suyos propios mis inmuebles a
                fin de que consigan un cliente inversionista para que compre o
                alquile mis inmuebles publicados. En dicho caso, acepto la
                intermediación de dichos asesores en el proceso de venta o
                alquiler.
              </label>
            </div>
            <div className="space ml-6 -mb-4">
              {errors.quinto && touched.quinto ? (
                <div className="errordivp text-xs">{errors.quinto}</div>
              ) : null}
            </div>
            <div className="max-w-3xl px-4 pt-4 text-left">
              <Field type="checkbox" id="sexto" name="sexto" className="mr-2" />
              <label htmlFor="sexto">
                Me doy por enterado y acepto el sistema de PUBLICISTAS
                FREELANCERS que el SISTEMA CIC tiene; como un mecanismo extra
                para que profesionales en publicidad y mercadeo puedan publicar
                la información básica de mis captaciones y ayudarme a ubicar
                clientes inversionistas.
              </label>
            </div>
            <div className="space ml-6 -mb-4">
              {errors.sexto && touched.sexto ? (
                <div className="errordivp text-xs">{errors.sexto}</div>
              ) : null}
            </div>
            <div className="max-w-3xl px-4 pt-4 text-left">
              <Field
                type="checkbox"
                id="septimo"
                name="septimo"
                className="mr-2"
              />
              <label htmlFor="septimo">
                En caso que uno de estos PUBLICISTAS FREELANCERS logre
                efectivamente llegar a concretar la compra o alquiler de uno de
                mis inmuebles captados; acepto pagar un 20% de mi comisión al
                publicista independiente que me presente al inversionista.
              </label>
            </div>
            <div className="space ml-6 -mb-4">
              {errors.septimo && touched.septimo ? (
                <div className="errordivp text-xs">{errors.septimo}</div>
              ) : null}
            </div>
            <div className="max-w-3xl px-4 pt-8 text-center">
              <button
                type="submit"
                className="bg-blue-700 px-2 py-2 text-white rounded-md"
              >
                Aceptar los términos y condiciones
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Terms;
