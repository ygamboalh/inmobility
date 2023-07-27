import React, { useEffect, useState } from "react";
import { getAllPropertiesRQ } from "../../../api/propertiesApi";
import DataTable from "react-data-table-component";
import { useQuery, useQueryClient } from "react-query";
import { API } from "../../../constant";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { createNotification, getToken } from "../../../utils/helpers";
import MySpinner from "../../../components/Spinner/spinner";
import enviarCorreoPersonalizado from "../../../utils/email/send-personalized-email";
import { authUserData } from "../../../api/usersApi";

const PropertiesList = () => {
  const queryClient = useQueryClient();
  const [isLoading, setIsLoading] = useState(false);
  const [records, setRecords] = useState([]);
  const [pending, setPending] = React.useState(true);
  const [filterRecords, setFilterRecords] = useState([]);
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
        console.log(foundedProperties);
        setRecords(foundedProperties);
        setFilterRecords(foundedProperties);
        setPending(false);
      },
    }
  );

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
            `Se ha eliminado la propiedad ${id}`,
            id
          );
          const body = `El siguiente inmueble ha sido eliminado por el usuario: ${userData.email}`;
          enviarCorreoPersonalizado("infosistemacic@gmail.com", property, body);
          queryClient
            .invalidateQueries(["properties"])
            .then((resultado) => console.log(resultado));
        });
        if (result) {
          Swal.fire("Inmueble eliminado!", "", "success");
        } else {
          Swal.fire("El Inmueble no fue eliminado", "", "error");
        }
      } else if (result.isDenied) {
        Swal.fire("El Inmueble no fue eliminado", "", "info");
      }
    });

    setIsLoading(false);
  };

  const paginationComponentOptions = {
    rowsPerPageText: "Inmuebles por página",
    rangeSeparatorText: "de",
    selectAllRowsItem: true,
    selectAllRowsItemText: "Todos",
  };

  const column = [
    {
      name: "ID",
      selector: (row) => row.id,
      sortable: true,
      width: "60px",
      id: "id",
    },
    {
      name: "Categoria",
      id: "categoria",
      selector: (row, index) =>
        row.attributes.categories.data[0]?.attributes.nombre,
      sortable: true,
      width: "150px",
    },
    {
      name: "Provincia",
      id: "provincia",
      selector: (row) => row.attributes.provincia,
      sortable: true,
      width: "130px",
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
      name: "Habitaciones",
      id: "habitaciones",
      selector: (row) => row.attributes.habitaciones,
      sortable: true,
      width: "100px",
    },
    {
      name: "Precio",
      id: "precio",
      selector: (row) => row.attributes.precio,
      sortable: true,
      width: "90px",
    },
    {
      cell: (row) => (
        <button
          className="detailButton"
          onClick={() =>
            navigate(`/admin/properties/property-detail/${row.id}`)
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
            navigate(`/admin/properties/insert-property/${row.id}`)
          }
        >
          Editar
        </button>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
      id: "edit",
      width: "60px",
    },
    {
      cell: (row) => (
        <button className="deleteButton" onClick={() => DeleteProperty(row.id)}>
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
      <DataTable
        columns={column}
        data={records}
        pagination
        selectableRows
        fixedHeader
        fixedHeaderScrollHeight="550px"
        selectableRowsHighlight
        title="Propiedades activas"
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
              placeholder="Filtrar por tipo de propiedad"
            />
          </div>
        }
      ></DataTable>
    </div>
  );
};

export default PropertiesList;
