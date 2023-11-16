import React, { useEffect, useState } from "react";
import {
  GoogleMap,
  Marker,
  Circle,
  useLoadScript,
} from "@react-google-maps/api";

import AxiosInstance from "../../api/AxiosInstance";
import axios from "axios";

const MapTest = ({ address, exclusividad }) => {
  const [key, setkey] = useState("AIzaSyBCpfg5dUktp1Tqzc9XEVsJlW890WJjXxY");

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: key,
  });
  const [map, setMap] = React.useState(null);
  const [latitud, setLatitud] = useState(9.92829);
  const [longitud, setLongitud] = useState(-84.05074);

  /* useEffect(() => {
    const response = AxiosInstance(`tokens?filters[type][$eq]=map`)
      .then((data) => {
        const keyf = data?.data?.data[0]?.attributes?.token;
        setkey(keyf);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [latitud, longitud]); */

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
  };
  if (loadError)
    return (
      <div className="flex justify-center">No se ha podido cargar el mapa</div>
    );
  console.log(latitud, longitud);
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
          draggable={true}
          onDragEnd={onDragPoint}
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
      Intentando cargar el mapa...
    </div>
  );
};

export default MapTest;
