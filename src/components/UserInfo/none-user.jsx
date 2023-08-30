import React, { useEffect, useRef, useState } from "react";
import { useSignOut } from "react-auth-kit";
import { BiHomeAlt, BiLogOut, BiUserCheck, BiUserCircle } from "react-icons/bi";
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

  const buttonStyle = {
    backgroundImage: `url("https://backend.siccic.com/uploads/small_userinfo_dac703068b.png")`,
    backgroundSize: "cover",
    width: "40px",
    height: "40px",
  };
  return (
    <div className="">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="h-[45px] w-[45px] absolute top-8 right-8 rounded-full"
        style={buttonStyle}
      ></button>
      {isOpen && (
        <div
          ref={menuRef}
          className="absolute top-20 right-1 z-10 w-[170px] h-fit mt-2 py-2 bg-white rounded-lg shadow-lg"
        >
          <div className="flex flex-row px-2 align-middle py-2 text-gray-800  hover:bg-blue-500 hover:text-white">
            <BiHomeAlt size={22} />
            <a
              className="text-xs flex  py-1 w-full flex-row pl-1 "
              href="/home/banner/visiter"
            >
              Opciones
            </a>
          </div>
          <hr />
          <div className="flex flex-row px-2 align-middle py-2 text-gray-800 hover:bg-blue-500 hover:text-white">
            <SiHomeassistantcommunitystore
              style={{
                fontSize: 18,
              }}
            />
            <a
              className="text-xs flex py-1 w-full flex-row pl-1"
              href="/ventas"
            >
              Ventas
            </a>
          </div>
          <hr />
          <div className="flex flex-row px-2 align-middle py-2 text-gray-800 hover:bg-blue-500 hover:text-white">
            <FaWarehouse
              style={{
                fontSize: 18,
              }}
            />
            <a
              className="text-xs flex  py-1 w-full flex-row pl-1"
              href="/alquiler"
            >
              Alquiler
            </a>
          </div>
          <hr />
          <div className="flex flex-row px-2 align-middle py-2 text-gray-800 hover:bg-blue-500 hover:text-white">
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
