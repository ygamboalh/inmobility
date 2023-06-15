import { message,Spin } from "antd";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";
import useScreenSize from "../../hooks/useScreenSize";
import { API } from "../../constant";
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
const phoneRegex = /^[0-9]+$/;
const VisitSchema = Yup.object().shape({
    fullname: Yup.string().required('¡El nombre es requerido!'),
    email: Yup.string().matches(emailRegex,'¡Correo inválido!').required('¡El correo es requerido!'),
    phone: Yup.string()
      .matches(phoneRegex,'¡Teléfono invalido!')
      .min(10,'¡Teléfono invalido!')
      .max(15,'¡Teléfono invalido!')
      .required('¡El número de teléfono es requerido!'),
    managment: Yup.string().required('¡La gestión es requerida!')
  });
  
  const VisitRecord = () => {

    const options = [
        {key: 'DAR EN VENTA'
        ,value: 'DAR EN VENTA'
        ,text: 'DAR EN VENTA'},
        {key: 'COMPRAR UN INMUEBLE'
        ,value:'COMPRAR UN INMUEBLE'
        ,text:'COMPRAR UN INMUEBLE',},
        {key:'DAR EN ALQUILER'
        ,value:'DAR EN ALQUILER'
        ,text:'DAR EN ALQUILER'},
        {key:'TOMAR EN ALQUILER'
        ,value:'TOMAR EN ALQUILER'
        ,text:'TOMAR EN ALQUILER'}
    ]; 
    const [initialData, setinitialData] = useState({
        fullname: '',
        email: '',
        phone: null,
        managment: '',
      });

    const { isDesktopView } = useScreenSize();
    const navigate = useNavigate();
  
    const { setUser } = useAuthContext();
  
    const [isLoading, setIsLoading] = useState(false);
  
    const [error, setError] = useState("");
  
    const onFinish = async (values) => {
      setIsLoading(true);
      const value = {
        fullname: values.fullname,
        email: values.email,
        phone: values.phone,
        managment:values.managment
      };
      try {
        const response = await fetch(`${API}/records`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({data:{...value}}),
        });
  
        const data = await response.json();
        
          message.success(`¡Bienvenido(a)! ${value.fullname}`);
          navigate("/banner", { replace: true });
        
      } catch (error) {
        console.error(error);
        setError(error?.message ?? "¡Ocurrió un error inesperado!");
      } finally {
        setIsLoading(false);
      }
    };

    return (
      <div className="flex my-1 flex-col px-12 text-center sm:px-10 md:px-6 justify-center items-center bg-white">
       <div className="mb-0 mt-0 sm:my-2 flex flex-col">
          <label className="loginh my-2">Registro de visita</label>
          <label className="loginh5 w-72 mb-1">
            Si estás de visita y deseas realizar alguna acción,
            por favor rellena estos campos
          </label>
       </div>
       <Formik initialValues={initialData}
         validationSchema={VisitSchema}
         onSubmit={onFinish}
       >
         {({ errors, touched }) => (
           <Form onFinish={onFinish} autoComplete="off">
            <div className="div -mt-4">
                <div className="flex flex-col text-gray-500 text-left">        
                    <Field placeholder="Nombre completo" type="text" name="fullname" className="regular-input focus:outline-none"/>
                </div>
            </div>
            <div className="space">
              {errors.fullname && touched.fullname ? <div className="errordiv text-xs">{errors.fullname}</div> : null}
            </div>
            <div className="div -mt-1">
                <div className="flex flex-col text-gray-500">
                    <Field placeholder="Correo electrónico" name="email" type="email" class="regular-input"/>
                </div> 
            </div>
            <div className="space">
              {errors.email && touched.email ? (<div className="errordiv text-xs">{errors.email}</div>) : null}
            </div>
            <div className="div -mt-1 mb-0">
                <div className="flex flex-col text-gray-500">
                    <Field placeholder="Número de teléfono" name="phone" type="text" class="regular-input"/>
                </div> 
            </div>
            <div className="space">
              {errors.phone && touched.phone ? (<div className="errordiv text-xs">{errors.phone}</div>) : null}
            </div>
            <div className="mb-1 -mt-3 text-left">
                <label className="text-sm ml-2">¿Qué gestión deseas hacer hoy?</label>
            </div>
            <div className="div mt-1 mb-1">
                <div className="flex flex-col">    
                    <Field className="w-60 regular-input" as="select" name="managment" id="type">
                        <option value="" label="">
                        {"OPCIONES"}
                        </option>
                        {options.map(item => 
                        <option value={item.value} label={item.label}>{item.value}</option>
                        )} 
                    </Field>
                </div>
            </div>
            <div className="space">
                {errors.managment && touched.managment ? (<div className="errordiv text-xs">{errors.managment}</div>) : null}
            </div>
            <div className='text-left -mt-2'>
                <b className='text-s'> 
                    Sistema CIC     
                </b>
            </div>
            <div className="mb-0 text-left mt-0 flex flex-col">
                <label className="text-gray-600 text-xs w-72">
                    Recuerda que esta es la herramienta número uno 
                    de trabajo de los Asesores Inmobiliarios en Costa Rica
                </label>
            </div>
            <div className="max-w-60 flex flex-col">
              <button className="button-signin max-w-full login_submit_btn" type="submit">REGISTRARME{isLoading && <Spin size="small" />}</button>
            </div>
            <div className="flex flex-row mx-2 mt-2 justify-between">
                <label className="text-sm">¿Tienes una cuenta?</label>
                <Link to='/signin' className="text-sm text-blue-800">Inicia sesión</Link>
            </div>
         </Form>
         )}
       </Formik>
     </div>
    );
  };
  
  export default VisitRecord;