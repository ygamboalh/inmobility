import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";

import LoadPropertyImage from "./my-upload-property";
import { authUserData } from "../../api/usersApi";
import MetaData from "../Metadata/metadata";

const Upload = () => {
  const { data: userData } = useQuery("profile", authUserData);
  const userId = userData?.id;
  const navigate = useNavigate();
  const Navigate = () => {
    userData?.active === "Super Administrador" ||
    userData?.active === "Supervisor"
      ? navigate("/admin/properties")
      : navigate("/home/banner");
  };
  return (
    <div className="flex flex-col  justify-center align-middle items-center">
      <MetaData title="Cargar imagen" description="Cargar imagen" />
      <div className="mb-24 mt-32">
        <button
          type="button"
          className="text-l mr-2 py-2 px-4 rounded bg-blue-700 text-white"
          onClick={() => Navigate()}
        >
          Volver
        </button>
      </div>
      <div>
        <LoadPropertyImage creadoPor={userId} />
      </div>
    </div>
  );
};

export default Upload;
