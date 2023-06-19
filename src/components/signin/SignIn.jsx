import { message, Spin } from "antd";
import React, { useState } from "react";
import { useSignIn } from "react-auth-kit";
import { useMutation } from "react-query";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";
import { API } from "../../constant";
import { setToken, setUserLocal } from "../../utils/helpers";
import { Formik, Form, Field, useFormik } from 'formik';
import * as Yup from 'yup';
import { BiShow, BiHide, BiUserCircle, BiLock } from "react-icons/bi";
import { authUser } from "../../api/usersApi";

const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
const SigninSchema = Yup.object().shape({
  identifier: Yup.string().matches(emailRegex,'¡Correo inválido!')
    .required('¡El correo es requerido!'),
  password: Yup.string()
    .required('¡La contraseña es requerida!'),
});

const SignIn = () => {
  const navigate = useNavigate();
  const signIn = useSignIn();
  
  const [showPassword,setShowPassword] = useState(false);
  
  const { mutate: loginMutation, isLoading, isError, error } = useMutation(authUser);


  const formik = useFormik({
    initialValues: {
      identifier: "yordan2@mail.com",
      password: "123456",
    },
    validationSchema: Yup.object({
      identifier: Yup.string()
        .email("El correo no es válido")
        .required("El correo es requerido"),
      password: Yup.string().required("La contraseña es requerida"),
    }),
    onSubmit: async (values) => {
      loginMutation(values, {
        onSuccess: (data) => {
          signIn({
            token: data.jwt,
            expiresIn: 60,
            tokenType: "Bearer",
            authState: data.user,
          });
          window.location.reload(true);
          
          // navigate('/home/banner');
          message.success(`¡Bienvenido ${data.user.username}!`);
        },
        onError: (error) => {
          message.error(error.response.data.error.message);
        },
      });
    },
  });


  return ( 
    <div className="flex my-6 flex-col px-12 text-center sm:px-10 md:px-6 justify-center items-center bg-white">
     <div className="my-20 lg:my-3 sm:my-6 flex flex-col">
        <label className="loginh">Iniciar sesión</label>
        <label className="loginh5">Ingresa tus datos</label>
     </div>
         <form onSubmit={formik.handleSubmit} autoComplete="off">
          <div className="div">
                    <span className="image-container">
                      <BiUserCircle size={25}/> 
                    </span>
                    <div className="flex flex-col text-gray-500 text-left">
                    <label className="text-xs font-semibold text-gray-400 text-left ml-3">Correo</label>
                      <input value={formik.values.identifier} onChange={formik.handleChange} placeholder="Correo electrónico" type="email" name="identifier" className="input signin-email outline-none"/>
                    </div>
          </div>
          <div className="space">
            {formik.errors.identifier && formik.touched.identifier ? <div className="errordiv text-xs">{formik.errors.identifier}</div> : null}
          </div>
          <div className="div">
                    <div className="image-container">
                      <BiLock size={25}/> 
                    </div>
                    <div className="flex flex-col text-gray-500">
                    <label className="text-xs font-semibold text-gray-400 text-left ml-3">Contraseña</label>
                      <input value={formik.values.password} onChange={formik.handleChange} placeholder="Contraseña" type={showPassword ? "text" : "password"} name="password" className="input signin-email"/>
                    </div>
                        <div className="input-container-right" onClick={() => setShowPassword(!showPassword)}>
                          {showPassword ? <BiShow size={25} color="#84a8e1"/> : <BiHide size={25} color="#84a8e1"/>}
                        </div> 
          </div>
          <div className="space">
            {formik.errors.password && formik.touched.password ? (<div className="errordiv text-xs">{formik.errors.password}</div>) : null}
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
      </form>   
   </div>
  );
};

export default SignIn;