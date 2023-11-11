import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { BiArea, BiBath, BiBed, BiCar, BiSolidFilePdf } from "react-icons/bi";
import "react-responsive-carousel/lib/styles/carousel.min.css";

import no_image from "../../../assets/images/no_image_default.jpg";
import AxiosInstance from "../../../api/AxiosInstance";
import { API } from "../../../constant";
import MySpinner from "../../../components/Spinner/spinner";
import MyNewCarousel from "../../../components/Carrusel/carrusel";
import Share from "../../../components/Share/share";
import MetaData from "../../../components/Metadata/metadata";
import AudioPlayer from "../../../components/AudioPlayer/audio-player";
const PropertyDetailsSearch = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [adviser, setAdviser] = useState();
  const [audio, setAudio] = useState(null);
  const getProperty = async () => {
    setIsLoading(true);
    let propertyFound = null;
    let imagesCount = [];
    const propertyResponse = await AxiosInstance.get(
      `${API}properties/${id}?populate=*`
    ).then((response) => {
      propertyFound = response.data.data.attributes;
      imagesCount = response.data.data.attributes.photos;
      setPdfUrl(
        `https://sistemacic.com/home/shared-property/${propertyFound.uniqueId}`
      );
    });
    setProperty(propertyFound);
    getAdviser(propertyFound.creadoPor);
    setIsLoading(false);
    const imagesUrl = [];
    imagesCount?.data?.forEach((image) => {
      imagesUrl.push(image.attributes.url);
    });
    setImages(imagesUrl);
    const audio = propertyFound?.audio?.data?.attributes?.url;
    setAudio(`https://backend.sistemacic.com${audio}`);
  };
  useEffect(() => {
    getProperty();
  }, []);
  const getAdviser = (id) => {
    const response = AxiosInstance.get(`${API}users/${id}`)
      .then((response) => {
        const adviser = response.data;
        setAdviser(adviser);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const { id } = useParams();
  const [property, setProperty] = useState();
  const [images, setImages] = useState([]);

  const [pdfUrl, setPdfUrl] = useState();

  const seePdfDocument = () => {
    window.location.assign(pdfUrl);
  };
  if (isLoading || !property) {
    return <MySpinner />;
  }
  const divStyle = {
    display: "flex",
    padding: "4px",
    overflow: " auto",

    alignItems: "left",
    justifyContent: "left",
  };

  return (
    <section className="">
      <MetaData
        title="Detalles de la propiedad"
        description="Detalles de la propiedad"
      />
      <div className="container rounded-md mx-auto min-h-[800px] bg-gray-300 pt-28">
        <div>
          <button
            onClick={() => {
              seePdfDocument();
            }}
            className="bg-blue-700 text-white text-sm rounded-md px-1 py-2"
            type="button"
          >
            <BiSolidFilePdf size={35} />
          </button>
        </div>
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="text-2xl font-semibold">{property.tipoPropiedad}</h2>
            <h3 className="text-lg mb-4">
              {property.provincia +
                " - " +
                property.canton +
                " - " +
                property.distrito}
            </h3>
          </div>
          <div className="mb-4 lg:mb-0 flex gap-x-2 text-sm">
            <div className="bg-green-500 text-black px-3 rounded-full">
              {property.tipoPropiedad}
            </div>
            <div className="bg-blue-500 text-black px-3 rounded-full">
              {property.provincia}
            </div>
          </div>
          <div className="text-3xl font-semibold text-blue-600">
            {property.moneda} {property.precio}
          </div>
        </div>
        <div className="text-xl font-semibold text-blue-600">
          {property.uniqueId}
        </div>
        <div className="flex flex-col items-start gap-8 lg:flex-row">
          <div className="max-w-[568px] w-full">
            <div className="mb-3">
              {images.length !== 0 ? (
                <MyNewCarousel images={images} />
              ) : (
                <span></span>
              )}
              <img
                src={
                  images.length !== 0 ? (
                    <MyNewCarousel images={images} />
                  ) : (
                    no_image
                  )
                }
                alt=""
              />
            </div>
            <div className="flex gap-x-6 text-blue-700 mb-6">
              <div className="flex">
                <div
                  className={
                    property.habitaciones
                      ? "flex gap-x-2 items-center"
                      : "hidden"
                  }
                >
                  <BiBed className="text-2xl" />
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
                <div>{property.cochera}</div>
              </div>
            </div>
            <Share pdfUrl={pdfUrl} adviser={adviser} />
            <div
              className={
                property.descripcion
                  ? "flex flex-col justify-start content-start mt-2 gap-x-2"
                  : "hidden"
              }
            >
              <div className="flex justify-start">
                <span className="font-semibold">
                  Descripción de la propiedad
                </span>{" "}
              </div>
              <div>{property?.descripcion}</div>
            </div>
          </div>
          <div className="max-w-[500px] w-full">
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
            <div className="max-[500px]:text-[14px] text-black px-3 mt-3 font-semibold text-lg">
              Otros detalles de la propiedad
            </div>
            <div
              className={
                property.Anunciante
                  ? "bg-gray-200 text-black px-3 mt-3 rounded-sm"
                  : "hidden"
              }
            >
              {property.Anunciante ? (
                <div>
                  <label className="font-semibold mr-1">Creada por: </label>
                  <label>{property.Anunciante}</label>
                </div>
              ) : null}
            </div>
            <div
              className={
                property.altura
                  ? "bg-gray-200 text-black px-3 mt-3 rounded-sm"
                  : "hidden"
              }
            >
              {property.altura ? (
                <div>
                  <label className="font-semibold mr-1">Altura: </label>
                  <label>{property.altura}</label>
                </div>
              ) : null}
            </div>
            <div
              className={
                property.amueblado
                  ? "bg-gray-200 text-black px-3 mt-3 rounded-sm"
                  : "hidden"
              }
            >
              {property.amueblado ? (
                <div>
                  <label className="font-semibold mr-1">Amueblado: </label>
                  <label>{property.amueblado}</label>
                </div>
              ) : null}
            </div>
            <div
              className={
                property.aptoHijos
                  ? "bg-gray-200 text-black px-3 mt-3 rounded-sm"
                  : "hidden"
              }
            >
              {property.aptoHijos ? (
                <div>
                  <label className="font-semibold mr-1">
                    Apto para niños:{" "}
                  </label>
                  <label>{property.aptoHijos}</label>
                </div>
              ) : null}
            </div>
            <div
              className={
                property.aptoMascotas
                  ? "bg-gray-200 text-black px-3 mt-3 rounded-sm"
                  : "hidden"
              }
            >
              {property.aptoMascotas ? (
                <div>
                  <label className="font-semibold mr-1">
                    Apto para mascotas:{" "}
                  </label>
                  <label>{property.aptoMascotas}</label>
                </div>
              ) : null}
            </div>
            <div
              className={
                property.areaBodega
                  ? "bg-gray-200 text-black px-3 mt-3 rounded-sm"
                  : "hidden"
              }
            >
              {property.areaBodega ? (
                <div className="flex flex-row">
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
            <div
              className={
                property.areaCarga
                  ? "bg-gray-200 text-black px-3 mt-3 rounded-sm"
                  : "hidden"
              }
            >
              {property.areaCarga ? (
                <div>
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
            <div
              className={
                property.areaContruccion
                  ? "bg-gray-200 text-black px-3 mt-3 rounded-sm"
                  : "hidden"
              }
            >
              {property.areaContruccion ? (
                <div className="flex flex-row">
                  <label className="font-semibold mr-1">
                    Metros cuadrados construidos:{" "}
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
            <div
              className={
                property.areaMesanini
                  ? "bg-gray-200 text-black px-3 mt-3 rounded-sm"
                  : "hidden"
              }
            >
              {property.areaMesanini ? (
                <div className="flex flex-row">
                  <label className="font-semibold mr-1">Área mezanine: </label>
                  <div className="flex flex-row">
                    <label>{property.areaMesanini}</label>
                    <label>
                      m<sup>2</sup>
                    </label>
                  </div>
                </div>
              ) : null}
            </div>
            <div
              className={
                property.areaPlantas
                  ? "bg-gray-200 text-black px-3 mt-3 rounded-sm"
                  : "hidden"
              }
            >
              {property.areaPlantas ? (
                <div className="flex flex-row">
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
            <div
              className={
                property.areaPropiedad
                  ? "bg-gray-200 text-black px-3 mt-3 rounded-sm"
                  : "hidden"
              }
            >
              {property.areaPropiedad ? (
                <div className="flex flex-row">
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
            <div
              className={
                property.areaSotano
                  ? "bg-gray-200 text-black px-3 mt-3 rounded-sm"
                  : "hidden"
              }
            >
              {property.areaSotano ? (
                <div className="flex flex-row">
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
            <div
              className={
                property.areaTerreno
                  ? "bg-gray-200 text-black px-3 mt-3 rounded-sm"
                  : "hidden"
              }
            >
              {property.areaTerreno ? (
                <div className="flex flex-row">
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
            <div
              className={
                property.cochera
                  ? "bg-gray-200 text-black px-3 mt-3 rounded-sm"
                  : "hidden"
              }
            >
              {property.cochera ? (
                <div>
                  <label className="font-semibold mr-1">Cochera: </label>
                  <label>{property.cochera}</label>
                </div>
              ) : null}
            </div>
            <div
              className={
                property.concepcionElectrica
                  ? "bg-gray-200 text-black px-3 mt-3 rounded-sm"
                  : "hidden"
              }
            >
              {property.concepcionElectrica ? (
                <div>
                  <label className="font-semibold mr-1">
                    Tipo de instalación eléctrica:{" "}
                  </label>
                  <label>{property.concepcionElectrica}</label>
                </div>
              ) : null}
            </div>
            <div
              className={
                property.cuotaMantenimiento
                  ? "bg-gray-200 text-black px-3 mt-3 rounded-sm"
                  : "hidden"
              }
            >
              {property.cuotaMantenimiento ? (
                <div>
                  <label className="font-semibold mr-1">
                    Cuota de mantenimiento:
                  </label>
                  <label>
                    {property.moneda}
                    {property.cuotaMantenimiento}
                  </label>
                </div>
              ) : null}
            </div>
            <div
              className={
                property.ley7600
                  ? "bg-gray-200 text-black px-3 mt-3 rounded-sm"
                  : "hidden"
              }
            >
              {property.ley7600 ? (
                <div>
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
            <div
              className={
                property.numeroPlantas
                  ? "bg-gray-200 text-black px-3 mt-3 rounded-sm"
                  : "hidden"
              }
            >
              {property.numeroPlantas ? (
                <div>
                  <label className="font-semibold mr-1">
                    Número de plantas:
                  </label>
                  <label>{property.numeroPlantas}</label>
                </div>
              ) : null}
            </div>
            <div
              className={
                property.parqueo
                  ? "bg-gray-200 text-black px-3 mt-3 rounded-sm"
                  : "hidden"
              }
            >
              {property.parqueo ? (
                <div>
                  <label className="font-semibold mr-1">Parqueo:</label>
                  <label>{property.parqueo}</label>
                </div>
              ) : null}
            </div>
            <div
              className={
                property.servicios
                  ? "bg-gray-200 text-black px-3 mt-3 rounded-sm"
                  : "hidden"
              }
            >
              {property.servicios ? (
                <div>
                  <label className="font-semibold mr-1">Servicios:</label>
                  <label>{property.servicios}</label>
                </div>
              ) : null}
            </div>
            <div
              className={
                property.serviciosMedicos
                  ? "bg-gray-200 text-black px-3 mt-3 rounded-sm"
                  : "hidden"
              }
            >
              {property.serviciosMedicos ? (
                <div>
                  <label className="font-semibold">
                    {property.serviciosMedicos === true ? (
                      <label>Servicios médicos cercanos</label>
                    ) : (
                      <label>Sin servicios médicos cercanos</label>
                    )}
                  </label>
                </div>
              ) : null}
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
                property.ubicacionCastral
                  ? "bg-gray-200 text-black px-3 mt-3 rounded-sm"
                  : "hidden"
              }
            >
              {property.ubicacionCastral ? (
                <div>
                  <label className="font-semibold mr-1">
                    Ubicación catastral:
                  </label>
                  <label>{property.ubicacionCastral}</label>
                </div>
              ) : null}
            </div>
            <div
              className={
                property.ubicacionDemografica
                  ? "bg-gray-200 text-black px-3 mt-3 rounded-sm"
                  : "hidden"
              }
            >
              {property.ubicacionDemografica ? (
                <div>
                  <label className="font-semibold mr-1">
                    Ubicación demográfica:
                  </label>
                  <label>{property.ubicacionDemografica}</label>
                </div>
              ) : null}
            </div>
            <div
              className={
                property.ubicacionGeografica
                  ? "bg-gray-200 text-black px-3 mt-3 rounded-sm"
                  : "hidden"
              }
            >
              {property.ubicacionGeografica ? (
                <div>
                  <label className="font-semibold mr-1">
                    Ubicación geográfica:
                  </label>
                  <label>{property.ubicacionGeografica}</label>
                </div>
              ) : null}
            </div>
            <div
              className={
                property.usoDeSuelo
                  ? "bg-gray-200 text-black px-3 mt-3 rounded-sm"
                  : "hidden"
              }
            >
              {property.usoDeSuelo ? (
                <div>
                  <label className="font-semibold mr-1">Uso del suelo:</label>
                  <label>{property.usoDeSuelo}</label>
                </div>
              ) : null}
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
                      <label className="font-semibold mr-1">
                        Ubicación detallada:
                      </label>
                      <label>{property?.ubicacionDetallada}</label>
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
            {!property?.jardinPatio ||
            property?.jardinPatio?.length === 0 ? null : (
              <div className="bg-gray-200 text-black px-3 mt-3 rounded-sm h-fit">
                <div style={divStyle} className="flex flex-col max-h-[100px]">
                  <label className="font-semibold">
                    Opciones de patio / jardin
                  </label>
                  <ul>
                    {!property?.jardinPatio ||
                    property?.jardinPatio?.length === 0 ||
                    property?.jardinPatio?.length === undefined ||
                    property?.jardinPatio?.length === 0
                      ? null
                      : property?.jardinPatio?.map((elemento, index) => (
                          <li key={index}>{elemento}</li>
                        ))}
                  </ul>
                </div>
              </div>
            )}
            {!property?.amenidades ||
            property?.amenidades?.length === 0 ? null : (
              <div className="bg-gray-200 text-black px-3 mt-3 rounded-sm">
                <div style={divStyle} className="flex flex-col max-h-[100px]">
                  <label className="font-semibold">Amenidades</label>
                  <ul>
                    {!property?.amenidades ||
                    property?.amenidades?.length === 0 ||
                    property?.amenidades?.length === undefined ||
                    property?.amenidades?.length === 0
                      ? null
                      : property?.amenidades?.map((elemento, index) => (
                          <li key={index}>{elemento}</li>
                        ))}
                  </ul>
                </div>
              </div>
            )}
            {!property?.detallesInternos ||
            property?.detallesInternos?.length === 0 ? null : (
              <div className="bg-gray-200 text-black px-3 mt-3 rounded-sm">
                <div style={divStyle} className="flex flex-col max-h-[100px]">
                  <label className="font-semibold">Detalles Internos</label>
                  <ul>
                    {!property?.detallesInternos ||
                    property?.detallesInternos?.length === 0 ||
                    property?.detallesInternos?.length === undefined ||
                    property?.detallesInternos?.length === 0
                      ? null
                      : property?.detallesInternos?.map((elemento, index) => (
                          <li key={index}>{elemento}</li>
                        ))}
                  </ul>
                </div>
              </div>
            )}
            {!property?.detallesExternos ||
            property?.detallesExternos?.length === 0 ? null : (
              <div className="bg-gray-200 text-black px-3 mt-3 mb-4 rounded-sm">
                <div style={divStyle} className="flex flex-col max-h-[100px]">
                  <label className="font-semibold">Detalles Externos</label>
                  <ul>
                    {!property.detallesExternos ||
                    property?.detallesExternos?.length === 0 ||
                    property?.detallesExternos?.length === undefined ||
                    property?.detallesExternos?.length === 0
                      ? null
                      : property?.detallesExternos?.map((elemento, index) => (
                          <li key={index}>{elemento}</li>
                        ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* {visible && property ? (
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

export default PropertyDetailsSearch;
