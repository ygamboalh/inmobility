import { useEffect, useState } from "react";
import { Provincia, categories } from "../../BD/bd";
import AxiosInstance from "../../api/AxiosInstance";
import { API, BEARER } from "../../constant";
import { useQuery } from "react-query";
import { getAllPropertiesRQ } from "../../api/propertiesApi";
import MySpinner from "../Spinner/spinner";
import { useFormik } from "formik";
import axios from "axios";
import { getToken } from "../../utils/helpers";
import { message } from "antd";
import { QueriesByFilters } from "../../utils/QueriesByFilters";

const AddPropertyModal = ({ isVisible, category, onDataReceived }) => {
  const [close, setClose] = useState(false);
  const [selectedOption, setSelectedOption] = useState([]);
  const [records, setRecords] = useState([]);
  const [dataToSend, setDataToSend] = useState();
  const [filterRecords, setFilterRecords] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [categoria, setCategoria] = useState();

  const selectCategory = (category) => {
    switch (category) {
      case "Venta de Casas y Apartamentos":
        return 1;
      case "Alquiler de Casas y Apartamentos":
        return 2;
      case "Venta de Lotes, Fincas,Terrenos y Predios":
        return 4;
      case "Venta de Locales Comerciales":
        return 5;
      case "Alquiler de Locales Comerciales":
        return 6;
      case "Venta de Edificios":
        return 7;
      case "Alquiler de Edificios":
        return 8;
      case "Venta de Bodegas o Similares":
        return 9;
      case "Alquiler de Bodegas o Similares":
        return 10;
      case "Venta de Oficinas o Consultorios Médicos":
        return 11;
      case "Alquiler de Oficinas o Consultorios Médicos":
        return 12;
      case "Alquiler de Fincas, Lotes, Predios o Terrenos":
        return 13;
      default:
        break;
    }
  };

  useEffect(() => {
    const categoria = selectCategory(category);
    console.log(categoria);
    setCategoria(categoria);
    const response = AxiosInstance.get(`${API}properties/`);
  }, []);

  const closeModal = () => {
    setRecords([]);
    setFilterRecords([]);
    onDataReceived({ close: false });
  };
  const sendDataToParent = () => {
    console.log(selectedOption);
    setDataToSend(selectedOption);
    if (selectedOption.length <= 0) {
      return;
    } else {
      onDataReceived({ close: false, propertyList: selectedOption });
    }
  };
  const handleOptionSelectChange = (id) => {
    if (selectedOption?.includes(id)) {
      setSelectedOption(selectedOption.filter((item) => item !== id));
    } else {
      setSelectedOption([...selectedOption, id]);
    }
  };
  const handleFilter = (event) => {
    const searchData = filterRecords.filter((row) =>
      row.attributes.tipoPropiedad
        .toLowerCase()
        .includes(event.target.value.toLowerCase())
    );
    setRecords(searchData);
  };
  //----------------------------------------------------------------
  const { handleChange, handleSubmit, values, errors, touched } = useFormik({
    initialValues: {
      provincia: "",
      canton: "",
    },
    onSubmit: (values) => {
      setIsLoading(true);
      const urlPortion = makeQueries(values);
      let urlFinal = "";
      urlPortion.map((value) => {
        urlFinal += value.name;
      });
      if (urlFinal.length !== 0) {
        const urlQuery = urlFinal.replace(/ /g, "%20");
        const url = `${API}properties?filters[categories][id][$eq]=${categoria}${urlQuery}`;
        console.log("url", url);

        const busqueda = axios
          .get(url, {
            headers: {
              Authorization: `Bearer ${BEARER} ${getToken()}`,
            },
          })
          .then((response) => {
            const propertyList = response.data.data;
            console.log("las que encontre", propertyList);
            if (propertyList.length !== 0) {
              setRecords(propertyList);
              setFilterRecords(propertyList);
            } else {
              message.info("No se encontraron resultados");
              return;
            }
          })
          .finally(() => {
            setIsLoading(false);
          });
      } else {
        message.error(`Debe introducir al menos un criterio de búsqueda`);
        setIsLoading(false);
        return;
      }
    },
  });
  const makeQueries = (values) => {
    const valuesFiltered = QueriesByFilters(values);
    return valuesFiltered;
  };
  //----------------------------------------------------------------
  if (!records || isLoading) {
    return <MySpinner />;
  }
  if (!isVisible) return null;
  return (
    <div className="fixed z-10 inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center">
      <div className="flex flex-col mx-4">
        <button
          onClick={closeModal}
          className="place-self-end bg-blue-700 text-white w-10 h-7 rounded-md"
        >
          X
        </button>
        <div className="bg-white overflow-scroll p-4 max-w-[900px] max-h-[700px]  rounded-md">
          <div className="w-full">
            <form onSubmit={handleSubmit} autoComplete="off">
              <div className="flex flex-col w-full justify-center m-3">
                <input
                  type="text"
                  value={values.uniqueId}
                  onChange={handleChange}
                  name="uniqueId"
                  placeholder="Identificador único"
                  className="input-admin-property  m-2 w-80 p-2"
                />
                <select
                  name="provincia"
                  value={values.provincia}
                  onChange={handleChange}
                  className="input-admin-property  m-2 w-80 p-2"
                >
                  <option value="" label="">
                    {"Provincia"}
                  </option>
                  {Provincia.map((item) => (
                    <option value={item.value} label={item.label}>
                      {item.value}
                    </option>
                  ))}
                </select>

                <input
                  type="text"
                  value={values.canton}
                  onChange={handleChange}
                  name="canton"
                  placeholder="Canton"
                  className="input-admin-property  m-2 w-80 p-2"
                />

                <input
                  type="text"
                  value={values.distrito}
                  onChange={handleChange}
                  name="distrito"
                  placeholder="Distrito"
                  className="input-admin-property  m-2 w-80 p-2"
                />
                <input
                  type="number"
                  value={values.precio}
                  onChange={handleChange}
                  name="precio"
                  placeholder="Precio"
                  className="input-admin-property  m-2 w-80 p-2"
                />
                <input
                  type="number"
                  value={values.areaTerreno}
                  onChange={handleChange}
                  name="areaTerreno"
                  placeholder="Área del terreno"
                  className="input-admin-property  m-2 w-80 p-2"
                />
              </div>

              <hr></hr>
              <div className="inset-y-0 mt-3 left-0 flex justify-center align-middle items-center pl-3">
                <div className="">
                  <button
                    type="submit"
                    className="mr-2 mb-3 py-2 px-4 rounded bg-blue-700 text-white"
                  >
                    Realizar búsqueda
                  </button>
                </div>
              </div>
            </form>
          </div>
          <div
            className={records.length === 0 ? "hidden" : "my-3 justify-center"}
          >
            <input
              type="text"
              onChange={handleFilter}
              className="px-2 py-2 flex w-full border border-gray-300 rounded-md"
              placeholder="Filtrar por tipo de propiedad"
            />
          </div>
          <div className={records.length === 0 ? "hidden" : "text-center"}>
            Seleccione las propiedades
          </div>
          <div
            className={
              records.length === 0
                ? "hidden"
                : "flex justify-center flex-col content-center items-center"
            }
          >
            {records.map((record) => (
              <div className="w-full max-w-md mt-2 p-6 bg-white border border-gray-200 rounded-lg shadow sm:p-6">
                <div className="flex items-center -mt-3 align-middle justify-between mb-4">
                  <div className="truncate">
                    {record.attributes.tipoPropiedad}
                  </div>
                  <span className="font-semibold text-blue-700 text-xs">
                    <button onClick={() => handleOptionSelectChange(record.id)}>
                      <input type="checkbox" className="h-6 w-6 rounded-full" />
                    </button>
                  </span>
                </div>
                <hr className="mb-2" />
                <div>{record.attributes.provincia}</div>
                <div>{record.attributes.canton}</div>
                <div>{record.attributes.distrito}</div>
                <div>
                  {record.attributes.moneda}
                  {record.attributes.precio}
                </div>
              </div>
            ))}
          </div>
          <hr />
          <div
            className={
              records.length === 0 ? "hidden" : "flex justify-center mt-2"
            }
          >
            <button
              onClick={sendDataToParent}
              className="bg-blue-700 px-3 py-1 my-3 rounded-md text-white text-lg"
            >
              Aceptar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddPropertyModal;
