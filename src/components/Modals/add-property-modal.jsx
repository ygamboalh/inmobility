import { useEffect, useState } from "react";
import { categories } from "../../BD/bd";
import AxiosInstance from "../../api/AxiosInstance";
import { API } from "../../constant";
import { useQuery } from "react-query";
import { getAllPropertiesRQ } from "../../api/propertiesApi";
import MySpinner from "../Spinner/spinner";

const AddPropertyModal = ({ isVisible, category, onDataReceived }) => {
  const [close, setClose] = useState(false);
  const [selectedOption, setSelectedOption] = useState([]);
  const [records, setRecords] = useState([]);
  const [dataToSend, setDataToSend] = useState();
  const [filterRecords, setFilterRecords] = useState([]);

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
  const { data, isLoading: loadingProperties } = useQuery(
    "properties",
    getAllPropertiesRQ,
    {
      onSuccess: (data) => {
        const foundedProperties = [];
        console.log("dfdfsdfsf", data);
        data.data.forEach((property) => {
          if (
            property?.attributes?.categories?.data[0]?.attributes?.nombre ===
            category
          ) {
            foundedProperties.push(property);
          }
        });
        console.log(
          "encontre estas propiedades con la categoria",
          foundedProperties
        );
        setRecords(foundedProperties);
        setFilterRecords(foundedProperties);
        //setPending(false);
      },
    }
  );

  useEffect(() => {
    const categoria = selectCategory(category);
    const response = AxiosInstance.get(`${API}properties/`);
  }, []);
  console.log("lo que recibo del padre", category);
  const closeModal = () => {
    onDataReceived({ close: false });
  };
  const sendDataToParent = () => {
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
  console.log("fue seleccionado", selectedOption);
  if (!records) {
    return <MySpinner />;
  }
  //console.log("categoria seleccionada", selectedOption);
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
        <div className="bg-white overflow-scroll p-4 max-w-[400px] max-h-[500px]  rounded-md">
          <div className="my-3 justify-center">
            <input
              type="text"
              onChange={handleFilter}
              className="px-2 py-2 flex w-full border border-gray-300 rounded-md"
              placeholder="Filtrar por tipo de propiedad"
            />
          </div>
          <div className="text-center">Seleccione las propiedades</div>
          <div className="flex justify-center flex-col content-center items-center">
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
          <div className="flex justify-center mt-2">
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
