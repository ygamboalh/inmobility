import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getToken } from '../utils/helpers';
import { API, BEARER } from '../constant';
import { authUserData } from '../api/usersApi';
const Welcome = () => {
  
//revisar aqui, si cuando se presiona 
//entrar como asesor veriricado y ya hay un token ento
//entonces mandarlo directo a banner

const navigate = useNavigate();

const SelectLink = async () => {
    //const authUser = authUserData();
    const token = getToken();    
    const response = await fetch(`${API}/users/me`, {
      method: "GET",
      headers: { Authorization: `${BEARER} ${token}` },
    });
    if(response.ok) {
      navigate('/home/banner');
    }
    navigate('/auth/signin');  
}
  return (
    <div className="flex flex-col h-screen px-12 div-welcome text-center sm:px-10 md:px-6 justify-center items-center">
    <div className='justify-center items-center mb-4 logo'></div>
        <div className='flex-5 lg:w-96 md:w-96 text-white'>
            <label className='mb-4'>Esta es la principal herramienta
                    de trabajo de los Asesores Inmobiliarios en Costa Rica
            </label>
        </div>
        <div className='flex-5 lg:w-96 md:w-96 text-white'>
            <button onClick={ ()=> navigate('/auth/signin')} className='button-pro-inm'> 
                    <div className="div-button cursor-pointer">
                        <label className="label-button cursor-pointer">INGRESAR COMO</label> 
                        <label className="label-button cursor-pointer">ASESOR PROFESIONAL</label>
                    </div>
            </button>
        </div>
        <div className='flex-5 lg:w-96 md:w-96 text-white'>
            <a href='/home/investor'>
                <button className="button-pro-inm">
                    <div className="div-button cursor-pointer">
                        <label className="label-button cursor-pointer">INGRESAR COMO</label> 
                        <label className="label-button cursor-pointer">INVERSIONISTA INMOBILIARIO</label>
                    </div>
                </button>
            </a>
        </div>
        <div className='flex-5 lg:w-96 md:w-96 text-white'>
            <a href='/home/visit-record'>
                <button className="button-pro-visit">
                    <div className="div-button cursor-pointer">
                        <label className="label-button cursor-pointer">INGRESAR COMO VISITANTE</label>                 
                    </div>
                </button>
            </a>
        </div>
        <div className='flex-5 lg:my-5 lg:w-96 md:w-96 my-6 text-white'>
            <span className=''>Como Visitante usted tendrá acceso a la base de datos 
                de todos los inmuebles en venta y alquiler en Costa Rica
            </span>
        </div>  
</div>
  )
};

export default Welcome;