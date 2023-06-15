import React from "react";
import { Link } from "react-router-dom";
 
  const AccessDenied = () => {
    return (
      <div className="flex flex-col my-40 items-center justify-between w-screen bg-white">
       <div className="mb-0 mt-0 text-center sm:my-2 flex flex-col">
          <label className="loginh my-2">No tienes acceso</label>
          <label className="loginh5 w-72 mb-1">
            Lo sentimos, aún no tienes acceso a esta funcionalidad, debes verificarte como Asesor inmobiliario
          </label>
       </div>
       <div className="max-w-60 flex flex-col">
            <Link to='/register-request' link-to className="button-rq">Solicitar ahora</Link>
         </div>
     </div>
    );
  };
  
  export default AccessDenied;