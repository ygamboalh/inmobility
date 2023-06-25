import React, { useEffect, useState } from "react";
import { getActiveProperties } from "../../../api/propertiesApi";
import DataTable from "react-data-table-component";
import { API } from "../../../constant";
import axios from "axios";
import { Spin } from "antd";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { getToken } from "../../../utils/helpers";

const PropertiesList = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [records, setRecords] = useState([]);
  const [pending, setPending] = React.useState(true);
  const [filterRecords, setFilterRecords] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const foundedProperties = [];
    const data = axios.get(`${API}properties`).then((res) => {
      res.data.data &&
        res.data.data.forEach((property) => {
          if (property.attributes.active === "Activo") {
            foundedProperties.push(property);
          }
        });

      setRecords(foundedProperties);
      setFilterRecords(foundedProperties);
      setPending(false);
    });
  }, []);

  const DeleteProperty = async (id) => {
    setIsLoading(true);
    const MySwal = withReactContent(Swal);
    MySwal.fire({
      title: "¿Desea eliminar el inmueble?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      denyButtonText: `No`,
    }).then((result) => {
      if (result.isConfirmed) {
        const response = fetch(`${API}properties/${id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getToken()}`,
          },
        });
        //console.log(response);
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
      name: "Provincia",
      id: "provincia",
      selector: (row) => row.attributes.provincia,
      sortable: true,
      width: "150px",
    },
    {
      name: "Distrito",
      id: "distrito",
      selector: (row) => row.attributes.distrito,
      sortable: true,
      width: "150px",
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
      name: "Baños",
      id: "banos",
      selector: (row) => row.attributes.banos,
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
      width: "80px",
    },
    {
      cell: (row) => (
        <button
          className="editButton"
          onClick={() =>
            navigate(`/admin/properties/property-detail/${row.id}`)
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
    return <Spin className="spinner" size="large" />;
  }

  return (
    <div className=" w-full">
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
        progressComponent={<Spin size="large" />}
        paginationComponentOptions={paginationComponentOptions}
        subHeader
        subHeaderComponent={
          <div className="relative w-full my-1 px-2">
            <input
              type="text"
              onChange={handleFilter}
              class="w-full px-4 py-2 border border-gray-300 rounded-md"
              placeholder="Buscar"
            />
          </div>
        }
      ></DataTable>
    </div>
  );
};

export default PropertiesList;
