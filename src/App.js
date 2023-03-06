import React from 'react';

// import routes andd route
import { Route, Routes } from 'react-router-dom';

// Import Components
import Header from './components/Header'
import Footer from './components/Footer'

// Import pages
import Home from './pages/Home'
import Search from './pages/Search';
import Ventas from './pages/Ventas';
import Alquileres from './pages/Alquileres';

const App = () => {
  return (
    <div className='mx-auto bg-white'>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/ventas' element={<Ventas />} />
        <Route path='/alquileres' element={<Alquileres />} />
        <Route path='/search' element={<Search />} />
      </Routes>
      <Footer />
    </div>)
};

export default App;
