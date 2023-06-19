import {message } from "antd";
import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { API, BEARER } from "../../constant";
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { useAuthContext } from "../../context/AuthContext";
import { getToken, setToken, setUserLocal } from "../../utils/helpers";
import axios from "axios";
import { authUserData } from "../../api/usersApi";

const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
const phoneRegex = /^[0-9]+$/;
const ProfileSchema = Yup.object().shape({
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
  
  const Profile = () => {

    const { data: userData, loading } = useQuery('profile', authUserData);

    if(loading){
      retutn (<>cargando...</>);
    }else{
      console.log(userData);
      
    }

    const types = [
        {key: 'Asesor Inmobiliario Independiente'
        ,value: 'Asesor Inmobiliario Independiente'
        ,text: 'Asesor Inmobiliario Independiente'},
        {key: 'Asesor Agremiado a una cámara, federación de Bienes'
        ,value:'Asesor Agremiado a una cámara, federación de Bienes'
        ,text:'Asesor Agremiado a una cámara, federación de Bienes',},
        {key:'Dueño de Franquicia Inmobiliaria'
        ,value:'Dueño de Franquicia Inmobiliaria'
        ,text:'Dueño de Franquicia Inmobiliaria'},
        {key:'Asesor colaborador en una empresa de Bienes Raíces'
        ,value:'Asesor colaborador en una empresa de Bienes Raíces'
        ,text:'Asesor colaborador en una empresa de Bienes Raíces'},
        {key:'Dueño de una oficina de Bienes Raíces con varios colaboradores'
        ,value:'Dueño de una oficina de Bienes Raíces con varios colaboradores'
        ,text:'Dueño de una oficina de Bienes Raíces con varios colaboradores'},
        {key:'Colaborador en una Institución Financiera con Bienes Adjudicados'
        ,value:'Colaborador en una Institución Financiera con Bienes Adjudicados'
        ,text:'Colaborador en una Institución Financiera con Bienes Adjudicados',},
        {key:'Asistente de Asesor Inmobiliario'
        ,value:'Asistente de Asesor Inmobiliario'
        ,text:'Asistente de Asesor Inmobiliario'},
    ]; 
    
    const [initialData, setinitialData] = useState({
      username:userData?.username,
      email: userData?.email,
      password: "",
      phone: userData?.phone,
      company: userData?.company,
      address: userData?.address,
      mobile: userData?.mobile,
      personalId: userData?.personalId
    });
    console.log(initialData);
   const navigate = useNavigate();
   const [isLoading, setIsLoading] = useState(false);
   
   const onFinish = async (values) => {
      const token = getToken();
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
        //find the user that is logged in
        const response = await fetch(`${API}/users/me`, {
          method: "GET",
          headers: { Authorization: `${BEARER} ${token}` },
        });
        const data = await response.json();
        
        //setinitialData(data);
         if(response.ok){
              const response = await fetch(`${API}/users/${data.id}`, {
                  method: "PUT",
                  headers: {
                    "Content-Type": "application/json",
                    Authorization: `${BEARER} ${token}`,
                  },
                  body: JSON.stringify(value),
              });
              message.success("¡Datos actualizados correctamente!");
              navigate('/user/logout');
        }
        else {
          message.error("¡Ocurrió un error. Inténtelo de nuevo!");  
        }
      } 
       catch (error) {
        message.error("¡Ocurrió un error. Intente de nuevo!");
      }
    };

    return (
      <div className="flex my-1 flex-col px-12 text-center sm:px-10 md:px-6 justify-center items-center bg-white">
       <div className="mb-0 mt-0 sm:my-2 flex flex-col">
          <label className="loginh my-2">Actualizar perfil</label>
          <label className="loginh5 w-72 mb-1">
            Poner aqui una foto de perfil 
          </label>
       </div>
       <Formik initialValues ={{ 
            username: userData?.username,
            email: userData?.email,
            password: "",
            phone: userData?.phone,
            company: userData?.company,
            address: userData?.address,
            mobile: userData?.mobile,
            personalId: userData?.personalId
       }}
         validationSchema={ProfileSchema}
         onSubmit={onFinish}
       >
         {({ errors, touched }) => (
           <Form onFinish={onFinish} autoComplete="off">
            <div className="div -mt-4">
                <div className="flex flex-col text-gray-500 text-left">        
                    <Field /* value={userData?.username} */ placeholder="Nombre completo" type="text" name="username" className="regular-input focus:outline-none"/>
                </div>
            </div>
            <div className="space mb-2.5">
              {errors.username && touched.username ? <div className="errordiv text-xs">{errors.username}</div> : null}
            </div>
            <div className="div -mt-4">
                <div className="flex flex-col text-gray-500 text-left">        
                    <Field /* value={userData?.personalId} */ placeholder="Identificador personal" type="text" name="personalId" className="regular-input focus:outline-none"/>
                </div>
            </div>
            <div className="space">
              {errors.personalId && touched.personalId ? <div className="errordiv text-xs">{errors.personalId}</div> : null}
            </div>
            <div className="div -mt-1">
                <div className="flex flex-col text-gray-500">
                    <Field /* value={userData?.email} */ placeholder="Correo electrónico" name="email" type="email" className="regular-input"/>
                </div> 
            </div>
            <div className="space">
              {errors.email && touched.email ? (<div className="errordiv text-xs">{errors.email}</div>) : null}
            </div>
            <div className="div -mt-1 mb-0">
                <div className="flex flex-col text-gray-500">
                    <Field /* value={userData?.phone} */ placeholder="Teléfono de la oficina" name="phone" type="text" className="regular-input"/>
                </div> 
            </div>
            <div className="space">
              {errors.phone && touched.phone ? (<div className="errordiv text-xs">{errors.phone}</div>) : null}
            </div>
            <div className="div -mt-1 mb-0">
                <div className="flex flex-col text-gray-500">
                    <Field /* value={userData?.mobile} */ placeholder="Teléfono celular" name="mobile" type="text" className="regular-input"/>
                </div> 
            </div>
            <div className="space mb-2.5">
              {errors.mobile && touched.mobile ? (<div className="errordiv text-xs">{errors.mobile}</div>) : null}
            </div>
            <div className="div -mt-4">
                <div className="flex flex-col text-gray-500 text-left">        
                    <Field /* value={userData?.company} */ placeholder="Nombre de la empresa" type="text" name="company" className="regular-input focus:outline-none"/>
                </div>
            </div>
            <div className="space mb-2.5">
              {errors.company && touched.company ? <div className="errordiv text-xs">{errors.company}</div> : null}
            </div>
            <div className="div -mt-4">
                <div className="flex flex-col text-gray-500 text-left">        
                    <Field /* value={userData?.address} */ placeholder="Dirección física" type="text" name="address" className="regular-input focus:outline-none"/>
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
                    <Field /* value={userData?.type} */ className="w-60 regular-input" as="select" name="type" id="type">
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
            <div className="max-w-60 flex flex-col">
              <button className="button-signin max-w-full" type="submit">GUARDAR</button>
            </div>
         </Form>
         )}
       </Formik>
     </div>
    );
  };
  
  export default Profile;