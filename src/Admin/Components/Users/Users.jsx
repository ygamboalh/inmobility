import { useState } from "react";
import { useNavigate } from "react-router-dom";

import UserListPending from "../UserListPending/user-list-pending";
import UserListDesact from "../UserListDesact/user-list-desact";
import UserListActive from "../UserListActive/user-list-active";
import Navbar from "../NavBar/NavBar";
import MetaData from "../../../components/Metadata/metadata";
import UserListFreelancer from "../UserFreelancer/freelancer-user-list";
import UserListInactive from "../UserListInactive/inactive-user-list";

const Users = () => {
  const [activeButton, setActiveButton] = useState(1);
  const navigate = useNavigate();
  const handleButtonClick = (buttonNumber) => {
    setActiveButton(buttonNumber);
  };
  const handleStateChange = (event) => {
    const selectedOption = event.target.value;
    switch (selectedOption) {
      case "Asesores verificados activos":
        handleButtonClick(1);
        break;
      case "Solicitantes":
        handleButtonClick(2);
        break;
      case "Supervisores":
        handleButtonClick(3);
        break;
      case "Freelancers":
        handleButtonClick(4);
        break;
      case "Asesores verificados inactivos":
        handleButtonClick(5);
        break;
      default:
        break;
    }
  };
  return (
    <div>
      <div>
        <Navbar />
      </div>
      <MetaData title="Usuarios" description="Usuarios" />
      <div>
        <hr />
        <div className="mt-20 mx-4 mb-2 flex justify-center">
          <div className="min-[1200px]:hidden flex justify-center">
            <select
              name="state"
              onChange={handleStateChange}
              className="w-80 rounded-md border text-gray-500 border-gray-300"
              id=""
            >
              <option className="" value="">
                Seleccione una opción
              </option>
              <option className="" value="Asesores verificados activos">
                Asesores verificados activos
              </option>
              <option className="" value="Asesores verificados inactivos">
                Asesores verificados inactivos
              </option>
              <option className="" value="Solicitantes">
                Solicitantes
              </option>
              <option className="" value="Supervisores">
                Supervisores
              </option>
              <option className="" value="Freelancer">
                Freelancer
              </option>
            </select>
          </div>
          <div className="inset-y-0 max-[1200px]:hidden left-0 flex justify-center items-center pl-3">
            <div>
              <button
                onClick={() => handleButtonClick(1)}
                type="button"
                className={`mr-2 py-2 px-4 rounded ${
                  activeButton === 1 ? "bg-blue-500 text-white" : "bg-gray-300"
                }`}
              >
                Asesores verificados activos
              </button>
            </div>
            <div>
              <button
                onClick={() => handleButtonClick(5)}
                type="button"
                className={`mr-2 py-2 px-4 rounded ${
                  activeButton === 5 ? "bg-blue-500 text-white" : "bg-gray-300"
                }`}
              >
                Asesores verificados inactivos
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
                Solicitantes
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
                Supervisores
              </button>
            </div>
            <div>
              <button
                onClick={() => handleButtonClick(4)}
                type="button"
                className={`mr-2 py-2 px-4 rounded ${
                  activeButton === 4 ? "bg-blue-500 text-white" : "bg-gray-300"
                }`}
              >
                Freelancers
              </button>
            </div>
            <div className="ml-auto">
              <button
                onClick={() => navigate("/admin/users/insert-user")}
                type="button"
                className="mr-2 py-2 px-4 rounded bg-green-400 text-white"
              >
                Crear Usuario
              </button>
            </div>
          </div>
        </div>
        {activeButton === 1 && <UserListActive />}
        {activeButton === 2 && <UserListPending />}
        {activeButton === 3 && <UserListDesact />}
        {activeButton === 4 && <UserListFreelancer />}
        {activeButton === 5 && <UserListInactive />}
      </div>
    </div>
  );
};

export default Users;
