import React from 'react';

// import routes andd route
import { Route, Routes } from 'react-router-dom';

// Import Components
import Footer from './components/Footer';
import Header from './components/Header';

// Import pages
import { Alquileres, Home, NotFound, Ventas, Search, PropertyDetails, Properties } from './pages';

const App = () => {
  return (
    <div className='mx-auto bg-white'>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/ventas' element={<Ventas />} />
        <Route path='/ventas/*' element={<Search />} />
        <Route path='/alquiler' element={<Alquileres />} />
        <Route path='/alquiler/*' element={<Search />} />
        <Route path='/property/:id' element={<PropertyDetails />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
      <Footer />
    </div>)
};

export default App;
