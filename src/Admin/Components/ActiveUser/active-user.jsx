import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {Alert, Spin, message } from "antd";
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { types } from "../../../BD/bd";

const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
const phoneRegex = /^[0-9]+$/;
const RegisterSchema = Yup.object().shape({
    username: Yup.string().required('¡El nombre es requerido!'),
    email: Yup.string().matches(emailRegex,'¡Correo inválido!').required('¡El correo es requerido!'),
    password: Yup.string()
      .min(6, '¡Debe ser más larga!')
      .max(50, '¡Demasiado larga!')
      .required('¡La contraseña es requerida!'),
    company: Yup.string()
      .min(4, '¡Debe ser más larga!')
      .max(50, '¡Demasiado larga!')
      .required('¡El nombre de la empresa es requerido!'),
    address: Yup.string()
      .min(4, '¡Debe ser más larga!')
      .max(50, '¡Demasiado larga!')
      .required('¡Su dirección es requerida!'),
    type: Yup.string().required('¡El tipo de asesor es requerido!'),
    acept: Yup.boolean().oneOf([true], '¡Debe aceptar los términos!'), 
    phone: Yup.string()
      .matches(phoneRegex,'¡Teléfono invalido!')
      .min(10,'¡Teléfono invalido!')
      .max(15,'¡Teléfono invalido!')
      .required('¡El teléfono de la oficina es requerido!'),
    mobile: Yup.string()
      .matches(phoneRegex,'¡Teléfono invalido!')
      .min(10,'¡Teléfono invalido!')
      .max(15,'¡Teléfono invalido!')
      .required('¡El teléfono celular es requerido!'),
    personalId: Yup.string()
      .required('¡El identificador personal es requerido!'),
  });
  
  const ActiveUser = () => {

    const [initialData, setinitialData] = useState({
        username: '',
        email: '',
        password: '',
        type: '',
        acept: false,
        phone: null,
        company: '',
        address: '',
        mobile:'',
        personalId:'',
      });

    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(false);
  
    const onFinish = async (values) => {
      setIsLoading(true);
      try {
        const value = {
          username:values.username,
          email: values.email,
          password: values.password,
          phone: values.phone,
          company: values.company,
          address: values.address,
          mobile: values.mobile,
          personalId: values.personalId
        };

        const userResponse = await fetch(`${API}/users`,
        {
            method:"GET"
        });

        const userData = await userResponse.json();

        const found = userData.find(userf => userf.email === values.email);
        
        //if the user is not found then register
        if (!found) {
          const response = await fetch(`${API}/auth/local/register`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(value),
          });
    
          const data = await response.json();
          
          navigate("/user/sent-request", { replace: true });
        }
        //if he is waiting for approval say you are evaluating the case
        else{
          navigate("/user/evaluating", { replace: true });
        }
      }
       catch (error) {
        message.error("Ocurrió un error inesperado!");
      } finally {
        setIsLoading(false);
      }
    };

    if(isLoading){
      return (
        <Spin className="spinner" size='large'/>
    )
  }

    return (
      <div className="flex flex-col px-12 pt-12 text-center sm:px-10 md:px-6 justify-center items-center bg-white">
        <Formik initialValues={initialData}
         validationSchema={RegisterSchema}
         onSubmit={onFinish}
        >
         {({ errors, touched }) => (
           <Form onFinish={onFinish} autoComplete="off">
                <div className="flex flex-wrap w-screen ml-20">
                    <div className="md:w-1/5 flex items-center justify-center">
                        <div className="flex flex-row">
                            Foto de perfil
                        </div>
                    </div>
                    <div className="w-full mt-20 md:w-1/4">
                        <div className="div -mt-4">
                            <div className="flex flex-col text-gray-500 text-left">        
                                <Field placeholder="Nombre completo" type="text" name="username" className="regular-input focus:outline-none"/>
                            </div>
                        </div>
                        <div className="space mb-2.5">
                        {errors.username && touched.username ? <div className="errordiv text-xs">{errors.username}</div> : null}
                        </div>
                        <div className="div -mt-4">
                            <div className="flex flex-col text-gray-500 text-left">        
                                <Field placeholder="Identificador personal" type="text" name="personalId" className="regular-input focus:outline-none"/>
                            </div>
                        </div>
                        <div className="space">
                        {errors.personalId && touched.personalId ? <div className="errordiv text-xs">{errors.personalId}</div> : null}
                        </div>
                        <div className="div -mt-1">
                            <div className="flex flex-col text-gray-500">
                                <Field placeholder="Correo electrónico" name="email" type="email" className="regular-input"/>
                            </div> 
                        </div>
                        <div className="space">
                        {errors.email && touched.email ? (<div className="errordiv text-xs">{errors.email}</div>) : null}
                        </div>
                        <div className="div -mt-1 mb-0">
                            <div className="flex flex-col text-gray-500">
                                <Field placeholder="Teléfono de la oficina" name="phone" type="text" className="regular-input"/>
                            </div> 
                        </div>
                        <div className="space">
                        {errors.phone && touched.phone ? (<div className="errordiv text-xs">{errors.phone}</div>) : null}
                        </div>
                        <div className="div -mt-1 mb-0">
                            <div className="flex flex-col text-gray-500">
                                <Field placeholder="Teléfono celular" name="mobile" type="text" className="regular-input"/>
                            </div> 
                        </div>
                        <div className="space mb-2.5">
                        {errors.mobile && touched.mobile ? (<div className="errordiv text-xs">{errors.mobile}</div>) : null}
                        </div>
                    
                    </div>
                <div className="w-full lg:mt-16 sm:-mt-2 md:w-1/3">
                    <div className="flex flex-row">
                        <div className="flex flex-col">
                            <div className="div">
                                <div className="flex flex-col text-gray-500 text-left">        
                                    <Field placeholder="Nombre de la empresa" type="text" name="company" className="regular-input focus:outline-none"/>
                                </div>
                            </div>
                            <div className="space mb-2.5">
                            {errors.company && touched.company ? <div className="errordiv text-xs">{errors.company}</div> : null}
                            </div>
                            <div className="div -mt-4">
                                <div className="flex flex-col text-gray-500 text-left">        
                                    <Field placeholder="Dirección física" type="text" name="address" className="regular-input focus:outline-none"/>
                                </div>
                            </div>
                            <div className="space">
                            {errors.address && touched.address ? <div className="errordiv text-xs">{errors.address}</div> : null}
                            </div>
                            <div className="div -mt-1 mb-0">
                                <div className="flex flex-col text-gray-500">
                                    <Field placeholder="Contraseña" name="password" type="password" className="regular-input"/>
                                </div> 
                            </div>
                            <div className="space">
                                {errors.password && touched.password ? (<div className="errordiv text-xs">{errors.password}</div>) : null}
                                </div>
                            <div className="mb-1 -mt-3 text-left">
                                <label className="text-sm ml-2">Tipo de asesor inmobiliario</label>
                            </div>
                            <div className="div mt-1 mb-1">
                                <div className="flex flex-col">    
                                    <Field className="w-60 regular-input" as="select" name="type" id="type">
                                        <option value="" label="">
                                        {"Seleccione el tipo de asesor"}
                                        </option>
                                        {types.map(item => 
                                        <option value={item.value} label={item.label}>{item.value}</option>
                                        )}
                                    </Field>
                                </div>
                            </div>
                            <div className="space">
                                {errors.type && touched.type ? (<div className="errordiv text-xs">{errors.type}</div>) : null}
                            </div>
                    </div>
            </div>
        </div>
    </div>            
            <div className="flex flex-row align-middle justify-center content-center">
                <div className="max-w-60 flex flex-col">    
                    <button type="submit" className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Eliminar</button>
                </div>
                <div className="max-w-60 flex flex-col">
                    <button type="submit" className="focus:outline-none text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2">Editar</button>
                </div>
            </div>
         </Form>
         )}
       </Formik>
     </div>
    );
  };
  
  export default ActiveUser;