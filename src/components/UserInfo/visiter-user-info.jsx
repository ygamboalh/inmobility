import React, { useState } from "react";
import { useSignOut } from 'react-auth-kit';
import { BiLogOut, BiHomeAlt, BiLockOpenAlt } from "react-icons/bi";
const VisiterUserInfo = () => {
  const signOut = useSignOut();
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
        <div className="absolute mt-2 py-2 w-10 bg-white rounded shadow-lg">
          <a
            href="/home/banner"
            className="block px-2 py-2 text-gray-800 hover:bg-blue-500 hover:text-white"
          >
            <BiHomeAlt size={25}/> 
          </a>
          <a
            href="/auth/change-password"
            className="block px-2 py-2 text-gray-800 hover:bg-blue-500 hover:text-white"
          >
            <BiLockOpenAlt size={25}/> 
          </a>
          <button
            onClick={()=> signOut()}
            className="block px-2 py-2 text-gray-800 hover:bg-blue-500 hover:text-white"
          >
            <BiLogOut size={25}/> 
          </button>
        </div>
      )}
    </div>
      
  );
};

export default VisiterUserInfo;
