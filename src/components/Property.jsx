import React from 'react';
import no_image from '../assets/images/no_image_default.jpg';
// Import icons
import { BiArea, BiBath, BiBed } from 'react-icons/bi';
import { GiHomeGarage } from 'react-icons/gi';
import { ImLocation2 } from 'react-icons/im';
import { IoIosHome } from 'react-icons/io'
import { AiOutlineLink } from 'react-icons/ai'
import { BsFiletypePdf } from 'react-icons/bs'
import { CgProfile } from 'react-icons/cg'
import { useNavigate } from 'react-router-dom';

const House = ({ property }) => {

  const navigate = useNavigate()

  const { district, province, footage, price, details, image, parkingNumber, canton } = property.attributes

  return (
    <div onClick={() => navigate(`/property/${property.id}`, { state: { property } })} >

      <div className='bg-slate-200 shadow-1 p-5 rounded-lg w-full cursor-pointer max-w-[352px] mx-auto hover:shadow-2xl transition' >
        <img src={image ? image : no_image} alt='' className='mb-8' />

        <div className='mb-4 flex gap-x-2 text-sm' >
          <div className='flex items-center text-gray-600 gap-1'>
            <div
              className='text-[20px]'
            >
              <ImLocation2 />
            </div>
          </div>

          <div className='bg-primary rounded-full text-white px-3 ' >
            {province}, {canton}, {district}
          </div>
        </div>

        <div className='flex flex-wrap gap-y-2 gap-x-4 my-4'>

          <div className='flex items-center text-gray-600 gap-1'>
            <div
              className='text-[20px]'
            >
              <BiArea />
            </div>
            <div>{footage} - m2</div>
          </div>

          <div className='flex items-center text-gray-600 gap-1'>
            <div
              className='text-[20px]'
            >
              <IoIosHome />
            </div>
            <div>{footage} - m2</div>
          </div>

          <div className='flex items-center text-gray-600 gap-1'>
            <div
              className='text-[20px]'
            >
              <BiBed />
            </div>
            <div>{details ? details.room : 'N/A'}</div>
          </div>

          <div className='flex items-center text-gray-600 gap-1'>
            <div
              className='text-[20px]'
            >
              <BiBath />
            </div>
            <div>{details ? details.bathroom : 'N/A'}</div>
          </div>

          <div className='flex items-center text-gray-600 gap-1'>
            <div
              className='text-[20px]'
            >
              <GiHomeGarage />
            </div>
            <div>{parkingNumber}</div>
          </div>

        </div>

        <div className='text-lg font-semibold text-blue-600 mb-4' >$ {price}</div>

        <div className='flex flex-row justify-around flex-wrap gap-y-2 gap-x-4 my-4'>

          <div className='flex items-center cursor-pointer text-gray-600 gap-1'>
            <div
              className='text-[20px]'
            >
              <AiOutlineLink className='text-3xl' />
            </div>
            <div>{details ? details.bathroom : 'N/A'}</div>
          </div>

          <div className='flex items-center cursor-pointer text-gray-600 gap-1'>
            <div
              className='text-[20px]'
            >
              <BsFiletypePdf className='text-2xl' />
            </div>
            <div>{details ? details.bathroom : 'N/A'}</div>
          </div>

          <div className='flex items-center cursor-pointer text-gray-600 gap-1'>
            <div
              className='text-[20px]'
            >
              <CgProfile className='text-2xl' />
            </div>
          </div>

        </div>

      </div>
    </div>
  )
};

export default House;
