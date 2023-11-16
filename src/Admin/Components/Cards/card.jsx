import { useQuery, useQueryClient } from "react-query";
import { useState } from "react";

import { message } from "antd";
import Swal from "sweetalert2";
import axios from "axios";
import { useFormik } from "formik";
import DataTable from "react-data-table-component";
import withReactContent from "sweetalert2-react-content";
import * as Yup from "yup";

import MetaData from "../../../components/Metadata/metadata";
import { getAllCards } from "../../../api/propertiesApi";
import MySpinner from "../../../components/Spinner/spinner";
import { API } from "../../../constant";
import { getToken } from "../../../utils/helpers";
import AxiosInstance from "../../../api/AxiosInstance";

const Card = () => {
  const queryClient = useQueryClient();
  const [isLoading, setIsLoading] = useState(false);
  const [records, setRecords] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);

  const { data, isLoading: loadingCards } = useQuery("cards", getAllCards, {
    onSuccess: (data) => {
      setRecords(data.data);
    },
  });
  const { handleChange, handleSubmit, values, errors, touched } = useFormik({
    initialValues: {
      title: "",
      description: "",
    },
    validationSchema: Yup.object({
      title: Yup.string().min(5, "*").max(50, "*"),
      description: Yup.string().min(10, "*").max(500, "*"),
    }),
    onSubmit: async (values) => {
      try {
        let newDescription = null;
        let newTitle = null;
        //Si estoy editando
        selectedRows[0]?.id && values.description !== ""
          ? (newDescription = values.description)
          : (newDescription = selectedRows[0]?.attributes.description);

        selectedRows[0]?.id && values.title !== ""
          ? (newTitle = values.title)
          : (newTitle = selectedRows[0]?.attributes.title);

        const editValue = {
          title: newTitle,
          description: newDescription,
        };

        //Si estoy creando
        const createValue = {
          title: values.title,
          description: values.description,
        };

        if (
          (createValue.description === "" || createValue.title === "") &&
          (editValue.description === undefined || editValue.title === undefined)
        ) {
          message.info("¡Para crear debe llenar los datos que faltan!");
          return;
        }

        setIsLoading(true);
        if (
          selectedRows?.length === 0 &&
          createValue.description !== "" &&
          createValue.title !== ""
        ) {
          const response = await AxiosInstance.post("/cards", {
            data: createValue,
          })
            .then((respons) => {
              message.success("¡La tarjeta fue creada correctamente!");
              queryClient.invalidateQueries(["cards"]);
              window.location.reload(true);
            })
            .catch((error) => {
              console.log(error);
            });
        } else {
          const response = await AxiosInstance.put(
            `/cards/${selectedRows[0]?.id}`,
            {
              data: editValue,
            }
          )
            .then((respons) => {
              message.success("¡La tarjeta fue actualizada correctamente!");
              queryClient.invalidateQueries(["cards"]);
              window.location.reload(true);
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

  if (loadingCards || isLoading) {
    return <MySpinner />;
  }
  const DeleteCard = async (id) => {
    const MySwal = withReactContent(Swal);
    setIsLoading(true);
    MySwal.fire({
      title: "¿Desea eliminar la tarjeta?",
      showDenyButton: true,
      confirmButtonText: "Sí, eliminar",
      confirmButtonColor: "#1863e4",
      denyButtonText: `No`,
    }).then((result) => {
      if (result.isConfirmed) {
        const response = axios(`${API}cards/${id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getToken()}`,
          },
        }).then((result) => {
          queryClient.invalidateQueries(["cards"]);
          window.location.reload(true);
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
            <div>{row.attributes.title}</div>
            <div className="font-medium">{row.attributes.description}</div>
          </div>
          <div className="mt-2">
            <button className="deleteButton" onClick={() => DeleteCard(row.id)}>
              Eliminar
            </button>
          </div>
        </div>
      ),
      accessor: "id",
      id: "detail",
      name: (
        <span className="text-lg">Seleccione una tarjeta para editarla</span>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
      width: "70%",
    },
  ];
  const paginationComponentOptions = {
    rowsPerPageText: "Tarjetas por página",
    rangeSeparatorText: "de",
    selectAllRowsItem: true,
    selectAllRowsItemText: "Todos",
  };

  return (
    <div className="z-0 overflow-x-auto mx-2 shadow-md sm:rounded-lg">
      <MetaData
        title="Tarjetas del portal del Asesor verificado"
        description="Tarjetas del portal del Asesor verificado"
      />
      <table className="w-full mt-16 text-sm text-left text-gray-500 ">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
          {selectedRows?.length > 0 ? (
            <div className="mx-5 mt-2 -mb-5">
              <span className="text-xs font-semibold">
                Entre los nuevos datos de la tarjeta:{" "}
                {selectedRows[0]?.attributes?.title}
              </span>
            </div>
          ) : (
            <div className="mx-5 mt-2 -mb-5">
              <span className="text-xs font-semibold">Crear una tarjeta</span>
            </div>
          )}
          <div className="mt-4 rounded-md p-3 flex w-full">
            <form onSubmit={handleSubmit} autoComplete="off" className="w-full">
              <div className="flex flex-row max-[800px]:flex-col w-full">
                <div className="flex w-full max-[800px]:mb-2">
                  <input
                    type="text"
                    className="border shadow mr-2 border-gray-300 h-10 text-xs rounded-md w-full"
                    placeholder="Título de la tarjeta"
                    onChange={handleChange}
                    maxLength={40}
                    defaultValue={
                      selectedRows?.length > 0
                        ? selectedRows[0].attributes.title
                        : null
                    }
                    name="title"
                  />
                  {errors.title && touched.title ? (
                    <div className=" text-red-500 mt-3.5 -ml-1 mr-1 text-xs">
                      {errors.title}
                    </div>
                  ) : null}
                </div>
                <div className="w-full max-[800px]:mb-2 flex min-[800px]:mr-2">
                  <input
                    type="text"
                    className="border w-full shadow flex h-10 border-gray-300 text-xs rounded-md"
                    placeholder="Descripción de la tarjeta"
                    name="description"
                    maxLength={500}
                    onChange={handleChange}
                    defaultValue={
                      selectedRows?.length > 0
                        ? selectedRows[0].attributes.description
                        : null
                    }
                  />
                  {errors.description && touched.description ? (
                    <div className=" text-red-500 mt-3.5 text-xs">
                      {errors.description}
                    </div>
                  ) : null}
                </div>

                {selectedRows.length === 0 ? (
                  <div className="mx-2 max-[800px]:flex max-[800px]:justify-center">
                    <button
                      className="px-6 py-3 bg-green-400 rounded-md text-white hover:bg-green-500"
                      type="submit"
                    >
                      Crear
                    </button>
                  </div>
                ) : (
                  <div className="mx-2 max-[800px]:flex max-[800px]:justify-center">
                    <button
                      className="px-4 py-3 bg-blue-700 rounded-md text-white hover:bg-blue-500"
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
              title="Tarjetas del portal del Asesor verificado"
              highlightOnHover
              progressComponent={<MySpinner />}
              paginationComponentOptions={paginationComponentOptions}
              noDataComponent={"No hay tarjetas para mostrar"}
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

export default Card;
