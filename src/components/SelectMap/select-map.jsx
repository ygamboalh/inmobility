import React, { useEffect, useState } from "react";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";

import AxiosInstance from "../../api/AxiosInstance";
import MySpinner from "../Spinner/spinner";
import axios from "axios";
import Map from "../Map/map";

const SelectMap = () => {
  const [key, setkey] = useState(null);
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: key,
  });
  const [map, setMap] = useState(null);
  const [latitud, setLatitud] = useState(9.92829);
  const [longitud, setLongitud] = useState(-84.05074);
  const [propertyAddress, setAddress] = useState();
  const getCoordinates = async () => {
    const address =
      "Ruta Nacional 204, Calle 51 Zapote, San José 10105 Costa Rica";
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

  const getReverseGeocodingData = async () => {
    try {
      const response = await axios
        .get(
          `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitud},${longitud}&key=${key}`
        )
        .then((res) => {
          if (res.data.results.length > 0) {
            setAddress(res.data.results[0].formatted_address);
          } else {
            setAddress(null);
          }
        });
    } catch (error) {
      console.error("Error", error);
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
    getReverseGeocodingData();
  }, []);
  const center = {
    lat: latitud,
    lng: longitud,
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

  if (!isLoaded || !key) return <MySpinner />;

  return isLoaded && longitud && latitud && key && !loadError ? (
    <div className="w-full h-full flex flex-col justify-center items-center">
      <GoogleMap
        mapContainerStyle={{ height: "60%", width: "100%" }}
        center={{ lat: latitud, lng: longitud }}
        zoom={16}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
        <Marker
          draggable={true}
          onDragEnd={onDragPoint}
          position={{ lat: latitud, lng: longitud }}
        />
      </GoogleMap>
      {latitud || longitud ? (
        <div className="w-full mt-4 flex flex-col items-center justify-center">
          <span className="text-sm font-semibold">
            Coordenadas seleccionadas
          </span>
          <div className="text-xs">{longitud}</div>
          <div className="text-xs">{latitud}</div>
        </div>
      ) : null}
      {latitud || longitud ? (
        <div className="w-full mb-4 flex flex-col items-center justify-center">
          <span className="text-sm font-semibold flex justify-center items-center">
            Dirección que corresponde las coordenadas
          </span>
          {propertyAddress ? (
            <div className="text-xs">{propertyAddress}</div>
          ) : (
            <span>Aún no tengo dirección para esas coordenadas</span>
          )}
        </div>
      ) : null}
    </div>
  ) : (
    <div className="flex justify-center font-semibold text-red-600">
      No se ha podido cargar el mapa
    </div>
  );
};

export default SelectMap;

/* import React, { useEffect, useState } from "react";
import {
  GoogleMap,
  Marker,
  Circle,
  useLoadScript,
  LoadScript,
  InfoWindow,
} from "@react-google-maps/api";

import AxiosInstance from "../../api/AxiosInstance";
import axios from "axios";
import MySpinner from "../Spinner/spinner";

const SelectMap = ({ address, exclusividad }) => {
  const [key, setkey] = useState(null);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: key,
  });
  const [map, setMap] = React.useState(null);
  const [latitud, setLatitud] = useState();
  const [longitud, setLongitud] = useState();
  const [showMap, setShoMap] = useState(false);
  const [propertyAddress, setAddress] = useState();

  const getCoordinates = async () => {
    const direccion =
      "Ruta Nacional 204, Calle 51 Zapote, San José 10105 Costa Rica";
    try {
      if (direccion) {
        const response = await axios
          .get(
            `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
              direccion
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
  const getReverseGeocodingData = async () => {
    console.log("llegando las coor", latitud, longitud);
    try {
      const response = await axios
        .get(
          `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitud},${longitud}&key=${key}`
        )
        .then((res) => {
          if (res.data.results.length > 0) {
            setAddress(res.data.results[0].formatted_address);
          } else {
            setAddress(null);
          }
        });
    } catch (error) {
      console.error("Error", error);
    }
  };
  const onDragPoint = (event) => {
    const lat = event.latLng.lat();
    const long = event.latLng.lng();
    setLatitud(lat);
    setLongitud(long);
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
  }, []);
  getCoordinates();
  getReverseGeocodingData();

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
  useEffect(() => {
    const timer = setTimeout(() => {
      setShoMap(true);
    }, 1000);
    return () => {
      clearTimeout(timer);
    };
  }, []);

  return isLoaded && latitud && longitud && key ? (
    <GoogleMap
      mapContainerStyle={{ height: "80%", width: "100%" }}
      center={{ lat: latitud, lng: longitud }}
      zoom={16}
      onLoad={onLoad}
      onUnmount={onUnmount}
    >
      <Marker
        position={{ lat: latitud, lng: longitud }}
        draggable={true}
        onDragEnd={onDragPoint}
      />
    </GoogleMap>
  ) : (
    <div className="flex justify-center font-semibold text-red-600">
      <MySpinner />
    </div>
  );
};

export default SelectMap;
 */
