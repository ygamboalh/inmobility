import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { Spin } from "antd";
import {useForm} from '../../../hooks/useForm'
import { getActiveProperties, getAllProperties } from '../../../api/propertiesApi';
import PropertiesList from "./properties-list";

const PropertyListActive  = () => {
    
    const [isLoading, setIsLoading] = useState(false);

    const [formValues, handleInputChange, reset] = useForm({searchText:''});
    const {searchText} = formValues;
    const [property, setProperty] = useState([]);
    
    const { data: properties } = useQuery('activeProperties',getActiveProperties);
    
     const handleSearch = (e) => {
        setIsLoading(true);
        e.preventDefault();
        searchProperties(searchText);
      } 
     const searchProperties =(searchParam) => {
        setIsLoading(true);
        const foundedProperties = [];
        properties && properties.data.forEach(obj => {
            Object.entries(obj.attributes).forEach(([key, value]) => {
              const lowerCaseParam = String(searchParam).toLowerCase();
              const lowerCaseValue = String(value).toLowerCase();
                if(lowerCaseValue.includes(lowerCaseParam)) {
                    const foundedObjet = foundedProperties.find(p => p.key === obj.key);
                    if(!foundedObjet) {
                        foundedProperties.push(obj);
                    }
                }   
            });
          });
          setProperty({ data:foundedProperties});
          setIsLoading(false);
    } 
    if(isLoading){
        return <>{isLoading && <Spin size="medium" />}</>
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
                    <button onClick={() => {setProperty([]); reset();}} className="ml-10">Cancelar búsqueda</button>
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
        <PropertiesList properties={property.length === 0 ? properties : property } />
        </tbody>
    </table>
        </div>
    );
}

export default PropertyListActive;