import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import MySpinner from "../Spinner/spinner";
import { BiMailSend, BiPhoneCall } from "react-icons/bi";
import AxiosInstance from "../../api/AxiosInstance";
import { API } from "../../constant";
import PortafolioCard from "../Portafolio/portfolio-card";
import SearchCard from "./property-card";
import { authUserData } from "../../api/usersApi";
import { useQuery } from "react-query";
import { getAllPortafolios } from "../../api/propertiesApi";
import { getToken } from "../../utils/helpers";
import axios from "axios";
import { Select, message } from "antd";
import Swal from "sweetalert2";
import MetaData from "../Metadata/metadata";
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

  //setProperties(location.state.propertyList);
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
          <div className="mx-8 mb-3 flex justify-center text-center mt-4">
            <span className="font-semibold text-xl">
              Resultados de la búsqueda
            </span>
          </div>
        )}
        <div id="data" className="text-semibold text-sm ml-[110px]"></div>
        <CreatePortfolioModal
          onDataReceived={handleDataFromChildModal}
          isVisible={showModal}
        />
        <div className="ml-[58px]">
          {userData?.active === "Asesor verificado" ||
          userData?.active === "Super Administrador" ||
          userData?.active === "Supervisor" ? (
            <div className="flex justify-start ">
              {clientEmail && clientName && created ? (
                <div>
                  <button
                    className="rounded-md text-white bg-blue-500 w-44 h-10  mx-12"
                    onClick={savePortafolio}
                  >
                    Guardar Portafolio
                  </button>
                </div>
              ) : (
                <div>
                  <button
                    type="button"
                    className="rounded-md text-white bg-green-400  h-10 w-44 mx-12"
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
    </div>
  );
};

export default SearchResultsCard;
