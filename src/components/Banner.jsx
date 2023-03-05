import React from 'react';

// Import image
// import Image from '../assets/img/house-banner.png'

// import components
// import Search from '../components/Search'

const Banner = () => {
  return <section className='h-full max-h-[640px] mb-8 xl:mb-24' >
    <div className='flex flex-col lg:flex-row' >
      <div className='text-center flex flex-col w-full px-5 lg:flex-row lg:my-16 mx-auto gap-10 justify-center text-white font-semibold' >
        <div className='border py-14 lg:p-20 shadow-1 hover:shadow-2xl rounded-lg bg-blue-900' >
          <div className='text-lg' >Buscar Inmuebles en Venta</div>
          <div className='font-thin text-sm' >presiona para ver todas las ventas</div>
        </div>
        <div className='border py-14 lg:p-20 shadow-1 hover:shadow-2xl rounded-lg bg-blue-900' >
          <div className='text-lg' > Alquileres de Inmuebles</div>
          <div className='font-thin text-sm' >presiona para ver todas los alquileres</div>
        </div>
        <div className='border py-14 lg:p-20 shadow-1 hover:shadow-2xl rounded-lg bg-black' >
          <div className='text-lg' >Enlaces de Interes del Gremio</div>
          <div className='font-thin text-sm' >Solo para Acesores Inmobiliarios</div>
        </div>
      </div>
    </div>
    {/* <Search /> */}
  </section>;
};

export default Banner;
