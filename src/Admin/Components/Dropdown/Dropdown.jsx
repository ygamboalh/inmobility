import React, { useState } from "react";
import { useSignOut } from "react-auth-kit";
import {
  BiLogOut,
  BiHomeAlt,
  BiLockOpenAlt,
  BiUserCircle,
  BiWrench,
} from "react-icons/bi";

const Dropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const signOut = useSignOut();
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="">
      <button onClick={toggleMenu} className="user-info-button"></button>
      {isOpen && (
        <div className="absolute mt-2 py-2 w-40 bg-white rounded-lg shadow-lg">
          <div className="flex flex-row px-2 align-middle py-2 text-gray-800 hover:bg-blue-500 hover:text-white">
            <BiWrench size={20} />
            <a
              className="text-xs flex flex-row pt-1 pl-1"
              href="/admin/properties"
            >
              Administrar
            </a>
          </div>
          <div className="flex flex-row px-2 align-middle py-2 text-gray-800 hover:bg-blue-500 hover:text-white">
            <BiHomeAlt size={20} />
            <a className="text-xs flex flex-row pt-1 pl-1" href="/home/banner">
              Opciones
            </a>
          </div>
          <div className="flex flex-row px-2 align-middle py-2 text-gray-800 hover:bg-blue-500 hover:text-white">
            <BiUserCircle size={20} />
            <a className="text-xs flex flex-row pt-1 pl-1" href="/user/profile">
              Perfil
            </a>
          </div>
          <div className="flex flex-row px-2 align-middle py-2 text-gray-800 hover:bg-blue-500 hover:text-white">
            <BiLockOpenAlt size={20} />
            <a
              className="text-xs flex flex-row pt-1 pl-1"
              href="/auth/change-password"
            >
              Cambiar clave
            </a>
          </div>
          <div className="px-2 py-2 text-gray-800 hover:bg-blue-500 hover:text-white">
            <button onClick={() => signOut()} className="text-xs flex flex-row">
              <BiLogOut size={20} />{" "}
              <label className="pt-0.5 pl-0.5">Salir</label>
            </button>
          </div>
        </div>
      )}
      <div></div>
    </div>
  );
};

export default Dropdown;
