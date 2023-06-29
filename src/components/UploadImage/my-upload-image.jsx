import { useState } from "react";
import { useQuery } from "react-query";

import { Field, Formik, useFormik } from "formik";
import { getToken } from "../../utils/helpers";
import { authUserData } from "../../api/usersApi";
import * as Yup from "yup";
import axios from "axios";
import { API } from "../../constant";

const LoadImage = () => {
  const { data: userData } = useQuery("profile", authUserData);
  const id = userData?.id;
  const ref = "plugin::users-permissions.user";
  const refid = id;
  const field = "photo";

  const [image, setImage] = useState(null);

  const handleChange = (event) => {
    setImage(event.target.files[0]);
  };
  const renameFile = (file) => {
    const renamedFile = new File([file], `u-${userData.id}`, {
      type: file.type,
    });
    return renamedFile;
  };
  const deleteOldPhoto = async () => {
    const id = `u-${userData.id}`;
    const upload = await axios({
      method: "DELETE",
      url: `${API}upload/files/${id}`,
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
      url: `${API}upload`,
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
      data,
    });
  };

  return (
    <div className="profile-photo flex -mt-20 items-center justify-center">
      <form onSubmit={handleSubmit}>
        <div class="flex flex-col items-center justify-center w-full">
          <label
            for="dropzone-file"
            className="flex flex-col items-center justify-center w-full h-28 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
          >
            <div className="flex flex-col items-center justify-center my-2  pb-1">
              <svg
                aria-hidden="true"
                class="w-10 h-10 mb-3  text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                ></path>
              </svg>
              <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                <span className="font-semibold">Agregar imagen</span>
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {image ? (
                  <span className="px-6">Imagen seleccionada</span>
                ) : (
                  <span className="font-semibold px-6">
                    No ha seleccionado imagen
                  </span>
                )}
              </p>
            </div>
            <input
              id="dropzone-file"
              type="file"
              className="hidden"
              name="files"
              text="files"
              accept=".jpg,.png"
              onChange={handleChange}
            />
          </label>
          <button className="mt-4 text-xl mr-2 py-2 px-4 rounded bg-green-400 text-white">
            Actualizar
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoadImage;
