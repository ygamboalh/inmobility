import React from 'react';

// Import icons
import { BiArea, BiBath, BiBed } from 'react-icons/bi';

const House = ({ property }) => {
  const { district, province, footage, price, details } = property.attributes
  return (
    <div>
      <div className='bg-white shadow-1 p-5 rounded-lg rounded-tl-[90px] w-full max-w-[352px] mx-auto cursor-pointer hover:shadow-2xl transition' >
        {/* <img src={image} alt='' className='mb-8' /> */}
        <div className='mb-4 flex gap-x-2 text-sm' >
          <div
            className='bg-green-500 rounded-full text-white px-3 '
          >{province}</div>
          <div
            className='bg-blue-900 rounded-full text-white px-3 '
          >{district}
          </div>
        </div>
        {/* <div className='text-lg font-semibold max-w-[260px]' >
          {address}
        </div> */}
        <div
          className='flex gap-x-4 my-4'
        >
          <div
            className='flex items-center text-gray-600 gap-1'
          >
            <div
              className='text-[20px]'
            >
              <BiBed />
            </div>
            <div>{details ? details.room : ''}</div>
          </div>
          <div
            className='flex items-center text-gray-600 gap-1'
          >
            <div
              className='text-[20px]'
            >
              <BiBath />
            </div>
            <div>{details ? details.bathroom : ''}</div>
          </div>
          <div
            className='flex items-center text-gray-600 gap-1'
          >
            <div
              className='text-[20px]'
            >
              <BiArea />
            </div>
            <div>{footage} sqft</div>
          </div>
        </div>
        <div
          className='text-lg font-semibold text-blue-600 mb-4'
        >{price}</div>
      </div>
    </div>
  )
};

export default House;
