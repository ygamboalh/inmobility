import React, { useEffect, useState } from "react";
import { useSignOut } from "react-auth-kit";
import { BiLogOut } from "react-icons/bi";

const NoneUser = () => {
  const signOut = useSignOut();
  const [isOpen, setIsOpen] = useState(false);
  console.log("llegando....");
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  const buttonStyle = {
    backgroundImage: `url("https://backend.siccic.com/uploads/small_userinfo_dac703068b.png")`,
    backgroundSize: "cover",
    width: "40px",
    height: "40px",
  };
  return (
    <div className="">
      <button
        onClick={toggleMenu}
        className="h-[45px] w-[45px] absolute top-8 right-8 rounded-full"
        style={buttonStyle}
      ></button>
      {isOpen && (
        <div className="absolute top-20 right-1 z-10 w-[170px] h-fit mt-2 py-2 bg-white rounded-lg shadow-lg">
          <div className="flex flex-row px-2 align-middle py-2 text-gray-800 hover:bg-blue-500 hover:text-white">
            <a className="text-xs flex flex-row pt-1 pl-1" href="/home/banner">
              Opciones
            </a>
          </div>
          <div className="flex flex-row px-2 align-middle py-2 text-gray-800 hover:bg-blue-500 hover:text-white">
            <a className="text-xs flex flex-row pt-1 pl-1" href="/ventas">
              Ventas
            </a>
          </div>
          <div className="flex flex-row px-2 align-middle py-2 text-gray-800 hover:bg-blue-500 hover:text-white">
            <a className="text-xs flex flex-row pt-1 pl-1" href="/alquier">
              Alquiler
            </a>
          </div>
          <div className="flex flex-row px-2 align-middle py-2 text-gray-800 hover:bg-blue-500 hover:text-white">
            <a
              className="text-xs flex flex-row pt-1 pl-1"
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
