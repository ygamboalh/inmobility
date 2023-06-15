import React from 'react';
import { Link, Navigate, redirect, useNavigate } from 'react-router-dom';
import { getToken, getUser } from '../utils/helpers';
import { API, BEARER } from '../constant';

const Banner = () => {
  const navigate = useNavigate();
  const SelectLink = async () => {
  
    const token = getToken();
        
    const response = await fetch(`${API}/users/me?populate=role`, {
      method: "GET",
      headers: { Authorization: `${BEARER} ${token}` },
    });
    const data = await response.json();
    if(response.statusCode !=200) 
    {
      navigate("/access-denied", { replace: true });
    }
    const role = data.role.name;
    console.log(`Este es el rol ${role}`);
    if(role == "Authenticated"){
      navigate("/upload", { replace: true }); 
    }
    else if(role == "Visiter")
    {
      navigate("/evaluating", { replace: true });
    }
    else {
      navigate("/access-denied", { replace: true });
    }
  }

  return <section className='h-full max-h-[640px] my-10' >
    <div className='flex flex-col lg:flex-row' >
      <div className='text-center flex flex-col w-full px-5 lg:flex-row lg:my-16 mx-auto gap-10 justify-center text-white font-semibold' >
        <Link to='/ventas' >
          <div className='border py-14 lg:p-20 shadow-1 hover:shadow-2xl rounded-lg bg-primary' >
            <div className='text-lg' >Buscar Inmuebles en Venta</div>
            <div className='font-thin text-sm' >presiona para ver todas las ventas</div>
          </div>
        </Link>
        <Link to='/alquiler' >
          <div className='border py-14 lg:p-20 shadow-1 hover:shadow-2xl rounded-lg bg-primary' >
            <div className='text-lg' >Alquileres de Inmuebles</div>
            <div className='font-thin text-sm' >presiona para ver todas los alquileres</div>
          </div>
        </Link>
        <button onClick={SelectLink} type='button' >
          <div className='border py-14 lg:p-20 shadow-1 hover:shadow-2xl rounded-lg bg-primary' >
            <div className='text-lg' >Subir un inmueble</div>
            <div className='font-thin text-sm' >si eres un asesor verificado podrás subir un inmueble</div>
          </div>
        </button>
      </div>
    </div>
  </section>;
};

export default Banner;
