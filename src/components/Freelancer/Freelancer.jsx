import React from "react";
import { useNavigate } from "react-router-dom";

const Freelancer = () => {
const navigate = useNavigate();
  return (
    <div className="">
      <button onClick={()=>navigate('/ ')} className="freelancer-button">
      </button>
    </div>
  );
};

export default Freelancer;
