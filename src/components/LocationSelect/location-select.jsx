import React, { useEffect, useState } from "react";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";

import AxiosInstance from "../../api/AxiosInstance";
import MySpinner from "../Spinner/spinner";
import SelectMap from "../SelectMap/select-map";
import MetaData from "../Metadata/metadata";
import TesttMap from "../SelectMap/map-test";
import MapTest from "../SelectMap/map-test";

const LocationSelect = () => {
  useEffect(() => {}, []);

  return (
    <div className="w-full h-full flex justify-center flex-col items-center">
      <MetaData
        title="Seleccionar ubicación"
        description="Seleccionar ubicación"
      />
      <div className="my-4">
        <span className="text-md font-semibold">
          Seleccione la ubicación en el mapa
        </span>
      </div>

      <MapTest
        exclusividad={true}
        address={
          "Ruta Nacional 204, Calle 51 Zapote, San José 10105 Costa Rica"
        }
      />
    </div>
  );
};

export default LocationSelect;
