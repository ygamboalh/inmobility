import { useState } from "react";
import { useQuery } from "react-query";

import { Field, Formik, useFormik } from "formik";
import { getToken } from "../../utils/helpers";
import { authUserData } from "../../api/usersApi";
import * as Yup from "yup";
import axios from "axios";
import { API } from "../../constant";
import MySpinner from "../../components/Spinner/spinner";
import { Spin, message } from "antd";

const PropertyLoadImage = () => {
  const [images, setImages] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (event) => {
    setImages(event.target.files[0]);
  };
  const ref = "api::property.property";
  const refid = 154;
  const field = "photos";

  const renameFile = (files) => {
    const renamedFiles = [];
    console.log(images);
    const arrayLike = images;
    const imagesArray = Array.from(arrayLike);
    imagesArray.forEach((file, index) => {
      const renamedFile = new File([file], `p-${"nombre"}_${index + 1}`, {
        type: file.type,
      });

      renamedFiles.push(renamedFile);
    });
    return renamedFiles;
  };

  const handleSubmit = async (event) => {
    setIsLoading(true);
    event.preventDefault();
    //const renamedImageFile = renameFile(images);
    const data = new FormData();
    /* for (let i = 0; i < images.length; i++) {
      data.append(`images[${i}]`, images[i]);
    } */
    data.append("files", images);
    data.append("ref", ref);
    data.append("refId", refid);
    data.append("field", field);
    console.log(images);
    console.log("data", data);
    const upload = await axios({
      method: "POST",
      url: `${API}upload`,
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
      data,
    })
      .then(message.success("¡La imagen se envió correctamente!"))
      .catch((error) => {
        message.error("¡No se pudo enviar la imagen. Intente de nuevo!");
      });
    setIsLoading(false);
  };

  return (
    <div className="profile-photo flex items-center justify-center">
      <form onSubmit={handleSubmit}>
        <div class="flex flex-col items-center justify-center w-full">
          <label
            for="dropzone-file"
            className="flex flex-col items-center justify-center w-full h-24 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
          >
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <svg
                aria-hidden="true"
                class="w-10 h-10 mb-3 text-gray-400"
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
                {images?.length === 0 || !images ? (
                  <span className="px-6">No hay imágenes</span>
                ) : (
                  <span className="font-semibold px-6">{`${images?.length} imágenes seleccionadas`}</span>
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
              /* multiple */
            />
          </label>
          <button className="mt-4 text-l mr-2 py-2 px-4 rounded bg-green-400 text-white">
            Subir imágenes{isLoading && <Spin color="white" size="medium" />}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PropertyLoadImage;
