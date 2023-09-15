import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";

import { message } from "antd";
import axios from "axios";

import MySpinner from "../Spinner/spinner";
import { API } from "../../constant";

import SearchCard from "./property-card";
import { authUserData } from "../../api/usersApi";
import { getAllPortafolios } from "../../api/propertiesApi";
import { getToken } from "../../utils/helpers";
import CreatePortfolioModal from "../Modals/create-portfolio-modal";

const SearchResultsCard = () => {
  const [clientName, setClienteName] = useState();
  const [clientEmail, setClienteEmail] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [dataFromChild, setDataFromChild] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [created, setCreated] = useState(false);
  const navigate = useNavigate();
  const { data: userData } = useQuery("profile", authUserData);
  const location = useLocation();
  const propertyList = location.state.propertyList;
  let portafolioProperties = [];

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
      },
    }
  );

  function isEqualObjects(obj1, obj2) {
    return JSON.stringify(obj1) === JSON.stringify(obj2);
  }

  const handleDataFromChild = (data) => {
    let oldList = [];
    let founded = null;
    oldList = dataFromChild;
    let listaAux = [];
    if (oldList?.length > 0) {
      oldList.forEach((child) => {
        if (isEqualObjects(child, data)) {
          listaAux = oldList.filter((child2) => child2.id !== data.id);
          setDataFromChild(listaAux);
        } else {
          founded = oldList.find((objet) => objet.id === data.id);
          if (!founded) {
            oldList.push(data);
            setDataFromChild(oldList);
          }
        }
      });
    } else {
      oldList.push(data);
      setDataFromChild(oldList);
    }
  };
  useEffect(() => {
    const categories = location.state.categories;
    setCategories(categories);
  }, []);

  const savePortafolio = () => {
    setIsLoading(true);
    dataFromChild.map((item) => {
      portafolioProperties.push(item.id);
    });
    const id = userData?.id;
    const mobile = userData?.mobile;
    const email = userData?.email;
    const values = {
      creadoPor: id,
      clienteComprador: clientName,
      correoCliente: clientEmail,
      properties: portafolioProperties,
      telefonoAsesor: mobile,
      correoAsesor: email,
      categoria: categories,
    };

    if (portafolioProperties.length > 0) {
      const totalPortfolios = data.data.length;

      if (totalPortfolios < 100) {
        const response = axios(`${API}portafolios`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getToken()}`,
          },
          data: { data: values },
        })
          .then((response) => {
            message.success("¡El portafolio fue creado correctamente!");
            navigate("/home/portfolio");
          })
          .catch((error) => {
            console.log(error);
          })
          .finally(() => {
            setIsLoading(false);
          });
      } else {
        message.error("¡No puedes crear más de 100 portfolios!");
      }
    } else {
      message.error("¡No ha seleccionado ninguna propiedad!");
    }
  };

  const handleDataFromChildModal = (data) => {
    setShowModal(data.close);
    if (
      data?.data?.clienteComprador !== undefined &&
      data?.data?.correoCliente !== undefined
    ) {
      setClienteName(data.data.clienteComprador);
      setClienteEmail(data.data.correoCliente);
      setCreated(true);
    }
  };

  if (!propertyList || propertyList.length === 0 || isLoading) {
    return <MySpinner />;
  }
  return (
    <div>
      <div className="">
        {propertyList?.length < 1 || !propertyList ? (
          <div className="fixed mx-8 mb-3 flex justify-center text-center mt-4">
            <span className="font-semibold text-lg">
              No se ha encontrado ningún inmueble con sus criterios de búsqueda
            </span>
          </div>
        ) : (
          <div className="mx-8 mb-3 flex flex-col justify-center text-center mt-4">
            <span className="font-semibold text-xl">
              Resultados de la búsqueda
            </span>
            <div className="flex justify-center items-center content-center">
              {userData?.active === "Asesor verificado activo" ||
              userData?.active === "Super Administrador" ||
              userData?.active === "Supervisor" ? (
                <div className="flex">
                  {clientEmail && clientName && created ? (
                    <div>
                      <button
                        className="rounded-md text-white bg-blue-500 w-44 h-10 -mb-4  mx-12"
                        onClick={savePortafolio}
                      >
                        Guardar Portafolio
                      </button>
                    </div>
                  ) : (
                    <div>
                      <button
                        type="button"
                        className="rounded-md text-white bg-green-400 -mb-4  h-10 w-44 mx-12"
                        onClick={() => {
                          setShowModal(true);
                        }}
                      >
                        Crear Portafolio
                      </button>
                    </div>
                  )}
                </div>
              ) : null}
            </div>
          </div>
        )}
        <div id="data" className="text-semibold text-sm ml-[110px]"></div>
        <CreatePortfolioModal
          onDataReceived={handleDataFromChildModal}
          isVisible={showModal}
        />
      </div>
      {propertyList?.length !== 0
        ? propertyList?.map((property) => {
            return (
              <div className="mb-3 mt-3 mx-2">
                <SearchCard
                  propiedad={[
                    property,
                    created,
                    clientName,
                    clientEmail,
                    categories,
                  ]}
                  onDataReceived={handleDataFromChild}
                />
              </div>
            );
          })
        : "no hay datos para mostrar"}
      <div className="flex justify-center">
        <div className="flex justify-center items-center content-center">
          {userData?.active === "Asesor verificado activo" ||
          userData?.active === "Super Administrador" ||
          userData?.active === "Supervisor" ? (
            <div className="flex">
              {clientEmail && clientName && created ? (
                <div>
                  <button
                    className="rounded-md text-white bg-blue-500 w-44 h-10 mt-4  mx-12"
                    onClick={savePortafolio}
                  >
                    Guardar Portafolio
                  </button>
                </div>
              ) : (
                <div>
                  <button
                    type="button"
                    className="rounded-md text-white bg-green-400 mt-4  h-10 w-44 mx-12"
                    onClick={() => {
                      setShowModal(true);
                    }}
                  >
                    Crear Portafolio
                  </button>
                </div>
              )}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default SearchResultsCard;
