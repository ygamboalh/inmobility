import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import DataTable from "react-data-table-component";

import MySpinner from "../Spinner/spinner";

const SearchResults = () => {
  const [records, setRecords] = useState([]);
  const [filterRecords, setFilterRecords] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  const paginationComponentOptions = {
    rowsPerPageText: "Inmuebles por página",
    rangeSeparatorText: "de",
    selectAllRowsItem: true,
    selectAllRowsItemText: "Todos",
  };
  useEffect(() => {
    const data = location.state.propertyList;
    setRecords(data);
    setFilterRecords(data);
    console.log(data);
  }, []);
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
      selector: (row, index) => "Venta de Casas y apartamentos",
      sortable: true,
      width: "150px",
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
      width: "160px",
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

export default SearchResults;
