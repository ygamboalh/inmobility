
import { useState } from "react";
import Navbar from "../NavBar/NavBar";
import PropertyListActive from "../PropertyListActive/property-list-active";
import PropertyListPending from "../PropertyListPending/property-list-pending";
import PropertyListDesact from "../PropertyListDesact/property-list-desact";
import UserListActive from "../UserListActive/user-list-active";

const Users1111 = () => {

    const [activeButton, setActiveButton] = useState(1);
    const handleButtonClick = (buttonNumber) => {
        setActiveButton(buttonNumber);
    }
    return (
    <div>
        <div>
            <Navbar/>
        </div>
        <div>
        <hr/>
    <div className="mt-24 mx-8 mb-2">
        <div className="inset-y-0 left-0 flex items-center pl-3"> 
            <div>
                <button onClick={() => handleButtonClick(1)} type="button" className={`mr-2 py-2 px-4 rounded ${activeButton === 1 ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}>Activos</button>
            </div>
            <div>
                <button onClick={() => handleButtonClick(2)} type="button" className={`mr-2 py-2 px-4 rounded ${activeButton === 2 ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}>Por activar</button>
            </div>
            <div>
                <button onClick={() => handleButtonClick(3)} type="button" className={`mr-2 py-2 px-4 rounded ${activeButton === 3 ? 'bg-blue-500 text-white' : 'bg-gray-300'}`} >Inactivos</button>
            </div>          
        </div>
    </div>
    <div className="mt-2 mx-8 mb-2">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">           
        </div>
        <input type="text" id="input-group-1" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5"  placeholder="Busqueda"/>
    </div>
        {activeButton === 1 && <UserListActive />}
        {activeButton === 2 && <PropertyListPending />}
        {activeButton === 3 && <PropertyListDesact />}
        </div>
    </div>
    )
}





export default Users1111;