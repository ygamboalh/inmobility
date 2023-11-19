import React, { useEffect, useState } from "react";

import MetaData from "../Metadata/metadata";
import MapTest from "../SelectMap/map-test";

const LocationSelect = () => {
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
      //exclusividad={true}
      //enviarDatosAlPadre={recibirDatosDesdeHijo}
      //address={"Ruta Nacional 204, Calle 51 Zapote, San José 10105 Costa Rica"}
      />
    </div>
  );
};

export default LocationSelect;
