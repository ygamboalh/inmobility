import React, { useState } from "react";
import { Link } from "react-router-dom";
 
  const SentRequest = () => {
    return (
      <div className="flex flex-col my-40 items-center justify-between w-screen bg-white">
       <div className="mb-0 mt-0 text-center sm:my-2 flex flex-col">
          <label className="loginh my-2">Solicitud enviada</label>
          <label className="loginh5 w-72 mb-1">
            Gracias por confiar en <b>Sistema CIC. </b>
            Estaremos evaluando tu caso, y cuando verifiquemos serás notificado
            vía email y podrás ingresar a la herramienta como asesor verificado.
          </label>
       </div>
       <div className="max-w-60 flex flex-col">
            <Link to='/home/banner' link-to className="button-rq">Acceder a la base de datos</Link>
         </div>
     </div>
    );
  };
  
  export default SentRequest;