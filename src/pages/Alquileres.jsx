import React from "react";
import { SiHomeassistantcommunitystore } from "react-icons/si";
import { GiFarmTractor, GiFactory } from "react-icons/gi";
import { FaWarehouse } from "react-icons/fa";
import { BsFillBuildingsFill, BsPersonRolodex } from "react-icons/bs";
import { AlquilerRoutes } from "../routes";
import { Category } from "../components";

const Ventas = () => {
  return (
    <section>
      <div className="grid grid-cols-2 p-10 gap-10 max-md:grid-cols-1 text-center text-white font-medium">
        <Category
          path={AlquilerRoutes.CASA_APARTAMENTO}
          title="Alquiler Casas y Apartamentos"
        >
          <SiHomeassistantcommunitystore
            style={{
              color: "#fff",
              fontSize: 54,
              alignSelf: "center",
              margin: 5,
            }}
          />
        </Category>

        <Category
          path={AlquilerRoutes.LOTES_FINCAS_TERRENOS}
          title="Alquiler Lotes, Fincas, Terrenos"
        >
          <GiFarmTractor
            style={{
              color: "#fff",
              fontSize: 54,
              alignSelf: "center",
              margin: 5,
            }}
          />
        </Category>

        <Category
          path={AlquilerRoutes.LOCALES_COMERCIALES}
          title="Alquiler Locales Comerciales"
        >
          <FaWarehouse
            style={{
              color: "#fff",
              fontSize: 54,
              alignSelf: "center",
              margin: 5,
            }}
          />
        </Category>

        <Category
          path={AlquilerRoutes.BODEGAS_SIMILARES}
          title="Alquiler Bodegas y Similares"
        >
          <GiFactory
            style={{
              color: "#fff",
              fontSize: 54,
              alignSelf: "center",
              margin: 5,
            }}
          />
        </Category>

        <Category path={AlquilerRoutes.EDIFICIOS} title="Alquiler de Edificios">
          <BsFillBuildingsFill
            style={{
              color: "#fff",
              fontSize: 54,
              alignSelf: "center",
              margin: 5,
            }}
          />
        </Category>

        <Category
          path={AlquilerRoutes.OFICINAS_CONSULTORIOS}
          title="Alquiler Oficinas y Consultorios Médicos"
        >
          <BsPersonRolodex
            style={{
              color: "#fff",
              fontSize: 54,
              alignSelf: "center",
              margin: 5,
            }}
          />
        </Category>
      </div>
    </section>
  );
};

export default Ventas;
