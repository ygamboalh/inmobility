import React from "react";
import { useNavigate } from "react-router-dom";

const Investor = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col h-screen px-12 div-welcome text-center sm:px-10 md:px-6 justify-center items-center">
      <div className="justify-center items-center mb-4 logo"></div>
      <div className="flex-5 lg:w-96 md:w-96 text-white">
        <label className="mb-4 font-bold text-xl">SISTEMA CIC</label>
      </div>
      <div className="flex-5 lg:my-5 lg:w-96 md:w-96 my-6 text-white">
        <span className="">
          Estamos desarrollando esta sección para inversionistas
        </span>
      </div>
    </div>
  );
};

export default Investor;
