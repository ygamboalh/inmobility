import { useState } from "react";
import { useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";

import axios from "axios";
import { message } from "antd";

import { getToken } from "../../utils/helpers";
import { authUserData } from "../../api/usersApi";

import { API } from "../../constant";
import MySpinner from "../Spinner/spinner";
import MetaData from "../Metadata/metadata";

const LoadPropertyImage = ({ creadoPor }) => {
  const id = useParams();
  const ref = "api::property.property";
  const refid = id.id;
  const field = "photos";
  const fieldAudio = "audio";
  const fieldVideo = "video";

  const [image, setImage] = useState(null);
  const [audio, setAudio] = useState(null);
  const [video, setVideo] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const { data: userData } = useQuery("profile", authUserData);
  const userId = userData?.id;
  const handleChange = (event) => {
    setImage(event.target.files);
  };
  const handleChangeAudio = (event) => {
    setAudio(event.target.files);
  };
  const handleChangeVideo = (event) => {
    setVideo(event.target.files);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    const data = new FormData();
    if (image?.length <= 25) {
      for (let i = 0; i < image.length; i++) {
        data.append("files", image[i]);
      }
    } else if (image?.length === 0) {
      message.error("¡No ha seleccionado ninguna imagen!");
      return;
    } else {
      message.error("¡Sólo puede seleccionar hasta 25 imágenes!");
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
  const handleSubmitAudio = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    const data = new FormData();

    data.append("ref", ref);
    data.append("refId", refid);
    data.append("field", fieldAudio);
    data.append("files", audio[0]);

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
          message.success("¡El archivo de audio se cargó correctamente!");
        })
        .catch((err) => {
          message.error(
            "¡Ocurrió un error cargando el archivo de audio. Vuelva a intentarlo!"
          );
        })

        .finally(() => setIsLoading(false));
    } else {
      setIsLoading(false);
      message.error("¡Ocurrió un error cargando el archivo de audio!");
    }
  };

  const handleSubmitVideo = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    const data = new FormData();

    data.append("ref", ref);
    data.append("refId", refid);
    data.append("field", fieldVideo);
    data.append("files", video[0]);

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
          message.success("¡El archivo de video se cargó correctamente!");
        })
        .catch((err) => {
          message.error(
            "¡Ocurrió un error cargando el archivo de video. Vuelva a intentarlo!"
          );
        })

        .finally(() => setIsLoading(false));
    } else {
      setIsLoading(false);
      message.error("¡Ocurrió un error cargando el archivo de video!");
    }
  };
  if (isLoading) {
    return <MySpinner />;
  }

  return (
    <div className="profile-photo flex -mt-20 items-center justify-center">
      <MetaData title="Cargar datos" description="Cargar datos" />
      <div className="flex flex-col w-full mx-4">
        <div className="border shadow border-gray-300 rounded-md p-2">
          <form onSubmit={handleSubmit}>
            <label className="flex justify-center text-center">
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
                    <span className="font-semibold text-blue-600">
                      Presionar aquí para agregar imágenes
                    </span>
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {image?.length === 0 || !image ? (
                      <span className="px-6">
                        No hay imágenes seleccionadas
                      </span>
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
              <button
                className={
                  image?.length > 0
                    ? "mt-4 flex justify-center text-center text-l mb-2 mr-2 py-2 px-4 rounded bg-green-400 text-white"
                    : "hidden"
                }
              >
                Presione aquí para subir las imágenes
              </button>
            </div>
          </form>
        </div>
        <div className="border shadow border-gray-300 rounded-md mt-4 p-2">
          <form onSubmit={handleSubmitAudio}>
            <label className="flex justify-center text-center">
              Seleccione un archivo audio para la propiedad: {id?.id}
            </label>
            <div className="flex flex-col items-center justify-center w-full ">
              <label
                for="dropzone-file-audio"
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
                  <p className="mb-2 text-sm text-gray-500 ">
                    <span className="font-semibold flex justify-center text-center text-blue-600">
                      Presione aquí para agregar un archivo de audio
                    </span>
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {audio?.length === 0 || !audio ? (
                      <span className="px-6">No hay audio seleccionado</span>
                    ) : (
                      <span className="font-semibold px-6">
                        Ya seleccionó un audio:{" "}
                        <span className="truncate">{`${audio[0]?.name}`}</span>
                      </span>
                    )}
                  </p>
                </div>
                <input
                  id="dropzone-file-audio"
                  type="file"
                  className="hidden"
                  name="filesAudio"
                  //text="files"
                  accept=".mp3,.wav,.ogg"
                  onChange={handleChangeAudio}
                />
              </label>
              <button
                className={
                  audio?.length > 0
                    ? "mt-4 text-l mb-2 justify-center text-center mr-2 py-2 px-4 rounded bg-green-400 text-white"
                    : "hidden"
                }
              >
                Presione aquí para subir el archivo de audio
              </button>
            </div>
          </form>
        </div>
        <div className="border shadow border-gray-300 rounded-md mt-4 p-2">
          <form onSubmit={handleSubmitVideo}>
            <label className="flex justify-center text-center">
              Seleccione un archivo video para la propiedad: {id?.id}
            </label>
            <div className="flex flex-col items-center justify-center w-full ">
              <label
                for="dropzone-file-video"
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
                  <p className="mb-2 text-sm text-blue-600 ">
                    <span className="font-semibold flex justify-center text-center">
                      Presione aquí para agregar archivo de video
                    </span>
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {video?.length === 0 || !video ? (
                      <span className="px-6">No hay video seleccionado</span>
                    ) : (
                      <span className="font-semibold px-6">
                        Ya seleccionó un video:{" "}
                        <span className="truncate">{`${video[0]?.name}`}</span>
                      </span>
                    )}
                  </p>
                </div>
                <input
                  id="dropzone-file-video"
                  type="file"
                  className="hidden"
                  name="filesVideo"
                  //text="files"
                  accept=".mp4,.mkv,.mpg"
                  onChange={handleChangeVideo}
                />
              </label>
              <button
                className={
                  video?.length > 0
                    ? "mt-4 text-l mr-2 py-2 justify-center flex text-center px-4 rounded bg-green-400 text-white"
                    : "hidden"
                }
              >
                Presione aquí para subir el archivo de video
              </button>
            </div>
          </form>
        </div>
      </div>
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
