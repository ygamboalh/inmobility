import { useQuery } from "react-query";
import LoadPropertyImage from "./my-upload-property";
import { authUserData } from "../../api/usersApi";
import { useNavigate } from "react-router-dom";

const Upload = () => {
  const { data: userData } = useQuery("profile", authUserData);
  const userId = userData?.id;
  const navigate = useNavigate();
  return (
    <div className="flex flex-col  justify-center align-middle items-center mt-24">
      <div className="mb-24">
        <button
          type="button"
          className="text-l mr-2 py-2 px-4 rounded bg-blue-700 text-white"
          onClick={() => navigate("/home/banner")}
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
