import { useEffect, useState } from "react";
import { API, BEARER } from "../../../constant";
import { getToken } from "../../../utils/helpers";
import { useNavigate } from "react-router-dom";

const UserListActive111  = () => {
    
    const [user, setUser] = useState([]);
    const navigate = useNavigate()
    useEffect(() => {
        GetUsers();
    },[]);

    const GetUsers = async () => {
        const token = getToken();
        const response = await fetch(`${API}/users?populate=role`, {
            method: "GET",
            headers: { Authorization: `${BEARER} ${token}` },
          });
          const data = await response.json();
          console.log(data);
          const user = data.map(u => {
            return {
                id: u.id,
                username: u.username,
                email: u.email,
                type: u.type
                
            }
          });
          setUser(user);
      } 

    return (
        <div className="overflow-x-auto w-fit mx-8 shadow-md sm:rounded-lg">
           <table className="w-full mt-4 text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" className="p-4">
                    <div className="flex items-center">
                        <input id="checkbox-all-search" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                        <label htmlFor="checkbox-all-search" className="sr-only">id</label>
                    </div>
                </th>
                <th scope="col" className="px-6 py-3">Nombre</th>
                <th scope="col" className="px-6 py-3">Role</th>
                <th scope="col" className="px-6 py-3">Email</th>
                <th scope="col" className="px-6 py-3">Empresa</th>
                <th scope="col" className="px-6 py-3">Dirección</th>
                <th scope="col" className="px-6 py-3">Celular</th>
                <th scope="col" className="px-6 py-3">Teléfono oficina</th>
                <th scope="col" className="px-6 py-3">Identificador</th>
                <th scope="col" className="px-6 py-3">Accion</th>
            </tr>
        </thead>
        <tbody>  
            
        { user.map(({id, username, role, email, company, address, mobile, phone, personalId }) => (
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <td className="w-4 p-4">
                    <div className="flex items-center">
                        <input id="checkbox-table-search-1" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                        <label htmlFor="checkbox-table-search-1" key={id} className="sr-only">{id}</label>
                    </div>
                </td>
                <th key={username} scope="col" className="px-6 py-3">
                    {username}
                </th>
                <th key={role} scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {role}
                </th>
                <th key={email} scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {email}
                </th>
                <td key={company} className="px-6 py-4">
                    {company}
                </td>
                <th key={address} scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {address}
                </th>
                <td key={mobile} className="px-6 py-4">
                    {mobile}
                </td>
                <td key = {phone} className="px-6 py-4">
                    {phone}
                </td>
                <td key = {personalId} className="px-6 py-4">
                    {personalId}
                </td>
                <td className="flex items-center px-6 py-4 space-x-3">
                    <button type="button" className="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:focus:ring-yellow-900">Detalles</button>
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

export default UserListActive111;