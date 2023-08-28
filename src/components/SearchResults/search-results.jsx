import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import DataTable from "react-data-table-component";

import MySpinner from "../Spinner/spinner";
import Swal from "sweetalert2";
import axios from "axios";
import { API } from "../../constant";
import { getToken } from "../../utils/helpers";
import { message } from "antd";
import { authUserData } from "../../api/usersApi";
import { useQuery } from "react-query";
import { getAllPortafolios } from "../../api/propertiesApi";

const SearchResults = () => {
  const [records, setRecords] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filterRecords, setFilterRecords] = useState([]);
  const [clientName, setClienteName] = useState();
  const [clientEmail, setClienteEmail] = useState();
  const [isLoading, setIsLoading] = useState(false);

  let portafolioProperties = [];
  const navigate = useNavigate();
  const location = useLocation();

  const { data: userData } = useQuery("profile", authUserData);

  const paginationComponentOptions = {
    rowsPerPageText: "Inmuebles por página",
    rangeSeparatorText: "de",
    selectAllRowsItem: true,
    selectAllRowsItemText: "Todos",
  };

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

  useEffect(() => {
    const data = location.state.propertyList;
    const categories = location.state.categories;
    setCategories(categories);
    setRecords(data);
    setFilterRecords(data);
  }, []);

  const savePortafolio = () => {
    setIsLoading(true);
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

  const showData = () => {
    let datosContainer = document.getElementById("data");
    datosContainer.innerHTML = "";
    const datosSpan = document.createElement("span");
    datosSpan.textContent = `Propiedades seleccionadas: ${portafolioProperties}`;

    datosContainer = document.getElementById("data");
    datosContainer.appendChild(datosSpan);
  };

  const createPortafolio = async () => {
    const { value: formValues } = await Swal.fire({
      title: "Proporcione los datos",
      width: 420,
      confirmButtonText: "Guardar",
      confirmButtonColor: "#1863e4",
      html:
        `<input id="name" required class="swal2-input" autoComplete="off" placeholder="Nombre del cliente">` +
        '<input id="email" required autoComplete="off" class="swal2-input" placeholder="Correo del cliente">',
      focusConfirm: false,
      preConfirm: () => {
        return [
          document.getElementById("name").value,
          document.getElementById("email").value,
        ];
      },
    });

    if (formValues) {
      const name = eliminarCaracter(JSON.stringify(formValues[0]), '"');
      const email = eliminarCaracter(JSON.stringify(formValues[1]), '"');
      setClienteName(name);
      setClienteEmail(email);
      //Swal.fire(JSON.stringify(formValues));
    }
  };
  function eliminarCaracter(cadena, caracter) {
    const expresionRegular = new RegExp(caracter, "g");
    return cadena.replace(expresionRegular, "");
  }

  function AddProperty(id) {
    if (!portafolioProperties?.includes(id)) {
      portafolioProperties.push(id);
    } else {
      portafolioProperties = portafolioProperties.filter(
        (element) => element !== id
      );
    }

    showData();

    return portafolioProperties;
  }

  const column = [
    {
      name: "ID",
      selector: (row) => row.id,
      sortable: true,
      width: "65px",
      id: "id",
    },
    {
      name: "ID Único",
      selector: (row) => row.attributes.uniqueId,
      sortable: true,
      width: "120px",
      id: "uniqueId",
    },
    {
      name: "Categoria",
      id: "categoria",
      selector: (row, index) => categories,
      sortable: true,
      width: "150px",
    },
    {
      name: "Provincia",
      id: "provincia",
      selector: (row) => row.attributes.provincia,
      sortable: true,
      width: "120px",
    },
    {
      name: "Distrito",
      id: "distrito",
      selector: (row) => row.attributes.distrito,
      sortable: true,
      width: "130px",
    },
    {
      name: "Cantón",
      id: "canton",
      selector: (row) => row.attributes.canton,
      sortable: true,
      width: "140px",
    },
    {
      name: "Tipo de Propiedad",
      id: "tipoPropiedad",
      selector: (row) => row.attributes.tipoPropiedad,
      sortable: true,
      width: "230px",
    },
    {
      name: "Área de terreno",
      id: "areaTerreno",
      selector: (row) => row.attributes.areaTerreno,
      sortable: true,
      width: "130px",
    },
    {
      name: "Precio",
      id: "precio",
      selector: (row) => row.attributes.moneda + row.attributes.precio,
      sortable: true,
      width: "90px",
    },
    {
      cell: (row) => (
        <div>
          {userData?.active === "Asesor verificado" ||
          userData?.active === "Super Administrador" ||
          userData?.active === "Supervisor" ? (
            <button
              button
              onClick={() => {
                AddProperty(row.id);
              }}
              className={
                !portafolioProperties?.includes(row.id)
                  ? "bg-green-400 rounded-md h-6 font-semibold w-12 hover:bg-green-600 text-black"
                  : "bg-red-400 rounded-md h-6 w-20 text-white"
              }
            >
              + -
            </button>
          ) : null}
        </div>
      ),

      accessor: "id",
      id: "add",
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
      width: "70px",
    },
    {
      cell: (row) => (
        <button
          className="detailButton"
          onClick={() => navigate(`/home/search/property-detail/${row.id}`)}
        >
          Detalles
        </button>
      ),
      accessor: "id",
      id: "detail",
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
      width: "75px",
    },
  ];
  const handleFilter = (event) => {
    const searchData = filterRecords.filter((row) =>
      row.attributes.tipoPropiedad
        .toLowerCase()
        .includes(event.target.value.toLowerCase())
    );
    setRecords(searchData);
  };

  return (
    <div className="w-full  z-1 px-4">
      <DataTable
        columns={column}
        data={records}
        pagination
        fixedHeader
        fixedHeaderScrollHeight="550px"
        selectableRowsHighlight
        title="Resultados de la búsqueda"
        //progressPending={pending}
        highlightOnHover
        progressComponent={<MySpinner />}
        paginationComponentOptions={paginationComponentOptions}
        subHeader
        subHeaderComponent={
          <div className="flex flex-col w-full">
            <div className="relative w-full my-1 px-2 flex flex-row justify-center min-[340px]:flex-col  sm:flex-col">
              <input
                type="text"
                onChange={handleFilter}
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
                placeholder="Filtrar por tipo de propiedad"
              />
            </div>
            {userData?.active === "Asesor verificado" ||
            userData?.active === "Super Administrador" ||
            userData?.active === "Supervisor" ? (
              <div className="flex justify-start ">
                {clientEmail && clientName ? (
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
                      className="rounded-md text-white bg-green-400  h-10 w-44 mx-12"
                      onClick={createPortafolio}
                    >
                      Crear Portafolio
                    </button>
                  </div>
                )}
              </div>
            ) : null}
            <div
              id="data"
              className="flex flex-col items-start justify-center mt-1"
            ></div>
          </div>
        }
      ></DataTable>
    </div>
  );
};

export default SearchResults;
