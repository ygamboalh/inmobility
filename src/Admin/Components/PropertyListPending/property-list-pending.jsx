import { useEffect, useState } from "react";
import { API, BEARER } from "../../../constant";
import { getToken } from "../../../utils/helpers";
import { Link, useNavigate } from "react-router-dom";
import {useForm} from '../../../hooks/useForm'

const PropertyListPending  = () => {

    const [formValues, handleInputChange] = useForm({searchText:''});
    const {searchText} = formValues;
    const [property, setProperty] = useState([]);
    const navigate = useNavigate()
    useEffect(() => {
        GetProperties();
    },[]);

     const handleSearch = (e) => {
        e.preventDefault();
        const result = searchProperties(searchText);
        setProperty(result); 
        console.log(searchText);
        console.log(result);
      } 
     const searchProperties =(searchParam) => {
        const foundedProperties = [];
        property.forEach(obj => {
            Object.entries(obj).forEach(([key, value]) => {
              const lowerCaseParam = String(searchParam).toLowerCase();
              const lowerCaseValue = String(value).toLowerCase(); 
                console.log(`Clave: ${key}, Valor: ${value}`);
                if(lowerCaseValue.includes(lowerCaseParam)) {
                    foundedProperties.push(obj);
                }    
            });
          });
        console.log(foundedProperties);
        setProperty(foundedProperties);
          return foundedProperties;
    } 
//Esta funcion solo va a buscar los inmuebles que estan pendientes a activacion
       const GetProperties = async () => {
        const token = getToken();
        const response = await fetch(`${API}/properties`, {
            method: "GET",
            headers: { Authorization: `${BEARER} ${token}` },
          });
          const {data} = await response.json();
    
          const property = data.map(pro => {
            return {
                id: pro.id,
                habitaciones: pro.attributes.habitaciones,
                precio : pro.attributes.precio,
                provincia: pro.attributes.provincia,
                canton: pro.attributes.canton,
                distrito: pro.attributes.distrito,
                tipoPropiedad : pro.attributes.tipoPropiedad
            }
        });
          setProperty(property);
          console.log(property);
      } 

    return (
        <div className="overflow-x-auto mx-8 shadow-md sm:rounded-lg">
            <form onSubmit={handleSearch}>
                <div className="mt-2 mx-8 mb-2">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">           
                    </div>
                    <input value={searchText} onChange={handleInputChange} autoComplete="off" name="searchText" type="text" id="input-group-1" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5"  placeholder="Busqueda"/>
                </div>
            </form>
           <table className="w-full mt-4 text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" className="p-4">
                    <div className="flex items-center">
                        <input id="checkbox-all-search" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                        <label htmlFor="checkbox-all-search" className="sr-only">id</label>
                    </div>
                </th>
                <th scope="col" className="px-6 py-3">Provincia</th>
                <th scope="col" className="px-6 py-3">Distrito</th>
                <th scope="col" className="px-6 py-3">Canton</th>
                <th scope="col" className="px-6 py-3">Tipo de propiedad</th>
                <th scope="col" className="px-6 py-3">Habitaciones</th>
                <th scope="col" className="px-6 py-3">Precio</th>
                <th scope="col" className="px-6 py-3">Baños</th>
                <th scope="col" className="px-6 py-3">Accion</th>
            </tr>
        </thead>
        <tbody>  
            
        { property.map(({id, habitaciones, precio, provincia, distrito, canton, tipoPropiedad, banos }) => (
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <td className="w-4 p-4">
                    <div className="flex items-center">
                        <input id="checkbox-table-search-1" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                        <label htmlFor="checkbox-table-search-1" key={id} className="sr-only">{id}</label>
                    </div>
                </td>
                <th key={provincia} scope="col" className="px-6 py-3">{provincia}</th>
                <th key={distrito} scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{distrito}</th>
                <th key={canton} scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{canton}</th>
                <td key={tipoPropiedad} className="px-6 py-4">{tipoPropiedad}</td>
                <th key={habitaciones} scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{habitaciones}</th>
                <td key={precio} className="px-6 py-4">{precio}</td>
                <td key = {banos} className="px-6 py-4">{banos}</td>
                <td className="flex items-center px-6 py-4 space-x-3">
                    <button type="button" onClick ={() => navigate(`/admin/properties/property-detail/${id}`, { state: { property } })} className="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:focus:ring-yellow-900">Detalles</button>
                    <button type="button" className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Editar</button>
                    <button type="button" className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Eliminar</button>
                </td>
                </tr>
            ))
        }            
        </tbody>
    </table>
        </div>

    );
}

export default PropertyListPending;