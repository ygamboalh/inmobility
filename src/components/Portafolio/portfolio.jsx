import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery, useQueryClient } from "react-query";

import axios from "axios";
import Swal from "sweetalert2";
import DataTable from "react-data-table-component";
import withReactContent from "sweetalert2-react-content";

import { authUserData } from "../../api/usersApi";
import { API } from "../../constant";
import { getToken } from "../../utils/helpers";
import { getAllPortafolios } from "../../api/propertiesApi";
import MySpinner from "../Spinner/spinner";

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
            .then((resultado) =>
              console.log("resultado de eliminar el portfolio", resultado)
            );
        });
        if (result) {
          Swal.fire("Portafolio eliminado!", "");
        } else {
          Swal.fire("El Portafolio no fue eliminado", "");
        }
      } else if (result.isDenied) {
        Swal.fire("El Portafolio no fue eliminado", "");
      }
    });
  };
  const paginationComponentOptions = {
    rowsPerPageText: "Portafolios por página",
    rangeSeparatorText: "de",
    selectAllRowsItem: true,
    selectAllRowsItemText: "Todos",
  };
  const handleFilter = (event) => {
    const searchData = filterRecords.filter((row) =>
      row.attributes.clienteComprador
        .toLowerCase()
        .includes(event.target.value.toLowerCase())
    );
    setRecords(searchData);
  };
  if (!records) {
    return <MySpinner />;
  }
  const column = [
    {
      name: "ID",
      selector: (row) => row.id,
      sortable: true,
      width: "60px",
      id: "id",
    },
    {
      name: "Cliente",
      id: "cliente",
      selector: (row, index) => row.attributes.clienteComprador,
      sortable: true,
      width: "250px",
    },
    {
      name: "Correo",
      id: "provincia",
      selector: (row) => row.attributes.correoCliente,
      sortable: true,
      width: "210px",
    },
    {
      name: "Categoría",
      id: "categoria",
      selector: (row) => row.attributes.categoria,
      sortable: true,
      width: "250px",
    },
    {
      name: "Propiedades",
      id: "distrito",
      selector: (row) => row.attributes.properties.data.length,
      sortable: true,
      width: "130px",
    },
    {
      name: "Fecha de creado",
      id: "creado",
      selector: (row) => row.attributes.updatedAt.slice(0, 10),
      sortable: true,
      width: "200px",
    },
    {
      cell: (row) => (
        <button
          className="detailButton"
          onClick={() =>
            navigate(`/home/portfolio/portfolio-detail`, {
              state: { row },
            })
          }
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
    {
      cell: (row) => (
        <button
          className="editButton"
          onClick={() =>
            navigate(`/home/portfolio/share-portfolio/${row.id}`, {
              state: { row },
            })
          }
        >
          Compartir
        </button>
      ),
      accessor: "id",
      id: "share",
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
      width: "90px",
    },
    {
      cell: (row) => (
        <button
          className="deleteButton"
          onClick={() => DeletePortfolio(row.id)}
        >
          Eliminar
        </button>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
      id: "delete",
      width: "80px",
    },
  ];
  return (
    <div className="w-full">
      <DataTable
        columns={column}
        data={records}
        pagination
        fixedHeader
        fixedHeaderScrollHeight="550px"
        selectableRowsHighlight
        title="Mis portafolios"
        progressPending={pending}
        highlightOnHover
        progressComponent={<MySpinner />}
        paginationComponentOptions={paginationComponentOptions}
        subHeader
        subHeaderComponent={
          <div className="relative w-full my-1 px-2">
            <input
              type="text"
              onChange={handleFilter}
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
              placeholder="Filtrar por nombre del cliente"
            />
          </div>
        }
      ></DataTable>
    </div>
  );
};
export default Portafolio;
