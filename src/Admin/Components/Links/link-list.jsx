import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery, useQueryClient } from "react-query";

import DataTable from "react-data-table-component";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import * as Yup from "yup";
import { useFormik } from "formik";

import { API } from "../../../constant";
import { getToken } from "../../../utils/helpers";
import MySpinner from "../../../components/Spinner/spinner";
import { getAllLinks } from "../../../api/propertiesApi";
import AxiosInstance from "../../../api/AxiosInstance";
import { message } from "antd";
import MetaData from "../../../components/Metadata/metadata";

const LinkList = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [records, setRecords] = useState([]);
  const [pending, setPending] = React.useState(true);
  const [filterRecords, setFilterRecords] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const urlRegex = "^(http|https|ftp)://.*";
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
  const { handleChange, handleSubmit, values, errors, touched } = useFormik({
    initialValues: {
      descripcion: "",
      url: "",
    },
    validationSchema: Yup.object({
      descripcion: Yup.string().required("*").min(3, "*").max(1000, "*"),
      url: Yup.string().matches(urlRegex, "*").required("*").max(3000, "*"),
    }),
    onSubmit: async (values) => {
      setIsLoading(true);
      try {
        const value = {
          descripcion: values.descripcion,
          url: values.url,
        };

        const response = await AxiosInstance.put(
          `/links/${selectedRows[0]?.id}`,
          {
            data: value,
          }
        )
          .then((respons) => {
            message.success("¡El enlace fue actualizado correctamente!");
            queryClient.invalidateQueries(["links"]);
            window.location.reload(true);
          })
          .catch((error) => {
            console.log(error);
          });
      } catch (error) {
        console.log(error);
      }
    },
  });
  if (loadingLinks) {
    return <MySpinner />;
  }

  const DeleteLink = async (id) => {
    const MySwal = withReactContent(Swal);
    setIsLoading(true);
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
        }).then((result) => queryClient.invalidateQueries(["links"]));
        if (result) {
          Swal.fire("Enlace eliminado!", "", "success");
        } else {
          Swal.fire("El enlace no fue eliminado", "", "error");
        }
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
      cell: (row) => (
        <div className="flex w-full flex-col p-2 my-2">
          <div className="flex flex-col justify-start">
            <div className="mt-2 mb-1 font-semibold ">
              {row.attributes.descripcion}
            </div>
            <div className="text-gray-500 mb-2">{row.attributes.url}</div>
          </div>
          <div className="flex flex-row justify-start mb-2">
            <div className="mr-2">
              <button
                className="detailButton"
                onClick={() => window.location.assign(row.attributes.url)}
              >
                Visitar enlace
              </button>
            </div>
            <div>
              <button
                className="deleteButton"
                onClick={() => DeleteLink(row.id)}
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
      ),
      accessor: "id",
      id: "descripcion",
      name: (
        <span className="text-xl font-semibold">Seleccione para editarlo</span>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
      width: "90%",
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
    return <MySpinner />;
  }

  return (
    <div className="w-full h-[400px] px-6">
      <MetaData title="Enlaces" description="Enlaces" />
      <DataTable
        columns={column}
        data={records}
        pagination
        fixedHeader
        fixedHeaderScrollHeight="550px"
        selectableRowsHighlight
        selectableRows
        selectableRowsSingle
        title="Enlaces de interés"
        progressPending={pending}
        highlightOnHover
        progressComponent={<MySpinner />}
        paginationComponentOptions={paginationComponentOptions}
        subHeader
        noDataComponent="No hay enlaces para mostrar"
        onSelectedRowsChange={({ selectedRows }) =>
          setSelectedRows(selectedRows)
        }
        subHeaderComponent={
          <div className="relative w-full my-1 px-2">
            <div className="mt-4 -mx-6 mb-2 max-[500px]:justify-center flex">
              <button
                onClick={() => navigate("/admin/links/insert-link")}
                type="button"
                className="mr-2 py-2 px-4 rounded bg-green-400 text-white"
              >
                Crear enlace
              </button>
            </div>
            <div className="-mx-6">
              <input
                type="text"
                onChange={handleFilter}
                className="w-full px-4 py-2  border border-gray-300 rounded-md"
                placeholder="Filtrar por dirección"
              />
            </div>
            <div className={selectedRows?.length > 0 ? "-mx-9" : "hidden"}>
              <div className="mx-3.5 mt-2 justify-start flex max-[500px]:flex-col -mb-5">
                <span className="font-semibold mr-2 text-xs flex">
                  Entre los nuevos datos del enlace:{" "}
                </span>
                <span className="text-xs flex font-normal">
                  {selectedRows[0]?.attributes?.descripcion}
                </span>
              </div>

              <div className="mt-4 rounded-md p-3 flex w-full">
                <form
                  onSubmit={handleSubmit}
                  autoComplete="off"
                  className="w-full"
                >
                  <div className="flex flex-row max-[800px]:flex-col w-full align-middle">
                    <div className="w-full max-[800px]:mb-2 flex min-[800px]:mr-2">
                      <input
                        type="text"
                        className="border w-full shadow flex border-gray-300 text-xs rounded-md"
                        placeholder="Descripción del botón"
                        name="descripcion"
                        maxLength={40}
                        onChange={handleChange}
                        defaultValue={
                          selectedRows?.length > 0
                            ? selectedRows[0].attributes.descripcion
                            : null
                        }
                      />
                    </div>
                    {errors.descripcion && touched.descripcion ? (
                      <div className="-ml-1.5 text-red-500 mt-3 text-xs">
                        {errors.descripcion}
                      </div>
                    ) : null}

                    <div className="flex w-full max-[800px]:mb-2">
                      <input
                        type="text"
                        className="border shadow border-gray-300 text-xs rounded-md w-full"
                        placeholder="Dirección del enlace"
                        onChange={handleChange}
                        defaultValue={
                          selectedRows?.length > 0
                            ? selectedRows[0].attributes.url
                            : null
                        }
                        name="url"
                      />
                    </div>
                    {errors.url && touched.url ? (
                      <div className="-ml-1.5 text-red-500 mt-3 text-xs">
                        {errors.url}
                      </div>
                    ) : null}
                    <div className="mx-2 align-middle max-[500px]:justify-center flex">
                      <button
                        className="px-4 py-1 text-sm bg-blue-700 rounded-md text-white hover:bg-blue-500"
                        type="submit"
                      >
                        Actualizar
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        }
      ></DataTable>
    </div>
  );
};

export default LinkList;
