import React from 'react'
import { Link } from 'react-router-dom'
import { SiHomeassistantcommunitystore } from 'react-icons/si'
import { GiFarmTractor, GiFactory } from 'react-icons/gi'
import { FaWarehouse } from 'react-icons/fa'
import { BsFillBuildingsFill, BsPersonRolodex } from 'react-icons/bs'

const Ventas = () => {

  return (
    <section>
      <div
        className='grid grid-cols-2 p-10 gap-10 max-md:grid-cols-1 text-center text-white font-medium' >
        <Link to='/searchForSale?filters[category][isSale][$eq]=true'>
          <div className='border flex flex-col py-14 justify-center align-middle lg:p-20 lg:w-full shadow-1 hover:shadow-2xl rounded-lg bg-blue-900' >
            <SiHomeassistantcommunitystore style={{ color: '#fff', fontSize: 54, alignSelf: 'center', margin: 5 }} />
            <p>Venta Casas y Apartamentos</p>
          </div>
        </Link>

        <Link to='/searchForSale?filtro=venta' >
          <div className='border flex flex-col py-14 justify-center align-middle lg:p-20 lg:w-full shadow-1 hover:shadow-2xl rounded-lg bg-blue-900' >
            <GiFarmTractor style={{ color: '#fff', fontSize: 54, alignSelf: 'center', margin: 5 }} />
            <p>Venta Lotes, Fincas, Terrenos</p>
          </div >
        </Link>

        <Link to='/searchForSale?filtro=venta' >
          <div className='border flex flex-col py-14 justify-center align-middle lg:p-20 lg:w-full shadow-1 hover:shadow-2xl rounded-lg bg-blue-900' >
            <FaWarehouse style={{ color: '#fff', fontSize: 54, alignSelf: 'center', margin: 5 }} />
            <p>Venta Locales Comerciales</p>
          </div>
        </Link>

        <Link to='/searchForSale?filtro=venta' >
          <div className='border flex flex-col py-14 justify-center align-middle lg:p-20 lg:w-full shadow-1 hover:shadow-2xl rounded-lg bg-blue-900' >
            <GiFactory style={{ color: '#fff', fontSize: 54, alignSelf: 'center', margin: 5 }} />
            <p>Venta Bodegas y Similares</p>
          </div>
        </Link>

        <Link to='/searchForSale?filtro=venta' >
          <div className='border flex flex-col py-14 justify-center align-middle lg:p-20 lg:w-full shadow-1 hover:shadow-2xl rounded-lg bg-blue-900' >
            <BsFillBuildingsFill style={{ color: '#fff', fontSize: 54, alignSelf: 'center', margin: 5 }} />
            <p>Venta de Edificios</p>
          </div>
        </Link>

        <Link to='/searchForSale?filtro=venta' >
          <div className='border flex flex-col py-14 justify-center align-middle lg:p-20 lg:w-full shadow-1 hover:shadow-2xl rounded-lg bg-blue-900' >
            <BsPersonRolodex style={{ color: '#fff', fontSize: 54, alignSelf: 'center', margin: 5 }} />
            <p>Venta Oficinas y Consultorios</p>
          </div>
        </Link>

      </div>
    </section>
  )
}

export default Ventas