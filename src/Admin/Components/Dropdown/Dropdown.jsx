import React, { useState } from "react";
import { BiLogOut, BiUserCircle, BiInfoCircle } from "react-icons/bi";
const Dropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="">
      <button
        onClick={toggleMenu}
        className="user-info-button"
      >
      </button>
      {isOpen && (
        <div className="absolute mt-2 py-2 w-40 bg-white rounded-lg shadow-lg">
          <a
            href="#"
            className="block px-2 py-2 text-gray-800 hover:bg-blue-500 hover:text-white"
          >
            <BiInfoCircle size={25}/> 
          </a>
          <a
            href="/user/profile"
            className="block px-2 py-2 text-gray-800 hover:bg-blue-500 hover:text-white"
          >
            <BiUserCircle size={25}/> 
          </a>
          <a
            href="/user/logout"
            className="block px-2 py-2 text-gray-800 hover:bg-blue-500 hover:text-white"
          >
            <BiLogOut size={25}/> 
          </a>
        </div>
      )}
      <div>
        
      </div>
    </div>
  );
};

export default Dropdown;
