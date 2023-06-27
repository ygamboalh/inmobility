import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import DataTable from "react-data-table-component";
import axios from "axios";
import { Spin } from "antd";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

import { API } from "../../../constant";
import { getToken } from "../../../utils/helpers";

const LinkList = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [records, setRecords] = useState([]);
  const [pending, setPending] = React.useState(true);
  const [filterRecords, setFilterRecords] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    let foundedLinks = [];
    const response = axios
      .get(`${API}links`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken()}`,
        },
      })
      .then((res) => {
        foundedLinks = res.data.data;
        setRecords(foundedLinks);
        setFilterRecords(foundedLinks);
        setPending(false);
      });
  }, []);

  const DeleteLink = async (id) => {
    setIsLoading(true);
    const MySwal = withReactContent(Swal);
    MySwal.fire({
      title: "¿Desea eliminar el enlace?",
      showDenyButton: true,
      confirmButtonText: "Sí, eliminar",
      confirmButtonColor: "#1863e4",
      denyButtonText: `No`,
    }).then((result) => {
      if (result.isConfirmed) {
        const response = fetch(`${API}links/${id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getToken()}`,
          },
        });
        if (result) {
          Swal.fire("Enlace eliminado!", "", "success");
        } else {
          Swal.fire("El enlace no fue eliminado", "", "error");
        }
      } else if (result.isDenied) {
        Swal.fire("El enlace no fue eliminado", "", "info");
      }
    });

    setIsLoading(false);
  };

  const paginationComponentOptions = {
    rowsPerPageText: "Enlaces por página",
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
      name: "Descripción",
      id: "descripcion",
      selector: (row) => row.attributes.descripcion,
      sortable: true,
      width: "200px",
    },
    {
      name: "URL",
      id: "url",
      selector: (row) => row.attributes.url,
      sortable: true,
      width: "600px",
    },
    {
      cell: (row) => (
        <button
          className="detailButton"
          onClick={() => window.location.assign(row.attributes.url)}
        >
          Visitar enlace
        </button>
      ),
      accessor: "id",
      id: "detail",
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
      width: "150px",
    },
    {
      cell: (row) => (
        <button className="deleteButton" onClick={() => DeleteLink(row.id)}>
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
      row.attributes.url
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
      <div className="ml-auto">
        <button
          onClick={() => navigate("/admin/links/insert-link")}
          type="button"
          className="mr-2 py-2 px-4 rounded bg-green-400 text-white"
        >
          Crear enlace
        </button>
      </div>
      <DataTable
        columns={column}
        data={records}
        pagination
        selectableRows
        fixedHeader
        fixedHeaderScrollHeight="550px"
        selectableRowsHighlight
        title="Enlaces de interés"
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

export default LinkList;