import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { message,Spin } from "antd";
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { BiShow, BiHide, BiLock, BiMailSend } from "react-icons/bi";
import { useAuthContext } from "../../context/AuthContext";
import { API } from "../../constant";

  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  const RecoverySchema = Yup.object().shape({
    email: Yup.string().matches(emailRegex,'¡Correo inválido!')
      .required('¡El correo es requerido!'),
      code: Yup.string()
      .required('¡El código es requerido!'),
    password: Yup.string()
      .min(6, '¡Debe ser más larga!')
      .max(50, '¡Demasiado larga!')
      .required('¡La contraseña es requerida!'),
    passwordConfirmation: Yup.string()
    .required('¡La contraseña es requerida!')
    .oneOf([Yup.ref('password'), null], '¡Las contraseñas deben coincidir!'),
  });
  
  const ResetPassword = () => {
      
    const [showPassword,setShowPassword] = useState(false);
    const navigate = useNavigate();
  
    const { setUser } = useAuthContext();
  
    const [isLoading, setIsLoading] = useState(false);
  
    const [error, setError] = useState("");
  
    const onFinish = async (values) => {
      setIsLoading(true);
      try {
        const value = {
          code: values.code,
          password: values.password, 
          passwordConfirmation: values.passwordConfirmation
        };
        const response = await fetch(`${API}/auth/reset-password`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(value),
        });
  
        const data = await response.json();
        if (data?.error) {
          throw data?.error;
        } else {
          
          setUser(data.user);
          message.success(`¡Su contraseña se cambió exitosamente!`);
          navigate("/signin", { replace: true });
        }
      } catch (error) {
        console.error(error);
        message.error("¡Ocurrió un error. Intente de nuevo!");
      } finally {
        setIsLoading(false);
      }
    };
  
    return ( 
      <div className="flex my-10 flex-col px-12 text-center sm:px-10 md:px-6 justify-center items-center bg-white">
       <div className="lg:my-2.5 flex flex-col">
          <label className="loginh">Recuperación de contraseña</label>
          <label className="loginh5">Se enviará un enlace a tu correo para cambiar la contraseña</label>
       </div>
       <Formik
         initialValues={{
          password: '',
          passwordConfirmation: '',
          email: '',
          code: ''
         }}
         validationSchema={RecoverySchema}
         onSubmit={ onFinish }
       >
         {({ errors, touched }) => (
           <Form onFinish={onFinish} autoComplete="off">
          <div className="">  
            <div className="div mb-1.3">
                      <span className="image-container">
                      <BiMailSend size={25}/> 
                      </span>
                      <div className="flex flex-col text-gray-500 text-left">
                      <label className="text-xs font-semibold text-gray-400 text-left ml-3">Correo</label>
                        <Field placeholder="Correo electrónico" type="email" name="email" className="input signin-email"/>
                      </div>
            </div>
            <div className="space">
              {errors.email && touched.email ? <div className="errordiv text-xs">{errors.email}</div> : null}
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
            <div className="space  mb-4">
              {errors.passwordConfirmation && touched.passwordConfirmation ? (<div className="errordiv text-xs">{errors.passwordConfirmation}</div>) : null}
            </div>
            <div className="flex flex-col items-center div -mt-5 text-gray-500">
                <label className="text-xs font-semibold text-gray-400 text-left ml-3">Código recibido</label>
                  <Field placeholder="Código" type='text' name="code" className="input border-separate signin-email"/>
            </div>
            <div className="space">
              {errors.code && touched.code ? (<div className="errordiv text-xs">{errors.code}</div>) : null}
            </div>
            <div className="max-w-60 flex flex-col -mt-5">
              <button className="button-signin max-w-full login_submit_btn" type="submit">ENVIAR ENLACE{isLoading && <Spin size="small" />}</button>
              <Link to='/register-request' className="text-sm my-4">¿No tienes una cuenta?</Link>
              <Link to = '/signin' link-to className="button-rq">Iniciar sesión</Link>
           </div>
           </div>
         </Form>
         )}
       </Formik>
     </div>
    );
  };
  
  export default ResetPassword;