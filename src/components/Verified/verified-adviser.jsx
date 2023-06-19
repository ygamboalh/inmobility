import React from 'react'
import { AdviserCard } from '../AdviserCard/adviser-card'

const VerifiedAdviser = () => {
  return (
    <section>
      <div className="text-center">
        <div className='flex flex-col'>
          <label className='font-bold text-sm'> ASESOR INMOBILIARIO</label>
          <label className='font-bold text-sm'> VERIFICADO</label>
          <label className='text-sm'> SISTEMA CIC</label>
          </div>
      </div>
      <div
        className='grid grid-cols-4 p-1 gap-10 max-md:grid-cols-1 text-center text-white font-medium'>
        <AdviserCard>
          <div className="grid grid-cols-3 md:grid-cols-3 card-buttons">
            <div className="col-span-1 orange-button">PASO A PASO</div>
            <div className="col-span-1 orange-button">INCUBADORA DE INVERSIONISTAS</div>
            <div className="col-span-1 orange-button">BASE DE DATOS</div>
            <div className="col-span-1 orange-button">LISTA DE FREELANCERS ACTIVO</div>
            <div className="col-span-1 orange-button">DAR DE BAJA A UN INMUEBLE</div>
            <div className="col-span-1 orange-button">INFOCOLECTOR</div>
            <div className="col-span-1 orange-button">CONCURSOS INTERNOS</div>
            <div className="col-span-1 orange-button">CURSOS COMPLEMENTARIOS</div>
            <div className="col-span-1 orange-button">MICROCREDITOS PERSONALES</div>
          </div>
        </AdviserCard>
        <AdviserCard>
            <div className="">ENLACES DE INTERES DEL GREMIO</div>
        </AdviserCard>
        <AdviserCard>
          <div className='reminder'>
          <span>Recordatorio general</span>
            <span>Hasta alcanzar una cantidad mínima de 5 mil inmuebles, captados en esta
                  LISTA GENERAL DE CAPTACIONES DEL GREMIO, este sistema será 100% gratuito.
                  Después de esa cantidad, habrá un costo mínimo para financiar el presupuesto
                  de publicidad de los inmuebles publicados.   
            </span>
          </div>
        </AdviserCard>
        <AdviserCard>
          <div className="policies">
              <span>Esta será la política de participación en un futuro</span>
              <span>Por trimestre:</span>
              <span>$ 10.000 (Diez colones exactos)</span>
              <span>Por año:</span>
              <span>$ 30.000 (Treinta mil colones exactos)</span>
              <hr/>
              <span>No se cobrará por inmueble sino por tiempo.</span>
              <span>Así usted prodrá subir toda la información de las propiedades
                    que requiera mientras sea un asesor activo en este sistema
              </span>
              <span>Los pagos de subcripción anual o trimestral, se realizarán
                a través de SINPE MOVIL DEL 
              </span>
              <span>(506) 6383-2727</span>
          </div>
        </AdviserCard>

      </div>
    </section>
  )
}

export default VerifiedAdviser