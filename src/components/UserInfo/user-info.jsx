import React, { useState } from "react";
import { useSignOut } from 'react-auth-kit';
import { BiLogOut, BiUserCircle, BiInfoCircle } from "react-icons/bi";
const UserInfo = () => {
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
            href="/user/verified-adviser"
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

export default UserInfo;