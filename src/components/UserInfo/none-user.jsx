import React, { useEffect, useRef, useState } from "react";
import { useSignOut } from "react-auth-kit";
import {
  BiHomeAlt,
  BiMailSend,
  BiMessageDetail,
  BiSearch,
  BiUserCircle,
} from "react-icons/bi";
import { FaWarehouse } from "react-icons/fa";
import { SiHomeassistantcommunitystore } from "react-icons/si";

const NoneUser = () => {
  const signOut = useSignOut();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="h-[45px] w-[45px] absolute top-6 right-8 rounded-full"
        //style={buttonStyle}
      >
        <svg
          className="w-8 h-8 text-white border shadow bg-gray-600 hover:bg-gray-300 hover:text-black rounded-md p-1 m-3 "
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 17 14"
        >
          <path d="M16 2H1a1 1 0 0 1 0-2h15a1 1 0 1 1 0 2Zm0 6H1a1 1 0 0 1 0-2h15a1 1 0 1 1 0 2Zm0 6H1a1 1 0 0 1 0-2h15a1 1 0 0 1 0 2Z" />
        </svg>
      </button>
      {isOpen && (
        <div
          ref={menuRef}
          className="absolute p-2 top-20 right-1 z-10 w-[170px] h-fit mt-2 py-2 bg-white rounded-lg shadow-lg"
        >
          <div className="flex flex-row rounded-md px-2 align-middle py-2 text-gray-800  hover:bg-blue-500 hover:text-white">
            <BiHomeAlt size={22} />
            <a
              className="text-xs flex  py-1 w-full flex-row pl-1 "
              href="/home/banner/visiter"
            >
              Opciones
            </a>
          </div>
          <hr />
          <div className="flex flex-row px-2 rounded-md align-middle py-2 text-gray-800 hover:bg-blue-500 hover:text-white">
            <SiHomeassistantcommunitystore
              style={{
                fontSize: 18,
              }}
            />
            <a
              className="text-xs -mt-0.5 flex py-1 w-full flex-row pl-1"
              href="/ventas"
            >
              Ventas
            </a>
          </div>

          <hr />
          <div className="flex flex-row px-2 rounded-md align-middle py-2 text-gray-800 hover:bg-blue-500 hover:text-white">
            <FaWarehouse
              style={{
                fontSize: 18,
              }}
            />
            <a
              className="text-xs flex -mt-0.5 py-1 w-full flex-row pl-1"
              href="/alquiler"
            >
              Alquileres
            </a>
          </div>
          <hr />
          <div className="flex flex-row px-2 rounded-md align-middle py-2 text-gray-800 hover:bg-blue-500 hover:text-white">
            <BiSearch
              style={{
                fontSize: 22,
                marginLeft: -2,
                marginTop: 6,
              }}
            />
            <a
              className="text-xs mt-1 flex py-1 w-full flex-row pl-1"
              href="/home/visiter-search"
            >
              Buscar por código
            </a>
          </div>
          <hr />
          <div className="flex flex-row px-2 rounded-md align-middle py-2 text-gray-800 hover:bg-blue-500 hover:text-white">
            <BiMailSend
              style={{
                fontSize: 22,
                marginLeft: -2,
              }}
            />
            <a
              className="text-xs -mt-0.5 flex py-1 w-full flex-row pl-1"
              href="/home/visiter-contact"
            >
              Contactar
            </a>
          </div>
          <hr />
          <div className="flex flex-row px-2 rounded-md align-middle py-2 text-gray-800 hover:bg-blue-500 hover:text-white">
            <BiMessageDetail
              style={{
                fontSize: 22,
                marginLeft: -2,
              }}
            />
            <a
              className="text-xs -mt-0.5 flex py-1 w-full flex-row pl-1"
              href="https://sites.google.com/view/buzonvirtualsistemacic/buz%C3%B3n-virtual-de-sugerencias"
            >
              Buzón virual
            </a>
          </div>
          <hr />
          <div className="flex flex-row px-2 rounded-md align-middle -ml-1 text-gray-800 hover:bg-blue-500 hover:text-white">
            <BiUserCircle size={22} className="mt-4" />
            <a
              className="text-xs flex py-1 w-full flex-row pl-1 "
              href="https://sites.google.com/view/sicic/portal-solo-asesores-inmobiliarios/ubicar-asesores-inmobiliarios-por-zona"
            >
              Buscar Asesores Inmobiliarios por Zona
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default NoneUser;
