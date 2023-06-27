import { useState } from "react";
import { useQuery } from "react-query";

import { Field, Formik, useFormik } from "formik";
import { getToken } from "../../utils/helpers";
import { authUserData } from "../../api/usersApi";
import * as Yup from "yup";
import axios from "axios";

const LoadImage = () => {
  const { data: userData } = useQuery("profile", authUserData);
  const id = userData?.id;
  const ref = "plugin::users-permissions.user";
  const refid = id;
  const field = "photo";

  const [image, setImage] = useState(null);

  const renameFile = (file) => {
    const renamedFile = new File([file], `u-${userData.id}`, {
      type: file.type,
    });
    return renamedFile;
  };
  const handleChange = (event) => {
    setImage(event.target.files[0]);
  };
  const deleteOldPhoto = async () => {
    const id = `u-${userData.id}`;
    const upload = await axios({
      method: "DELETE",
      url: `https://sistemacic.com/backend/api/upload/files/${id}`,
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    //buscar la imagen de perfil anterior y borrarla
    if (userData.photo != null) {
      deleteOldPhoto();
    }
    const renamedImageFile = renameFile(image);
    const data = new FormData();
    data.append("files", renamedImageFile);
    data.append("ref", ref);
    data.append("refId", refid);
    data.append("field", field);

    const upload = await axios({
      method: "POST",
      url: "https://sistemacic.com/backend/api/upload",
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
      data,
    });
  };

  return (
    <div className="profile-photo flex items-center justify-center">
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col align-middle justify-center">
          <input
            name="files"
            text="files"
            accept=".jpg,.png"
            onChange={handleChange}
            type="file"
            className="mt-4 input-upload"
          />
          <button className="mt-4 text-xl">Actualizar</button>
        </div>
      </form>
    </div>
  );
};

export default LoadImage;
