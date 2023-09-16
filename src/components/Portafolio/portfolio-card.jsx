import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";

import {
  BiArea,
  BiBath,
  BiCar,
  BiChair,
  BiChild,
  BiConfused,
  BiDislike,
  BiEraser,
  BiHotel,
  BiLike,
  BiSolidDog,
} from "react-icons/bi";
import { message } from "antd";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import AudioPlayer from "../AudioPlayer/audio-player";

import AxiosInstance from "../../api/AxiosInstance";
import { API } from "../../constant";
import MySpinner from "../Spinner/spinner";
import no_image from "../../assets/images/no_image_default.jpg";
import MyNewCarousel from "../Carrusel/carrusel";
import Share from "../Share/share";
import { authUserData } from "../../api/usersApi";
import MetaData from "../Metadata/metadata";
import ShareAdviser from "../Share/share-adviser";
import Map from "../Map/map";

const PortafolioCard = ({ propiedad }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [likeColor, setLikeColor] = useState("#3F83F8");
  const [dislikeColor, setDislikeColor] = useState("#3F83F8");
  const [confusedColor, setConfusedColor] = useState("#3F83F8");
  const [reaction, setReaction] = useState([]);
  const [adviser, setAdviser] = useState();
  const [audio, setAudio] = useState(null);
  const { data: userData } = useQuery("profile", authUserData);

  const adviserId = propiedad?.portafolio?.attributes.creadoPor;
  const propertyId = propiedad.property;

  useEffect(() => {
    getProperty();
    getAdviser(adviserId);
  }, []);
  const getAdviser = async (id) => {
    const response = await AxiosInstance.get(`${API}users/${id}`)
      .then((response) => {
        const adviser = response.data;
        setAdviser(adviser);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleLikeClick = () => {
    reaction[0] === "Me Gusta, deseo verlo"
      ? setReaction([null, propertyId])
      : setReaction(["Me Gusta, deseo verlo", propertyId]);
    likeColor === "#F81C3F" ? setLikeColor("#3F83F8") : setLikeColor("#F81C3F");
    setDislikeColor("#3F83F8");
    setConfusedColor("#3F83F8");
    reaction[0] === "Me Gusta, deseo verlo"
      ? updatePortfolio([null, propertyId])
      : updatePortfolio(["Me Gusta, deseo verlo", propertyId]);
  };

  const handleDislikeClick = () => {
    reaction[0] === "No es lo que busco"
      ? setReaction([null, propertyId])
      : setReaction(["No es lo que busco", propertyId]);
    dislikeColor === "#F81C3F"
      ? setDislikeColor("#3F83F8")
      : setDislikeColor("#F81C3F");
    setLikeColor("#3F83F8");
    setConfusedColor("#3F83F8");
    reaction[0] === "No es lo que busco"
      ? updatePortfolio([null, propertyId])
      : updatePortfolio(["No es lo que busco", propertyId]);
  };
  const handleConfusedClick = () => {
    reaction[0] === "Indeciso(a)"
      ? setReaction([null, propertyId])
      : setReaction(["Indeciso(a)", propertyId]);
    confusedColor === "#F81C3F"
      ? setConfusedColor("#3F83F8")
      : setConfusedColor("#F81C3F");
    setLikeColor("#3F83F8");
    setDislikeColor("#3F83F8");
    reaction[0] === "Indeciso(a)"
      ? updatePortfolio([null, propertyId])
      : updatePortfolio(["Indeciso(a)", propertyId]);
  };

  const [property, setProperty] = useState();
  const [images, setImages] = useState([]);
  const [pdfUrl, setPdfUrl] = useState();
  const [address, setAddress] = useState();

  const getProperty = async () => {
    setIsLoading(true);
    let propertyFound = null;
    let imagesCount = [];
    const propertyResponse = await AxiosInstance.get(
      `${API}properties/${propertyId}?populate=*`
    ).then((response) => {
      propertyFound = response.data.data.attributes;
      imagesCount = response.data.data.attributes.photos;
      const id = response.data.data.id;
      setPdfUrl(
        `https://sistemacic.com/home/shared-property/${propertyFound?.uniqueId}`
      );
      propertyFound?.tomadaExclusividad
        ? setAddress(propertyFound.ubicacionDetallada)
        : setAddress(propertyFound.ubicacionCercana);
    });

    setProperty(propertyFound);

    setIsLoading(false);
    const imagesUrl = [];
    imagesCount?.data?.forEach((image) => {
      imagesUrl.push(image.attributes.url);
    });
    setImages(imagesUrl);
    const audio = propertyFound.audio?.data?.attributes?.url;
    setAudio(`https://backend.sistemacic.com${audio}`);
  };

  const updatePortfolio = (reaction) => {
    setIsLoading(true);

    const values = {
      reaccion: reaction[0],
    };
    const response = AxiosInstance.put(`${API}properties/${propertyId}`, {
      data: { reaccion: reaction[0] },
    })
      .then((response) => {
        message.success("La respuesta fue enviada correctamente");
      })
      .catch((error) => {
        message.error("No se pudo enviar la respuesta");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  const removeProperty = () => {
    setIsLoading(true);
    const portfolioId = propiedad.portafolio.id;
    const properties = propiedad.portafolio.attributes.properties.data;
    let propiedades = [];
    properties.map((property) => {
      if (property.id !== propertyId) {
        propiedades.push(property.id);
      }
    });

    const MySwal = withReactContent(Swal);
    MySwal.fire({
      title: "¿Desea eliminar el inmueble del portafolio?",
      showDenyButton: true,
      confirmButtonText: "Sí, eliminar",
      confirmButtonColor: "#1863e4",
      denyButtonText: `No`,
    }).then((result) => {
      if (result.isConfirmed) {
        setIsLoading(true);
        const response = AxiosInstance.put(`${API}portafolios/${portfolioId}`, {
          data: { properties: propiedades },
        })
          .then((response) => {
            message.success("El inmueble fue eliminado del portafolio");

            window.location.reload();
          })
          .catch((err) => {
            message.error("El inmueble no fue eliminado. Intente nuevamente");
          })
          .finally(setIsLoading(false));
      }
    });

    setIsLoading(false);
  };
  const formatNumber = (number) => {
    return new Intl.NumberFormat("es-ES", {
      style: "decimal",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(number);
  };
  if (isLoading || !property) {
    return <MySpinner />;
  }

  return (
    <section className="pt-16 -mb-4">
      <MetaData
        title="Detalles de la propiedad"
        content="Detalles de la propiedad"
      />
      <div className="container mx-auto pt-4 pb-2 bg-gray-200 rounded-xl">
        <div className="text-[14px] w-full font-semibold flex flex-row">
          <div>{property.categories.data[0].attributes.nombre}</div>
        </div>
        <div className="flex flex-col lg:flex-row">
          <div className="flex">
            <div>
              <h2 className="text-2xl max-[500px]:text-xl font-semibold">
                {property.tipoPropiedad}
              </h2>
              <h3 className="text-lg max-[500px]:text-sm mb-4">
                {property.provincia +
                  " - " +
                  property.canton +
                  " - " +
                  property.distrito}
              </h3>
              <div></div>
            </div>
            <div className="pl-12 flex self-center align-middle">
              <div
                className={
                  !property?.avaluo
                    ? "hidden"
                    : "flex flex-col justify-center px-1 text-xl font-semibold text-blue-600"
                }
              >
                <span className="text-xs text-black truncate">
                  Valor según avalúo
                </span>
                <span className="text-lg">
                  {property.avaluoMoneda}
                  {formatNumber(property.avaluo)}
                </span>
                {property.avaluoMoneda === "$" ? (
                  <span className="text-[9px] truncate -my-2 text-black">
                    Dólares americanos
                  </span>
                ) : (
                  <span className="text-[9px] -my-2 truncate text-black">
                    Colones costarricences
                  </span>
                )}
              </div>
            </div>
          </div>
          <div className="flex gap-x-2 max-[500px]:flex-col">
            <div className="flex flex-col justify-center border-l-2 max-[500px]:border-l-0 max-[500px]:border-r-0 border-r-2 px-1 text-xl font-semibold text-blue-600">
              <span className="text-xs text-black truncate">
                Precio de venta
              </span>
              <span className="text-lg">
                {property.moneda}
                {formatNumber(property.precio)}
              </span>

              {property.moneda === "$" ? (
                <span className="text-[9px] truncate -my-2 text-black">
                  Dólares americanos
                </span>
              ) : (
                <span className="text-[9px] truncate -my-2 text-black">
                  Colones costarricences
                </span>
              )}
            </div>

            <div
              className={
                !property.precioAlquiler
                  ? "hidden"
                  : "flex flex-col justify-center border-r-2 max-[500px]:border-r-0 px-1 text-xl font-semibold text-blue-600"
              }
            >
              <span className="text-xs text-black truncate">
                Precio alquiler
              </span>
              <span className="text-lg">
                {property.monedaAlquiler}
                {formatNumber(property.precioAlquiler)}
              </span>
              {property.monedaAlquiler === "$" ? (
                <span className="text-[9px] truncate -my-2 text-black">
                  Dólares americanos
                </span>
              ) : (
                <span className="text-[9px] truncate -my-2 text-black">
                  Colones costarricences
                </span>
              )}
            </div>
            <div
              className={
                !property.precioAlquilerCompra
                  ? "hidden"
                  : "flex flex-col justify-center border-r-2 max-[500px]:border-r-0 px-1 text-xl font-semibold text-blue-600"
              }
            >
              <span className="text-xs text-black">
                Precio alquiler con opción de venta
              </span>
              <span className="text-lg">
                {property.monedaAlquilerVenta}
                {formatNumber(property.precioAlquilerCompra)}
              </span>
              {property.monedaAlquiler === "$" ? (
                <span className="text-[9px] truncate -my-2 text-black">
                  Dólares americanos
                </span>
              ) : (
                <span className="text-[9px] truncate -my-2 text-black">
                  Colones costarricences
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="text-xl font-semibold text-blue-600">
          {property.uniqueId}
        </div>
        <div className="mb-3">
          {images.length !== 0 ? (
            <MyNewCarousel images={images} />
          ) : (
            <span></span>
          )}
          <img
            src={
              images.length !== 0 ? <MyNewCarousel images={images} /> : no_image
            }
            alt=""
          />
        </div>
        <div className="flex flex-col lg:flex-row">
          <div className="w-full">
            <div className="flex gap-x-6 flex-wrap text-blue-700 mb-6">
              <div className="flex">
                <div
                  className={
                    property.habitaciones
                      ? "flex gap-x-2 items-center"
                      : "hidden"
                  }
                >
                  <BiHotel className="text-2xl" />
                  <div>{property.habitaciones}</div>
                </div>
                <div
                  className={
                    property.banos ? "flex ml-2 gap-x-2 items-center" : "hidden"
                  }
                >
                  <BiBath className="text-2xl " />
                  <div>{property.banos}</div>
                </div>
              </div>
              <div className="flex -ml-2">
                <div
                  className={
                    property.areaTerreno
                      ? "flex gap-x-2 items-center"
                      : "hidden"
                  }
                >
                  <BiArea className="text-2xl " />
                  <div className="flex">
                    {property.areaTerreno}{" "}
                    <label>
                      m<sup>2</sup>
                    </label>
                  </div>
                </div>
              </div>
              <div
                className={
                  property.cochera ? "flex gap-x-2 items-center" : "hidden"
                }
              >
                <BiCar className="text-2xl " />
                <div>
                  <span className="text-sm">{property.cochera}</span>
                </div>
              </div>
              <div
                className={
                  property.amueblado ? "flex gap-x-2 items-center" : "hidden"
                }
              >
                <BiChair className="text-2xl " />
                <div>
                  <span className="text-sm">{property.amueblado}</span>
                </div>
              </div>
              <div
                className={
                  property.aptoHijos ? "flex gap-x-1 items-center" : "hidden"
                }
              >
                <BiChild size={27} className="text-2xl " />
                <div>
                  <span className="text-sm">{property.aptoHijos}</span>
                </div>
              </div>
              <div
                className={
                  property.aptoMascotas ? "flex gap-x-1 items-center" : "hidden"
                }
              >
                <BiSolidDog className="text-2xl " />
                <div>
                  <span className="text-sm">{property.aptoMascotas}</span>
                </div>
              </div>
            </div>
            <div className="flex flex-col">
              <div className="flex max-[500px]:justify-center mb-2">
                <span>¿Cuál es su opinión de este inmueble?</span>
              </div>
              <div className="flex justify-between">
                <div className="flex max-[500px]:justify-center flex-row">
                  <div className="justify-center mb-4 mx-1">
                    <button
                      onClick={() => {
                        handleLikeClick();
                      }}
                      style={{ backgroundColor: likeColor }}
                      className="rounded-full p-2"
                    >
                      <BiLike fill="white" size={30} />
                    </button>
                  </div>
                  <div className="justify-center mb-4 mx-1">
                    <button
                      onClick={handleConfusedClick}
                      style={{ backgroundColor: confusedColor }}
                      className="rounded-full p-2"
                    >
                      <BiConfused fill="white" size={30} />
                    </button>
                  </div>
                  <div className="justify-center mb-4 mx-1">
                    <button
                      onClick={handleDislikeClick}
                      style={{ backgroundColor: dislikeColor }}
                      className="rounded-full p-2"
                    >
                      <BiDislike fill="white" size={30} />
                    </button>
                  </div>
                </div>
                <div className="flex justify-end">
                  <form>
                    <button
                      onClick={removeProperty}
                      type="button"
                      className="bg-blue-500 p-2 rounded-full"
                    >
                      <BiEraser size={30} fill="red" />
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="text-sm">
          <div
            className={
              property?.audio.data === null ||
              property?.audio.data === undefined
                ? "hidden"
                : null
            }
          >
            <AudioPlayer src={audio} />
          </div>
          <div className="max-[500px]:text-[14px] bg-blue-400 text-black px-3 mt-1 mb-1 font-semibold text-lg">
            Otros detalles de la propiedad
          </div>
          <div className="flex flex-wrap">
            <div className="w-full md:w-1/3 px-4 py-1">
              <div className="text-left">
                <div className="text-black rounded-sm">
                  <div className="flex flex-row align-middle">
                    <svg
                      className="flex-shrink-0 mr-1 w-4 h-4 mt-0.5 text-blue-600 dark:text-blue-500"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                    </svg>
                    {property.tomadaExclusividad ? (
                      <label className="text-[14px] font-semibold">
                        Tomada en exclusividad
                      </label>
                    ) : (
                      <label className="text-[14px] font-semibold">
                        No tomada en exclusividad
                      </label>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full md:w-1/3 px-4 py-1">
              <div className="text-left">
                <div className="text-black rounded-sm">
                  <div className="flex flex-row align-middle">
                    <svg
                      className="flex-shrink-0 mr-1 w-4 h-4 mt-0.5 text-blue-600 dark:text-blue-500"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                    </svg>
                    {property.vistaPanoramica ? (
                      <label className="text-[14px] font-semibold">
                        Tiene vista panorámica
                      </label>
                    ) : (
                      <label className="text-[14px] font-semibold">
                        No tiene vista panorámica
                      </label>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div
              className={
                property.duenoFinanciaCompra
                  ? "w-full md:w-1/3 px-4 py-1"
                  : "hidden"
              }
            >
              <div className="text-left">
                <div className="text-black rounded-sm">
                  <div className="flex flex-row align-middle">
                    <svg
                      className="flex-shrink-0 mr-1 w-4 h-4 mt-0.5 text-blue-600 dark:text-blue-500"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                    </svg>
                    {property.duenoFinanciaCompra ? (
                      <label className="text-[14px] font-semibold">
                        El dueño financia la compra
                      </label>
                    ) : (
                      <label className="text-[14px] font-semibold">
                        El dueño no financia la compra
                      </label>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div
              className={
                property.duenoRecibeVehiculo
                  ? "w-full md:w-1/3 px-4 py-1"
                  : "hidden"
              }
            >
              <div className="text-left">
                <div className="text-black rounded-sm">
                  <div className="flex flex-row align-middle">
                    <svg
                      className="flex-shrink-0 mr-1 w-4 h-4 mt-0.5 text-blue-600 dark:text-blue-500"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                    </svg>
                    {property.duenoRecibeVehiculo ? (
                      <label className="text-[12px] font-semibold">
                        El dueño recibe vehículos como parte del pago
                      </label>
                    ) : (
                      <label className="text-[12px] font-semibold">
                        El dueño NO recibe vehículos como parte del pago
                      </label>
                    )}
                  </div>
                </div>
              </div>
            </div>
            {/* <div
              className={
                property.avaluo ? "w-full md:w-1/3 px-4 py-1" : "hidden"
              }
            >
              <div class="text-left">
                <div className="text-black rounded-sm">
                  <div className="flex flex-row align-middle">
                    <svg
                      className="flex-shrink-0 mr-1 w-4 h-4 mt-0.5 text-blue-600 dark:text-blue-500"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                    </svg>
                    {property.avaluo ? (
                      <label className="text-[12px] font-semibold">
                        Tiene avalúo reciente
                      </label>
                    ) : (
                      <label className="text-[12px] font-semibold">
                        No tiene avalúo reciente
                      </label>
                    )}
                  </div>
                </div>
              </div>
            </div> */}
            <div
              className={property.altura ? "w-full md:w-1/3 px-4 py-1" : null}
            >
              <div className="text-left">
                <div
                  className={
                    property.altura ? "text-black rounded-sm" : "hidden"
                  }
                >
                  {property.altura ? (
                    <div className="flex flex-row align-middle">
                      <svg
                        className="flex-shrink-0 mr-1 w-4 h-4 mt-0.5 text-blue-600 dark:text-blue-500"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                      </svg>
                      <label className="font-semibold mr-1">Altura: </label>
                      <label>{property.altura}</label>m
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
            <div
              className={
                property.amueblado ? "w-full md:w-1/3 px-4 py-1" : null
              }
            >
              <div className="text-left">
                <div
                  className={
                    property.amueblado ? "text-black rounded-sm" : "hidden"
                  }
                >
                  {property.amueblado ? (
                    <div className="flex flex-row align-middle">
                      <svg
                        className="flex-shrink-0 mr-1 w-4 h-4 mt-0.5 text-blue-600 dark:text-blue-500"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                      </svg>
                      <label className="font-semibold mr-1">Amueblado: </label>
                      <label>{property.amueblado}</label>
                    </div>
                  ) : null}
                </div>
              </div>
            </div>

            <div
              className={
                property.aptoHijos ? "w-full md:w-1/3 px-4 py-1" : null
              }
            >
              <div className="text-left">
                {" "}
                <div
                  className={
                    property.aptoHijos ? "text-black rounded-sm" : "hidden"
                  }
                >
                  {property.aptoHijos ? (
                    <div className="flex flex-row align-middle">
                      <svg
                        className="flex-shrink-0 mr-1 w-4 h-4 mt-0.5 text-blue-600 dark:text-blue-500"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                      </svg>
                      <div className="flex max-[1200px]:flex-col">
                        <label className="font-semibold mr-1">
                          Apto para niños:{" "}
                        </label>
                        <label>{property.aptoHijos}</label>
                      </div>
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
            <div
              className={
                property.aptoMascotas ? "w-full md:w-1/3 px-4 py-1" : null
              }
            >
              <div className="text-left">
                <div
                  className={
                    property.aptoMascotas ? "text-black rounded-sm" : "hidden"
                  }
                >
                  {property.aptoMascotas ? (
                    <div className="flex flex-row align-middle">
                      <svg
                        className="flex-shrink-0 w-4 mr-1 h-4 mt-0.5 text-blue-600 dark:text-blue-500"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                      </svg>
                      <div className="flex max-[1200px]:flex-col">
                        <label className="font-semibold mr-1">
                          Apto para mascotas:{" "}
                        </label>
                        <label>{property.aptoMascotas}</label>
                      </div>
                    </div>
                  ) : null}
                </div>
              </div>
            </div>

            <div
              className={
                property.areaBodega ? "w-full md:w-1/3 px-4 py-1" : null
              }
            >
              <div className="text-left">
                <div
                  className={
                    property.areaBodega ? " text-black rounded-sm" : "hidden"
                  }
                >
                  {property.areaBodega ? (
                    <div className="flex flex-row align-middle">
                      <svg
                        className="flex-shrink-0 mr-1 w-4 h-4 mt-0.5 text-blue-600 dark:text-blue-500"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                      </svg>
                      <label className="font-semibold mr-1">
                        Área de la bodega:
                      </label>
                      <div className="flex flex-row">
                        <label>{property.areaBodega}</label>
                        <label>
                          m<sup>2</sup>
                        </label>
                      </div>
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
            <div
              className={
                property.areaCarga ? "w-full md:w-1/3 px-4 py-1" : null
              }
            >
              <div className="text-left">
                <div
                  className={
                    property.areaCarga ? " text-black rounded-sm" : "hidden"
                  }
                >
                  {property.areaCarga ? (
                    <div className="flex flex-row align-middle">
                      <svg
                        className="flex-shrink-0 w-4 mr-1 h-4 mt-0.5 text-blue-600 dark:text-blue-500"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                      </svg>
                      <label className="font-semibold mr-1">
                        {property.areaCarga === true ? (
                          <label>Tiene área de carga</label>
                        ) : (
                          <label>No tiene área de carga</label>
                        )}
                      </label>
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
            <div
              className={
                property.areaContruccion ? "w-full md:w-1/3 px-4 py-1" : null
              }
            >
              <div className="text-left">
                <div
                  className={
                    property.areaContruccion
                      ? "text-black rounded-sm"
                      : "hidden"
                  }
                >
                  {property.areaContruccion ? (
                    <div className="flex flex-row align-middle">
                      <svg
                        className="flex-shrink-0 w-4 mr-1 h-4 mt-0.5 text-blue-600 dark:text-blue-500"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                      </svg>
                      <label className="font-semibold mr-1">
                        Área de la construcción:{" "}
                      </label>
                      <div className="flex flex-row">
                        <label>{property.areaContruccion}</label>
                        <label>
                          m<sup>2</sup>
                        </label>
                      </div>
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
            <div
              className={
                property.areaMesanini ? "w-full md:w-1/3 px-4 py-1" : null
              }
            >
              <div className="text-left">
                <div
                  className={
                    property.areaMesanini ? " text-black rounded-sm" : "hidden"
                  }
                >
                  {property.areaMesanini ? (
                    <div className="flex flex-row align-middle">
                      <svg
                        className="flex-shrink-0 w-4 h-4 mr-1 mt-0.5 text-blue-600 dark:text-blue-500"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                      </svg>
                      <label className="font-semibold mr-1">
                        Área mezanine:{" "}
                      </label>
                      <div className="flex flex-row">
                        <label>{property.areaMesanini}</label>
                        <label>
                          m<sup>2</sup>
                        </label>
                      </div>
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
            <div
              className={
                property.areaPlantas ? "w-full md:w-1/3 px-4 py-1" : null
              }
            >
              <div className="text-left">
                {" "}
                <div
                  className={
                    property.areaPlantas ? "text-black rounded-sm" : "hidden"
                  }
                >
                  {property.areaPlantas ? (
                    <div className="flex flex-row align-middle">
                      <svg
                        className="flex-shrink-0 w-4 h-4 mt-0.5 mr-1 text-blue-600 dark:text-blue-500"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                      </svg>
                      <label className="font-semibold mr-1">
                        Área por planta:{" "}
                      </label>
                      <div className="flex flex-row">
                        <label>{property.areaPlantas}</label>
                        <label>
                          m<sup>2</sup>
                        </label>
                      </div>
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
            <div
              className={
                property.areaPropiedad ? "w-full md:w-1/3 px-4 py-1" : null
              }
            >
              <div className="text-left">
                <div
                  className={
                    property.areaPropiedad ? "text-black rounded-sm" : "hidden"
                  }
                >
                  {property.areaPropiedad ? (
                    <div className="flex flex-row align-middle">
                      <svg
                        className="flex-shrink-0 w-4 h-4 mt-0.5 mr-1 text-blue-600 dark:text-blue-500"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                      </svg>
                      <label className="font-semibold mr-1">
                        Área perimetral del inmueble:{" "}
                      </label>
                      <div className="flex flex-row">
                        <label>{property.areaPropiedad}</label>
                        <label>
                          m<sup>2</sup>
                        </label>
                      </div>
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
            <div
              className={
                property.areaSotano ? "w-full md:w-1/3 px-4 py-1" : null
              }
            >
              <div className="text-left">
                <div
                  className={
                    property.areaSotano ? "text-black rounded-sm" : "hidden"
                  }
                >
                  {property.areaSotano ? (
                    <div className="flex flex-row align-middle">
                      <svg
                        className="flex-shrink-0 w-4 h-4 mt-0.5 mr-1 text-blue-600 dark:text-blue-500"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                      </svg>
                      <label className="font-semibold mr-1">
                        Área del sótano:{" "}
                      </label>
                      <div className="flex flex-row">
                        <label>{property.areaSotano}</label>
                        <label>
                          m<sup>2</sup>
                        </label>
                      </div>
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
            <div
              className={
                property.areaTerreno ? "w-full md:w-1/3 px-4 py-1" : null
              }
            >
              <div className="text-left">
                <div
                  className={
                    property.areaTerreno ? " text-black rounded-sm" : "hidden"
                  }
                >
                  {property.areaTerreno ? (
                    <div className="flex flex-row align-middle">
                      <svg
                        className="flex-shrink-0 w-4 h-4 mt-0.5 mr-1 text-blue-600 dark:text-blue-500"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                      </svg>
                      <label className="font-semibold mr-1">
                        Área total del terreno:
                      </label>
                      <div className="flex flex-row">
                        <label>{property.areaTerreno}</label>
                        <label>
                          m<sup>2</sup>
                        </label>
                      </div>
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
            <div
              className={property.cochera ? "w-full md:w-1/3 px-4 py-1" : null}
            >
              <div className="text-left">
                <div
                  className={
                    property.cochera ? " text-black rounded-sm" : "hidden"
                  }
                >
                  {property.cochera ? (
                    <div className="flex flex-row align-middle">
                      <svg
                        className="flex-shrink-0 w-4 h-4 mt-0.5 mr-1 text-blue-600 dark:text-blue-500"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                      </svg>
                      <div className="flex max-[1200px]:flex-col">
                        <label className="font-semibold mr-1">Cochera: </label>
                        <label>{property.cochera}</label>
                      </div>
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
            <div
              className={
                property.concepcionElectrica
                  ? "w-full md:w-1/3 px-4 py-1"
                  : null
              }
            >
              <div className="text-left">
                <div
                  className={
                    property.concepcionElectrica
                      ? "text-black rounded-sm"
                      : "hidden"
                  }
                >
                  {property.concepcionElectrica ? (
                    <div className="flex flex-row align-middle">
                      <svg
                        className="flex-shrink-0 w-4 h-4 mt-0.5 mr-1 text-blue-600 dark:text-blue-500"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                      </svg>
                      <div className="flex max-[1200px]:flex-col">
                        <label className="font-semibold mr-1">
                          Tipo de instalación eléctrica:{" "}
                        </label>
                        <label>{property.concepcionElectrica}</label>
                      </div>
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
            <div
              className={
                property.cuotaMantenimiento ? "w-full md:w-1/3 px-4 py-1" : null
              }
            >
              <div className="text-left">
                <div
                  className={
                    property.cuotaMantenimiento
                      ? "text-black rounded-sm"
                      : "hidden"
                  }
                >
                  {property.cuotaMantenimiento ? (
                    <div className="flex flex-row align-middle">
                      <svg
                        className="flex-shrink-0 w-4 h-4 mt-0.5 mr-1 text-blue-600 dark:text-blue-500"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                      </svg>
                      <label className="font-semibold mr-1">
                        Cuota de mantenimiento:
                      </label>
                      <label>${property.cuotaMantenimiento}</label>
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
            <div
              className={property.ley7600 ? "w-full md:w-1/3 px-4 py-1" : null}
            >
              <div className="text-left">
                <div
                  className={
                    property.ley7600 ? "text-black rounded-sm" : "hidden"
                  }
                >
                  {property.ley7600 ? (
                    <div className="flex flex-row align-middle">
                      <svg
                        className="flex-shrink-0 w-4 h-4 mt-0.5 mr-1 text-blue-600 dark:text-blue-500"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                      </svg>
                      <label className="font-semibold">
                        {property.ley7600 === true ? (
                          <label> Acondicionado a la ley N° 7600</label>
                        ) : (
                          <label>NO Acondicionado a la ley N° 7600</label>
                        )}
                      </label>
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
            <div
              className={
                property.numeroPlantas ? "w-full md:w-1/3 px-4 py-1" : null
              }
            >
              <div className="text-left">
                <div
                  className={
                    property.numeroPlantas ? " text-black rounded-sm" : "hidden"
                  }
                >
                  {property.numeroPlantas ? (
                    <div className="flex flex-row align-middle">
                      <svg
                        className="flex-shrink-0 w-4 h-4 mt-0.5 mr-1 text-blue-600 dark:text-blue-500"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                      </svg>
                      <label className="font-semibold mr-1">
                        Número de plantas:
                      </label>
                      <label>{property.numeroPlantas}</label>
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
            <div
              className={property.parqueo ? "w-full md:w-1/3 px-4 py-1" : null}
            >
              <div className="text-left">
                <div
                  className={
                    property.parqueo ? "text-black rounded-sm" : "hidden"
                  }
                >
                  {property.parqueo ? (
                    <div className="flex flex-row align-middle">
                      <svg
                        className="flex-shrink-0 w-4 h-4 mt-0.5 mr-1 text-blue-600 dark:text-blue-500"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                      </svg>
                      <div className="flex max-[1200px]:flex-col">
                        <label className="font-semibold mr-1">Parqueo:</label>
                        <label>{property.parqueo}</label>
                      </div>
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
            <div
              className={
                property.servicios ? "w-full md:w-1/3 px-4 py-1" : null
              }
            >
              <div className="text-left">
                <div
                  className={
                    property.servicios ? "text-black rounded-sm" : "hidden"
                  }
                >
                  {property.servicios ? (
                    <div className="flex flex-row align-middle">
                      <svg
                        className="flex-shrink-0 w-4 h-4 mt-0.5 mr-1 text-blue-600 dark:text-blue-500"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                      </svg>
                      <div className="flex max-[1200px]:flex-col">
                        <label className="font-semibold mr-1">Servicios:</label>
                        <label>{property.servicios}</label>
                      </div>
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
            <div
              className={
                property.serviciosMedicos ? "w-full md:w-1/3 px-4 py-1" : null
              }
            >
              <div className="text-left">
                <div
                  className={
                    property.serviciosMedicos
                      ? "text-black rounded-sm"
                      : "hidden"
                  }
                >
                  {property.serviciosMedicos ? (
                    <div className="flex flex-row align-middle">
                      <svg
                        className="flex-shrink-0 w-4 h-4 mt-0.5 mr-1 text-blue-600 dark:text-blue-500"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                      </svg>
                      <label className="font-semibold">
                        {property.serviciosMedicos === true ? (
                          <label>Acondicionado para servicios médicos</label>
                        ) : (
                          <label>NO acondicionado para servicios médicos</label>
                        )}
                      </label>
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
            <div
              className={
                property?.tipoVivienda ? "w-full md:w-1/3 px-4 py-1" : null
              }
            >
              <div className="text-left">
                <div
                  className={
                    property?.tipoVivienda ? " text-black rounded-sm" : "hidden"
                  }
                >
                  {property?.tipoVivienda ? (
                    <div className="flex flex-row align-middle">
                      <svg
                        className="flex-shrink-0 w-4 h-4 mt-0.5 mr-1 text-blue-600 dark:text-blue-500"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                      </svg>
                      <div className="flex max-[1200px]:flex-col">
                        <label className="font-semibold mr-1">
                          Tipo de vivienda:
                        </label>
                        <label>{property?.tipoVivienda}</label>
                      </div>
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
            <div
              className={
                property.ubicacionCastral ? "w-full md:w-1/3 px-4 py-1" : null
              }
            >
              <div className="text-left">
                <div
                  className={
                    property.ubicacionCastral
                      ? " text-black rounded-sm"
                      : "hidden"
                  }
                >
                  {property.ubicacionCastral ? (
                    <div className="flex flex-row align-middle">
                      <svg
                        className="flex-shrink-0 w-4 h-4 mt-0.5 mr-1 text-blue-600 dark:text-blue-500"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                      </svg>
                      <div className="flex max-[1200px]:flex-col">
                        <label className="font-semibold mr-1">
                          Ubicación catastral:
                        </label>
                        <label>{property.ubicacionCastral}</label>
                      </div>
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
            <div
              className={
                property.ubicacionDemografica
                  ? "w-full md:w-1/3 px-4 py-1"
                  : null
              }
            >
              <div className="text-left">
                <div
                  className={
                    property.ubicacionDemografica
                      ? "text-black rounded-sm"
                      : "hidden"
                  }
                >
                  {property.ubicacionDemografica ? (
                    <div className="flex flex-row align-middle">
                      <svg
                        className="flex-shrink-0 w-4 h-4 mt-0.5 mr-1 text-blue-600 dark:text-blue-500"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                      </svg>
                      <div className="flex flex-col">
                        <label className="font-semibold mr-1">
                          Ubicación demográfica:
                        </label>
                        <label>{property.ubicacionDemografica}</label>
                      </div>
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
            <div
              className={
                property.ubicacionGeografica
                  ? "w-full md:w-1/3 px-4 py-1"
                  : null
              }
            >
              <div className="text-left">
                <div
                  className={
                    property.ubicacionGeografica
                      ? " text-black rounded-sm"
                      : "hidden"
                  }
                >
                  {property.ubicacionGeografica ? (
                    <div className="flex flex-row align-middle">
                      <svg
                        className="flex-shrink-0 w-4 h-4 mt-0.5 mr-1 text-blue-600 dark:text-blue-500"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                      </svg>
                      <div className="flex max-[1200px]:flex-col">
                        <label className="font-semibold mr-1">
                          Ubicación geográfica:
                        </label>
                        <label>{property.ubicacionGeografica}</label>
                      </div>
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
            <div
              className={
                property.usoDeSuelo ? "w-full md:w-1/3 px-4 py-1" : null
              }
            >
              <div className="text-left">
                <div
                  className={
                    property.usoDeSuelo ? " text-black rounded-sm" : "hidden"
                  }
                >
                  {property.usoDeSuelo ? (
                    <div className="flex flex-row align-middle">
                      <svg
                        className="flex-shrink-0 w-4 h-4 mt-0.5 mr-1 text-blue-600 dark:text-blue-500"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                      </svg>
                      <label className="font-semibold mr-1">
                        Uso del suelo:
                      </label>
                      <label>{property.usoDeSuelo}</label>
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
            <div
              className={
                property?.ubicacionDetallada
                  ? "w-full md:w-1/2 px-4 py-1"
                  : null
              }
            >
              <div className="text-left">
                <div
                  className={
                    property?.ubicacionDetallada
                      ? " text-black rounded-sm"
                      : "hidden"
                  }
                >
                  {property?.ubicacionDetallada ? (
                    <div className="flex flex-row align-middle">
                      <svg
                        className="flex-shrink-0 w-4 h-4 mt-0.5 mr-1 text-blue-600 dark:text-blue-500"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                      </svg>
                      <div className="flex flex-col">
                        <label className="font-semibold mr-1 flex flex-row">
                          Ubicación detallada:
                        </label>
                        <label>{property?.ubicacionDetallada}</label>
                      </div>
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
          <div
            className={
              !property?.jardinPatio ||
              Object?.keys(property?.jardinPatio)?.length === 0
                ? "hidden"
                : "px-3 pt-1 pb-1 text-black font-semibold text-md bg-blue-400"
            }
          >
            Opciones de Patio-Jardín
          </div>
          <div className="flex flex-wrap w-full">
            {!property?.jardinPatio ||
            Object.keys(property?.jardinPatio)?.length === 0 ? null : (
              <div className="text-black rounded-sm w-full flex flex-wrap">
                {!property?.jardinPatio ||
                Object.keys(property?.jardinPatio)?.length === 0 ||
                property?.jardinPatio?.length === undefined ||
                property?.jardinPatio?.length === 0
                  ? null
                  : property?.jardinPatio?.map((elemento, index) => (
                      <div className="w-full md:w-1/3 px-4 py-1">
                        <div className="flex flex-row">
                          <svg
                            className="flex-shrink-0 w-4 h-4 mt-0.5 mr-1 text-blue-600 dark:text-blue-500"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                          </svg>

                          {elemento.label}
                        </div>
                      </div>
                    ))}
              </div>
            )}
          </div>
          <div
            className={
              !property?.amenidades ||
              Object.keys(property?.amenidades)?.length === 0
                ? "hidden"
                : "px-3 pt-1 pb-1 text-black font-semibold text-md bg-blue-400"
            }
          >
            Amenidades
          </div>
          <div className="flex flex-wrap w-full">
            {!property?.amenidades ||
            Object.keys(property?.amenidades)?.length === 0 ? null : (
              <div className="text-black rounded-sm w-full flex flex-wrap">
                {!property?.amenidades ||
                Object.keys(property.amenidades).length === 0 ||
                property?.amenidades?.length === undefined ||
                property?.amenidades?.length === 0
                  ? null
                  : property?.amenidades?.map((elemento, index) => (
                      <div className="w-full md:w-1/3 px-4 py-1">
                        <div className="flex flex-row">
                          <svg
                            className="flex-shrink-0 w-4 h-4 mt-0.5 mr-1 text-blue-600 dark:text-blue-500"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                          </svg>
                          {elemento.label}
                        </div>
                      </div>
                    ))}
              </div>
            )}
          </div>
          <div
            className={
              !property?.detallesExternos ||
              Object.keys(property?.detallesInternos)?.length === 0
                ? "hidden"
                : "px-3 pt-1 pb-1 text-black font-semibold text-md bg-blue-400"
            }
          >
            Detalles internos
          </div>
          <div className="flex flex-wrap w-full">
            {!property?.detallesInternos ||
            Object.keys(property?.detallesInternos)?.length === 0 ? null : (
              <div className="text-black rounded-sm w-full flex flex-wrap">
                {!property?.detallesInternos ||
                Object.keys(property?.detallesInternos)?.length === 0 ||
                property?.detallesInternos?.length === undefined ||
                property?.detallesInternos?.length === 0
                  ? null
                  : property?.detallesInternos?.map((elemento, index) => (
                      <div className="w-full md:w-1/3 px-4 py-1">
                        <div className="flex flex-row">
                          <svg
                            className="flex-shrink-0 w-4 h-4 mt-0.5 mr-1 text-blue-600 dark:text-blue-500"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                          </svg>
                          {elemento.label}
                        </div>
                      </div>
                    ))}
              </div>
            )}
          </div>
          <div
            className={
              !property?.detallesExternos ||
              Object.keys(property?.detallesExternos)?.length === 0
                ? "hidden"
                : "px-3 pt-1 pb-1 text-black font-semibold text-md bg-blue-400"
            }
          >
            Detalles externos
          </div>
          <div className="flex flex-wrap w-full">
            {!property?.detallesExternos ||
            Object.keys(property?.detallesExternos)?.length === 0 ? null : (
              <div className="text-black rounded-sm w-full flex flex-wrap">
                {!property?.detallesExternos ||
                Object.keys(property.detallesExternos).length === 0 ||
                property?.detallesExternos?.length === undefined ||
                property?.detallesExternos?.length === 0
                  ? null
                  : property?.detallesExternos?.map((elemento, index) => (
                      <div className="w-full md:w-1/3 px-4 py-1">
                        <div className="flex flex-row">
                          <svg
                            className="flex-shrink-0 w-4 h-4 mt-0.5 mr-1 text-blue-600 dark:text-blue-500"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                          </svg>
                          {elemento.label}
                        </div>
                      </div>
                    ))}
              </div>
            )}
          </div>
        </div>
        <div className="flex flex-row my-2 mb-2 gap-x-2">
          <Map address={address} exclusividad={property?.tomadaExclusividad} />
        </div>
        <div
          className={
            property.descripcion
              ? "flex flex-col justify-start content-start mt-3 gap-x-2"
              : "hidden"
          }
        >
          <div className="flex justify-start">
            <span className="font-semibold">Descripción de la propiedad</span>{" "}
          </div>
          <span className="text-xs">{property?.descripcion}</span>
        </div>
        {!userData?.id ? (
          <Share pdfUrl={pdfUrl} adviser={adviser} />
        ) : (
          <div className="flex flex-row max-[768px]:flex-col">
            <div className="pt-[6px] align-middle">
              <ShareAdviser pdfUrl={pdfUrl} />
            </div>
          </div>
        )}
      </div>
      {/*  {visible && property ? (
        <div className="flex justify-center min-h-screen">
          <PDFViewer
            style={{
              width: "60%",
            }}
          >
            <PdfView property={property} />
          </PDFViewer>
        </div>
      ) : null} */}
    </section>
  );
};

export default PortafolioCard;
