import React from "react";

import { AdviserCard } from "../AdviserCard/adviser-card";
import { useQuery } from "react-query";
import { authUserData } from "../../api/usersApi";
import Thumbnail from "../Thumbnail/thumbnail";
import MetaData from "../Metadata/metadata";

const VerifiedAdviser = () => {
  const { data: userData } = useQuery("profile", authUserData);
  const role = userData?.role.name;
  const active = userData?.active;

  return (
    <section className="flex flex-col justify-center items-center content-center">
      <div className="flex max-w-[400px] flex-col justify-center">
        <div className="mt-3 flex content-center align-middle justify-center">
          {active === "Asesor verificado" ? <Thumbnail /> : <span></span>}
        </div>
        <MetaData title="Asesores" description="Asesores" />
        <div className="text-center">
          <div className="flex flex-col">
            <label className="font-bold text-sm"> ASESOR INMOBILIARIO</label>
            <label className="font-bold text-sm"> VERIFICADO</label>
            <label className="text-sm"> SISTEMA CIC</label>
          </div>
        </div>
        <div className="flex flex-col mx-2 text-center text-white font-medium">
          <AdviserCard>
            <div className="grid grid-cols-3 lg:grid-cols-3 md:grid-cols-3 card-buttons content-around justify-center">
              <div className="col-span-1 align-middle items-center orange-button justify-center flex">
                <label className="justify-center items-center align-middle flex md:text-[11px]">
                  PASO A PASO
                </label>
              </div>
              <div className="col-span-1 orange-button justify-center flex align-middle items-center">
                <label className="md:text-[11px]">
                  INCUBADORA DE INVERSIONISTAS
                </label>
              </div>
              <div className="col-span-1 orange-button justify-center flex align-middle items-center">
                <label className="md:text-[11px]">BASE DE DATOS</label>
              </div>
              <div className="col-span-1 orange-button justify-center flex align-middle items-center">
                <label className="md:text-[11px]">
                  LISTA DE FREELANCERS ACTIVO
                </label>
              </div>
              <div className="col-span-1 orange-button justify-center flex align-middle items-center">
                <label className="md:text-[11px]">
                  DAR DE BAJA A UN INMUEBLE
                </label>
              </div>
              <div className="col-span-1 orange-button justify-center flex align-middle items-center">
                <label className="md:text-[11px]">
                  MICROCREDITOS PERSONALES
                </label>
              </div>
              <div className="col-span-1 orange-button justify-center flex align-middle items-center">
                <label className="md:text-[11px]">INFOCOLECTOR</label>
              </div>
              <div className="col-span-1 orange-button justify-center flex align-middle items-center">
                <label className="md:text-[11px]">CONCURSOS INTERNOS</label>
              </div>
              <div className="col-span-1 orange-button justify-center flex align-middle items-center">
                <label className="md:text-[8px] sm:text-[8px] lg:text-[11px] mx-1">
                  CURSOS COMPLEMENTARIOS
                </label>
              </div>
            </div>
          </AdviserCard>

          <div className="border flex md:grid-col-2 py-4 lg:my-0 justify-center align-middle lg:p-4 shadow-1 hover:shadow-2xl rounded-lg hover:bg-red-700 bg-red-600">
            <a href="/home/links" className="flex  w-full justify-center">
              <div className="flex text-white text-lg font-semibold flex-col justify-center ">
                ENLACES DE INTERES DEL GREMIO
              </div>
            </a>
          </div>

          <AdviserCard>
            <div className="reminder align-middle text-black items-center content-center flex flex-col">
              <span className="text-blue-900 font-bold text-base">
                Recordatorio general
              </span>
              <span className="text-gray-500">
                Hasta alcanzar una cantidad mínima de 5 mil inmuebles, captados
                en esta LISTA GENERAL DE CAPTACIONES DEL GREMIO, este sistema
                será 100% gratuito. Después de esa cantidad, habrá un costo
                mínimo para financiar el presupuesto de publicidad de los
                inmuebles publicados.
              </span>
            </div>
          </AdviserCard>
          <AdviserCard>
            <div className="policies text-black flex flex-col">
              <span className="text-blue-900 font-bold text-base">
                Esta será la política de participación en un futuro
              </span>
              <div className="flex flex-row text-gray-700 justify-center">
                <span>Por trimestre:</span>
                <span>$ 10.000 (Diez colones exactos)</span>
              </div>
              <div className="flex flex-row justify-center text-gray-700">
                <span>Por año:</span>
                <span>$ 30.000 (Treinta mil colones exactos)</span>
              </div>
              <hr />
              <span className="text-gray-700">
                No se cobrará por inmueble sino por tiempo.
              </span>
              <span className="text-gray-700">
                Así usted prodrá subir toda la información de las propiedades
                que requiera mientras sea un asesor activo en este sistema
              </span>
              <span className="text-gray-700">
                Los pagos de subcripción anual o trimestral, se realizarán a
                través del
              </span>
              <span className="text-blue-900 font-bold text-base">
                SINPE MOVIL DEL (506) 6383-2727
              </span>
            </div>
          </AdviserCard>
        </div>
      </div>
    </section>
  );
};

export default VerifiedAdviser;
