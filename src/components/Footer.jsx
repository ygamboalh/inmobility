import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram } from 'react-icons/fa'

const Footer = () => {
  return <footer className='bg-black py-8 text-center text-white' >
    <div className="justify-center">
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10,
        marginBottom: 5
      }} >
        <FaFacebookF style={{
          fontSize: 30,
          color: '#FFF',
          margin: 5
        }} />
        <FaInstagram style={{
          fontSize: 30,
          color: '#FFF',
          margin: 5
        }} />
        <FaTwitter style={{
          fontSize: 30,
          color: '#FFF',
          margin: 5
        }} />
      </div>
      <div>Copyright &copy; 2023. All right reserved.</div>
    </div>
  </footer>;
};

export default Footer;
