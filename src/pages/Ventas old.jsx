import React from 'react'
import { Category } from '../components'
import { SiHomeassistantcommunitystore } from 'react-icons/si'
import { GiFarmTractor, GiFactory } from 'react-icons/gi'
import { FaWarehouse } from 'react-icons/fa'
import { BsFillBuildingsFill, BsPersonRolodex } from 'react-icons/bs'
import { VentasRoutes } from '../routes'

const Ventas = () => {
  return (
    <section>
      <div
        className='grid grid-cols-2 p-10 gap-10 max-md:grid-cols-1 text-center text-white font-medium' >

        <Category path={VentasRoutes.CASA_APARTAMENTO} title='Venta Casas y Apartamentos' >
          <SiHomeassistantcommunitystore style={{ color: '#fff', fontSize: 54, alignSelf: 'center', margin: 5 }} />
        </Category>

        <Category path={VentasRoutes.LOTES_FINCAS_TERRENOS} title='Venta Lotes, Fincas, Terrenos' >
          <GiFarmTractor style={{ color: '#fff', fontSize: 54, alignSelf: 'center', margin: 5 }} />
        </Category>

        <Category path={VentasRoutes.LOCALES_COMERCIALES} title='Venta Locales Comerciales' >
          <FaWarehouse style={{ color: '#fff', fontSize: 54, alignSelf: 'center', margin: 5 }} />
        </Category>

        <Category path={VentasRoutes.BODEGAS_SIMILARES} title='Venta Bodegas y Similares' >
          <GiFactory style={{ color: '#fff', fontSize: 54, alignSelf: 'center', margin: 5 }} />
        </Category>

        <Category path={VentasRoutes.EDIFICIOS} title='Venta de Edificios' >
          <BsFillBuildingsFill style={{ color: '#fff', fontSize: 54, alignSelf: 'center', margin: 5 }} />
        </Category>

        <Category path={VentasRoutes.OFICINAS_CONSULTORIOS} title='Venta Oficinas y Consultorios' >
          <BsPersonRolodex style={{ color: '#fff', fontSize: 54, alignSelf: 'center', margin: 5 }} />
        </Category>

      </div>
    </section>
  )
}

export default Ventas