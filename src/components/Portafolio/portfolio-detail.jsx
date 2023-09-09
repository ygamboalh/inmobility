import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useQuery } from "react-query";

import axios from "axios";
import withReactContent from "sweetalert2-react-content";
import { useFormik } from "formik";
import * as Yup from "yup";

import MySpinner from "../Spinner/spinner";
import Swal from "sweetalert2";
import { API } from "../../constant";
import { getToken } from "../../utils/helpers";
import { authUserData } from "../../api/usersApi";
import {
  BiArea,
  BiBuildingHouse,
  BiConfused,
  BiCurrentLocation,
  BiDislike,
  BiHomeAlt,
  BiLike,
  BiMap,
} from "react-icons/bi";
import { message } from "antd";
import AddPropertyModal from "../Modals/add-property-modal";
import MetaData from "../Metadata/metadata";

const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

export const PortafolioDetail = () => {
  const { data: userData } = useQuery("profile", authUserData);
  const location = useLocation();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [pending, setPending] = useState(true);
  const [records, setRecords] = useState([]);
  const [portafolio, setPortafolio] = useState();
  const [filterRecords, setFilterRecords] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newPropertiesList, setNewPropertiesList] = useState([]);

  useEffect(() => {
    const data = location.state;
    const properties = data?.row.attributes.properties.data;
    setRecords(properties);
    setPending(false);
    setPortafolio(data?.row);

    setFilterRecords(properties);
  }, []);
  function deleteRowF(id, records) {
    const newData = records.filter((item) => item.id !== id);
    setRecords(newData);
    return newData;
  }

  const deleteRow = async (id, records) => {
    const MySwal = withReactContent(Swal);
    MySwal.fire({
      title: "¿Desea eliminar el inmueble?",
      showDenyButton: true,
      confirmButtonText: "Sí, eliminar",
      confirmButtonColor: "#1863e4",
      denyButtonText: `No`,
    }).then((result) => {
      if (result.isConfirmed) {
        deleteRowF(id, records);
      }
    });
  };

  const { handleChange, handleSubmit, values, errors, touched } = useFormik({
    initialValues: {
      clienteComprador: portafolio?.attributes.clienteComprador,
      correoCliente: portafolio?.attributes.correoCliente,
    },
    /* validationSchema: Yup.object({
      clienteComprador: Yup.string()
        .required("¡El nombre es requerido!")
        .min(6, "¡Muy corto!")
        .max(50, "¡Muy largo!"),
      correoCliente: Yup.string()
        .matches(emailRegex, "¡Correo inválido!")
        .required("¡El correo es requerido!"),
    }), */
    onSubmit: async (values) => {
      setIsLoading(true);
      const id = userData?.id;
      console.log(values);

      const newProperties = [];
      records?.map((record) => {
        newProperties.push(record.id);
      });
      newProperties.push(...newPropertiesList);

      let cliente = "";
      let correo = "";
      values.clienteComprador === undefined
        ? (cliente = portafolio?.attributes.clienteComprador)
        : (cliente = values.clienteComprador);
      values.correoCliente === undefined
        ? (correo = portafolio?.attributes.correoCliente)
        : (correo = values.correoCliente);

      const value = {
        creadoPor: id,
        clienteComprador: cliente,
        correoCliente: correo,
        properties: newProperties,
        telefonoAsesor: portafolio.attributes.telefonoAsesor,
        correoAsesor: portafolio.attributes.correoAsesor,
        categoria: portafolio.attributes.categoria,
      };
      console.log("los valores", value);
      const response = axios(`${API}portafolios/${portafolio.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken()}`,
        },
        data: { data: value },
      })
        .then((result) => {
          message.success("Portafolio actualizado correctamente");
          navigate("/home/portfolio");
        })
        .finally(() => {
          setIsLoading(false);
        });
    },
  });
  if (isLoading || !records) {
    return <MySpinner />;
  }
  function selectReaction(reaction) {
    switch (reaction) {
      case "Me Gusta, deseo verlo":
        return <BiLike fill="blue" size={30} />;
      case "No es lo que busco":
        return <BiDislike fill="red" size={30} />;
      case "Indeciso(a)":
        return <BiConfused fill="green" size={30} />;
      default:
        return <span>-</span>;
    }
  }
  const handleDataFromChildModal = (data) => {
    setShowModal(data.close);
    setNewPropertiesList(data.propertyList);
  };
  const handleFilter = (event) => {
    const searchData = filterRecords.filter((row) =>
      row.attributes.tipoPropiedad
        .toLowerCase()
        .includes(event.target.value.toLowerCase())
    );
    setRecords(searchData);
  };
  return (
    <div className="flex justify-center flex-wrap mx-3">
      <MetaData
        title="Detalles del portafolio"
        description="Detalles del portafolio"
      />
      <AddPropertyModal
        onDataReceived={handleDataFromChildModal}
        isVisible={showModal}
        category={portafolio?.attributes?.categoria}
      />
      <div className="flex flex-col items-center justify-center">
        <div className="flex flex-col w-fit justify-center items-center">
          <label className="text-xl mb-2 mt-2 font-semibold">
            Detalles del portafolio
          </label>
          <form onSubmit={handleSubmit} autoComplete="off">
            <input
              type="text"
              name="clienteComprador"
              onChange={handleChange}
              defaultValue={portafolio?.attributes?.clienteComprador}
              className="w-[350px] rounded-md border-gray-300 border"
              placeholder="Nombre del cliente comprador"
            />
            <div className="space flex justify-center mb-2 -mt-1">
              {errors.name && touched.name ? (
                <div className="errordivp text-xs">{errors.name}</div>
              ) : null}
            </div>
            <input
              type="email"
              name="correoCliente"
              onChange={handleChange}
              defaultValue={portafolio?.attributes.correoCliente}
              className="w-[350px] rounded-md border-gray-300 -mt-2"
              placeholder="Correo del cliente comprador"
            />
            <div className="space flex justify-center">
              {errors.email && touched.email ? (
                <div className="errordivp text-xs">{errors.email}</div>
              ) : null}
            </div>
            <div className="ml-0 flex justify-center">
              <button
                type="submit"
                className="rounded-md text-white mt-2  bg-green-400  h-10 w-40 mx-20"
              >
                Guardar cambios
              </button>
            </div>

            <div className="flex justify-center mt-4">
              <button
                onClick={() => {
                  setShowModal(true);
                }}
                type="button"
                className="bg-blue-700 rounded-md px-4 py-2 text-white"
              >
                Agregar otras propiedades
              </button>
            </div>
          </form>
        </div>
        <div className="my-3 w-[150px] flex justify-center mx-6">
          <input
            type="text"
            onChange={handleFilter}
            className="px-2 py-2 flex max-w-[930px] min-w-[350px] border border-gray-300 rounded-md"
            placeholder="Filtrar por tipo de propiedad"
          />
        </div>
        <div className="flex w-full justify-center flex-wrap mx-3">
          {records.map((record) => {
            return (
              <div className="max-w-md w-[350px] my-2 p-4 mx-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-lg font-bold leading-none text-gray-900 ">
                    Detalles del inmueble
                  </span>
                  <span className="font-semibold text-blue-700 text-xs">
                    {record.attributes.moneda}
                    {record.attributes.precio}
                  </span>
                </div>
                <hr />
                <div className="flow-root w-full">
                  <ul className="divide-y divide-gray-200">
                    <li className="py-3 sm:py-4">
                      <div className="flex items-center space-x-4">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center align-middle -mt-2 mb-2 flex-row">
                            <BiHomeAlt size={25} />
                            <p className="text-sm font-medium mt-2 text-gray-900 truncate">
                              {record.attributes.tipoPropiedad}
                            </p>
                          </div>
                          <hr />
                          <div className="flex my-2 flex-row">
                            <span className="ml-[2px]">
                              <BiCurrentLocation size={20} />
                            </span>
                            <p className="text-sm text-gray-500 truncate">
                              {record.attributes.provincia}
                            </p>
                          </div>
                          <hr />
                          <div className="flex my-2 flex-row">
                            <span className="ml-[2px]">
                              <BiMap size={20} />
                            </span>
                            <p className="text-sm text-gray-500 truncate">
                              {record.attributes.canton}
                            </p>
                          </div>
                          <hr />
                          <div className="flex my-2 flex-row">
                            <span className="ml-[2px]">
                              <BiBuildingHouse size={20} />
                            </span>
                            <p className="text-sm text-gray-500 truncate">
                              {record.attributes.distrito}
                            </p>
                          </div>
                          <hr />

                          <div className="flex my-2 flex-row">
                            <span className="ml-[2px]">
                              <BiArea size={20} />
                            </span>
                            <p className="text-sm text-gray-500 truncate">
                              {record.attributes.areaTerreno} m<sup>2</sup>
                            </p>
                          </div>
                          <hr />
                        </div>

                        <div className="flex items-center max-w-45 h-20">
                          <div className="mb-3 w-28 h-36 items-center flex overflow-scroll">
                            <span className="text-xs">
                              {record.attributes.descripcion ? (
                                record.attributes.descripcion
                              ) : (
                                <span className="flex">
                                  No tiene descripción
                                </span>
                              )}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="mt-2 flex flex-row align-middle">
                        <div className="bg-blue-300 flex flex-row justify-center align-middle items-center rounded-full w-[40px] h-[40px]">
                          {selectReaction(record.attributes.reaccion)}
                        </div>
                        <span className="text-xs ml-1 align-middle mt-3 flex">
                          Reacción del cliente
                        </span>
                      </div>
                      <div className="flex items-center justify-center space-x-4">
                        <div className="mt-2 flex justify-center flex-row">
                          <button
                            type="button"
                            className="detailButton mr-1 text-sm"
                            onClick={() =>
                              navigate(
                                `/home/shared-property/${record?.attributes?.uniqueId}`
                              )
                            }
                          >
                            Detalles
                          </button>
                          <button
                            type="button"
                            onClick={() => deleteRow(record?.id, records)}
                            className="deleteButton text-sm"
                          >
                            Eliminar
                          </button>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
