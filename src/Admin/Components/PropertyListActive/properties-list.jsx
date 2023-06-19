import { useNavigate } from "react-router-dom";

const PropertiesList = ({ properties }) => {
    const navigate = useNavigate()
    console.log(properties);

        return(
                properties.data.map((property)=>{
                    const {habitaciones, precio, provincia, distrito, canton, tipoPropiedad, banos } = property.attributes;
                    return (
                        <tr key={property.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <td className="w-4 p-4">
                    <div className="flex items-center">
                        <input id="checkbox-table-search-1" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                        <label htmlFor="checkbox-table-search-1" className="sr-only">{property.id}</label>
                    </div>
                </td>
                <th scope="col" className="px-6 py-3">{provincia}</th>
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{distrito}</th>
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{canton}</th>
                <td className="px-6 py-4">{tipoPropiedad}</td>
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{habitaciones}</th>
                <td className="px-6 py-4">{precio}</td>
                <td className="px-6 py-4">{banos}</td>
                <td className="flex items-center px-6 py-4 space-x-3">
                    <button type="button" onClick ={() => navigate(`/admin/properties/property-detail/${property.id}`)} className="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:focus:ring-yellow-900">Detalles</button>
                    <button type="button" className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Editar</button>
                    <button type="button" className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Eliminar</button>
                </td>
                </tr>
                    )
                })
            )
}

export default PropertiesList;