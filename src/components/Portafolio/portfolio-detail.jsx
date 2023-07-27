import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useQuery } from "react-query";

import axios from "axios";
import DataTable from "react-data-table-component";
import withReactContent from "sweetalert2-react-content";
import { useFormik } from "formik";
import * as Yup from "yup";

import MySpinner from "../Spinner/spinner";
import Swal from "sweetalert2";
import { API } from "../../constant";
import { getToken } from "../../utils/helpers";
import { authUserData } from "../../api/usersApi";
import { BiConfused, BiDislike, BiLike } from "react-icons/bi";
import { message } from "antd";

const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
const PortafolioSchema = Yup.object().shape({
  clienteComprador: Yup.string()
    .required("¡El nombre es requerido!")
    .min(6, "¡Muy corto!")
    .max(50, "¡Muy largo!"),
  correoCliente: Yup.string()
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
    console.log("datos recibidos", data);
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

  //----------------------------------------------------------------
  const { handleChange, handleSubmit, values, errors, touched } = useFormik({
    initialValues: {
      clienteComprador: portafolio?.attributes.clienteComprador,
      correoCliente: portafolio?.attributes.correoCliente,
    },
    validationSchema: Yup.object({
      clienteComprador: Yup.string()
        .required("¡El nombre es requerido!")
        .min(6, "¡Muy corto!")
        .max(50, "¡Muy largo!"),
      correoCliente: Yup.string()
        .matches(emailRegex, "¡Correo inválido!")
        .required("¡El correo es requerido!"),
    }),
    onSubmit: async (values) => {
      console.log("valores que llegan", values);
      setIsLoading(true);
      const id = userData?.id;
      const mobile = userData?.mobile;
      const email = userData?.email;

      const newProperties = [];
      records?.map((record) => {
        newProperties.push(record.id);
      });

      const value = {
        creadoPor: id,
        clienteComprador: values.clienteComprador,
        correoCliente: values.correoCliente,
        properties: newProperties,
        telefonoAsesor: portafolio.attributes.telefonoAsesor,
        correoAsesor: portafolio.attributes.correoAsesor,
        categoria: portafolio.attributes.categoria,
      };
      console.log("estos son los values", value);
      const response = axios(`${API}portafolios/${portafolio.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken()}`,
        },
        data: { data: value },
      })
        .then((result) => {
          //const property = result.data.data.attributes;
          message.success("Portafolio actualizado correctamente");
          navigate("/home/portfolio");
        })
        .finally(() => {
          setIsLoading(false);
        });
    },
  });
  //----------------------------------------------------------------
  /* const saveChanges = (values) => {
    console.log("valores que llegan", values);
    setIsLoading(true);
    const id = userData?.id;
    const mobile = userData?.mobile;
    const email = userData?.email;

    const newProperties = [];
    records?.map((record) => {
      newProperties.push(record.id);
    });

    const value = {
      creadoPor: id,
      clienteComprador: values.clienteComprador,
      correoCliente: values.correoCliente,
      properties: newProperties,
      telefonoAsesor: portafolio.attributes.telefonoAsesor,
      correoAsesor: portafolio.attributes.correoAsesor,
      categoria: portafolio.attributes.categoria,
    };
    console.log("estos son los values", value);
    const response = axios(`${API}portafolios/${portafolio.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`,
      },
      data: { data: value },
    })
      .then((result) => {
        const property = result.data.data.attributes;
        message.success("Portafolio actualizado correctamente");
        navigate("/home/portfolio");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }; */
  console.log(portafolio?.attributes);
  if (isLoading || !records) {
    return <MySpinner />;
  }
  function selectReaction(reaction) {
    console.log(reaction);
    switch (reaction) {
      case "Me Gusta, deseo verlo":
        return <BiLike fill="blue" size={30} />;
      case "No es lo que busco":
        return <BiDislike fill="red" size={30} />;
      case "Indeciso(a)":
        return <BiConfused fill="green" size={30} />;
      default:
        return <span>-</span>;
    }
  }
  const column = [
    {
      name: "Categoria",
      selector: (row) => portafolio?.attributes.categoria,
      sortable: true,
      width: "180px",
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
      width: "200px",
    },
    {
      name: "Reacción",
      id: "reaccion",
      selector: (row) => selectReaction(row.attributes.reaccion),
      sortable: true,
      width: "120px",
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
              <form onSubmit={handleSubmit} autoComplete="off">
                <input
                  type="text"
                  name="clienteComprador"
                  onChange={handleChange}
                  required
                  defaultValue={portafolio?.attributes?.clienteComprador}
                  className="w-full rounded-md mb-2"
                  placeholder="Nombre del cliente comprador"
                />
                <div className="space flex justify-center mb-2 -mt-2">
                  {errors.name && touched.name ? (
                    <div className="errordivp text-xs">{errors.name}</div>
                  ) : null}
                </div>
                <input
                  type="email"
                  name="correoCliente"
                  required
                  onChange={handleChange}
                  defaultValue={portafolio?.attributes.correoCliente}
                  className="w-full rounded-md"
                  placeholder="Correo del cliente comprador"
                />
                <div className="space flex justify-center">
                  {errors.email && touched.email ? (
                    <div className="errordivp text-xs">{errors.email}</div>
                  ) : null}
                </div>
                <div className="ml-0 flex justify-center">
                  <button
                    type="submit"
                    className="rounded-md text-white mt-2  bg-green-400  h-10 w-40 mx-20"
                  >
                    Guardar cambios
                  </button>
                </div>

                {/* <div className="flex justify-center mt-4">
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
                </div> */}
              </form>
            </div>
          </div>
        }
      ></DataTable>
    </div>
  );
};
