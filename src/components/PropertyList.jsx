import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Property from './Property';

import { baseUrl, fetchApi } from '../api/axios.realstate';

const PropertyList = () => {

  const [properties, setProperties] = useState([])

  const getCICData = async (url) => {
    const data = await fetchApi(`${baseUrl}/api/properties`)
    console.log(data);
    setProperties(data)
  }

  useEffect(() => {
    getCICData()
  }, [])

  return <section className='mb-20' >
    <div className="container mx-auto">
      <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-14' >
        {properties.map((property, index) => {
          return (
            <Link to={`/property/${property.id}`} key={index} >
              <Property property={property} />
            </Link>
          )
        })}
      </div>
    </div>
  </section>
}

export default PropertyList