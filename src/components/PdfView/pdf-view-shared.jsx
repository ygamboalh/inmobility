import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import {
  Document,
  Image,
  PDFViewer,
  Page,
  Text,
  View,
} from "@react-pdf/renderer";

import { BiBed } from "react-icons/bi";

import MySpinner from "../Spinner/spinner";
import AxiosInstance from "../../api/AxiosInstance";
import { API } from "../../constant";
import MetaData from "../Metadata/metadata";

const PdfViewShared = () => {
  const { id } = useParams();

  const [property, setProperty] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [images, setImages] = useState([]);

  const getProperty = async () => {
    console.log(id);
    setIsLoading(true);
    let propertyFound = null;
    let imagesCount = [];
    const imagesUrl = [];
    const propertyResponse = await AxiosInstance.get(
      `${API}properties/${id}?populate=*`
    )
      .then((response) => {
        propertyFound = response.data.data.attributes;
        console.log("Propiedad encontrada", propertyFound);
        imagesCount = response.data.data.attributes.photos;
        setProperty(propertyFound);
      })
      .catch((error) => {
        console.log("error de axiosInstance", error);
      });

    imagesCount?.data?.forEach((image) => {
      imagesUrl.push(image.attributes.url);
    });
    const url = imagesUrl[0];
    setImages(imagesUrl);

    setIsLoading(false);
  };

  useEffect(() => {
    getProperty();
  }, []);

  const divStyle = {
    display: "flex",
    padding: "4px",
    overflow: " auto",
    alignItems: "left",
    justifyContent: "left",
  };
  if (isLoading || !property) {
    return <MySpinner />;
  }
  return (
    <section className="flex justify-center min-h-full">
      <MetaData
        title={"La propiedad en pdf"}
        content={property.tipoPropiedad}
        imageAlt={"Imagen de la propiedad"}
        imageURL={`https://siccic.com/backend${images[0]}`}
      />
      <PDFViewer
        style={{
          width: "80%",
          height: "740px",
        }}
      >
        <Document style={{ padding: "10px" }}>
          <Page
            style={{ flexDirection: "column", padding: "10px", width: "100%" }}
            size="A4"
          >
            <View>
              <View className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                <View
                  style={{ justifyContent: "center", alignItems: "center" }}
                >
                  <Image
                    src={`https://siccic.com/backend/uploads/biglogo_8b9bf26113.png?updated_at=2023-07-11T15:23:36.365Z`}
                    style={{}}
                  ></Image>
                </View>
                <View
                  style={{
                    marginBottom: "2px",
                    marginTop: "1px",
                    padding: "10px",
                    color: "white",
                    backgroundColor: "#323996",
                  }}
                >
                  <Text className="text-2xl font-semibold">
                    <Text style={{ fontWeight: "bold" }}>
                      Identificador único:{" "}
                    </Text>
                    {property.uniqueId}
                  </Text>
                  <Text className="text-2xl font-semibold">
                    <Text style={{ fontWeight: "bold" }}>
                      Tipo de propiedad:{" "}
                    </Text>
                    {property.tipoPropiedad}
                  </Text>
                  <View className="text-lg mb-4">
                    {
                      <Text>
                        <Text>Provincia: </Text>
                        {property.provincia}
                      </Text>
                    }
                    {
                      <Text>
                        <Text>Canton: </Text>
                        {property.canton}
                      </Text>
                    }
                    {
                      <Text>
                        <Text>Distrito: </Text>
                        {property.distrito}
                      </Text>
                    }
                    <Text>
                      <Text>Precio: </Text>${property?.precio}
                    </Text>
                  </View>
                </View>
                <View className="mb-8">
                  {!images?.length ? (
                    <Image
                      src={`https://siccic.com/backend/uploads/no_image_default_0e6727a941.jpg?updated_at=2023-07-10T05:06:31.319Zg`}
                    />
                  ) : (
                    images.map((elemento, index) => (
                      <Image src={`https://siccic.com/backend${elemento}`} />
                    ))
                  )}
                </View>
              </View>
            </View>
          </Page>
          <Page>
            <View
              style={{
                marginTop: "15px",
                height: "50px",
                backgroundColor: "#323996",
                justifyContent: "center",
                marginHorizontal: "10px",
                color: "white",
              }}
            >
              <Text
                style={{
                  fontSize: "22px",
                  textAlign: "center",
                  justifyContent: "center",
                  alignItems: "center",
                  fontWeight: "extrabold",
                  color: "white",
                }}
              >
                Otros detalles de la propiedad
              </Text>
            </View>
            <View
              style={{
                marginTop: "1px",
                padding: "15px",
                backgroundColor: "#323996",
                marginHorizontal: "10px",
                color: "white",
              }}
            >
              <View style={{ backgroundColor: "#323996", color: "white" }}>
                <View className="flex gap-x-6 text-blue-700 mb-6">
                  {property.habitaciones ? (
                    <View
                      className={
                        property?.habitaciones
                          ? "flex gap-x-2 items-center"
                          : "hidden"
                      }
                    >
                      <Text>
                        <Text>Cantidad de habitaciones: </Text>
                        {property.habitaciones}
                      </Text>
                    </View>
                  ) : null}
                  {property.banos ? (
                    <View
                      className={
                        property?.banos ? "flex gap-x-2 items-center" : "hidden"
                      }
                    >
                      <Text>
                        <Text>Cantidad de baños: </Text>
                        {property?.banos}
                      </Text>
                    </View>
                  ) : null}
                  {property.areaPropiedad ? (
                    <View
                      className={
                        property.areaPropiedad
                          ? "flex gap-x-2 items-center"
                          : "hidden"
                      }
                    >
                      <Text>
                        <Text>Área de la propiedad: </Text>
                        {property.areaPropiedad} m²
                      </Text>
                    </View>
                  ) : null}
                </View>
              </View>
              <View className="max-w-[500px] w-full">
                <View
                  className={
                    property.altura
                      ? "bg-gray-200 text-black px-3 mt-3 rounded-sm"
                      : "hidden"
                  }
                >
                  {property.altura ? (
                    <View>
                      <Text className="font-semibold mr-1">Altura: </Text>
                      <Text>
                        <Text>Altura: </Text>
                        {property.altura} m
                      </Text>
                    </View>
                  ) : null}
                </View>
                <View
                  className={
                    property.amueblado
                      ? "bg-gray-200 text-black px-3 mt-3 rounded-sm"
                      : "hidden"
                  }
                >
                  {property.amueblado ? (
                    <View>
                      <Text>
                        <Text className="font-semibold mr-1">Amueblado: </Text>
                        {property.amueblado}
                      </Text>
                    </View>
                  ) : null}
                </View>
                <View
                  className={
                    property.aptoHijos
                      ? "bg-gray-200 text-black px-3 mt-3 rounded-sm"
                      : "hidden"
                  }
                >
                  {property.aptoHijos ? (
                    <View>
                      <Text>
                        <Text className="font-semibold mr-1">
                          Apto para niños:{" "}
                        </Text>
                        {property.aptoHijos}
                      </Text>
                    </View>
                  ) : null}
                </View>
                <View
                  className={
                    property.aptoMascotas
                      ? "bg-gray-200 text-black px-3 mt-3 rounded-sm"
                      : "hidden"
                  }
                >
                  {property.aptoMascotas ? (
                    <View>
                      <Text>
                        <Text className="font-semibold mr-1">
                          Apto para mascotas:{" "}
                        </Text>
                        {property.aptoMascotas}
                      </Text>
                    </View>
                  ) : null}
                </View>
                <View
                  className={
                    property.areaBodega
                      ? "bg-gray-200 text-black px-3 mt-3 rounded-sm"
                      : "hidden"
                  }
                >
                  {property.areaBodega ? (
                    <View className="flex flex-row">
                      <View className="flex flex-row">
                        <Text>
                          <Text className="font-semibold mr-1">
                            Área de la bodega:
                          </Text>
                          {property.areaBodega}m²
                        </Text>
                      </View>
                    </View>
                  ) : null}
                </View>
                <View
                  className={
                    property.areaCarga
                      ? "bg-gray-200 text-black px-3 mt-3 rounded-sm"
                      : "hidden"
                  }
                >
                  {property.areaCarga ? (
                    <View>
                      <Text className="font-semibold mr-1">
                        {property.areaCarga === true ? (
                          <Text>Tiene área de carga</Text>
                        ) : (
                          <Text>No tiene área de carga</Text>
                        )}
                      </Text>
                    </View>
                  ) : null}
                </View>
                <View
                  style={{ color: "white" }}
                  className={
                    property.areaContruccion
                      ? "bg-gray-200 text-black px-3 mt-3 rounded-sm"
                      : "hidden"
                  }
                >
                  {property.areaContruccion ? (
                    <View className="flex flex-row">
                      <View className="flex flex-row">
                        <Text>
                          <Text className="font-semibold mr-1">
                            Área de la construcción:{" "}
                          </Text>
                          {property.areaContruccion}m²
                        </Text>
                      </View>
                    </View>
                  ) : null}
                </View>
                <View
                  style={{ color: "white" }}
                  className={
                    property.areaMesanini
                      ? "bg-gray-200 text-black px-3 mt-3 rounded-sm"
                      : "hidden"
                  }
                >
                  {property.areaMesanini ? (
                    <View className="flex flex-row">
                      <View className="flex flex-row">
                        <Text>
                          <Text className="font-semibold mr-1">
                            Área mezanine:{" "}
                          </Text>
                          {property.areaMesanini}m²
                        </Text>
                      </View>
                    </View>
                  ) : null}
                </View>
                <View
                  style={{ color: "white" }}
                  className={
                    property.areaPlantas
                      ? "bg-gray-200 text-black px-3 mt-3 rounded-sm"
                      : "hidden"
                  }
                >
                  {property.areaPlantas ? (
                    <View className="flex flex-row">
                      <View className="flex flex-row">
                        <Text>
                          <Text className="font-semibold mr-1">
                            Área por planta:{" "}
                          </Text>
                          {property.areaPlantas}m²
                        </Text>
                      </View>
                    </View>
                  ) : null}
                </View>

                <View
                  style={{ color: "white" }}
                  className={
                    property.areaSotano
                      ? "bg-gray-200 text-black px-3 mt-3 rounded-sm"
                      : "hidden"
                  }
                >
                  {property.areaSotano ? (
                    <View className="flex flex-row">
                      <View className="flex flex-row">
                        <Text>
                          <Text className="font-semibold mr-1">
                            Área del sótano:{" "}
                          </Text>
                          {property.areaSotano}m²
                        </Text>
                      </View>
                    </View>
                  ) : null}
                </View>
                <View
                  style={{ color: "white" }}
                  className={
                    property.areaTerreno
                      ? "bg-gray-200 text-black px-3 mt-3 rounded-sm"
                      : "hidden"
                  }
                >
                  {property.areaTerreno ? (
                    <View className="flex flex-row">
                      <View className="flex flex-row">
                        <Text>
                          <Text className="font-semibold mr-1">
                            Área del terreno:
                          </Text>
                          {property.areaTerreno}m²
                        </Text>
                      </View>
                    </View>
                  ) : null}
                </View>
                <View
                  style={{ color: "white" }}
                  className={
                    property.cochera
                      ? "bg-gray-200 text-black px-3 mt-3 rounded-sm"
                      : "hidden"
                  }
                >
                  {property.cochera ? (
                    <View>
                      <Text>
                        <Text className="font-semibold mr-1">Cochera: </Text>
                        {property.cochera}
                      </Text>
                    </View>
                  ) : null}
                </View>
                <View
                  style={{ color: "white" }}
                  className={
                    property.concepcionElectrica
                      ? "bg-gray-200 text-black px-3 mt-3 rounded-sm"
                      : "hidden"
                  }
                >
                  {property.concepcionElectrica ? (
                    <View>
                      <Text>
                        <Text className="font-semibold mr-1">
                          Tipo de instalación eléctrica:
                        </Text>
                        {property.concepcionElectrica}
                      </Text>
                    </View>
                  ) : null}
                </View>
                <View
                  style={{ color: "white" }}
                  className={
                    property.cuotaMantenimiento
                      ? "bg-gray-200 text-black px-3 mt-3 rounded-sm"
                      : "hidden"
                  }
                >
                  {property.cuotaMantenimiento ? (
                    <View>
                      <Text>
                        <Text className="font-semibold mr-1">
                          Cuota de mantenimiento: $
                        </Text>
                        {property.cuotaMantenimiento}
                      </Text>
                    </View>
                  ) : null}
                </View>
                <View
                  style={{ color: "white" }}
                  className={
                    property.ley7600
                      ? "bg-gray-200 text-black px-3 mt-3 rounded-sm"
                      : "hidden"
                  }
                >
                  {property.ley7600 ? (
                    <View>
                      <Text className="font-semibold">
                        {property.ley7600 === true ? (
                          <Text> Acondicionado a la ley N° 7600</Text>
                        ) : (
                          <Text>NO Acondicionado a la ley N° 7600</Text>
                        )}
                      </Text>
                    </View>
                  ) : null}
                </View>
                <View
                  style={{ color: "white" }}
                  className={
                    property.numeroPlantas
                      ? "bg-gray-200 text-black px-3 mt-3 rounded-sm"
                      : "hidden"
                  }
                >
                  {property.numeroPlantas ? (
                    <View>
                      <Text>
                        <Text className="font-semibold mr-1">
                          Número de plantas:
                        </Text>
                        {property.numeroPlantas}
                      </Text>
                    </View>
                  ) : null}
                </View>
                <View
                  style={{ color: "white" }}
                  className={
                    property.parqueo
                      ? "bg-gray-200 text-black px-3 mt-3 rounded-sm"
                      : "hidden"
                  }
                >
                  {property.parqueo ? (
                    <View>
                      <Text>
                        <Text className="font-semibold mr-1">Parqueo:</Text>
                        {property.parqueo}
                      </Text>
                    </View>
                  ) : null}
                </View>
                <View
                  style={{ color: "white" }}
                  className={
                    property.servicios
                      ? "bg-gray-200 text-black px-3 mt-3 rounded-sm"
                      : "hidden"
                  }
                >
                  {property.servicios ? (
                    <View>
                      <Text>
                        <Text className="font-semibold mr-1">Servicios:</Text>
                        {property.servicios}
                      </Text>
                    </View>
                  ) : null}
                </View>
                <View
                  style={{ color: "white" }}
                  className={
                    property.serviciosMedicos
                      ? "bg-gray-200 text-black px-3 mt-3 rounded-sm"
                      : "hidden"
                  }
                >
                  {property.serviciosMedicos ? (
                    <View>
                      <Text className="font-semibold">
                        {property.serviciosMedicos === true ? (
                          <Text>Acondicionado para servicios médicos</Text>
                        ) : (
                          <Text>NO acondicionado para servicios médicos</Text>
                        )}
                      </Text>
                    </View>
                  ) : null}
                </View>
                <View
                  style={{ color: "white" }}
                  className={
                    property.ubicacionCastral
                      ? "bg-gray-200 text-black px-3 mt-3 rounded-sm"
                      : "hidden"
                  }
                >
                  {property.ubicacionCastral ? (
                    <View>
                      <Text>
                        <Text className="font-semibold mr-1">
                          Ubicación catastral:
                        </Text>
                        {property.ubicacionCastral}
                      </Text>
                    </View>
                  ) : null}
                </View>
                <View
                  style={{ color: "white" }}
                  className={
                    property.ubicacionDemografica
                      ? "bg-gray-200 text-black px-3 mt-3 rounded-sm"
                      : "hidden"
                  }
                >
                  {property.ubicacionDemografica ? (
                    <View>
                      <Text>
                        <Text className="font-semibold mr-1">
                          Ubicación demográfica:
                        </Text>
                        {property.ubicacionDemografica}
                      </Text>
                    </View>
                  ) : null}
                </View>
                <View
                  style={{ color: "white" }}
                  className={
                    property.ubicacionGeografica
                      ? "bg-gray-200 text-black px-3 mt-3 rounded-sm"
                      : "hidden"
                  }
                >
                  {property.ubicacionGeografica ? (
                    <View>
                      <Text>
                        <Text className="font-semibold mr-1">
                          Ubicación geográfica:
                        </Text>
                        {property.ubicacionGeografica}
                      </Text>
                    </View>
                  ) : null}
                </View>
                <View
                  style={{ color: "white" }}
                  className={
                    property.usoDeSuelo
                      ? "bg-gray-200 text-black px-3 mt-3 rounded-sm"
                      : "hidden"
                  }
                >
                  {property.usoDeSuelo ? (
                    <View>
                      <Text>
                        <Text className="font-semibold mr-1">
                          Uso del suelo:
                        </Text>
                        {property.usoDeSuelo}
                      </Text>
                    </View>
                  ) : null}
                </View>
                {!property.jardinPatio ||
                Object.keys(property.jardinPatio).length === 0 ? null : (
                  <View className="bg-gray-200 text-black px-3 mt-3 rounded-sm">
                    <View style={divStyle} className="flex flex-col">
                      <Text
                        style={{
                          fontWeight: "extrabold",
                          marginTop: "-3px",
                          marginLeft: "-3px",
                          color: "white",
                        }}
                        className="font-semibold"
                      >
                        Opciones de patio / jardin
                      </Text>
                      <ul>
                        {!property.jardinPatio ||
                        Object.keys(property.jardinPatio).length === 0 ||
                        property.jardinPatio?.length === undefined ||
                        property.jardinPatio?.length === 0
                          ? null
                          : property?.jardinPatio?.map((elemento, index) => (
                              <Text
                                style={{
                                  marginLeft: "5px",
                                  marginVertical: "2px",
                                  color: "white",
                                }}
                                key={index}
                              >
                                - {elemento.label}
                              </Text>
                            ))}
                      </ul>
                    </View>
                  </View>
                )}
                {!property.amenidades ||
                Object.keys(property.amenidades).length === 0 ? null : (
                  <View className="bg-gray-200 text-black px-3 mt-3 rounded-sm">
                    <View style={divStyle} className="flex flex-col">
                      <Text
                        style={{
                          fontWeight: "extrabold",
                          marginTop: "-3px",
                          marginLeft: "-3px",
                        }}
                        className="font-semibold"
                      >
                        Amenidades
                      </Text>
                      <ul>
                        {!property.amenidades ||
                        Object.keys(property.amenidades).length === 0 ||
                        property.amenidades?.length === undefined ||
                        property.amenidades?.length === 0
                          ? null
                          : property?.amenidades?.map((elemento, index) => (
                              <Text
                                style={{
                                  marginLeft: "5px",
                                  marginVertical: "2px",
                                }}
                                key={index}
                              >
                                - {elemento.label}
                              </Text>
                            ))}
                      </ul>
                    </View>
                  </View>
                )}
                {!property.detallesInternos ||
                Object.keys(property.detallesInternos).length === 0 ? null : (
                  <View className="bg-gray-200 text-black px-3 mt-3 rounded-sm">
                    <View style={divStyle} className="flex flex-col">
                      <Text
                        style={{
                          fontWeight: "extrabold",
                          marginTop: "-3px",
                          marginLeft: "-3px",
                        }}
                        className="font-semibold"
                      >
                        Detalles Internos
                      </Text>
                      <ul>
                        {!property.detallesInternos ||
                        Object.keys(property.detallesInternos).length === 0 ||
                        property.detallesInternos?.length === undefined ||
                        property.detallesInternos?.length === 0
                          ? null
                          : property?.detallesInternos?.map(
                              (elemento, index) => (
                                <Text
                                  style={{
                                    marginLeft: "5px",
                                    marginVertical: "2px",
                                  }}
                                  key={index}
                                >
                                  - {elemento.label}
                                </Text>
                              )
                            )}
                      </ul>
                    </View>
                  </View>
                )}
                {!property.detallesExternos ||
                Object.keys(property.detallesExternos).length === 0 ? null : (
                  <View className="bg-gray-200 text-black px-3 mt-3 rounded-sm">
                    <View style={divStyle} className="flex flex-col">
                      <Text
                        style={{
                          fontWeight: "extrabold",
                          marginTop: "-3px",
                          marginLeft: "-3px",
                        }}
                        className="font-semibold"
                      >
                        Detalles Externos
                      </Text>
                      <ul>
                        {!property.detallesExternos ||
                        Object.keys(property.detallesExternos).length === 0 ||
                        property.detallesExternos?.length === undefined ||
                        property.detallesExternos?.length === 0
                          ? null
                          : property?.detallesExternos?.map(
                              (elemento, index) => (
                                <Text
                                  style={{
                                    marginLeft: "5px",
                                    marginVertical: "2px",
                                  }}
                                  key={index}
                                >
                                  - {elemento.label}
                                </Text>
                              )
                            )}
                      </ul>
                    </View>
                  </View>
                )}
              </View>
            </View>
          </Page>
        </Document>
      </PDFViewer>
    </section>
  );
};

export default PdfViewShared;
