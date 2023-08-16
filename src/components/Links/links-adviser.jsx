import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import DataTable from "react-data-table-component";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

import { useQuery, useQueryClient } from "react-query";
import { getAllLinks } from "../../api/usersApi";
import MySpinner from "../Spinner/spinner";
import { API } from "../../constant";
import { getToken } from "../../utils/helpers";

const LinkListAdviser = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [records, setRecords] = useState([]);
  const [pending, setPending] = React.useState(true);
  const [filterRecords, setFilterRecords] = useState([]);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data, isLoading: loadingLinks } = useQuery("links", getAllLinks, {
    onSuccess: (data) => {
      const foundedLinks = [];
      data.data.forEach((link) => {
        foundedLinks.push(link);
      });
      setRecords(foundedLinks);
      setFilterRecords(foundedLinks);
      setPending(false);
    },
  });
  if (loadingLinks) {
    return <MySpinner />;
  }

  const paginationComponentOptions = {
    rowsPerPageText: "Enlaces por página",
    rangeSeparatorText: "de",
    selectAllRowsItem: true,
    selectAllRowsItemText: "Todos",
  };

  const column = [
    {
      cell: (row) => (
        <div className="flex flex-col justify-center w-full mx-4">
          <button
            className="flex flex-col bg-blue-500 hover:bg-blue-400 rounded-md p-2"
            onClick={() => window.location.assign(row.attributes.url)}
          >
            <div className="flex">
              <span className="flex text-lg font-semibold sm:text-xs justify-start">
                {row.attributes.descripcion}
              </span>
            </div>
            <div className="flex">
              <span className="flex justify-start text-gray-700">
                {row.attributes.url}
              </span>
            </div>
          </button>
        </div>
      ),
      accessor: "id",
      id: "detail",
      ignoreRowClick: true,
      allowOverflow: false,
      button: true,
      width: "100%",
    },
  ];
  const handleFilter = (event) => {
    const searchData = filterRecords.filter((row) =>
      row.attributes.descripcion
        .toLowerCase()
        .includes(event.target.value.toLowerCase())
    );
    setRecords(searchData);
  };
  if (isLoading || !records) {
    return <MySpinner />;
  }

  return (
    <div className="flex justify-start flex-col items-center w-full">
      <DataTable
        columns={column}
        data={records}
        pagination
        fixedHeader
        fixedHeaderScrollHeight="550px"
        title="Enlaces de interés"
        progressPending={pending}
        highlightOnHover
        progressComponent={<MySpinner />}
        paginationComponentOptions={paginationComponentOptions}
        subHeader
        subHeaderComponent={
          <div className="relative w-full -mt-5 my-1 px-2">
            <input
              type="text"
              onChange={handleFilter}
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
              placeholder="Filtrar por descripción"
            />
          </div>
        }
      ></DataTable>
    </div>
  );
};

export default LinkListAdviser;