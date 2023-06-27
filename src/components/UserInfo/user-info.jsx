import React, { useState } from "react";

import { useSignOut } from "react-auth-kit";
import {
  BiLogOut,
  BiHomeAlt,
  BiLockOpenAlt,
  BiUserCircle,
  BiUserCheck,
} from "react-icons/bi";
import { authUserData } from "../../api/usersApi";
import { useQuery } from "react-query";
import AxiosInstance from "../../api/AxiosInstance";

const UserInfo = () => {
  const signOut = useSignOut();
  const [isOpen, setIsOpen] = useState(false);
  const [imageUrl, setImageUrl] = useState(
    "https://sistemacic.com/backend/uploads/small_userinfo_dac703068b.png"
  );
  const { data: userData } = useQuery("profile", authUserData);
  const id = userData?.id;
  const user = AxiosInstance.get(`users/${id}?populate=photo`).then((data) => {
    const image = data?.data?.photo?.url;
    const url = `https://sistemacic.com/backend${image}`;

    setImageUrl(url);
  });

  const buttonStyle = {
    backgroundImage: `url("${imageUrl}")`,
    backgroundSize: "cover",
    width: "40px",
    height: "40px",
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="">
      <button
        onClick={toggleMenu}
        className="user-info-button"
        style={buttonStyle}
      ></button>
      {isOpen && (
        <div className="absolute mt-2 py-2 w-10 bg-white rounded shadow-lg">
          <a
            href="/user/verified-adviser"
            className="block px-2 py-2 text-gray-800 hover:bg-blue-500 hover:text-white"
          >
            <BiUserCheck size={25} />
          </a>
          <a
            href="/home/banner"
            className="block px-2 py-2 text-gray-800 hover:bg-blue-500 hover:text-white"
          >
            <BiHomeAlt size={25} />
          </a>
          <a
            href="/user/profile"
            className="block px-2 py-2 text-gray-800 hover:bg-blue-500 hover:text-white"
          >
            <BiUserCircle size={25} />
          </a>
          <a
            href="/auth/change-password"
            className="block px-2 py-2 text-gray-800 hover:bg-blue-500 hover:text-white"
          >
            <BiLockOpenAlt size={25} />
          </a>
          <button
            onClick={() => signOut()}
            className="block px-2 py-2 text-gray-800 hover:bg-blue-500 hover:text-white"
          >
            <BiLogOut size={25} />
          </button>
        </div>
      )}
    </div>
  );
};

export default UserInfo;
