import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery, useQueryClient } from "react-query";

import axios from "axios";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

import { authUserData } from "../../api/usersApi";
import { API } from "../../constant";
import { getToken } from "../../utils/helpers";
import { getAllPortafolios } from "../../api/propertiesApi";
import MySpinner from "../Spinner/spinner";
import { BiCopyAlt, BiHomeAlt, BiMailSend, BiUserCircle } from "react-icons/bi";
import MetaData from "../Metadata/metadata";

const Portafolio = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [records, setRecords] = useState([]);
  const [pending, setPending] = useState(true);

  const [filterRecords, setFilterRecords] = useState([]);
  const { data: userData, loading } = useQuery("profile", authUserData);

  const { data, isLoading: loadingPortfolios } = useQuery(
    "portafolios",
    getAllPortafolios,
    {
      onSuccess: (data) => {
        const foundedPortafolios = [];
        data.data.forEach((port) => {
          if (port.attributes.creadoPor === userData?.id) {
            foundedPortafolios.push(port);
          }
        });
        setRecords(foundedPortafolios);
        setFilterRecords(foundedPortafolios);
        setPending(false);
      },
    }
  );

  const DeletePortfolio = async (id) => {
    const MySwal = withReactContent(Swal);
    //setIsLoading(true);
    MySwal.fire({
      title: "¿Desea eliminar el portafolio?",
      showDenyButton: true,
      confirmButtonText: "Sí, eliminar",
      confirmButtonColor: "#1863e4",

      denyButtonText: `No`,
    }).then((result) => {
      if (result.isConfirmed) {
        const response = axios(`${API}portafolios/${id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getToken()}`,
          },
        }).then((result) => {
          const property = result.data.data.attributes;
          queryClient
            .invalidateQueries(["portafolios"])
            .then((resultado) => {});
        });
        if (result) {
          Swal.fire("Portafolio eliminado!", "");
        } else {
          Swal.fire("El Portafolio no fue eliminado", "");
        }
      }
    });
  };
  const handleFilter = (event) => {
    const searchData = filterRecords.filter((row) =>
      row.attributes.clienteComprador
        .toLowerCase()
        .includes(event.target.value.toLowerCase())
    );
    setRecords(searchData);
  };
  function copyToPaper(text) {
    navigator.clipboard.writeText(`https://siccic.com${text}`);
  }
  if (!records) {
    return <MySpinner />;
  }
  return (
    <div className="w-full">
      <MetaData title="Mis portafolios" description="Mis portafolios" />
      <div className="w-full justify-center items-center flex flex-col">
        <div className="flex flex-col items-center justify-center">
          {!records || records?.length === 0 ? (
            <span className="text-lg font-semibold mt-4">
              No tienes portafolios creados
            </span>
          ) : (
            <div>
              <div className="flex flex-col w-fit justify-center mt-3 items-center">
                <label className="text-xl font-semibold">
                  Mis portafolios personalizados
                </label>
              </div>
              <div className="w-[350px] my-3 flex justify-center px-36">
                <input
                  type="text"
                  onChange={handleFilter}
                  className="px-2 py-2 flex max-w-[930px] w-full min-w-[350px] border border-gray-300 rounded-md"
                  placeholder="Filtrar por cliente"
                />
              </div>
            </div>
          )}
          <div className="flex justify-center flex-wrap mx-3">
            {records.map((record) => {
              return (
                <div className="w-full max-w-md my-2 p-4 mx-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8">
                  <div className="flex items-center justify-between mb-4">
                    <h5 className="text-md mr-2 font-bold leading-none text-gray-900 dark:text-white">
                      Detalles del portafolio
                    </h5>
                    <span className="font-semibold text-blue-700 text-xs">
                      {record.attributes.updatedAt.slice(0, 10)}
                    </span>
                  </div>
                  <hr />
                  <div className="flow-root">
                    <ul className="divide-y divide-gray-200">
                      <li className="py-3 sm:py-4">
                        <div className="flex items-center space-x-4">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center align-middle -mt-2 mb-2 flex-row">
                              <BiHomeAlt size={25} />
                              <p className="text-sm font-medium mt-2 text-gray-900 truncate">
                                {record.attributes.categoria}
                              </p>
                            </div>
                            <hr />
                            <div className="flex my-2 flex-row">
                              <span className="ml-[3px]">
                                <BiUserCircle size={20} />
                              </span>
                              <p className="text-sm text-gray-500 truncate">
                                {record.attributes.clienteComprador}
                              </p>
                            </div>
                            <hr />
                            <div className="flex my-2 flex-row">
                              <span className="ml-[3px]">
                                <BiMailSend size={20} />
                              </span>
                              <p className="text-sm text-gray-500 truncate">
                                {record.attributes.correoCliente}
                              </p>
                            </div>

                            <hr />
                            <div className="flex flex-row justify-between">
                              <div className="mt-2 flex flex-row align-middle items-center">
                                <div className="bg-blue-300 flex justify-center align-middle items-center rounded-full w-[30px] h-[30px]">
                                  {record.attributes.properties.data.length}{" "}
                                </div>
                                <div>
                                  <span className="ml-2 text-sm">
                                    Propiedades
                                  </span>
                                </div>
                              </div>
                              <div className="mt-3 text-sm align-middle flex flex-row">
                                <span className="text-xs mr-1 mt-1">
                                  Enlace para compartir
                                </span>
                                <button
                                  type="button"
                                  onClick={() =>
                                    copyToPaper(
                                      `/home/portfolio/share-portfolio/${record.id}`
                                    )
                                  }
                                >
                                  <BiCopyAlt size={25} />
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center justify-center space-x-4">
                          <div className="mt-2 flex justify-center flex-row">
                            <button
                              type="button"
                              className="detailButton mr-1 text-sm"
                              onClick={() =>
                                navigate(`/home/portfolio/portfolio-detail`, {
                                  state: { row: record },
                                })
                              }
                            >
                              Administrar aglomerado
                            </button>
                            <button
                              type="button"
                              className="editButton mr-1 text-sm"
                              onClick={() =>
                                navigate(
                                  `/home/portfolio/share-portfolio/${record.id}`,
                                  {
                                    state: { row: record },
                                  }
                                )
                              }
                            >
                              Vista del cliente
                            </button>
                            <button
                              type="button"
                              onClick={() => DeletePortfolio(record.id)}
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
    </div>
  );
};
export default Portafolio;
