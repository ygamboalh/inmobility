import { NavLink } from "react-router-dom";

import Dropdown from "../Dropdown/Dropdown";

const Navbar = () => {
  const inactiveClass =
    "block py-2 pl-3 pr-4 md:p-0 rounded md:bg-transparent text-white";
  const activeClass = "block py-2 pl-3 pr-4 md:p-0 rounded  text-black ";

  return (
    <nav className="bg-white h-[65px] nav-bar z-10 fixed w-screen border-gray-200">
      <div className="max-w-screen-xl flex flex-wrap mt-1.5 items-center justify-between mx-auto p-4">
        <div className="max-[1100px]:mt-3">
          <a href="/" className="flex items-center">
            <div className="logo-admin -mt-1 fixed left-4"></div>
            <span className="fixed left-16 self-center text-2xl text-white font-semibold whitespace-nowrap">
              Sistema CIC
            </span>
          </a>
        </div>
        <div className="flex items-center md:order-2">
          <Dropdown ubicacion={"absolute top-3 right-5"} />
        </div>

        <ul className="flex max-[1100px]:hidden nav-bar flex-col font-medium p-4 md:p-0 mt-4 border rounded-lg md:flex-row md:space-x-8 md:mt-0 md:border-0">
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
            to="/admin/buttons"
            className={({ isActive }) =>
              isActive ? activeClass : inactiveClass
            }
          >
            Botones
          </NavLink>
          <NavLink
            to="/user/verified-adviser"
            className={({ isActive }) =>
              isActive ? activeClass : inactiveClass
            }
          >
            Portal verificados
          </NavLink>
          <NavLink
            to="/admin/links"
            className={({ isActive }) =>
              isActive ? activeClass : inactiveClass
            }
          >
            Enlaces
          </NavLink>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
