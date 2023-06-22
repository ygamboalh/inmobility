import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Alert, message, Spin } from "antd";
import { Formik, Form, Field } from 'formik';
import { BiShow, BiHide, BiLock, BiLockOpen } from "react-icons/bi";
import * as Yup from 'yup';
import { useAuthContext } from "../../context/AuthContext";
import { API } from "../../constant";
import { setToken, getToken } from "../../utils/helpers";
  
  const ChangePasswordSchema = Yup.object().shape({
    currentPassword: Yup.string()
      .min(6, '¡Debe ser más larga!')
      .max(50, '¡Demasiado larga!')
      .required('¡La contraseña es requerida!'),
    password: Yup.string()
      .min(6, '¡Debe ser más larga!')
      .max(50, '¡Demasiado larga!')
      .required('¡La contraseña es requerida!'),
    passwordConfirmation: Yup.string()
    .required('¡La contraseña es requerida!')
    .oneOf([Yup.ref('password'), null], '¡Las contraseñas deben coincidir!'),
  });
  
  const ChangePassword = () => {
    
    const [showPassword,setShowPassword] = useState(false);
    const { user, setUser } = useAuthContext();
    const navigate = useNavigate();
    
    const [isLoading, setIsLoading] = useState(false);
  
    const onFinish = async (values) => {
      setIsLoading(true);
      try {
        const value = {
          currentPassword: values.currentPassword,
          password: values.password,
          passwordConfirmation: values.passwordConfirmation
        };
        const response = await fetch(`${API}/auth/change-password`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getToken()}`,
          },
          body: JSON.stringify(value),
        });
        
        const data = await response.json();
        if (data?.error) {
          throw data?.error;
        } else {

          setToken(data.jwt);
  
          setUser(data.user);
          message.success(`¡La contraseña se cambió!`);
          navigate("/auth/signin", { replace: true });
        }
      } catch (error) {
        message.error("¡Ocurrió un error!. ¿Está usted autenticado?");
      } finally {
        setIsLoading(false);
      }
    };
    if(isLoading){
      return (
        <Spin className="spinner" size='large'>
          <Alert/>
        </Spin>
      )
  }
    return ( 
      <div className="flex mt-8 mb-6 flex-col px-12 text-center sm:px-10 md:px-6 justify-center items-center bg-white">
       <div className="my-20 lg:my-3 sm:my-6 flex flex-col">
          <label className="loginh mb-4">Ingresa tu nueva contraseña</label>
          <label className="loginh5">Por favor ingresa tu nueva contraseña dos veces para verificar</label>
       </div>
       <Formik
         initialValues={{
          currentPassword:'', 
          password: '',
          passwordConfirmation: '',
         }}
         validationSchema={ChangePasswordSchema}
         onSubmit={ onFinish }
       >
         {({ errors, touched }) => (
           <Form onFinish={onFinish} autoComplete="off">
            <div className="div">
                      <div className="image-container">
                        <BiLockOpen size={25}/> 
                      </div>
                      <div className="flex flex-col text-gray-500">
                        <label className="text-xs font-semibold text-gray-400 text-left ml-3">Contraseña anterior</label>
                        <Field placeholder="Contraseña" type={showPassword ? "text" : "password"} name="currentPassword" className="input signin-email"/>
                      </div>
                      <div className="input-container-right" onClick={() => setShowPassword(!showPassword)}>
                        {showPassword ? <BiShow size={25} color="#84a8e1"/> : <BiHide size={25} color="#84a8e1"/>}
                      </div> 
            </div>
            <div className="space">
              {errors.currentPassword && touched.currentPassword ? (<div className="errordiv text-xs">{errors.currentPassword}</div>) : null}
            </div>
            <div className="div">
                      <div className="image-container">
                        <BiLock size={25}/> 
                      </div>
                      <div className="flex flex-col text-gray-500">
                        <label className="text-xs font-semibold text-gray-400 text-left ml-3">Contraseña</label>
                        <Field placeholder="Contraseña" type={showPassword ? "text" : "password"} name="password" className="input signin-email"/>
                      </div>
                      <div className="input-container-right" onClick={() => setShowPassword(!showPassword)}>
                        {showPassword ? <BiShow size={25} color="#84a8e1"/> : <BiHide size={25} color="#84a8e1"/>}
                      </div> 
            </div>
            <div className="space">
              {errors.password && touched.password ? (<div className="errordiv text-xs">{errors.password}</div>) : null}
            </div>
            <div className="div">
                      <div className="image-container">
                        <BiLock size={25}/> 
                      </div>
                      <div className="flex flex-col text-gray-500">
                      <label className="text-xs font-semibold text-gray-400 text-left ml-3">Repetir Contraseña</label>
                        <Field placeholder="Repetir Contraseña" type={showPassword ? "text" : "password"} name="passwordConfirmation" className="input signin-email"/>
                      </div>
                          <div className="input-container-right" onClick={() => setShowPassword(!showPassword)}>
                            {showPassword ? <BiShow size={25} color="#84a8e1"/> : <BiHide size={25} color="#84a8e1"/>}
                          </div> 
            </div>
            <div className="space">
              {errors.passwordConfirmation && touched.passwordConfirmation ? (<div className="errordiv text-xs">{errors.passwordConfirmation}</div>) : null}
            </div>
            <div className="max-w-60 flex flex-col">
              <button className="button-signin max-w-full login_submit_btn" type="submit">GUARDAR</button>
           </div>
         </Form>
         )}
       </Formik>
     </div>
    );
  };
  
  export default ChangePassword;