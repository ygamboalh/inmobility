import { useState } from "react";
import { NavLink } from "react-router-dom";

import Dropdown from "../Dropdown/Dropdown";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const inactiveClass =
    "block py-2 pl-3 pr-4 md:p-0 rounded md:bg-transparent text-white";
  const activeClass = "block py-2 pl-3 pr-4 md:p-0 rounded  text-black ";

  return (
    <nav className="bg-white nav-bar z-10 fixed w-screen border-gray-200 dark:bg-gray-900">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a href="/" className="flex items-center">
          <div className="logo-admin"></div>
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            Sistema CIC
          </span>
        </a>
        <div className="flex items-center md:order-2">
          <Dropdown />
          <button
            onClick={toggleMenu}
            data-collapse-toggle="mobile-menu-2"
            type="button"
            className="inline-flex items-center hidden p-2 ml-1 text-sm text-gray-500 rounded-lg  hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="mobile-menu-2"
            aria-expanded="false"
          >
            <span className="sr-only">Abril el menú</span>
            <svg
              className="w-6 h-6"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"></path>
            </svg>
          </button>
        </div>
        <div
          className="items-center justify-between w-full md:flex md:w-auto md:order-1"
          id="mobile-menu-2"
        >
          <ul className="flex nav-bar flex-col font-medium p-4 md:p-0 mt-4 border rounded-lg md:flex-row md:space-x-8 md:mt-0 md:border-0">
            <NavLink
              to="/admin/properties"
              className={({ isActive }) =>
                isActive ? activeClass : inactiveClass
              }
            >
              Inmuebles
            </NavLink>
            <NavLink
              to="/admin/users"
              className={({ isActive }) =>
                isActive ? activeClass : inactiveClass
              }
            >
              Usuarios
            </NavLink>
            <NavLink
              to="/admin/links"
              className={({ isActive }) =>
                isActive ? activeClass : inactiveClass
              }
            >
              Enlaces de interés
            </NavLink>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
