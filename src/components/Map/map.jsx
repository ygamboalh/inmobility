import React, { useEffect, useState } from "react";
import {
  GoogleMap,
  Marker,
  Circle,
  useLoadScript,
} from "@react-google-maps/api";

import AxiosInstance from "../../api/AxiosInstance";
import axios from "axios";

const Map = ({ address, exclusividad }) => {
  const [key, setkey] = useState(null);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: key,
  });
  const [map, setMap] = React.useState(null);
  const [latitud, setLatitud] = useState();
  const [longitud, setLongitud] = useState();

  const getCoordinates = async () => {
    try {
      if (address) {
        const response = await axios
          .get(
            `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
              address
            )}&key=${key}`
          )
          .then((res) => {
            if (res.data.results.length > 0) {
              const { lat, lng } = res.data.results[0].geometry.location;
              setLatitud(lat);
              setLongitud(lng);
            }
          })
          .catch((error) => console.log(error));
      }
    } catch (error) {
      console.error("no coords");
    }
  };

  useEffect(() => {
    const response = AxiosInstance(`tokens?filters[type][$eq]=map`)
      .then((data) => {
        const keyf = data?.data?.data[0]?.attributes?.token;
        setkey(keyf);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [latitud, longitud]);
  getCoordinates();

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
  if (loadError || !key)
    return (
      <div className="flex justify-center">
        No se ha podido cargar la ubicación en el mapa
      </div>
    );

  if (!isLoaded || !key)
    return <div className="flex justify-center">Cargando el mapa...</div>;

  return isLoaded && latitud && longitud && key ? (
    <GoogleMap
      mapContainerStyle={{ height: "500px", width: "100%" }}
      center={{ lat: latitud, lng: longitud }}
      zoom={16}
      //onLoad={onLoad}
      onUnmount={onUnmount}
    >
      {exclusividad ? (
        <Marker
          position={{ lat: latitud, lng: longitud }}
          //draggable={true}
          //onDragEnd={onDragPoint}
        />
      ) : null}

      {!exclusividad ? (
        <div>
          <Circle
            center={{ lat: latitud, lng: longitud }}
            radius={120}
            options={{
              fillColor: "#d24444",
              strokeOpacity: 0.2,
              strokeWeight: 1,
            }}
          />
        </div>
      ) : null}
    </GoogleMap>
  ) : (
    <div className="flex justify-center font-semibold text-red-600">
      No se ha podido cargar la ubicación en el mapa
    </div>
  );
};

export default Map;
