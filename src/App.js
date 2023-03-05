import React from 'react';

// import routes andd route
import { Route, Routes } from 'react-router-dom';

// Import Components
import Header from './components/Header'
import Footer from './components/Footer'

// Import pages
import Home from './pages/Home'
// import PropertyDetails from './pages/PropertyDetails'
// import CreateOne from './pages/CreateOne';

const App = () => {
  return (
    <div className='mx-auto bg-white'>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        {/* <Route path='/property/:id' element={<PropertyDetails />} /> */}
        {/* <Route path='/create' element={<CreateOne />} /> */}
      </Routes>
      <Footer />
    </div>)
};

export default App;
