import { useQuery } from "react-query";
import LoadPropertyImage from "./my-upload-property";
import { authUserData } from "../../api/usersApi";

const Upload = () => {
  const { data: userData } = useQuery("profile", authUserData);
  const userId = userData?.id;
  return (
    <div className="flex justify-center align-middle items-center pt-48">
      <LoadPropertyImage creadoPor={userId} />
    </div>
  );
};

export default Upload;
