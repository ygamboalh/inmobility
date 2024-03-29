import React, { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";

import axios from "axios";
import Swal from "sweetalert2";

import { getAllPropertiesRQ } from "../../../api/propertiesApi";
import { API } from "../../../constant";
import withReactContent from "sweetalert2-react-content";
import { createNotification, getToken } from "../../../utils/helpers";
import MySpinner from "../../../components/Spinner/spinner";
import enviarCorreoPersonalizado from "../../../utils/email/send-personalized-email";
import { authUserData } from "../../../api/usersApi";
import MetaData from "../../../components/Metadata/metadata";

import {
  BiArea,
  BiBuildingHouse,
  BiCategory,
  BiCurrentLocation,
  BiHomeAlt,
  BiHotel,
  BiMap,
  BiSearch,
} from "react-icons/bi";

const PropertiesList = () => {
  const queryClient = useQueryClient();
  const [isLoading, setIsLoading] = useState(false);
  const [records, setRecords] = useState([]);
  const [pending, setPending] = React.useState(true);
  const [filterRecords, setFilterRecords] = useState([]);
  const [visibleRecords, setVisibleRecords] = useState([]);
  const [loadCount, setLoadCount] = useState(10);
  const navigate = useNavigate();
  const { data: userData, loading } = useQuery("profile", authUserData);

  const { data, isLoading: loadingProperties } = useQuery(
    "properties",
    getAllPropertiesRQ,
    {
      onSuccess: (data) => {
        const foundedProperties = [];
        data.data.forEach((property) => {
          if (property.attributes.active === "Activo") {
            foundedProperties.push(property);
          }
        });
        setRecords(foundedProperties);
        setFilterRecords(foundedProperties);
        setPending(false);
      },
    }
  );
  useEffect(() => {
    setVisibleRecords(records?.slice(0, loadCount));
  }, [records, loadCount]);

  const handleScroll = () => {
    if (
      window.innerHeight + window.scrollY >=
      document.documentElement.scrollHeight
    ) {
      setLoadCount((prevCount) => prevCount + 10);
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  if (loadingProperties) {
    return <MySpinner />;
  }

  const DeleteProperty = async (id) => {
    const MySwal = withReactContent(Swal);
    setIsLoading(true);
    MySwal.fire({
      title: "¿Desea eliminar el inmueble?",
      showDenyButton: true,
      confirmButtonText: "Sí, eliminar",
      confirmButtonColor: "#1863e4",
      denyButtonText: `No`,
    }).then((result) => {
      if (result.isConfirmed) {
        const response = axios(`${API}properties/${id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getToken()}`,
          },
        }).then((result) => {
          const property = result.data.data.attributes;
          createNotification(
            "Eliminación",
            `Se ha eliminado la propiedad ${result.data.data.attributes.uniqueId}`,
            null,
            null
          );
          const body = `El siguiente inmueble ha sido eliminado por el usuario: ${userData.email}`;
          enviarCorreoPersonalizado("infosistemacic@gmail.com", property, body);
          queryClient
            .invalidateQueries(["properties"])
            .then((resultado) => console.log("ok"));
        });
        if (result) {
          Swal.fire("Inmueble eliminado!", "", "success");
        } else {
          Swal.fire("El Inmueble no fue eliminado", "", "error");
        }
      }
    });
    setIsLoading(false);
  };

  const handleFilter = (event) => {
    const searchData = filterRecords.filter((row) =>
      row.attributes.tipoPropiedad
        .toLowerCase()
        .includes(event.target.value.toLowerCase())
    );
    setRecords(searchData);
  };
  if (isLoading || !records) {
    return <MySpinner />;
  }

  return (
    <div className="w-full">
      <MetaData title="Propiedades" description="Propiedades activas" />
      <div className="w-full px-1 my-1">
        <div className="relative w-full flex justify-center">
          <div className="absolute max-[500px]:hidden inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <BiSearch size={25} />
          </div>
          <input
            onChange={handleFilter}
            placeholder="Filtrar por tipo de propiedad"
            type="text"
            className="block max-[500px]:w-80 max-[500px]:-pl-4 w-full pr-10 p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>
      {visibleRecords?.length ? (
        <div className="flex w-full justify-center flex-wrap mb-4">
          {visibleRecords.map((row) => (
            <div className="w-[340px] flex flex-col justify-between my-2 p-4 mx-1 bg-white border border-gray-300 rounded-lg shadow">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-lg font-bold leading-none text-gray-900 ">
                    Detalles del inmueble
                  </span>
                  <span className="font-semibold text-blue-700 text-xs">
                    {row.attributes.moneda
                      ? row.attributes.moneda
                      : row.attributes.monedaAlquiler}
                    {row.attributes.precio
                      ? row.attributes.precio
                      : row.attributes.precioAlquiler}
                  </span>
                </div>
                <hr />
                <div className="flow-root w-full flex-wrap">
                  <ul className="divide-y divide-gray-200">
                    <li className="py-3 sm:py-4">
                      <div className="flex items-center space-x-4">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center mb-2 -mt-4 bg-blue-300 w-fit px-2 py-0.5 rounded-md flex-row">
                            <p className="text-sm font-medium  text-gray-900 truncate">
                              {row.attributes.uniqueId}
                            </p>
                          </div>
                          <div className="flex items-center mb-4 flex-row">
                            <BiCategory size={25} />
                            <p className="text-sm font-medium  text-gray-900 truncate">
                              {
                                row.attributes.categories.data[0]?.attributes
                                  .nombre
                              }
                            </p>
                          </div>
                          <hr />
                          <div className="flex items-center mt-1 mb-2 flex-row">
                            <BiHomeAlt size={20} />
                            <p className="text-sm mt-1 text-gray-900 truncate">
                              {row.attributes.tipoPropiedad}
                            </p>
                          </div>
                          <hr />

                          <div className="flex my-2 flex-row">
                            <span className="ml-[2px]">
                              <BiCurrentLocation size={20} />
                            </span>
                            <p className="text-sm text-gray-500 truncate">
                              {row.attributes.provincia}
                            </p>
                          </div>
                          <hr />
                          <div className="flex my-2 flex-row">
                            <span className="ml-[2px]">
                              <BiMap size={20} />
                            </span>
                            <p className="text-sm text-gray-500 truncate">
                              {row.attributes.canton}
                            </p>
                          </div>
                          <hr />
                          <div className="flex my-2 flex-row">
                            <span className="ml-[2px]">
                              <BiBuildingHouse size={20} />
                            </span>
                            <p className="text-sm text-gray-500 truncate">
                              {row.attributes.distrito}
                            </p>
                          </div>
                          <hr />
                          <div
                            className={
                              row.attributes.habitaciones
                                ? "flex my-2 flex-row"
                                : "hidden"
                            }
                          >
                            <span className="ml-[2px]">
                              <BiHotel size={20} />
                            </span>
                            <p className="text-sm text-gray-500 truncate">
                              {row.attributes?.habitaciones} habitaciones
                            </p>
                          </div>
                          <hr />
                          <div className="flex my-2 flex-row">
                            <span className="ml-[2px]">
                              <BiArea size={20} />
                            </span>
                            <p className="text-sm text-gray-500 truncate">
                              {row.attributes.areaTerreno} m<sup>2</sup>
                            </p>
                          </div>
                          <hr />
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="flex items-center justify-center mt-2 space-x-4">
                <div className="mt-2 flex justify-center flex-row">
                  <button
                    className="detailButton"
                    onClick={() =>
                      navigate(
                        `/admin/shared-property/${row.attributes.uniqueId}`
                      )
                    }
                  >
                    Detalles
                  </button>
                  <button
                    className="editButton mx-2"
                    onClick={() =>
                      navigate(`/admin/properties/edit-property/${row.id}`)
                    }
                  >
                    Editar
                  </button>
                  <button
                    className="deleteButton"
                    onClick={() => DeleteProperty(row.id)}
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <span className="flex justify-center mt-4">
          No hay propiedades activas
        </span>
      )}
    </div>
  );
};

export default PropertiesList;
