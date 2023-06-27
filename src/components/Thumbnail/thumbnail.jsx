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
import { API } from "../../constant";

const Thumbnail = () => {
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
    width: "100px",
    height: "100px",
    borderRadius: "100px",
  };

  return (
    <div className="">
      <button className="user-info-button" style={buttonStyle}></button>
    </div>
  );
};

export default Thumbnail;