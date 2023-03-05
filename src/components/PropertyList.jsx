import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { PropertyContext } from '../context/context.properties';
import Property from './Property';

const PropertyList = () => {
  const { strapiProperties } = useContext(PropertyContext)

  console.log(strapiProperties);

  return <section className='mb-20' >
    <div className="container mx-auto">
      <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-14' >
        {strapiProperties.map((property, index) => {
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