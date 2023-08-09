import { useEffect, useState } from "react";
import { categories } from "../../BD/bd";
import AxiosInstance from "../../api/AxiosInstance";
import { API } from "../../constant";
import { useQuery } from "react-query";
import { getAllPropertiesRQ } from "../../api/propertiesApi";

const AddPropertyModal = ({ isVisible, category, onDataReceived }) => {
  const [close, setClose] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const [records, setRecords] = useState([]);

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
        //setFilterRecords(foundedProperties);
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
    console.log("opcion seleccionada", selectedOption);
    if (selectedOption === "") {
      return;
    } else {
      onDataReceived({ close: false, selected: selectedOption });
    }
  };
  const handleOptionSelectChange = (event) => {
    const selectedOption = event.target.value;
    setSelectedOption(selectedOption);
  };

  //console.log("categoria seleccionada", selectedOption);
  if (!isVisible) return null;
  return (
    <div className="fixed z-10 inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center">
      <div className="flex flex-col mx-4">
        <button
          onClick={closeModal}
          className="place-self-end bg-blue-700 text-white w-16 h-7 rounded-md"
        >
          X
        </button>
        <div className="bg-white p-4 max-w-[400px] max-h-[500px]  rounded-md">
          <div className="flex justify-center flex-col content-center items-center">
            {records.map((record) => (
              <div className="flex flex-col">
                <div>categoria</div>
                <hr />
              </div>
            ))}
            {/* <select
              required
              name="categories"
              value={selectedOption}
              //disabled={category}
              //defaultValue={category}
              onChange={handleOptionSelectChange}
              className="categories m-2 w-full max-[500px]:mx-0  md:w-fit lg:mx-80"
            >
              <option value="" label="">
                {"Seleccione la categoría"}
              </option>
              {categories.map((item) => (
                <option value={item.value} label={item.label}>
                  {item.value}
                </option>
              ))}
            </select> */}
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
