import React from 'react';

// Import link
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className='py-6 mb-12 border-b bg-blue-900 flex'>
      <div className="container mx-auto flex flex-row justify-center items-center">
        {/* Logo */}
        <Link to='/' >
          <div className='text-white text-3xl flex items-center justify-center gap-3 flex-row' >
            Sistema<span className='font-semibold' >CIC</span>
          </div>
        </Link>
      </div>
    </header>
  )
};

export default Header;
