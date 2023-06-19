import React from 'react';
import * as Yup from 'yup';
import { API } from '../../../constant';
import AxiosInstance from "../../../api/AxiosInstance"
import { message } from 'antd';

const InsertProperty = () => {

  const InsertProportySchema = Yup.object().shape({
    provincia: Yup.string().required('¡La provincia es requerida!'),
    canton: Yup.string().required('¡Canton es requerido!'),
    distrito: Yup.string().required('¡El distrito es requerido!'),
    precio: Yup.number().required('¡El precio es requerido!'),
    tipoPropiedad: Yup.string().required('¡El tipo es requerido!'),
    amenidades: Yup.string().required('¡Amenidades es requerido!'),
    areaContruccion: Yup.number().required('¡El área es requerida!'),
    habitaciones: Yup.number().required('¡El número de habitaciones es requerido!'),
    banos: Yup.number().required('¡El número de baños es requerido!'),
    jardinPatio: Yup.string().required('¡Jardín patio es requerido!'),
    ley7600: Yup.boolean().required('¡Este campo es requerido!'),
    detallesInternos: Yup.string().required('¡Los detalles internos son requeridos!'),
    detallesExternos: Yup.string().required('¡Los detalles externos son requeridos!'),
    amueblado: Yup.string().required('¡Este dato es requerido!'),
    aptoHijos: Yup.string().required('¡Este dato es requerido!'),
    aptoMascotas: Yup.string().required('¡Este dato es requerido!'),
    cuotaMantenimiento: Yup.number().required('¡La cuota es requerida!'),
    areaBodega: Yup.number().required('¡El área es requerida!'),
    altura: Yup.number().required('¡La altura es requerida!'),
    concepcionElectrica: Yup.string().required('¡Este dato es requerido!'),
    areaCarga: Yup.boolean().required('¡Este dato es requerido!'),
    areaPlantas: Yup.number().required('¡El área es requerida!'),
    numeroPlantas: Yup.number().required('¡El número de plantas es requerido!'),
    propositoTerreno: Yup.string().required('¡El propósito es requerido!'),
    ubicacionCastral: Yup.string().required('¡La ubicación castral es requerida!'),
    ubicacionDemografica: Yup.string().required('¡La ubicación demográfica es requerida!'),
    areaMesanini: Yup.number().required('¡Este dato es requerido!'),
    areaSotano: Yup.number().required('¡Este dato es requerido!'),
    tipoDensidad: Yup.string().required('¡Este dato es requerido!'),
    servicios: Yup.string().required('¡Este dato es requerido!'),
    serviciosMedicos: Yup.boolean().required('¡Este dato es requerido!'),
    anunciante: Yup.string().required('¡Este dato es requerido!'),
    categorias: Yup.string().required('¡Este dato es requerido!'),


    
    
    
    
    username: Yup.string().required('¡El nombre es requerido!'),
    email: Yup.string().matches(emailRegex,'¡Correo inválido!').required('¡El correo es requerido!'),
    password: Yup.string()
      .min(6, '¡Debe ser más larga!')
      .max(50, '¡Demasiado larga!')
      .required('¡La contraseña es requerida!'),
    company: Yup.string()
      .min(4, '¡Debe ser más larga!')
      .max(50, '¡Demasiado larga!')
      .required('¡El nombre de la empresa es requerido!'),
    address: Yup.string()
      .min(4, '¡Debe ser más larga!')
      .max(50, '¡Demasiado larga!')
      .required('¡Su dirección es requerida!'),
    type: Yup.string().required('¡El tipo de asesor es requerido!'),
    acept: Yup.boolean().oneOf([true], '¡Debe aceptar los términos!'), 
    phone: Yup.string()
      .matches(phoneRegex,'¡Teléfono invalido!')
      .min(10,'¡Teléfono invalido!')
      .max(15,'¡Teléfono invalido!')
      .required('¡El teléfono de la oficina es requerido!'),
    mobile: Yup.string()
      .matches(phoneRegex,'¡Teléfono invalido!')
      .min(10,'¡Teléfono invalido!')
      .max(15,'¡Teléfono invalido!')
      .required('¡El teléfono celular es requerido!'),
    personalId: Yup.string()
      .required('¡El identificador personal es requerido!'),
  });

  const onFinish = async (values) => {
    setIsLoading(true);
    try {
      const value = {
        username:values.username,
        email: values.email,
        password: values.password,
        phone: values.phone,
        company: values.company,
        address: values.address,
        mobile: values.mobile,
        personalId: values.personalId,
        type:values.type,
      };
      
      const response = AxiosInstance.post('/properties', value);
      const data = await response.json();
      console.log(data);  
      message.success("¡La propiedad fue creada correctamente!");
        navigate("/admin/properties/", { replace: true });
      }
     catch (error) {
      message.error("¡Ocurrió un error inesperado!");
    } finally {
      setIsLoading(false);
    }
  };












  return (
  <div>
    <div className="inset-y-0 mt-3 left-0 flex justify-center align-middle items-center pl-3">            
        <div className="">
            <label className='font-semibold text-xl'>Crear una nueva propiedad</label>            
        </div>         
    </div>
    <div className="flex flex-wrap justify-center m-3">
      <input type="text" placeholder="Provincia" className="input-admin-property m-2 w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/6 p-2" />
      <input type="text" placeholder="Canton" className="input-admin-property m-2 w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/6 p-2" />
      <input type="text" placeholder="Distrito" className="input-admin-property m-2 w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/6 p-2" />
      <input type="number" placeholder="Precio" className="input-admin-property m-2 w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/6 p-2" />
      <input type="text" placeholder="Tipo de propiedad" className="input-admin-property m-2 w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/6 p-2" />
      <input type="text" placeholder="Amenidades" className="input-admin-property m-2 w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/6 p-2" />
      <input type="number" placeholder="Área construcción" className="input-admin-property m-2 w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/6 p-2" />
      <input type="number" placeholder="Habitaciones" className="input-admin-property m-2 w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/6 p-2" />
      <input type="number" placeholder="Baños" className="input-admin-property m-2 w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/6 p-2" />
      <input type="text" placeholder="Jardin patio" className="input-admin-property m-2 w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/6 p-2" />
      <input type="number" placeholder="Área terreno" className="input-admin-property m-2 w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/6 p-2" />
      <input type="text" placeholder="Detalles internos" className="input-admin-property m-2 w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/6 p-2" />
      <input type="text" placeholder="Detalles externos" className="input-admin-property m-2 w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/6 p-2" />
      <input type="text" placeholder="Amueblado" className="input-admin-property m-2 w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/6 p-2" />
      <input type="text" placeholder="Apto hijos" className="input-admin-property m-2 w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/6 p-2" />
      <input type="text" placeholder="Apto mascotas" className="input-admin-property m-2 w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/6 p-2" />
      <input type="number" placeholder="Cuota mantenimiento" className="input-admin-property m-2 w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/6 p-2" />
      <input type="number" placeholder="Área bodega" className="input-admin-property m-2 w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/6 p-2" />
      <input type="number" placeholder="Altura" className="input-admin-property m-2 w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/6 p-2" />
      <input type="text" placeholder="Concepción eléctrica" className="input-admin-property m-2 w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/6 p-2" />
      <input type="number" placeholder="Área plantas" className="input-admin-property m-2 w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/6 p-2" />
      <input type="number" placeholder="Número de plantas" className="input-admin-property m-2 w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/6 p-2" />
      <input type="text" placeholder="Propósito terreno" className="input-admin-property m-2 w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/6 p-2" />
      <input type="text" placeholder="Ubicación castral" className="input-admin-property m-2 w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/6 p-2" />
      <input type="text" placeholder="Ubicación demográfica" className="input-admin-property m-2 w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/6 p-2" />
      <input type="text" placeholder="Ubicación geográfica" className="input-admin-property m-2 w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/6 p-2" />
      <input type="number" placeholder="Área mesanini" className="input-admin-property m-2 w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/6 p-2" />
      <input type="number" placeholder="Área sótano" className="input-admin-property m-2 w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/6 p-2" />
      <input type="text" placeholder="Tipo densidad" className="input-admin-property m-2 w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/6 p-2" />
      <input type="text" placeholder="Anunciante" className="input-admin-property m-2 w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/6 p-2" />
      <input type="text" placeholder="Categorías" className="input-admin-property m-2 w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/6 p-2" />
      <input type="file" placeholder="Imágenes" className="input-admin-property m-2 w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/6 p-2" />
      <div className="m-2 w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/6 p-2">
        <input type="checkbox" id="ley7600" value="Ley 7600" className='mr-1' placeholder="Ley 7600" />
        <label htmlFor="ley7600">Ley 7600</label>
      </div>
      <div className="m-2 w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/6 p-2">
        <input type="checkbox" id="medical" className='mr-1' value = "Servicios médicos" placeholder="Servicios médicos"/>
        <label htmlFor="medical">Servicios médicos</label>  
      </div>
      <div className="m-2 w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/6 p-2">
        <input type="checkbox" id="loadArea" className='mr-1' value = "Área carga" placeholder="Área carga"/>
        <label htmlFor="loadArea">Área carga</label>  
      </div>
    </div>
    <hr></hr>
    <div className="inset-y-0 mt-3 left-0 flex justify-center align-middle items-center pl-3">            
        <div className="">
            <button type="button" className="mr-2 py-2 px-4 rounded bg-blue-700 text-white">Crear Nueva</button>
        </div>         
    </div>
 </div>
  );
}

export default InsertProperty;