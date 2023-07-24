import { useLocation, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import PortafolioCard from "./portfolio-card";
import MySpinner from "../Spinner/spinner";
import { BiMailSend, BiPhoneCall } from "react-icons/bi";
import AxiosInstance from "../../api/AxiosInstance";
import { API } from "../../constant";

const PortafolioShare = () => {
  const { id } = useParams();
  const [properties, setProperties] = useState("");
  const [portafolio, setPortafolio] = useState("");
  //const portafolio = location.state;

  let ids = [];

  useEffect(() => {
    const response = AxiosInstance.get(`${API}portafolios/${id}?populate=*`)
      .then((response) => {
        const data = response.data.data.attributes.properties.data;
        console.log(data);
        console.log(response.data.data);
        data.map((prop) => {
          ids.push(prop.id);
        });
        setProperties(ids);
        setPortafolio(response.data.data);
      })
      .catch((error) => console.error);
  }, []);

  if (!portafolio) {
    return <MySpinner />;
  }
  return (
    <div>
      <div className="mx-8">
        <span className="font-semibold">
          ¡Saludos! Estimado {portafolio.attributes.clienteComprador}
        </span>
      </div>
      <div className="mx-8 mb-3">
        <span>
          Los inmuebles que le presento a continuación son aquellos que con base
          en sus requerimientos y presupuesto; considero que podrían
          interesarle. Le sugerimos ver cada uno de ellos y clasificar aquellos
          que (sin compromiso alguno) desee visitar. ¡Para mí será un placer
          mostrarle en persona, cada inmueble que Usted considere agradable o
          interesante; hasta lograr ubicar ese inmueble perfecto¡ Una vez que
          haya terminado de observar y clasificar los inmuebles que le agradan,
          por favor, renvíeme el Portafolio para saber a cuales inmuebles darle
          el debido seguimiento. ¡Quedo a sus órdenes!
        </span>
      </div>
      <div className="mx-8 flex flex-col">
        <span className="font-semibold">Estos son mis datos de contacto:</span>
        <div className="flex flex-row">
          <BiMailSend size={27} />
          <span className="pl-2">{portafolio.attributes.correoAsesor}</span>
        </div>
        <div className="flex flex-row">
          <BiPhoneCall size={27} />
          <span className="pl-2">{portafolio.attributes.telefonoAsesor}</span>
        </div>
      </div>
      {properties.length !== 0
        ? properties?.map((property) => {
            return (
              <div className="mb-3 mt-3 mx-2">
                <PortafolioCard propiedad={{ property, portafolio }} />
              </div>
            );
          })
        : "no hay datos para mostrar"}
      <div className="flex justify-center">
        <form>
          <button
            className="bg-blue-700 px-2 my-2 py-1 mx-2 h-12 w-48 text-white rounded-md"
            type="submit"
          >
            Enviar respuesta
          </button>
        </form>
      </div>
    </div>
  );
};

export default PortafolioShare;
