import { useEffect, useState } from "react";

import * as Yup from "yup";
import MySpinner from "../Spinner/spinner";
import { authUserData } from "../../api/usersApi";
import { useQuery, useQueryClient } from "react-query";
import SearchCard from "../SearchResults/property-card";

import AxiosInstance from "../../api/AxiosInstance";
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
import MetaData from "../Metadata/metadata";
import { useFormik } from "formik";
import { API } from "../../constant";
import { message } from "antd";
import { QueriesByFilters } from "../../utils/QueriesByFilters";
import { getMyProperties } from "../../api/propertiesApi";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import axios from "axios";
import { createNotification, getToken } from "../../utils/helpers";
import enviarCorreoPersonalizado from "../../utils/email/send-personalized-email";

const MyPropertyList = () => {
  const { data: userData } = useQuery("profile", authUserData);
  const [propertyList, setPropertyList] = useState();
  const [filterRecords, setFilterRecords] = useState([]);
  const [visibleRecords, setVisibleRecords] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [loadCount, setLoadCount] = useState(5);
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const userId = userData?.id;
  const { data, isLoading: loadingProperties } = useQuery(
    "myProperties",
    () => getMyProperties(userId),
    {
      onSuccess: (data) => {
        const foundedProperties = [];
        data.data.forEach((property) => {
          foundedProperties.push(property);
        });
        setPropertyList(foundedProperties);
        setFilterRecords(foundedProperties);
      },
    }
  );
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
            .invalidateQueries(["myProperties"])
            .then((resultado) => console.log(resultado));
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
  useEffect(() => {
    setVisibleRecords(propertyList?.slice(0, loadCount));
  }, [propertyList, loadCount]);
  const handleScroll = () => {
    if (
      window.innerHeight + window.scrollY >=
      document.documentElement.scrollHeight
    ) {
      setLoadCount((prevCount) => prevCount + 5);
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  const handleFilter = (event) => {
    const searchData = filterRecords.filter((row) =>
      row.attributes.uniqueId
        .toLowerCase()
        .includes(event.target.value.toLowerCase())
    );

    setPropertyList(searchData);
  };
  if (!propertyList) {
    return <MySpinner />;
  }

  /* return (
    <div>
      <MetaData title="Mis propiedades" description="Mis propiedades" />
      <div className="">
        <div className="mx-8 mb-3 flex flex-col justify-center text-center mt-4">
          <span className="font-semibold text-xl">Mi lista de propiedades</span>
        </div>
        <div id="data" className="text-semibold text-sm ml-[110px]"></div>
      </div>

      <div className="w-full flex flex-row max-[600px]:flex-col align-middle px-3 my-1">
        <div className="relative w-full flex justify-center">
          <input
            onChange={handleFilter}
            placeholder="Escriba el código"
            type="text"
            name="uniqueId"
            id="uniqueId"
            className="block  max-[500px]:-pl-4 w-full pr-10 p-4 pl-4 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>

      {visibleRecords?.length !== 0 ? (
        visibleRecords?.map((property) => {
          return (
            <div className="mb-3 mx-2">
              <SearchCard propiedad={[property]} />
            </div>
          );
        })
      ) : (
        <div className="mb-3 flex justify-center text-center mt-4">
          <span className="font-semibold flex justify-center text-lg">
            No hay propiedades para mostrar
          </span>
        </div>
      )}
    </div>
  );*/
  return (
    <div className="w-full">
      <MetaData title="Mis propiedades" description="Mis propiedades" />
      <div className="w-full px-4 my-1">
        <div className="relative w-full flex justify-center">
          <div className="absolute max-[500px]:hidden inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <BiSearch size={25} />
          </div>
          <input
            onChange={handleFilter}
            placeholder="Filtrar por código"
            type="text"
            className="block max-[500px]:w-[340px] max-[500px]:-pl-4 w-full pr-10 p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>
      {visibleRecords?.length ? (
        <div className="flex w-full justify-center flex-wrap mb-4">
          {visibleRecords.map((row) => (
            <div className="w-[340px] flex justify-between flex-col my-2 p-4 mx-1 bg-white border border-gray-300 rounded-lg shadow">
              <div className="flex items-center justify-between mb-4">
                <span className="text-lg font-bold leading-none text-gray-900 ">
                  Detalles del inmueble
                </span>
                <span className="font-semibold text-blue-700 text-xs">
                  {row.attributes.moneda}
                  {row.attributes.precio}
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
              <div className="flex items-center justify-center mt-0  space-x-4">
                <div className="mt-2 flex justify-center flex-row">
                  <button
                    className="detailButton"
                    onClick={() =>
                      navigate(
                        `/home/shared-property/${row.attributes.uniqueId}`
                      )
                    }
                  >
                    Detalles
                  </button>
                  <button
                    className="editButton mx-2"
                    onClick={() =>
                      navigate(`/properties/edit-property/${row.id}`)
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
          No hay propiedades para mostrar
        </span>
      )}
    </div>
  );
};

export default MyPropertyList;
