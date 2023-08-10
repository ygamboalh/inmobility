import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "../NavBar/NavBar";
import PropertyListActive from "../PropertyListActive/property-list-active";
import PropertyListPending from "../PropertyListPending/property-list-pending";
import PropertyListDesact from "../PropertyListDesact/property-list-desact";
import MetaData from "../../../components/Metadata/metadata";

const Properties = () => {
  const navigate = useNavigate();
  const [activeButton, setActiveButton] = useState(1);
  const handleButtonClick = (buttonNumber) => {
    setActiveButton(buttonNumber);
  };

  return (
    <>
      <div>
        <Navbar />
      </div>
      <MetaData title="Propiedades" description="Propiedades" />
      <div>
        <hr />
        <div className="mt-24 mx-8 mb-2">
          <div className="inset-y-0 left-0 flex justify-between items-center pl-3">
            <div>
              <button
                onClick={() => handleButtonClick(1)}
                type="button"
                className={`mr-2 py-2 px-4 rounded ${
                  activeButton === 1 ? "bg-blue-500 text-white" : "bg-gray-300"
                }`}
              >
                Activas
              </button>
            </div>
            <div>
              <button
                onClick={() => handleButtonClick(2)}
                type="button"
                className={`mr-2 py-2 px-4 rounded ${
                  activeButton === 2 ? "bg-blue-500 text-white" : "bg-gray-300"
                }`}
              >
                Por activar
              </button>
            </div>
            <div>
              <button
                onClick={() => handleButtonClick(3)}
                type="button"
                className={`mr-2 py-2 px-4 rounded ${
                  activeButton === 3 ? "bg-blue-500 text-white" : "bg-gray-300"
                }`}
              >
                Inactivas
              </button>
            </div>
            <div className="ml-auto">
              <button
                onClick={() => navigate("/admin/properties/insert-property")}
                type="button"
                className="mr-2 py-2 px-4 rounded bg-green-400 text-white"
              >
                Crear Inmueble
              </button>
            </div>
          </div>
        </div>
        {activeButton === 1 && <PropertyListActive />}
        {activeButton === 2 && <PropertyListPending />}
        {activeButton === 3 && <PropertyListDesact />}
      </div>
    </>
  );
};

export default Properties;
