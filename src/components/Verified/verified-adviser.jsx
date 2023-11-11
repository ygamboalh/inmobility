import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { AdviserCard } from "../AdviserCard/adviser-card";
import { useQuery } from "react-query";
import { authUserData } from "../../api/usersApi";
import Thumbnail from "../Thumbnail/thumbnail";
import MetaData from "../Metadata/metadata";
import { getAllButtons } from "../../api/propertiesApi";

const VerifiedAdviser = () => {
  const { data: userData } = useQuery("profile", authUserData);
  const [buttons, setButtons] = useState([]);
  const navigate = useNavigate();
  const active = userData?.active;

  const { data: buttonsData, isLoading: loadingButtons } = useQuery(
    "buttons",
    getAllButtons,
    {
      onSuccess: (data) => {
        setButtons(data.data);
      },
    }
  );
  return (
    <section className="flex flex-col justify-center items-center content-center">
      <div className="flex max-w-[400px] flex-col justify-center">
        <div className="mt-3 flex content-center align-middle justify-center">
          {active === "Asesor verificado activo" ||
          active === "Asesor verificado inactivo" ? (
            <Thumbnail />
          ) : (
            <span></span>
          )}
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
            <div className="grid  grid-cols-2 lg:grid-cols-2 md:grid-cols-2 card-buttons content-around justify-center">
              <button
                onClick={() =>
                  navigate("/home/verified-adviser/my-property-list")
                }
                className="col-span-1 align-middle items-center orange-button justify-center flex"
              >
                <span className="text-[12px]">MI LISTA</span>
              </button>

              <div className="col-span-1 align-middle items-center orange-button justify-center flex">
                <a
                  href="/home/portfolio"
                  className="justify-center items-center align-middle flex md:text-[11px]"
                >
                  MIS PORTAFOLIOS
                </a>
              </div>
              {buttons?.map((boton) => {
                return (
                  <div className="col-span-1 align-middle items-center orange-button justify-center flex">
                    <a
                      href={boton?.attributes?.url}
                      className="justify-center items-center align-middle flex md:text-[11px]"
                    >
                      {boton?.attributes?.description}
                    </a>
                  </div>
                );
              })}
              {/* <div className="col-span-1 align-middle items-center orange-button justify-center flex">
                <a
                  href="https://sites.google.com/view/centro-de-ayuda-al-sistema-cic/p%C3%A1gina-principal"
                  className="justify-center flex-col items-center align-middle flex md:text-[11px]"
                >
                  <span>PASO A PASO</span>
                  <span>Videos tutoriales</span>
                </a>
              </div>
              <div className="col-span-1 orange-button justify-center flex align-middle items-center">
                <a
                  href="https://sites.google.com/view/cursoasesorinmobiliario/curso-b%C3%A1sico-para-nuevos-asesores-inmobiliarios-independientes-de-la-aic"
                  className="justify-center flex-col items-center align-middle flex md:text-[11px]"
                >
                  <span>CURSOS</span>
                  <span>COMPLEMENTARIOS</span>
                </a>
              </div>
              <div className="col-span-1 align-middle items-center orange-button justify-center flex">
                <a
                  href="https://sites.google.com/view/inc4mensual/"
                  className="justify-center items-center align-middle flex md:text-[11px]"
                >
                  INCUBADORA DE INVERSIONISTAS
                </a>
              </div>
              <div className="col-span-1 orange-button justify-center flex align-middle items-center">
                <a
                  href="https://100milcr.com/"
                  className="justify-center items-center flex-col align-middle flex md:text-[11px]"
                >
                  <span>MICROCREDITOS</span>
                  <span>PERSONALES</span>
                </a>
              </div>
              <div className="col-span-1 orange-button justify-center flex align-middle items-center">
                <a
                  href="https://sites.google.com/view/freelancerspublicistas/p%C3%A1gina-principal"
                  className="justify-center items-center align-middle flex-col flex md:text-[11px]"
                >
                  <span className="md:text-[11px]">FREELANCERS</span>
                  <span className="md:text-[11px]">PUBLICISTAS</span>
                </a>
              </div>
              <div className="col-span-1 orange-button justify-center flex align-middle items-center">
                <a
                  href="https://sites.google.com/view/concursosaic/p%C3%A1gina-principal"
                  className="justify-center items-center flex-col align-middle flex md:text-[11px]"
                >
                  <span className="md:text-[11px]">CONCURSOS INTERNOS</span>
                </a>
              </div> */}
            </div>
          </AdviserCard>

          {userData?.active !== "Asesor verificado inactivo" ? (
            <div className="border bg-gradient-to-r from-red-600 to-red-500 hover:from-pink-500 hover:to-pink-700 flex md:grid-col-2 py-4 my-4 cursor-pointer justify-center align-middle lg:p-4 shadow-1 hover:shadow-2xl rounded-[25px] hover:bg-red-700 bg-red-600">
              <a href="/home/links" className="flex  w-full justify-center">
                <div className="flex text-white text-lg font-semibold flex-col justify-center ">
                  ENLACES DE INTERÉS DEL GREMIO
                </div>
              </a>
            </div>
          ) : null}

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
                <span className="mr-1">Por trimestre: </span>
                <span> ₡10.000 (Diez mil colones exactos)</span>
              </div>
              <div className="flex flex-row justify-center text-gray-700">
                <span className="mr-1">Por año: </span>
                <span> ₡30.000 (Treinta mil colones exactos)</span>
              </div>

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
