import React from 'react';
import { useQuery } from "react-query";
import { useAuthUser } from 'react-auth-kit';
import { Avatar } from 'flowbite-react';
import { BiArrowBack } from 'react-icons/bi';
import { Link, useNavigate, useResolvedPath } from 'react-router-dom';
import UserInfo from './UserInfo/user-info';
import { useAuthContext } from '../context/AuthContext';
import Freelancer from './Freelancer/Freelancer';
import { authUserData } from '../api/usersApi';
import logo from '../assets/images/logo192.png';



const Header = () => {

  const navigate = useNavigate();
  const { pathname } = useResolvedPath();
  const { data: userData, loading } = useQuery('profile', authUserData);
  const goBack = () => {
    navigate(-1)
  }
console.log(userData);
  return (
    <header className='py-6 border-b bg-primary flex'>
      {
        pathname === '/'
          ?
          null
          :
          <BiArrowBack onClick={goBack} className='absolute cursor-pointer text-3xl text-white mt-3 ml-10' />
      }
      <div className="container mx-auto flex flex-row justify-center items-center">
        <div className="flex flex-row justify-center items-center mr-auto">
          <Link to='/' >
            <Avatar img={logo} className='m-2' />
          </Link>
          <Link to='/' >
            <div className='text-white text-3xl flex items-center justify-center gap-3 flex-row' >
              Sistema<span className='font-semibold' >CIC</span>
            </div>
          </Link>
        </div>
        <div className="flex flex-row justify-center justify-self-center">
            <Freelancer/> <span></span>
        </div>
      {!userData ? (<span></span>) :
      (<div>
          <div className="flex flex-row justify-end items-end">
            <UserInfo/>
          </div>
      </div>)}
      </div>
    </header>
  )
};

export default Header;
