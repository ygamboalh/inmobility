import React, { useEffect, useState } from "react";

import {
  BiArea,
  BiBath,
  BiBed,
  BiCar,
  BiConfused,
  BiDislike,
  BiLike,
  BiSolidFilePdf,
  BiWindowClose,
} from "react-icons/bi";
import { message } from "antd";
import { PDFViewer } from "@react-pdf/renderer";
import "react-responsive-carousel/lib/styles/carousel.min.css";

import AxiosInstance from "../../api/AxiosInstance";
import { API } from "../../constant";
import MySpinner from "../Spinner/spinner";
import no_image from "../../assets/images/no_image_default.jpg";
import PdfView from "../PdfView/pdf-view";
import MyNewCarousel from "../Carrusel/carrusel";

import {
  EmailIcon,
  EmailShareButton,
  FacebookIcon,
  FacebookMessengerIcon,
  FacebookMessengerShareButton,
  FacebookShareButton,
  TelegramIcon,
  TelegramShareButton,
  TwitterIcon,
  TwitterShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from "react-share";
import { authUserData } from "../../api/usersApi";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";

const SearchCard = ({ propiedad, onDataReceived }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [dataToSend, setDataToSend] = useState();
  const { data: userData } = useQuery("profile", authUserData);
  const navigate = useNavigate();
  const propertyId = propiedad[0].id;
  const propertyType = propiedad[0].attributes?.tipoPropiedad;
  const created = propiedad[1];
  const clientName = propiedad[2];
  const clientEmail = propiedad[3];
  const categories = propiedad[4];

  useEffect(() => {
    getProperty();
  }, []);
  const sendDataToParent = () => {
    setDataToSend([{ propertyId, propertyType }]);
    onDataReceived({ id: propertyId, type: propertyType });
  };

  const [property, setProperty] = useState();
  const [images, setImages] = useState([]);
  const [visible, setVisible] = useState(false);
  const [pdfUrl, setPdfUrl] = useState();

  const getProperty = async () => {
    setIsLoading(true);
    let propertyFound = null;
    let imagesCount = [];
    const propertyResponse = await AxiosInstance.get(
      `${API}properties/${propertyId}?populate=*`
    ).then((response) => {
      propertyFound = response.data.data.attributes;
      imagesCount = response.data.data.attributes.photos;

      setPdfUrl(`https://siccic.com/home/search/pdf/${response.data.data.id}`);
    });

    setProperty(propertyFound);

    setIsLoading(false);
    const imagesUrl = [];
    imagesCount?.data?.forEach((image) => {
      imagesUrl.push(image.attributes.url);
    });
    setImages(imagesUrl);
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
  /* const savePortafolio = () => {
    setIsLoading(true);
    const id = userData?.id;
    const mobile = userData?.mobile;
    const email = userData?.email;
    const values = {
      creadoPor: id,
      clienteComprador: clientName,
      correoCliente: clientEmail,
      //properties: portafolioProperties,
      telefonoAsesor: mobile,
      correoAsesor: email,
      categoria: categories,
    };
    //console.log(portafolioProperties);
    if (portafolioProperties.length > 0) {
      const totalPortfolios = data.data.length;
      console.log(totalPortfolios);
      if (totalPortfolios < 100) {
        const response = AxiosInstance.post(`${API}portafolios`, {
          data: { data: values },
        })
          .then((response) => {
            console.log("respuesta de guardar el portafolio", response);
            message.success("¡El portafolio fue creado correctamente!");
            navigate("/home/portfolio");
          })
          .catch((error) => {
            console.log("ocurrio este error", error);
          })
          .finally(() => {
            setIsLoading(false);
          });
      } else {
        message.error("¡No puedes crear más de 100 portfolios!");
      }
    } else {
      message.error("¡No ha seleccionado ninguna propiedad!");
    }
  }; */
  return (
    <section>
      <div className="container mx-auto pb-2 pt-6 bg-blue-200 rounded-xl">
        <div className="flex justify-between">
          <div>
            <button
              onClick={() => {
                setVisible(!visible);
              }}
              className="bg-blue-700 text-white text-sm rounded-md px-1 py-2"
              type="button"
            >
              <BiSolidFilePdf size={35} />
            </button>
          </div>
          <div>
            <div>
              {userData?.active === "Asesor verificado" ||
              userData?.active === "Super Administrador" ||
              userData?.active === "Supervisor" ? (
                <div>
                  {created ? (
                    <button
                      onClick={sendDataToParent}
                      //className="bg-green-400 rounded-md h-6 font-semibold w-12 hover:bg-green-600 text-black"
                    >
                      <input
                        type="checkbox"
                        className="h-12 w-12 rounded-full"
                        //onClickCapture={sendDataToParent}
                      />
                    </button>
                  ) : null}
                </div>
              ) : null}
            </div>
          </div>
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
            $ {property.precio}
          </div>
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
                <div>
                  <span className="text-sm">{property.cochera}</span>
                </div>
              </div>
            </div>
            <div>
              <EmailShareButton url={pdfUrl}>
                <EmailIcon round={true} size={30}></EmailIcon>
              </EmailShareButton>
              <FacebookShareButton url={pdfUrl}>
                <FacebookIcon
                  size={30}
                  logoFillColor="blue"
                  round={true}
                ></FacebookIcon>
              </FacebookShareButton>
              <WhatsappShareButton url={pdfUrl}>
                <WhatsappIcon size={30} round={true}></WhatsappIcon>
              </WhatsappShareButton>
              <FacebookMessengerShareButton url={pdfUrl}>
                <FacebookMessengerIcon
                  size={30}
                  round={true}
                ></FacebookMessengerIcon>
              </FacebookMessengerShareButton>
              <TwitterShareButton url={pdfUrl}>
                <TwitterIcon size={30} round={true}></TwitterIcon>
              </TwitterShareButton>
              <TelegramShareButton url={pdfUrl}>
                <TelegramIcon size={30} round={true}></TelegramIcon>
              </TelegramShareButton>
            </div>
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
            <div className=" text-black px-3 mt-3 font-semibold text-lg">
              Otros detalles de la propiedad
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
                    Área de la propiedad:{" "}
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
                    Área del terreno:
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
                  <label>${property.cuotaMantenimiento}</label>
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
                      <label>Acondicionado para servicios médicos</label>
                    ) : (
                      <label>NO acondicionado para servicios médicos</label>
                    )}
                  </label>
                </div>
              ) : null}
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
            {!property.jardinPatio ||
            Object.keys(property.jardinPatio).length === 0 ? null : (
              <div className="bg-gray-200 text-black px-3 mt-3 rounded-sm h-fit">
                <div style={divStyle} className="flex flex-col max-h-[100px]">
                  <label className="font-semibold">
                    Opciones de patio / jardin
                  </label>
                  <ul>
                    {!property.jardinPatio ||
                    Object.keys(property.jardinPatio).length === 0 ||
                    property.jardinPatio?.length === undefined ||
                    property.jardinPatio?.length === 0
                      ? null
                      : property?.jardinPatio?.map((elemento, index) => (
                          <li key={index}>{elemento.label}</li>
                        ))}
                  </ul>
                </div>
              </div>
            )}
            {!property.amenidades ||
            Object.keys(property.amenidades).length === 0 ? null : (
              <div className="bg-gray-200 text-black px-3 mt-3 rounded-sm">
                <div style={divStyle} className="flex flex-col max-h-[100px]">
                  <label className="font-semibold">Amenidades</label>
                  <ul>
                    {!property.amenidades ||
                    Object.keys(property.amenidades).length === 0 ||
                    property.amenidades?.length === undefined ||
                    property.amenidades?.length === 0
                      ? null
                      : property?.amenidades?.map((elemento, index) => (
                          <li key={index}>{elemento.label}</li>
                        ))}
                  </ul>
                </div>
              </div>
            )}
            {!property.detallesInternos ||
            Object.keys(property.detallesInternos).length === 0 ? null : (
              <div className="bg-gray-200 text-black px-3 mt-3 rounded-sm">
                <div style={divStyle} className="flex flex-col max-h-[100px]">
                  <label className="font-semibold">Detalles Internos</label>
                  <ul>
                    {!property.detallesInternos ||
                    Object.keys(property.detallesInternos).length === 0 ||
                    property.detallesInternos?.length === undefined ||
                    property.detallesInternos?.length === 0
                      ? null
                      : property?.detallesInternos?.map((elemento, index) => (
                          <li key={index}>{elemento.label}</li>
                        ))}
                  </ul>
                </div>
              </div>
            )}
            {!property.detallesExternos ||
            Object.keys(property.detallesExternos).length === 0 ? null : (
              <div className="bg-gray-200 text-black px-3 mt-3 rounded-sm">
                <div style={divStyle} className="flex flex-col max-h-[100px]">
                  <label className="font-semibold">Detalles Externos</label>
                  <ul>
                    {!property.detallesExternos ||
                    Object.keys(property.detallesExternos).length === 0 ||
                    property.detallesExternos?.length === undefined ||
                    property.detallesExternos?.length === 0
                      ? null
                      : property?.detallesExternos?.map((elemento, index) => (
                          <li key={index}>{elemento.label}</li>
                        ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {visible && property ? (
        <div className="flex justify-center min-h-screen">
          <PDFViewer
            style={{
              width: "60%",
            }}
          >
            <PdfView property={property} />
          </PDFViewer>
        </div>
      ) : null}
    </section>
  );
};

export default SearchCard;
