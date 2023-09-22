import { useEffect, useState } from "react";
import Select from "react-select";

import { useFormik } from "formik";
import axios from "axios";
import { message } from "antd";

import { API, BEARER } from "../../constant";
import MySpinner from "../Spinner/spinner";
import { getToken } from "../../utils/helpers";
import { QueriesByFilters } from "../../utils/QueriesByFilters";
import SearchCard from "../SearchResults/property-card";
import {
  Amenidades,
  Amueblado,
  AptoMascotas,
  AptoNinos,
  DetallesExternos,
  DetallesInternos,
  Electrica,
  Parqueo,
  PatioJardin,
  Provincia,
  Servicios,
  TipoPiso,
  UbicacionCatastral,
  UbicacionDemografica,
  UbicacionGeografica,
} from "../../BD/bd";
const AddPropertyModal = ({ isVisible, category, onDataReceived }) => {
  const [selectedOption, setSelectedOption] = useState([]);
  const [records, setRecords] = useState([]);
  const [dataToSend, setDataToSend] = useState();
  const [filterRecords, setFilterRecords] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [categoria, setCategoria] = useState();
  const [amenidades, setAmenidades] = useState({});
  const [patio, setPatio] = useState({});
  const [detallesInternos, setDetallesInternos] = useState({});
  const [detallesExternos, setDetallesExternos] = useState({});

  const selectCategory = (category) => {
    switch (category) {
      case "Venta de Casas y Apartamentos":
        return 1;
      case "Alquiler de Casas y Apartamentos":
        return 2;
      case "Venta de Fincas, Lotes, Predios o Terrenos":
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
  const handleChangeAmenidades = (selectedOption) => {
    setAmenidades(selectedOption);
  };
  const handleChangePatioJardin = (selectedOption) => {
    setPatio(selectedOption);
  };
  const handleChangeDetallesInternos = (selectedOption) => {
    setDetallesInternos(selectedOption);
  };
  const handleChangeDetallesExternos = (selectedOption) => {
    setDetallesExternos(selectedOption);
  };
  useEffect(() => {
    const cat = selectCategory(category);
    setCategoria(cat);
  }, []);
  console.log(categoria);
  const closeModal = () => {
    setRecords([]);
    setFilterRecords([]);
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
  //----------------------------------------------------------------
  const { handleChange, handleSubmit, values, errors, touched } = useFormik({
    initialValues: {},
    onSubmit: (values) => {
      /* Importante
       Cuando se realice la busqueda, no se puede incluir a amenidades, patio, detalles internos, detalles externos
       Se tiene que realizar la busqueda y luego filtrar por esos valores si se pasaron, fijarse en el archivo de busqueda
        venta-casa-apartamento
       */
      setIsLoading(true);
      const urlPortion = makeQueries(values);
      const newCat = selectCategory(category);
      let urlFinal = "";
      urlPortion.map((value) => {
        urlFinal += value.name;
      });
      if (urlFinal.length !== 0) {
        const urlQuery = urlFinal.replace(/ /g, "%20");
        const url = `${API}properties?filters[categories][id][$eq]=${newCat}${urlQuery}`;
        console.log(url);
        const busqueda = axios
          .get(url, {
            headers: {
              Authorization: `Bearer ${BEARER} ${getToken()}`,
            },
          })
          .then((response) => {
            const propertyList = response.data.data;

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
      {!category ? (
        <MySpinner />
      ) : (
        <div className="flex flex-col mx-4">
          <button
            onClick={closeModal}
            className="place-self-end bg-blue-700 text-white w-10 h-7 rounded-md"
          >
            X
          </button>
          <div className="bg-white overflow-scroll max-w-[900px] max-h-[765px] rounded-md">
            <div className={records?.length > 0 ? "hidden" : "w-full"}>
              <form onSubmit={handleSubmit} autoComplete="off">
                <div className="flex flex-col w-full justify-center m-3">
                  <input
                    type="text"
                    value={values.uniqueId}
                    onChange={handleChange}
                    name="uniqueId"
                    placeholder="Código del inmueble"
                    className="input-admin-property  m-2 w-80 p-2"
                  />
                  <select
                    name="provincia"
                    value={values.provincia}
                    onChange={handleChange}
                    className="input-admin-property text-gray-500 m-2 w-80 p-2"
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
                    placeholder="Cantón"
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
                    value={values.areaTerreno}
                    onChange={handleChange}
                    name="areaTerreno"
                    placeholder="Área total del terreno"
                    className="input-admin-property  m-2 w-80 p-2"
                  />
                  <select
                    name="vistaPanoramica"
                    id="vistaPanoramica"
                    onChange={handleChange}
                    placeholder="Vista Panorámica"
                    className="input-admin-property text-gray-500 m-2 w-80 p-2"
                  >
                    <option value="" label="">
                      {"¿Tiene vista panorámica?"}
                    </option>
                    <option value={true} label="Si">
                      Si
                    </option>
                    <option value={false} label="No">
                      No
                    </option>
                  </select>
                  <select
                    name="ubicacionCastral"
                    id="ubicacionCastral"
                    onChange={handleChange}
                    placeholder="Ubicación castral"
                    className="input-admin-property text-gray-500 m-2 w-80  p-2"
                  >
                    <option value="" label="">
                      {"Ubicación catastral"}
                    </option>
                    {UbicacionCatastral.map((item) => (
                      <option value={item.value} label={item.label}>
                        {item.value}
                      </option>
                    ))}
                  </select>
                  <select
                    name="ubicacionDemografica"
                    id="ubicacionDemografica"
                    onChange={handleChange}
                    placeholder="Ubicación demográfica"
                    className="input-admin-property text-gray-500 m-2 w-80 p-2"
                  >
                    <option value="" label="">
                      {"Ubicación demográfica"}
                    </option>
                    {UbicacionDemografica.map((item) => (
                      <option value={item.value} label={item.label}>
                        {item.value}
                      </option>
                    ))}
                  </select>
                  <select
                    name="ubicacionGeografica"
                    onChange={handleChange}
                    id="ubicacionGeografica"
                    placeholder="Ubicación geográfica"
                    className="input-admin-property text-gray-500 m-2 w-80  p-2"
                  >
                    <option value="" label="">
                      {"Ubicación geográfica"}
                    </option>
                    {UbicacionGeografica.map((item) => (
                      <option value={item.value} label={item.label}>
                        {item.value}
                      </option>
                    ))}
                  </select>
                  <div className="flex flex-row w-fit ml-2 input-admin-property py-2">
                    <select
                      id="dropdown-button"
                      name="moneda"
                      onChange={handleChange}
                      className="flex-shrink-0 inline-flex text-gray-500 items-center pl-2 text-sm h-[42px] w-18 font-medium text-center bg-gray-100 border rounded-l-md hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-300 "
                    >
                      <option value="">$</option>
                      <option value="$">USD</option>
                      <option value="₡">CRC</option>
                    </select>
                    <div className="relative w-full">
                      <input
                        type="number"
                        min={0}
                        onChange={handleChange}
                        name="precio"
                        placeholder="Precio de venta"
                        id="search-dropdown"
                        className="block text-gray-500 p-2.5 w-[241px] bg-transparent z-20 text-sm rounded-r-md border-l-transparent border focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                  </div>
                  <span className="ml-2 text-gray-500">Precio de alquiler</span>
                  <div className="flex flex-row w-fit mb-2 pl-1 max-[500px]:mb-2 input-admin-property ml-1 mr-1 py-2">
                    <select
                      id="dropdown-button"
                      name="monedaAlquiler"
                      onChange={handleChange}
                      className="flex-shrink-0 inline-flex text-gray-500 items-center pl-2 text-sm h-[42px] w-18 font-medium text-center bg-gray-100 border rounded-l-md hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-300 "
                    >
                      <option value="">$</option>
                      <option value="$">USD</option>
                      <option value="₡">CRC</option>
                    </select>
                    <div className="relative w-full">
                      <input
                        type="number"
                        min={0}
                        onChange={handleChange}
                        name="precioAlquiler"
                        //placeholder="Precio de alquiler"
                        id="search-dropdown"
                        className="block text-gray-500  p-2.5 w-[140px] bg-transparent z-20 text-sm rounded-r-md border-l-transparent border focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>

                    <div className="m-1 flex justify-center items-center content-center mt-2.5 self-start">
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          value=""
                          onChange={handleChange}
                          id="ivaAlquiler"
                          name="ivaAlquiler"
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                        <span className="ml-3 text-sm text-gray-500 font-semibold ">
                          +IVA
                        </span>
                      </label>
                    </div>
                  </div>
                  <span className="ml-2 text-gray-500">
                    Precio de alquiler con opción de compra
                  </span>
                  <div className="flex flex-row w-fit pl-1 input-admin-property ml-1 mr-1 py-2">
                    <select
                      name="monedaAlquilerVenta"
                      onChange={handleChange}
                      className="flex-shrink-0 inline-flex items-center pl-2 text-sm h-[42px] w-18 font-medium text-center text-gray-500 bg-gray-100 border rounded-l-md hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-300 "
                    >
                      <option value="">$</option>
                      <option value="$">USD</option>
                      <option value="₡">CRC</option>
                    </select>
                    <div className="relative w-full">
                      <input
                        type="number"
                        onChange={handleChange}
                        min={0}
                        name="precioAlquilerCompra"
                        //placeholder="Precio alquiler-compra"
                        className="block text-gray-500 p-2.5 w-[140px] bg-transparent z-20 text-sm rounded-r-md border-l-transparent border focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    <div className="m-1 flex justify-center items-center content-center mt-2.5 self-start">
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          value=""
                          onChange={handleChange}
                          id="ivaVenta"
                          name="ivaVenta"
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                        <span className="ml-3 text-sm text-gray-500 font-semibold ">
                          +IVA
                        </span>
                      </label>
                    </div>
                  </div>
                  <select
                    name="tieneCuotaMantenimiento"
                    onChange={handleChange}
                    placeholder="¿Tiene cuota mantenimiento?"
                    className="input-admin-property text-gray-500 m-2 w-80 p-2"
                  >
                    <option value="" label="">
                      {"¿Tiene cuota de mantenimiento?"}
                    </option>
                    <option value={true} label="Si">
                      Si
                    </option>
                    <option value={false} label="No">
                      No
                    </option>
                  </select>
                  <div className="flex flex-row ml-2 input-admin-property py-2">
                    <select
                      id="dropdown-button"
                      name="monedaCuotaMantenimiento"
                      onChange={handleChange}
                      className="flex-shrink-0 inline-flex text-gray-500 items-center pl-2 text-sm h-[42px] w-18 font-medium text-center bg-gray-100 border rounded-l-md hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-300 "
                    >
                      <option value="">$</option>
                      <option value="$">USD</option>
                      <option value="₡">CRC</option>
                    </select>
                    <div className="relative w-full">
                      <input
                        type="number"
                        min={0}
                        onChange={handleChange}
                        name="cuotaMantenimiento"
                        placeholder="Cuota de mantenimiento"
                        id="search-dropdown"
                        className="block text-gray-500 p-2.5 w-[241px] bg-transparent z-20 text-sm rounded-r-md border-l-transparent border focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                  </div>

                  <div className="flex input-admin-property ml-2 mr-1 py-2">
                    <select
                      name="avaluoMoneda"
                      id="avaluoMoneda"
                      onChange={handleChange}
                      className="flex-shrink-0 inline-flex items-center pl-2 text-sm h-[42px] w-18 font-medium text-center text-gray-500 bg-gray-100 border rounded-l-md hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-300 "
                    >
                      <option value="">$</option>
                      <option value="$">USD</option>
                      <option value="₡">CRC</option>
                    </select>
                    <div className="relative w-full">
                      <input
                        type="number"
                        onChange={handleChange}
                        min={0}
                        name="avaluo"
                        placeholder="Valor según avalúo"
                        className="block  text-gray-500  p-2.5 w-[240px] bg-transparent z-20 text-sm rounded-r-md border-l-transparent border focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                  </div>
                  <select
                    name="ubicacionCastral"
                    id="ubicacionCastral"
                    hidden={selectedOption === ""}
                    onChange={handleChange}
                    placeholder="Ubicación castral"
                    className="input-admin-property text-gray-500 m-2 w-80 p-2"
                  >
                    <option value="" label="">
                      {"Ubicación catastral"}
                    </option>
                    {UbicacionCatastral.map((item) => (
                      <option value={item.value} label={item.label}>
                        {item.value}
                      </option>
                    ))}
                  </select>
                  <select
                    name="ubicacionDemografica"
                    id="ubicacionDemografica"
                    onChange={handleChange}
                    placeholder="Ubicación demográfica"
                    className="input-admin-property text-gray-500 m-2 w-80 p-2"
                  >
                    <option value="" label="">
                      {"Ubicación demográfica"}
                    </option>
                    {UbicacionDemografica.map((item) => (
                      <option value={item.value} label={item.label}>
                        {item.value}
                      </option>
                    ))}
                  </select>
                  <select
                    name="ubicacionGeografica"
                    onChange={handleChange}
                    id="ubicacionGeografica"
                    placeholder="Ubicación geográfica"
                    className="input-admin-property text-gray-500 m-2 w-80 p-2"
                  >
                    <option value="" label="">
                      {"Ubicación geográfica"}
                    </option>
                    {UbicacionGeografica.map((item) => (
                      <option value={item.value} label={item.label}>
                        {item.value}
                      </option>
                    ))}
                  </select>
                  <input
                    type="number"
                    name="areaTerreno"
                    onChange={handleChange}
                    placeholder="Área total del terreno"
                    className="input-admin-property text-gray-500 m-2 w-80 p-2"
                  />
                  <select
                    hidden={selectedOption === ""}
                    name="tipoPiso"
                    onChange={handleChange}
                    placeholder="Tipo de piso"
                    className="input-admin-property text-gray-500 m-2 w-80 p-2"
                  >
                    <option value="" label="">
                      {"Tipo de piso"}
                    </option>
                    {TipoPiso.map((item) => (
                      <option value={item.value} label={item.label}>
                        {item.value}
                      </option>
                    ))}
                  </select>
                  <input
                    type="number"
                    name="habitaciones"
                    onChange={handleChange}
                    placeholder="Habitaciones"
                    max={15}
                    className="input-admin-property text-gray-500 m-2 w-80 p-2"
                  />
                  <input
                    type="number"
                    step="0.5"
                    min={0.5}
                    max={10}
                    name="banos"
                    onChange={handleChange}
                    placeholder="Baños"
                    className="input-admin-property text-gray-500 m-2 w-80 p-2"
                  />
                  <select
                    name="amueblado"
                    id="amueblado"
                    onChange={handleChange}
                    placeholder="Amueblado"
                    className="input-admin-property text-gray-500  m-2 w-80 p-2"
                  >
                    <option value="" label="">
                      {"Amueblado"}
                    </option>
                    {Amueblado.map((item) => (
                      <option value={item.value} label={item.label}>
                        {item.value}
                      </option>
                    ))}
                  </select>
                  <select
                    name="aptoHijos"
                    onChange={handleChange}
                    id="aptoHijos"
                    placeholder="Apto hijos"
                    className="input-admin-property text-gray-500 m-2 w-80 p-2"
                  >
                    <option value="" label="">
                      {"Apto hijos"}
                    </option>
                    {AptoNinos.map((item) => (
                      <option value={item.value} label={item.label}>
                        {item.value}
                      </option>
                    ))}
                  </select>
                  <select
                    name="aptoMascotas"
                    onChange={handleChange}
                    id="aptoMascotas"
                    placeholder="Apto mascotas"
                    className="input-admin-property text-gray-500 m-2 w-80 p-2"
                  >
                    <option value="" label="">
                      {"Apto mascotas"}
                    </option>
                    {AptoMascotas.map((item) => (
                      <option value={item.value} label={item.label}>
                        {item.value}
                      </option>
                    ))}
                  </select>
                  <select
                    name="parqueo"
                    id="parqueo"
                    onChange={handleChange}
                    className="input-admin-property text-gray-500 m-2 w-80 p-2"
                  >
                    <option value="" label="">
                      {"Parqueo"}
                    </option>
                    {Parqueo.map((item) => (
                      <option value={item.value} label={item.label}>
                        {item.value}
                      </option>
                    ))}
                  </select>
                  <select
                    name="concepcionElectrica"
                    onChange={handleChange}
                    id="concepcionElectrica"
                    placeholder="Conexión eléctrica"
                    className="input-admin-property text-gray-500 m-2 w-80 p-2"
                  >
                    <option value="" label="">
                      {"Conexión eléctrica"}
                    </option>
                    {Electrica.map((item) => (
                      <option value={item.value} label={item.label}>
                        {item.value}
                      </option>
                    ))}
                  </select>
                  <select
                    onChange={handleChange}
                    name="servicios"
                    className="input-admin-property text-gray-500 m-2 w-80 p-2"
                  >
                    <option value="" label="">
                      {"Servicios"}
                    </option>
                    {Servicios.map((item) => (
                      <option value={item.value} label={item.label}>
                        {item.value}
                      </option>
                    ))}
                  </select>
                  <div className="flex m-4 content-center items-center justify-center ">
                    <div className="flex flex-col w-fit content-center items-center justify-center">
                      <div className="m-1 flex justify-center items-center content-center self-start">
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            value=""
                            onChange={handleChange}
                            id="ley7600"
                            name="ley7600"
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                          <span className="ml-3 text-sm font-medium text-gray-500 dark:text-gray-300">
                            Ley 7600
                          </span>
                        </label>
                      </div>
                      <div className="m-1 justify-center items-center content-center flex self-start">
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            value=""
                            onChange={handleChange}
                            id="serviciosMedicos"
                            name="serviciosMedicos"
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                          <span className="ml-3 text-sm font-medium text-gray-500 dark:text-gray-300">
                            Servicios médicos
                          </span>
                        </label>
                      </div>
                      <div className="m-1 justify-center items-center content-center flex self-start">
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            value=""
                            onChange={handleChange}
                            id="areaCarga"
                            name="areaCarga"
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                          <span className="ml-3 text-sm font-medium text-gray-500 dark:text-gray-300">
                            Área carga
                          </span>
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col -ml-10 -mr-10">
                    <div>
                      <Select
                        name="amenidades"
                        noOptionsMessage={() => null}
                        closeMenuOnSelect={false}
                        options={Amenidades}
                        placeholder={"Amenidades"}
                        isMulti
                        className="categories w-80 my-1"
                        onChange={handleChangeAmenidades}
                      />
                    </div>
                    <div>
                      <Select
                        noOptionsMessage={() => null}
                        closeMenuOnSelect={false}
                        className="categories w-80 my-1"
                        name="jardinPatio"
                        options={PatioJardin}
                        placeholder={"Patio"}
                        isMulti
                        onChange={handleChangePatioJardin}
                      />
                    </div>
                    <div>
                      <Select
                        className="categories w-80 my-1"
                        name="detallesInternos"
                        noOptionsMessage={() => null}
                        closeMenuOnSelect={false}
                        options={DetallesInternos}
                        placeholder={"Detalles internos"}
                        isMulti
                        onChange={handleChangeDetallesInternos}
                      />
                    </div>
                    <div>
                      <Select
                        className="categories w-80 my-1"
                        name="detallesExternos"
                        noOptionsMessage={() => null}
                        closeMenuOnSelect={false}
                        options={DetallesExternos}
                        placeholder={"Detalles externos"}
                        isMulti
                        onChange={handleChangeDetallesExternos}
                      />
                    </div>
                  </div>

                  {/* Poner aqui los demas inputs que se necesite */}
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

            {/* <div
            className={records.length === 0 ? "hidden" : "my-3 justify-center"}
          >
             <input
              type="text"
              onChange={handleFilter}
              className="px-2 py-2 flex w-full border border-gray-300 rounded-md"
              placeholder="Filtrar por tipo de propiedad"
            />
          </div> */}
            <div
              className={
                records.length === 0 || !categoria
                  ? "hidden"
                  : "text-center font-semibold mt-2"
              }
            >
              Seleccione las propiedades
            </div>
            <div
              className={
                records.length === 0
                  ? "hidden"
                  : "flex justify-center flex-col content-center items-center"
              }
            >
              {records.map((property) => (
                <div className="w-full bg-white rounded-lg">
                  <div className="flex items-end justify-end mr-6 align-middle -mb-8 mt-3">
                    <span className="font-semibold text-blue-700 text-xs">
                      <button
                        onClick={() => handleOptionSelectChange(property.id)}
                      >
                        <input
                          type="checkbox"
                          className="h-6 w-6 rounded-full"
                        />
                      </button>
                    </span>
                  </div>
                  <div className="mb-3 -mt-12 mx-4">
                    <SearchCard propiedad={[property]} />
                  </div>
                </div>
              ))}
            </div>

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
      )}
    </div>
  );
};

export default AddPropertyModal;
