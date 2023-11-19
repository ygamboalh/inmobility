import React, { useEffect, useState } from "react";
import {
  GoogleMap,
  Marker,
  Circle,
  useLoadScript,
} from "@react-google-maps/api";

import AxiosInstance from "../../api/AxiosInstance";
import axios from "axios";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { message } from "antd";
import MySpinner from "../Spinner/spinner";

const MapTest = () => {
  const params = useParams();
  const [key, setkey] = useState(null);
  const [datosLocales, setDatosLocales] = useState("");
  const navigate = useNavigate();

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: key,
  });
  const [map, setMap] = React.useState(null);
  const [latitud, setLatitud] = useState(9.92829);
  const [longitud, setLongitud] = useState(-84.05074);
  const [isLoading, setIsLoading] = useState(false);
  const [property, setProperty] = useState(null);
  const [showMap, setShowMap] = useState(false);

  useEffect(() => {
    const response = AxiosInstance.get(`tokens?filters[type][$eq]=map`)
      .then((data) => {
        if (data.status === 200) {
          const keyf = data?.data?.data[0]?.attributes?.token;
          setkey(keyf);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [latitud, longitud]);
  useEffect(() => {
    const response = AxiosInstance.get(`/properties/${params?.id}`)
      .then((data) => {
        if (data.status === 200) {
          const prop = data?.data?.data;
          setProperty(prop);
          if (prop.attributes.coordenadas !== null) {
            const splittedCoords = prop.attributes.coordenadas.split(",");
            const lat = parseFloat(splittedCoords[0]);
            const lng = parseFloat(splittedCoords[1]);
            setLatitud(lat);
            setLongitud(lng);
          }
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowMap(true);
    }, 1000);
    return () => {
      clearTimeout(timer);
    };
  }, []);
  const upDateLocation = async () => {
    setIsLoading(true);
    const coordenadas = `${latitud},${longitud}`;

    const response = await AxiosInstance.put(`/properties/${params.id}`, {
      data: { coordenadas },
    })
      .then((res) => {
        const respuesta = res.status;
        if (respuesta === 200) {
          message.success(
            "¡La ubicación del inmueble se estableció correctamente!"
          );
          goBack();
        }
      })
      .catch((error) => {
        message.error(
          "¡No se pudo establecer la ubicación del inmueble. Intente nuevamente!"
        );
      })
      .finally(() => setIsLoading(false));
    setIsLoading(false);
  };
  const goBack = () => {
    navigate(-1);
  };
  const center = {
    lat: 0,
    lng: 0,
  };
  const onLoad = React.useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);

    setMap(map);
  }, []);
  const onUnmount = React.useCallback(function callback(map) {
    setMap(null);
  }, []);
  const onDragPoint = (event) => {
    const lat = event.latLng.lat();
    const long = event.latLng.lng();
    setLatitud(lat);
    setLongitud(long);
    //setDatosLocales(lat, long);
  };
  if (isLoading) {
    return <MySpinner />;
  }
  if (loadError)
    return (
      <div className="flex justify-center">No se ha podido cargar el mapa</div>
    );

  return isLoaded && latitud && longitud && key && showMap ? (
    <>
      <div className="mb-4 flex justify-center">
        <div className="flex flex-col items-center justify-center">
          <span className="text-xs font-semibold">
            Coordenadas seleccionadas
          </span>
          <div className="flex flex-row">
            <div className="flex flex-col justify-center items-center content-center mx-1">
              <span className="text-xs flex">Latitud</span>
              <span className="text-xs bg-red-400 rounded-full px-2 py-1">
                {latitud}
              </span>
            </div>
            <div className="flex flex-col justify-center items-center content-center mx-1">
              <span className="text-xs flex">Longitud</span>
              <span className="text-xs bg-blue-300 rounded-full px-2 py-1">
                {longitud}
              </span>
            </div>
          </div>
        </div>
      </div>
      <GoogleMap
        mapContainerStyle={{ height: "500px", width: "100%" }}
        center={{ lat: latitud, lng: longitud }}
        zoom={16}
        //onLoad={onLoad}
        onUnmount={onUnmount}
      >
        <Marker
          position={{ lat: latitud, lng: longitud }}
          draggable={true}
          onDragEnd={onDragPoint}
        />
      </GoogleMap>
      <div className="mt-4 flex justify-center">
        <div className="flex flex-row items-center justify-center">
          <button
            type="button"
            onClick={upDateLocation}
            className="text-md text-white py-1 px-3 rounded-md bg-blue-500 mx-1"
          >
            Aceptar
          </button>
          <button
            onClick={goBack}
            type="button"
            className="text-md text-white py-1 px-3 rounded-md bg-red-600 mx-1"
          >
            Cancelar
          </button>
        </div>
      </div>
    </>
  ) : (
    <div className="flex justify-center font-semibold text-red-600">
      Cargando mapa...
    </div>
  );
};

export default MapTest;
