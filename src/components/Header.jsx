import { Avatar } from 'flowbite-react';
import React from 'react';
import { BiArrowBack } from 'react-icons/bi';
import { Link, useNavigate, useResolvedPath } from 'react-router-dom';
import logo from '../assets/images/logo192.png';

const Header = () => {
  const navigate = useNavigate()
  const { pathname } = useResolvedPath()

  const goBack = () => {
    navigate(-1)
  }

  return (
    <header className='py-6 border-b bg-primary flex'>
      {
        pathname === '/'
          ?
          null
          :
          <BiArrowBack onClick={goBack} className='absolute text-3xl text-white mt-3 ml-10' />
      }
      <div className="container mx-auto flex flex-row justify-center items-center">
        <div className="flex flex-row justify-center items-center">
          <Link to='/' >
            <Avatar img={logo} className='m-2' />
          </Link>
          <Link to='/' >
            <div className='text-white text-3xl flex items-center justify-center gap-3 flex-row' >
              Sistema<span className='font-semibold' >CIC</span>
            </div>
          </Link>
        </div>
      </div>
    </header>
  )
};

export default Header;
