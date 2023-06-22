import React, { useEffect, useState } from "react";
import { useMutation, useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import {message, Spin } from "antd";
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { Estado, TipoAsesor, TipoInmueble } from "../../../BD/bd";
import { API, BEARER } from "../../../constant";
import AxiosInstance from "../../../api/AxiosInstance";
import { getToken } from "../../../utils/helpers";
import { passedUser, userIntser } from "../../../api/usersApi";

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
    active: Yup.string().required('¡El estado es requerido!'),
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
      .min(11, '¡Debe ser más larga!')
      .max(15, '¡Demasiado larga!')
      .required('¡El identificador personal es requerido!'),
  });
  
  const InsertUser = () => {

    const { mutate: insertMutation, isLoading: isLoadingInsert, isError, errors} = useMutation(userIntser);
    const { data: pasedUser } = useQuery('passedUser',passedUser());
    
    const [initialData, setinitialData] = useState({
      username: 'Roberto Ramirez A',
      email: 'ramire550z@gmail.com',
      password: '1234567',
      type: 'Asesor',
      phone: '54546046546',
      company: 'Empresa',
      address: 'Direccion',
      mobile:'564504645566',
      personalId:'505645455555',
      active: 'Activo',
      photo:null,
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
          type: values.type,
          phone: values.phone,
          company: values.company,
          address: values.address,
          mobile: values.mobile,
          personalId: values.personalId,
          active:values.active,
          photo: values.photo

        };

        //si trae un id modificar, sino crear un nuevo registro
        if (!true) {
            //precargar los datos del usuario
            //console.log(value);
        }
        else {
          insertMutation(value, {
            onSuccess: () => {
              message.success('El usuario se registró exitosamente');
            },
            onError: (error) => {
              message.error('Ocurrió un error inesperado');
              //(error.response.data.error.message);
            }
          })
        }
      }
       catch (error) {
        console.log(error);
        message.error("Ocurrió un error inesperado. Intente de nuevo!");
      } finally {
        setIsLoading(false);
      }
    };

    return (
      <div className="flex flex-col border px-12 pt-12 text-center sm:px-10 md:px-6 justify-center items-center bg-white">
        <Formik initialValues={ initialData }
         validationSchema={RegisterSchema}
         onSubmit={onFinish}
        >
         {({ errors, touched }) => (
           <Form autoComplete="off">

            <div class="flex flex-col mx-20 mt-40 align-middle lg:flex-row items-center justify-center ">
                <div class="lg:w-1/3 align-middle">
                    <img src="ruta_de_la_imagen.jpg" alt="" class="w-full create-user-image h-auto"/>
                </div>                
                <div class="lg:w-1/3 px-10">
                    <Field type="text" name="username" class="w-full input-admin-property" placeholder="Nombre completo"/>
                        <div className="space">
                            {errors.username && touched.username ? <div className="errordiv text-xs">{errors.username}</div> : null}
                        </div>
                    <Field type="text" name="personalId" class="w-full input-admin-property" placeholder="Identificador personal"/>
                        <div className="space">
                            {errors.personalId && touched.personalId ? <div className="errordiv text-xs">{errors.personalId}</div> : null}
                        </div>
                    <Field type="text" name="email" class="w-full input-admin-property" placeholder="Correo electrónico"/>
                        <div className="space">
                            {errors.email && touched.email ? <div className="errordiv text-xs">{errors.email}</div> : null}
                        </div>
                    <Field type="text" name="phone" class="w-full input-admin-property" placeholder="Teléfono oficina"/>
                        <div className="space">
                            {errors.phone && touched.phone ? <div className="errordiv text-xs">{errors.phone}</div> : null}
                        </div>
                    <Field type="text" name="mobile" class="w-full input-admin-property" placeholder="Teléfono celular"/>
                        <div className="space">
                            {errors.mobile && touched.mobile ? <div className="errordiv text-xs">{errors.mobile}</div> : null}
                        </div>
                </div>
                <div class="lg:w-1/3 px-10">
                    <Field type="text" name="company" class="w-full input-admin-property" placeholder="Nombre de la empresa"/>
                        <div className="space">
                            {errors.company && touched.company ? <div className="errordiv text-xs">{errors.company}</div> : null}
                        </div>
                    <Field type="text" name="address" class="w-full input-admin-property" placeholder="Dirección física"/>
                        <div className="space">
                            {errors.address && touched.address ? <div className="errordiv text-xs">{errors.address}</div> : null}
                        </div>
                    <Field type="password" name="password" class="w-full input-admin-property" placeholder="Contraseña"/>
                        <div className="space">
                            {errors.password && touched.password ? <div className="errordiv text-xs">{errors.password}</div> : null}
                        </div>
                    <Field as = "select" id="type" name="type" class="w-full input-admin-property" placeholder="Tipo de asesor">
                            <option value="" label="">
                               {"Seleccione el tipo de asesor"}
                                 </option>
                                {TipoAsesor.map(item => 
                                 <option value={item.value} label={item.label}>{item.value}</option>
                                )}
                    </Field>
                        <div className="space">
                            {errors.type && touched.type ? <div className="errordiv text-xs">{errors.type}</div> : null}
                        </div>
                    <Field as = "select" name="active" id="active" class="w-full input-admin-property" placeholder="Estado">
                            <option value="" label="">
                               {"Seleccione un estado"}
                                 </option>
                                {Estado.map(item => 
                            <option value={item.value} label={item.label}>{item.value}</option>
                            )}
                    </Field>
                        <div className="space">
                            {errors.active && touched.active ? <div className="errordiv text-xs">{errors.active}</div> : null}
                        </div>
                </div>
            </div>        
            <div className="flex flex-row align-middle justify-center content-center">
                <div className="max-w-60 flex flex-col">    
                    <button type="button" onClick={()=>navigate('/admin/users')} className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Cancelar</button>
                </div>
                <div className="max-w-60 flex flex-col">
                    <button type="submit" className="focus:outline-none text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2">Guardar{isLoading && <Spin size="small" />}</button>
                </div>
            </div>
         </Form>
         )}
       </Formik>
     </div>
    );
  };
  
  export default InsertUser;