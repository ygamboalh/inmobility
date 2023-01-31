import React from 'react';

// Import link
import { Link } from 'react-router-dom';

// Import logo
import Logo from '../assets/img/logo.svg'

const Header = () => {
  return (
    <header className='py-6 mb-12 border-b '  >
      <div className="container mx-auto flex justify-between items-center ">
        {/* Logo */}
        <Link to='/' >
          <img src={Logo} alt='' />
        </Link>
        {/* Buttons */}
        <div className='flex items-center gap-6' >
          <Link
            to=''
            className='hover:text-violet-900 transition'
          >Log In</Link>
          <Link
            to=''
            className='bg-violet-700 text-white px-4 py-3 rounded-lg transition'
          >Sign Up</Link>
        </div>
      </div>
    </header>
  )
};

export default Header;
