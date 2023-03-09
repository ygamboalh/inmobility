import React from 'react';

// import routes andd route
import { Route, Routes } from 'react-router-dom';

// Import Components
import Footer from './components/Footer';
import Header from './components/Header';

// Import pages
import Alquileres from './pages/Alquileres';
import Home from './pages/Home';
import PropertyDetails from './pages/PropertyDetails';
import Ventas from './pages/Ventas';
import SearchForSale from './pages/SearchForSale'
import SearchForRent from './pages/SearchForRent';
import NotFound from './pages/NotFound';

const App = () => {
  return (
    <div className='mx-auto bg-white'>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/ventas' element={<Ventas />} /> 
        <Route path='/ventas/casasyapartamentos/searchForSale' element={<SearchForSale />} />
        <Route path='/alquiler' element={<Alquileres />} />
        <Route path='/alquiler/casasyapartamentos/searchForRent' element={<SearchForRent />} />
        <Route path='/property/:id' element={<PropertyDetails />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
      <Footer />
    </div>)
};

export default App;
