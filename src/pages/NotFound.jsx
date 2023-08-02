import React from "react";
import { BiError } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <div className="flex justify-center flex-col mx-20">
      <dir className="flex flex-col">
        <div className="flex justify-center">
          <BiError color="red" size={70} />
        </div>
        <div className="flex justify-center mt-4">
          <h5 className="flex text-center">
            El recurso que estás intentando ver no existe
          </h5>
        </div>
      </dir>
      <hr />
      <dir className="flex justify-center mt-4">
        <button
          onClick={() => navigate("/home/banner")}
          className="mt-4 bg-blue-700 text-white rounded-md px-4 py-3"
        >
          Regresar al inicio
        </button>
      </dir>
    </div>
  );
};

export default NotFound;
