import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="flex flex-col -mb-5 mt-5 px-12 div-welcome text-center sm:px-10 md:px-6 justify-center items-center">
    <div className='justify-center items-center mb-2 logo'></div>
        <div className='flex-5 lg:w-96 md:w-96 text-white'>
            <label className=''>Esta es la principal herramienta
                    de trabajo de los Asesores Inmobiliarios en Costa Rica
            </label>
        </div>
        <div className='flex-5 lg:w-96 md:w-96 text-white'>
            <a href='/auth/signin'> 
                <button className="button-pro-inm">
                    <div className="div-button cursor-pointer">
                        <label className="label-button cursor-pointer">INGRESAR COMO</label> 
                        <label className="label-button cursor-pointer">ASESOR PROFESIONAL</label>
                    </div>
                </button>
            </a>
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
        <div className='my-4 div-welcome'></div>
    </div>
) 
};

export default HomePage;
