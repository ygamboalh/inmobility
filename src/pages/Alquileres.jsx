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
          path={"/home/search/rent-house-apartment"}
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
          path={"/home/search/rent-lots"}
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
          path={"/home/search/rent-commercials"}
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
          path={"/home/search/rent-store"}
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

        <Category
          path={"/home/search/rent-buildings"}
          title="Alquiler de Edificios"
        >
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
          path={"/home/search/rent-office"}
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
