import { message, Spin } from "antd";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";
import { API } from "../../constant";
import { setToken, setUserLocal } from "../../utils/helpers";
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { BiShow, BiHide, BiUserCircle, BiLock } from "react-icons/bi";

const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
const SigninSchema = Yup.object().shape({
  identifier: Yup.string().matches(emailRegex,'¡Correo inválido!')
    .required('¡El correo es requerido!'),
  password: Yup.string()
    .required('¡La contraseña es requerida!'),
});

const SignIn = () => {
  
  const [showPassword,setShowPassword] = useState(false);

  const navigate = useNavigate();

  const { setUser } = useAuthContext();

  const [isLoading, setIsLoading] = useState(false);

  let value = {identifier: "",password: ""};

  const Login = async (value) => {
    const response = await fetch(`${API}/auth/local`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(value),
    });
    const data = await response.json();
      if(response.status === 200) {
        setToken(data.jwt);
        setUserLocal(data.user.email);

        setUser(data.user);       
        message.success(`¡Bienvenido(a) ${data.user.username}!`);
        navigate("/banner", { replace: true });
      }
      else {
        message.error("¡Sus credenciales son incorrectas!");
      }
  };
  const onFinish = async (values) => {
    setIsLoading(true);
    try {
      value = {
        identifier: values.identifier,
        password: values.password,
      };
    Login(value);

    } catch (error) {
      message.error("¡Ocurrió un error. Inténtelo de nuevo!");
    } finally {
      setIsLoading(false);
    }
  };

  return ( 
    <div className="flex my-6 flex-col px-12 text-center sm:px-10 md:px-6 justify-center items-center bg-white">
     <div className="my-20 lg:my-3 sm:my-6 flex flex-col">
        <label className="loginh">Iniciar sesión</label>
        <label className="loginh5">Ingresa tus datos</label>
     </div>
     <Formik
       initialValues={{
         identifier: '',
         password: '',
       }}
       validationSchema={SigninSchema}
       onSubmit={ onFinish}
     >
       {({ errors, touched }) => (
         <Form onFinish={onFinish} autoComplete="off">
          <div className="div">
                    <span className="image-container">
                      <BiUserCircle size={25}/> 
                    </span>
                    <div className="flex flex-col text-gray-500 text-left">
                    <label className="text-xs font-semibold text-gray-400 text-left ml-3">Correo</label>
                      <Field placeholder="Correo electrónico" type="email" name="identifier" className="input signin-email outline-none"/>
                    </div>
          </div>
          <div className="space">
            {errors.identifier && touched.identifier ? <div className="errordiv text-xs">{errors.identifier}</div> : null}
          </div>
          <div className="div">
                    <div className="image-container">
                      <BiLock size={25}/> 
                    </div>
                    <div className="flex flex-col text-gray-500">
                    <label className="text-xs font-semibold text-gray-400 text-left ml-3">Contraseña</label>
                      <Field placeholder="Contraseña" type={showPassword ? "text" : "password"} name="password" class="input signin-email"/>
                    </div>
                        <div className="input-container-right" onClick={() => setShowPassword(!showPassword)}>
                          {showPassword ? <BiShow size={25} color="#84a8e1"/> : <BiHide size={25} color="#84a8e1"/>}
                        </div> 
          </div>
          <div className="space">
            {errors.password && touched.password ? (<div className="errordiv text-xs">{errors.password}</div>) : null}
          </div>
          <div className="flex mx-4 my-2 justify-between items-center">
              <label className="flex items-center text-xs">
                <input type="checkbox" className="mr-2" />
                <span>Recordarme</span>
              </label>
              <Link to='/reset-password' className="text-xs text-red-700">¿Olvidó su contraseña?</Link>
          </div>
          <div className="max-w-60 flex flex-col">
            <button className="button-signin max-w-full login_submit_btn" type="submit">INICIAR SESIÓN{isLoading && <Spin size="small" />}</button>
            <label className="text-md my-4">¿No tienes una cuenta?</label>
            <Link to = '/register-request' link-to className="button-rq">Solicitar una cuenta</Link>
         </div>
       </Form>
       )}
     </Formik>
   </div>
  );
};

export default SignIn;