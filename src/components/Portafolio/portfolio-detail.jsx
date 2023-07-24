import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useQuery } from "react-query";

import axios from "axios";
import DataTable from "react-data-table-component";
import withReactContent from "sweetalert2-react-content";
import { Field, Formik, Form } from "formik";
import * as Yup from "yup";

import MySpinner from "../Spinner/spinner";
import Swal from "sweetalert2";
import { API } from "../../constant";
import { getToken } from "../../utils/helpers";
import { authUserData } from "../../api/usersApi";

const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
const PortafolioSchema = Yup.object().shape({
  name: Yup.string()
    .required("¡El nombre es requerido!")
    .min(6, "¡Muy corto!")
    .max(50, "¡Muy largo!"),
  email: Yup.string()
    .matches(emailRegex, "¡Correo inválido!")
    .required("¡El correo es requerido!"),
});
export const PortafolioDetail = () => {
  const { data: userData } = useQuery("profile", authUserData);
  const location = useLocation();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [pending, setPending] = useState(true);
  const [records, setRecords] = useState([]);
  const [portafolio, setPortafolio] = useState();

  useEffect(() => {
    const data = location.state;
    const properties = data?.row.attributes.properties.data;
    setRecords(properties);
    setPending(false);
    setPortafolio(data?.row);
  }, []);
  function deleteRowF(id, records) {
    //const propertiesIds = [];
    const newData = records.filter((item) => item.id !== id);
    setRecords(newData);
    return newData;
  }

  const deleteRow = async (id, records) => {
    const MySwal = withReactContent(Swal);
    MySwal.fire({
      title: "¿Desea eliminar el inmueble?",
      showDenyButton: true,
      confirmButtonText: "Sí, eliminar",
      confirmButtonColor: "#1863e4",
      denyButtonText: `No`,
    }).then((result) => {
      if (result.isConfirmed) {
        deleteRowF(id, records);
      }
    });
  };
  const saveChanges = async (value) => {
    setIsLoading(true);
    const id = userData?.id;
    const mobile = userData?.mobile;
    const email = userData?.email;

    const newProperties = [];
    records?.map((record) => {
      newProperties.push(record.id);
    });

    const values = {
      creadoPor: id,
      clienteComprador: value.name,
      correoCliente: value.email,
      properties: newProperties,
      telefonoAsesor: portafolio.attributes.telefonoAsesor,
      correoAsesor: portafolio.attributes.correoAsesor,
      categoria: portafolio.attributes.categoria,
    };
    console.log("estos son los values", values);
    const response = axios(`${API}portafolios/${portafolio.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`,
      },
      data: { data: values },
    })
      .then((result) => {
        const property = result.data.data.attributes;

        navigate("/home/portfolio");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  console.log(portafolio?.attributes);
  if (isLoading || !records) {
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
      name: "Categoria",
      selector: (row) => row.attributes.categoria,
      sortable: true,
      width: "200px",
      id: "categoria",
    },
    {
      name: "Provincia",
      id: "provincia",
      selector: (row) => row.attributes.provincia,
      sortable: true,
      width: "120px",
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

    {
      cell: (row) => (
        <button
          className="deleteButton"
          onClick={() => deleteRow(row.id, records)}
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
  const paginationComponentOptions = {
    rowsPerPageText: "Inmuebles por página",
    rangeSeparatorText: "de",
    selectAllRowsItem: true,
    selectAllRowsItemText: "Todos",
  };

  return (
    <div className="w-full">
      <DataTable
        columns={column}
        data={records}
        pagination
        fixedHeader
        fixedHeaderScrollHeight="550px"
        selectableRowsHighlight
        progressPending={pending}
        highlightOnHover
        progressComponent={<MySpinner />}
        paginationComponentOptions={paginationComponentOptions}
        subHeader
        subHeaderComponent={
          <div className="relative w-full my-1 flex justify-center items-center">
            <div className="flex flex-col w-fit justify-center items-center">
              <label className="text-xl mb-2 font-semibold">
                Propiedades del portafolio
              </label>

              <Formik
                initialValues={{
                  clienteComprador: portafolio?.attributes.clienteComprador,
                  correoCliente: portafolio?.attributes.correoCliente,
                }}
                validationSchema={PortafolioSchema}
                onSubmit={saveChanges}
              >
                {({ errors, touched }) => (
                  <Form autoComplete="off">
                    <input
                      type="text"
                      name="name"
                      required
                      defaultValue={portafolio?.attributes?.clienteComprador}
                      className="w-full rounded-md mb-2"
                      placeholder="Nombre del cliente comprador"
                    />
                    {/* <div className="space flex justify-center mb-2 -mt-2">
                      {errors.name && touched.name ? (
                        <div className="errordivp text-xs">{errors.name}</div>
                      ) : null}
                    </div> */}
                    <input
                      type="email"
                      name="email"
                      required
                      defaultValue={portafolio?.attributes.correoCliente}
                      className="w-full rounded-md"
                      placeholder="Correo del cliente comprador"
                    />
                    {/* <div className="space flex justify-center">
                      {errors.email && touched.email ? (
                        <div className="errordivp text-xs">{errors.email}</div>
                      ) : null}
                    </div> */}
                    <div className="ml-0 flex justify-center">
                      <button
                        type="submit"
                        className="rounded-md text-white mt-2  bg-green-400  h-10 w-40 mx-20"
                      >
                        Guardar cambios
                      </button>
                    </div>

                    <div className="flex justify-center mt-4">
                      <button
                        onClick={() =>
                          navigate("/home/banner", {
                            state: { portafolio: portafolio.id },
                          })
                        }
                        type="button"
                        className="font-semibold"
                      >
                        Agregar otras propiedades
                      </button>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        }
      ></DataTable>
    </div>
  );
};
