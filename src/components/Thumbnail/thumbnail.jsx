import React, { useState } from "react";

import { authUserData } from "../../api/usersApi";
import { useQuery } from "react-query";
import AxiosInstance from "../../api/AxiosInstance";

const Thumbnail = () => {
  const [imageUrl, setImageUrl] = useState(
    "https://siccic.com/backend/uploads/userinfo_dac703068b.png"
  );
  const { data: userData } = useQuery("profile", authUserData);
  const id = userData?.id;
  const user = AxiosInstance.get(`users/${id}?populate=photo`).then((data) => {
    const image = data?.data?.photo?.url;
    const url = `https://siccic.com/backend${image}`;

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
