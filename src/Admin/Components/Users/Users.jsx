import { useState } from "react";
import { useNavigate } from "react-router-dom";

import UserListPending from "../UserListPending/user-list-pending";
import UserListDesact from "../UserListDesact/user-list-desact";
import UserListActive from "../UserListActive/user-list-active";
import Navbar from "../NavBar/NavBar";
import MetaData from "../../../components/Metadata/metadata";

const Users = () => {
  const [activeButton, setActiveButton] = useState(1);
  const navigate = useNavigate();
  const handleButtonClick = (buttonNumber) => {
    setActiveButton(buttonNumber);
  };
  return (
    <div>
      <div>
        <Navbar />
      </div>
      <MetaData title="Usuarios" description="Usuarios" />
      <div>
        <hr />
        <div className="mt-24 mx-8 mb-2">
          <div className="inset-y-0 left-0 flex items-center pl-3">
            <div>
              <button
                onClick={() => handleButtonClick(1)}
                type="button"
                className={`mr-2 py-2 px-4 rounded ${
                  activeButton === 1 ? "bg-blue-500 text-white" : "bg-gray-300"
                }`}
              >
                Asesor verificado
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
      </div>
    </div>
  );
};

export default Users;
