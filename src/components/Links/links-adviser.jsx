import React, { useState } from "react";
import { useQuery } from "react-query";

import DataTable from "react-data-table-component";

import { getAllLinks } from "../../api/usersApi";
import MySpinner from "../Spinner/spinner";

const LinkListAdviser = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [records, setRecords] = useState([]);
  const [pending, setPending] = React.useState(true);
  const [filterRecords, setFilterRecords] = useState([]);
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

  const column = [
    {
      cell: (row) => (
        <div className="flex flex-col justify-center w-full mx-4">
          <button
            className="flex flex-col hover:bg-gray-400 rounded-md p-2"
            onClick={() => window.location.assign(row.attributes.url)}
          >
            <div className="flex">
              <span className="flex text-lg font-semibold max-[500px]:text-xs text-left">
                {row.attributes.descripcion}
              </span>
            </div>
          </button>
        </div>
      ),
      accessor: "id",
      id: "detail",
      name: (
        <span className="text-xl font-semibold">Descripción de la URL</span>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
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
    <div className="flex justify-start px-4 flex-col items-center w-full">
      <DataTable
        columns={column}
        data={records}
        fixedHeader
        fixedHeaderScrollHeight="550px"
        title="Enlaces de interés"
        progressPending={pending}
        highlightOnHover
        progressComponent={<MySpinner />}
        subHeader
        subHeaderComponent={
          <div className="w-full justify-center flex -mt-8 my-1 ">
            <input
              type="text"
              onChange={handleFilter}
              className="w-full border -ml-4 flex border-gray-300 rounded-md"
              placeholder="Filtrar por descripción"
            />
          </div>
        }
      ></DataTable>
    </div>
  );
};

export default LinkListAdviser;
