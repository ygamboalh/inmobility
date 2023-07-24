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
  const [listedProperties, setListedProperties] = useState([]);

  let portafolioProperties = [];
  const navigate = useNavigate();
  const location = useLocation();
  const idPortafolio = location.state.id;
  console.log("id del portafolio", idPortafolio);
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
  /* const countingPortfolios = () => {
    setIsLoading(false);
    const response = axios(
      `${API}portafolios?filters[creadoPor][$eq]=${userData?.id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken()}`,
        },
      }
    )
      .then((response) => {
        const count = response?.data?.data.length;
        console.log("cantidad de portafolios", count);
        return count;
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }; */

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
      console.log(totalPortfolios);
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
            console.log("respuesta de guardar el portafolio", response);
            message.success("¡El portafolio fue creado correctamente!");
            navigate("/home/portfolio");
          })
          .catch((error) => {
            console.log("ocurrio este error", error);
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

  const AddProperty = (id) => {
    if (!portafolioProperties?.includes(id)) {
      portafolioProperties.push(id);
    }
    console.log(portafolioProperties);
    return portafolioProperties;
  };

  const RemoveProperty = (id) => {
    const newArray = portafolioProperties.filter(
      (elemento) => elemento.id !== id
    );
    console.log("quitado", newArray);
    return newArray;
  };
  console.log("suelto", portafolioProperties);
  const column = [
    {
      name: "ID",
      selector: (row) => row.id,
      sortable: true,
      width: "60px",
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
      name: "Canton",
      id: "canton",
      selector: (row) => row.attributes.canton,
      sortable: true,
      width: "150px",
    },
    {
      name: "Tipo de Propiedad",
      id: "tipoPropiedad",
      selector: (row) => row.attributes.tipoPropiedad,
      sortable: true,
      width: "230px",
    },
    {
      name: "Área terreno",
      id: "areaTerreno",
      selector: (row) => row.attributes.areaTerreno,
      sortable: true,
      width: "120px",
    },
    {
      name: "Precio",
      id: "precio",
      selector: (row) => row.attributes.precio,
      sortable: true,
      width: "90px",
    },
    {
      cell: (row) =>
        !portafolioProperties.includes(row.id) ? (
          <button
            className="bg-green-400 rounded-md h-6 w-20 text-white"
            onClick={
              () => AddProperty(row.id)
              /* setListedProperties(AddProperty(row.id));
              console.log(listedProperties); */
            }
          >
            Agregar
          </button>
        ) : (
          <button
            className="bg-red-700 rounded-md h-6 w-20 text-white"
            onClick={() => RemoveProperty(row.id, portafolioProperties)}
          >
            Eliminar
          </button>
        ),
      accessor: "id",
      id: "add",
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
      width: "125px",
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
            <div className="flex justify-start">
              <span>{portafolioProperties[0]}</span>
            </div>
          </div>
        }
      ></DataTable>
    </div>
  );
};

export default SearchResults;
