import React, { useEffect, useState } from 'react';
import { BiArea, BiBath, BiBed } from 'react-icons/bi';
import { useLocation } from 'react-router-dom';
import no_image from '../../../assets/images/no_image_default.jpg'
import { useParams } from 'react-router-dom';
import { API } from '../../../constant';
import AxiosInstance from '../../../api/AxiosInstance';

const PropertyDetailsAdmin = () => {
    
    useEffect(() => {
        getProperty();
    },[]);

    const {  id } = useParams();
    const [property, setProperty] = useState([]);
    const getProperty = async () =>{
        const propertyResponse = await AxiosInstance.get(`${API}/properties/${id}`);
         
        console.log(propertyResponse.data.data.attributes);
        const propertyFound = propertyResponse.data.data.attributes; 
        setProperty(propertyFound);
    }
    console.log(property.canton);
    
  return (<section>

    <div className="container mx-auto min-h-[800px] mb-14">
      <div className='flex flex-col lg:flex-row lg:items-center lg:justify-between' >
        <div>
          <h2 className='text-2xl font-semibold' >{property.tipoPropiedad}</h2>
          <h3 className='text-lg mb-4' >{property.provincia + ' - ' + property.canton + ' - ' + property.distrito}</h3>
        </div>
        <div className='mb-4 lg:mb-0 flex gap-x-2 text-sm' >
          <div className='bg-green-500 text-black px-3 rounded-full' >{property.tipoPropiedad}</div>
          <div className='bg-blue-500 text-black px-3 rounded-full' >{property.provincia}</div>
        </div>
        <div className='text-3xl font-semibold text-blue-600' >$ {property.precio}</div>
      </div>
      <div className='flex flex-col items-start gap-8 lg:flex-row' >
        <div className='max-w-[768px]'>
          <div className='mb-8' >
            <img src={property.image ? property.image : no_image} alt="" />
          </div>
          <div className='flex gap-x-6 text-blue-700 mb-6' >
            <div className='flex gap-x-2 items-center' >
              <BiBed className='text-2xl' />
              <div>{property.habitaciones}</div>
            </div>
            <div className='flex gap-x-2 items-center' >
              <BiBath className='text-2xl ' />
              <div>{property.banos}</div>
            </div>
            <div className='flex gap-x-2 items-center' >
              <BiArea className='text-2xl ' />
              <div>{property.footage} m2</div>
            </div>
          </div>
          <div>{property.description}</div>
        </div>
      </div>
    </div>
  </section>);
};

export default PropertyDetailsAdmin