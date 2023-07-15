import { useState } from "react";
import { useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";

import axios from "axios";
import { message } from "antd";

import { getToken } from "../../utils/helpers";
import { authUserData } from "../../api/usersApi";

import { API, BEARER } from "../../constant";
import MySpinner from "../Spinner/spinner";

const LoadPropertyImage = ({ creadoPor }) => {
  const id = useParams();
  const ref = "api::property.property";
  const refid = id.id;
  const field = "photos";

  const [image, setImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [userRole, setUserRole] = useState();
  const navigate = useNavigate();
  const { data: userData } = useQuery("profile", authUserData);
  const userId = userData?.id;
  const response = axios(`${API}/users/me?populate=role`, {
    method: "GET",
    headers: { Authorization: `${BEARER} ${getToken()}` },
  }).then((response) => {
    setUserRole(response.data.role.name);
  });
  const handleChange = (event) => {
    setImage(event.target.files);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    const data = new FormData();
    if (image.length <= 25) {
      for (let i = 0; i < image.length; i++) {
        data.append("files", image[i]);
      }
    } else {
      message.error("¡Sólo puede seleccionar hasta 10 imágenes!");
      return;
    }
    data.append("ref", ref);
    data.append("refId", refid);
    data.append("field", field);

    //Aqui verifico que el id del usuario logueado sea el mismo del usuario que creo la propiedad
    if (userId === creadoPor) {
      const upload = await axios({
        method: "POST",
        url: `${API}upload`,
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
        data,
      })
        .then((response) => {
          message.success("¡Las imágenes fueron cargadas correctamente!");

          if (userRole === "SuperAdmin") {
            navigate("/admin/properties");
          } else {
            navigate("/home/banner");
          }
        })
        .catch((err) =>
          message.error(
            "¡Ocurrió un error cargando las imágenes. Vuelva a intentarlo!"
          )
        )
        .finally(() => setIsLoading(false));
    } else {
      setIsLoading(false);
      message.error("¡Ocurrió un error cargando las imágenes!");
    }
  };
  if (isLoading) {
    return <MySpinner />;
  }
  return (
    <div className="profile-photo flex -mt-20 items-center justify-center">
      <form onSubmit={handleSubmit}>
        <label className="flex">
          Seleccione las imágenes para la propiedad: {id?.id}
        </label>
        <div className="flex flex-col items-center justify-center w-full ">
          <label
            for="dropzone-file"
            className="flex flex-col items-center justify-center w-full h-28 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
          >
            <div className="flex flex-col items-center justify-center my-2  pb-1">
              <svg
                aria-hidden="true"
                className="w-10 h-10 mb-3  text-gray-400"
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
                {image?.length === 0 || !image ? (
                  <span className="px-6">No hay imágenes</span>
                ) : (
                  <span className="font-semibold px-6">
                    Ya seleccionó imágenes: {`${image?.length}`}
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
              multiple
            />
          </label>
          <button className="mt-4 text-l mr-2 py-2 px-4 rounded bg-green-400 text-white">
            Subir las imágenes
          </button>
        </div>
      </form>
      <div>
        {/* <div>
          {image?.map((imageUrl, index) => (
            <img key={index} src={imageUrl} alt={`Preview ${index}`} />
          ))}
        </div> */}
      </div>
    </div>
  );
};

export default LoadPropertyImage;
