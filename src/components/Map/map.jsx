import React, { useEffect, useState } from "react";
import {
  GoogleMap,
  Marker,
  Circle,
  useLoadScript,
} from "@react-google-maps/api";
import AxiosInstance from "../../api/AxiosInstance";

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
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
          address
        )}&key=${key}`
      );
      const data = await response.json();
      if (data.results.length > 0) {
        const { lat, lng } = data.results[0].geometry.location;
        setLatitud(lat);
        setLongitud(lng);
      } else {
        console.log("No se encontraron resultados");
      }
    } catch (error) {
      console.error("Error al obtener las coordenadas:", error);
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
    getCoordinates();
  });

  const center = {
    lat: 0,
    lng: 0,
  };
  const onLoad = React.useCallback(function callback(map) {
    // This is just an example of getting and using the map instance!!! don't just blindly copy!
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);

    setMap(map);
  }, []);
  const onUnmount = React.useCallback(function callback(map) {
    setMap(null);
  }, []);
  if (loadError)
    return (
      <div className="flex justify-center">
        No he podido cargar mapa. Vuelva a intentarlo
      </div>
    );
  console.log("dfsdfsd", key);
  if (!isLoaded)
    return <div className="flex justify-center">Cargando el mapa...</div>;
  console.log(exclusividad);
  return isLoaded && latitud && longitud ? (
    <GoogleMap
      mapContainerStyle={{ height: "500px", width: "100%" }}
      center={{ lat: latitud, lng: longitud }}
      zoom={16}
      //onLoad={onLoad}
      onUnmount={onUnmount}
    >
      {exclusividad ? (
        <Marker position={{ lat: latitud, lng: longitud }} />
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
      No he podido cargar mapa. Vuelva a intentarlo
    </div>
  );
};

export default Map;
