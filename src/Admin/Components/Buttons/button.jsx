import { useQuery, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

import { message } from "antd";
import Swal from "sweetalert2";
import axios from "axios";
import { useFormik } from "formik";
import DataTable from "react-data-table-component";
import withReactContent from "sweetalert2-react-content";
import * as Yup from "yup";

import MetaData from "../../../components/Metadata/metadata";
import { authUserData } from "../../../api/usersApi";
import { getAllButtons } from "../../../api/propertiesApi";
import MySpinner from "../../../components/Spinner/spinner";
import { API } from "../../../constant";
import { getToken } from "../../../utils/helpers";
import AxiosInstance from "../../../api/AxiosInstance";

const urlRegex = "^(http|https|ftp)://.*";
const Button = () => {
  const queryClient = useQueryClient();
  const [isLoading, setIsLoading] = useState(false);
  const [records, setRecords] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);

  const { data, isLoading: loadingButtons } = useQuery(
    "buttons",
    getAllButtons,
    {
      onSuccess: (data) => {
        setRecords(data.data);
      },
    }
  );
  const { handleChange, handleSubmit, values, errors, touched } = useFormik({
    initialValues: {
      description: "",
      url: "",
    },
    validationSchema: Yup.object({
      description: Yup.string().required("*").min(3, "*").max(40, "*"),
      url: Yup.string().matches(urlRegex, "*").required("*"),
    }),
    onSubmit: async (values) => {
      setIsLoading(true);
      try {
        const value = {
          description: values.description,
          url: values.url,
        };
        if (selectedRows?.length === 0) {
          const response = await AxiosInstance.post("/buttons", {
            data: value,
          })
            .then((respons) => {
              message.success("¡El botón fue creado correctamente!");
              queryClient.invalidateQueries(["buttons"]);
              window.location.reload(true);
            })
            .catch((error) => {
              console.log(error);
            });
        } else {
          const response = await AxiosInstance.put(
            `/buttons/${selectedRows[0]?.id}`,
            {
              data: value,
            }
          )
            .then((respons) => {
              message.success("¡El botón fue actualizado correctamente!");
              queryClient.invalidateQueries(["buttons"]);
              window.location.reload(true);
              /* setTimeout(() => {
                return <MySpinner />;
              }, 1500); */
            })
            .catch((error) => {
              console.log(error);
            });
        }
      } catch (error) {
        console.log(error);
      }
    },
  });
  const defaultValue = () => {};
  console.log(selectedRows[0]?.id);
  if (loadingButtons || isLoading) {
    return <MySpinner />;
  }
  const DeleteButton = async (id) => {
    const MySwal = withReactContent(Swal);
    setIsLoading(true);
    MySwal.fire({
      title: "¿Desea eliminar el botón?",
      showDenyButton: true,
      confirmButtonText: "Sí, eliminar",
      confirmButtonColor: "#1863e4",
      denyButtonText: `No`,
    }).then((result) => {
      if (result.isConfirmed) {
        const response = axios(`${API}buttons/${id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getToken()}`,
          },
        }).then((result) => {
          queryClient
            .invalidateQueries(["buttons"])
            .then((resultado) => console.log(result));
        });
      }
    });

    setIsLoading(false);
  };
  const column = [
    {
      cell: (row) => (
        <div className="w-full flex flex-col mb-4 my-2 ml-2 p-2 justify-start">
          <div className="flex flex-col">
            <div className="font-medium">{row.attributes.description}</div>
            <div>{row.attributes.url}</div>
          </div>
          <div className="mt-2">
            <button
              className="deleteButton"
              onClick={() => DeleteButton(row.id)}
            >
              Eliminar
            </button>
          </div>
        </div>
      ),
      accessor: "id",
      id: "detail",
      name: <span className="text-lg">Seleccione un boton para editarlo</span>,
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
      width: "70%",
    },
  ];
  const paginationComponentOptions = {
    rowsPerPageText: "Botones por página",
    rangeSeparatorText: "de",
    selectAllRowsItem: true,
    selectAllRowsItemText: "Todos",
  };

  return (
    <div className="z-0 overflow-x-auto mx-2 shadow-md sm:rounded-lg">
      <MetaData
        title="Botones del portal del Asesor verificado"
        description="Botones del portal del Asesor verificado"
      />
      <table className="w-full mt-16 text-sm text-left text-gray-500 ">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
          {selectedRows?.length > 0 ? (
            <div className="mx-5 mt-2 -mb-5">
              <span className="text-xs font-semibold">
                Entre los nuevos datos del botón:{" "}
                {selectedRows[0]?.attributes?.description}
              </span>
            </div>
          ) : (
            <div className="mx-5 mt-2 -mb-5">
              <span className="text-xs font-semibold">Crear un botón</span>
            </div>
          )}
          <div className="mt-4 rounded-md p-3 flex w-full">
            <form onSubmit={handleSubmit} autoComplete="off" className="w-full">
              <div className="flex flex-row max-[800px]:flex-col w-full">
                <div className="w-full max-[800px]:mb-2 flex min-[800px]:mr-2">
                  <input
                    type="text"
                    className="border w-full shadow flex border-gray-300 text-xs rounded-md"
                    placeholder="Descripción del botón"
                    name="description"
                    maxLength={40}
                    onChange={handleChange}
                    defaultValue={
                      selectedRows?.length > 0
                        ? selectedRows[0].attributes.description
                        : null
                    }
                  />
                  {errors.description && touched.description ? (
                    <div className=" text-red-500 mt-3 text-xs">
                      {errors.description}
                    </div>
                  ) : null}
                </div>

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
                  {errors.url && touched.url ? (
                    <div className=" text-red-500 mt-3 text-xs">
                      {errors.url}
                    </div>
                  ) : null}
                </div>
                {selectedRows.length === 0 ? (
                  <div className="mx-2 max-[800px]:flex max-[800px]:justify-center">
                    <button
                      className="px-4 py-2 bg-green-400 rounded-md text-white hover:bg-green-500"
                      type="submit"
                    >
                      Crear
                    </button>
                  </div>
                ) : (
                  <div className="mx-2 max-[800px]:flex max-[800px]:justify-center">
                    <button
                      className="px-4 py-2 bg-blue-700 rounded-md text-white hover:bg-blue-500"
                      type="submit"
                    >
                      Actualizar
                    </button>
                  </div>
                )}
              </div>
            </form>
          </div>
        </thead>
        <tbody>
          <div className="w-full">
            <DataTable
              columns={column}
              data={records}
              //pagination
              fixedHeader
              fixedHeaderScrollHeight="550px"
              selectableRowsHighlight
              title="Botones del portal del Asesor verificado"
              highlightOnHover
              progressComponent={<MySpinner />}
              paginationComponentOptions={paginationComponentOptions}
              noDataComponent={"No hay botones para mostrar"}
              selectableRows
              selectableRowsSingle
              noHeader
              onSelectedRowsChange={({ selectedRows }) =>
                setSelectedRows(selectedRows)
              }
            ></DataTable>
          </div>
        </tbody>
      </table>
    </div>
  );
};

export default Button;
