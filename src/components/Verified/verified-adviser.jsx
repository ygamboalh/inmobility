import React from "react";

import { AdviserCard } from "../AdviserCard/adviser-card";
import { useQuery } from "react-query";
import { authUserData } from "../../api/usersApi";
import Thumbnail from "../Thumbnail/thumbnail";

const VerifiedAdviser = () => {
  const { data: userData } = useQuery("profile", authUserData);
  const role = userData?.role.name;

  return (
    <section>
      <div className="flex content-center align-middle justify-center">
        {role === "Authenticated" ? <Thumbnail /> : <span></span>}
      </div>
      <div className="text-center">
        <div className="flex flex-col">
          <label className="font-bold text-sm"> ASESOR INMOBILIARIO</label>
          <label className="font-bold text-sm"> VERIFICADO</label>
          <label className="text-sm"> SISTEMA CIC</label>
        </div>
      </div>
      <div className="grid grid-cols-4 p-1 md:grid-cols-2 lg:grid-cols-2  gap-0 max-md:grid-cols-1 text-center text-white font-medium">
        <AdviserCard>
          <div className="grid grid-cols-3 lg:grid-cols-3 md:grid-cols-3  card-buttons content-around justify-center">
            <div className="col-span-1 align-middle items-center orange-button justify-center flex md:w-[100px] lg:w-[150px]">
              <label className="justify-center items-center align-middle flex md:text-[11px]">
                PASO A PASO
              </label>
            </div>
            <div className="col-span-1 orange-button justify-center flex align-middle items-center md:w-[100px] lg:w-[150px]">
              <label className="md:text-[11px]">
                INCUBADORA DE INVERSIONISTAS
              </label>
            </div>
            <div className="col-span-1 orange-button justify-center flex align-middle items-center md:w-[100px] lg:w-[150px]">
              <label className="md:text-[11px]">BASE DE DATOS</label>
            </div>
            <div className="col-span-1 orange-button justify-center flex align-middle items-center md:w-[100px] lg:w-[150px]">
              <label className="md:text-[11px]">
                LISTA DE FREELANCERS ACTIVO
              </label>
            </div>
            <div className="col-span-1 orange-button justify-center flex align-middle items-center md:w-[100px] lg:w-[150px]">
              <label className="md:text-[11px]">
                DAR DE BAJA A UN INMUEBLE
              </label>
            </div>
            <div className="col-span-1 orange-button justify-center flex align-middle items-center md:w-[100px] lg:w-[150px]">
              <label className="md:text-[11px]">MICROCREDITOS PERSONALES</label>
            </div>
            <div className="col-span-1 orange-button justify-center flex align-middle items-center md:w-[100px] lg:w-[150px]">
              <label className="md:text-[11px]">INFOCOLECTOR</label>
            </div>
            <div className="col-span-1 orange-button justify-center flex align-middle items-center lg:w-[150px] md:w-[100px]">
              <label className="md:text-[11px]">CONCURSOS INTERNOS</label>
            </div>
            <div className="col-span-1 orange-button justify-center flex align-middle items-center lg:w-[150px] md:w-[100px]">
              <label className="md:text-[8px] sm:text-[8px] lg:text-[11px]">
                CURSOS COMPLEMENTARIOS
              </label>
            </div>
          </div>
        </AdviserCard>
        <AdviserCard>
          <div className="flex flex-col justify-center ">
            ENLACES DE INTERES DEL GREMIO
          </div>
        </AdviserCard>
        <AdviserCard>
          <div className="reminder align-middle items-center content-center flex flex-col">
            <span>Recordatorio general</span>
            <span>
              Hasta alcanzar una cantidad mínima de 5 mil inmuebles, captados en
              esta LISTA GENERAL DE CAPTACIONES DEL GREMIO, este sistema será
              100% gratuito. Después de esa cantidad, habrá un costo mínimo para
              financiar el presupuesto de publicidad de los inmuebles
              publicados.
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
            <hr />
            <span>No se cobrará por inmueble sino por tiempo.</span>
            <span>
              Así usted prodrá subir toda la información de las propiedades que
              requiera mientras sea un asesor activo en este sistema
            </span>
            <span>
              Los pagos de subcripción anual o trimestral, se realizarán a
              través de SINPE MOVIL DEL
            </span>
            <span>(506) 6383-2727</span>
          </div>
        </AdviserCard>
      </div>
    </section>
  );
};

export default VerifiedAdviser;
