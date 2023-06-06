import React from 'react';
import { BiArea, BiBath, BiBed } from 'react-icons/bi';
import { useLocation } from 'react-router-dom';
import no_image from '../assets/images/no_image_default.jpg';

const PropertyDetails = () => {
  // console.log(isSearched);
  const { state } = useLocation()
  // console.log(state);
  const property = state?.property?.attributes

  return (<section>

    <div className="container mx-auto min-h-[800px] mb-14">
      <div className='flex flex-col lg:flex-row lg:items-center lg:justify-between' >
        <div>
          <h2 className='text-2xl font-semibold' >{property?.type}</h2>
          <h3 className='text-lg mb-4' >{property?.province + ' ' + property?.canton + ' ' + property?.district}</h3>
        </div>
        <div className='mb-4 lg:mb-0 flex gap-x-2 text-sm' >
          <div className='bg-green-500 text-white px-3 rounded-full' >{property?.type}</div>
          <div className='bg-blue-500 text-white px-3 rounded-full' >{property?.province}</div>
        </div>
        <div className='text-3xl font-semibold text-blue-600' >$ {property?.price}</div>
      </div>
      <div className='flex flex-col items-start gap-8 lg:flex-row' >
        <div className='max-w-[768px]'>
          <div className='mb-8' >
            <img src={property?.image ? property?.image : no_image} alt="" />
          </div>
          <div className='flex gap-x-6 text-blue-700 mb-6' >
            <div className='flex gap-x-2 items-center' >
              <BiBed className='text-2xl' />
              <div>{property?.details?.room}</div>
            </div>
            <div className='flex gap-x-2 items-center' >
              <BiBath className='text-2xl ' />
              <div>{property?.details?.bathroom}</div>
            </div>
            <div className='flex gap-x-2 items-center' >
              <BiArea className='text-2xl ' />
              <div>{property?.footage} m2</div>
            </div>
          </div>
          {/* <div>{property.description}</div> */}
          <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur quia quam iste error.
            Ad, explicabo? Nihil fugit iure corporis architecto aspernatur commodi, fuga at magni exercitationem,
            minima voluptatum deleniti impedit necessitatibus id, porro mollitia eos! Quasi perspiciatis saepe libero?
            Illo ex facilis hic aut molestias nam molestiae quibusdam ea veritatis culpa quia impedit nostrum neque,
            minus atque nemo deserunt aliquam eligendi quasi nobis enim perspiciatis nulla consectetur doloremque.
            Nulla iste modi accusamus consequatur alias sed atque qui quaerat sunt laboriosam.</div>
        </div>
      </div>
    </div>
  </section>);
};

export default PropertyDetails;
