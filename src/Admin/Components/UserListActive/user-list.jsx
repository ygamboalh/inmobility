import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { API } from "../../../constant";
import { getToken } from "../../../utils/helpers";
import UserPhoto from "../UserPhoto/user-photo";

const UserList = ({ users }) => {
    const MySwal = withReactContent(Swal);
    const [isLoading, setIsLoading] = useState();
    const navigate = useNavigate();
    const token = getToken();
    const DeleteUser = async (id) => {

        MySwal.fire({
            title: '¿Desea eliminar el usuario?',
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: 'Sí, eliminar',
            denyButtonText: `No`,
          }).then((result) => {
            if (result.isConfirmed) {
                const response = fetch(`${API}/users/${id}`, {
                    method: "DELETE",
                      headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                      },
                  }); 
                  if (result){
                    Swal.fire('Usuario eliminado!', '', 'success')

                  }
                  else {
                    Swal.fire('El usuario no fue eliminado', '', 'error')
                  }

            } else if (result.isDenied) {
              Swal.fire('El usuario no se eliminó', '', 'info')
            }
          });
        
          setIsLoading(false);
        }
        
        /* if(!users)
        {
            return <>{isLoading && <Spin size="medium" />}</>
        } */

        return(
         
          users.map(({id, username, email, company, address, mobile, personalId }) => {
                 return(
                 <tr key={id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                 <td className="w-4 p-4">
                    <div className="flex items-center">
                        <input id="checkbox-table-search-1" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                        <label htmlFor="checkbox-table-search-1" className="sr-only">Id</label>
                    </div>
                </td>
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {UserPhoto}
                 </th>
                 <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                     {username}
                 </th>
                 <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                     {email}
                 </th>
                 <td className="px-6 py-4">
                     {company}
                 </td>
                 <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                     {address}
                 </th>
                 <td className="px-6 py-4">
                     {mobile}
                 </td>
                 <td className="flex items-center px-6 py-4 space-x-3">
                     <button type="button" onClick={()=>navigate(`/admin/users/insert-user/${id}`)} className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Editar</button>
                     <button type="button" onClick={()=>DeleteUser(id)} className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Eliminar</button>
                 </td>
                 </tr>
                 )
         })
            )
}

export default UserList;