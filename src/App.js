import React from 'react';
// import routes andd route
import { Routes, Route, Navigate } from 'react-router-dom';
// Import Components
import SignIn from './components/signin/SignIn';
import RegisterRequest from './components/RegisterRequest/register-request';
import VisitRecord from './components/VisitRecord/visit-record';
import SentRequest from './components/SentRequest/sent-request';
import { Banner } from './components';
import ChangePassword from './components/ChangePassword/change-password';
import ResetPassword from './components/ResetPassword/reset-password';
import Investor from './components/Investor/investor';
import ForgotPassword from './components/ForgotPassword/forgot-password';
import { getToken } from './utils/helpers';
import Evaluating from './components/Evaluating/evaluating';
import Upload from './components/Upload/upload';
import Welcome from './components/Welcome';
import Layout from './pages/Layout';
import Logout from './components/Logout/logout';
import AccessDenied from './components/AccessDenied/access-denied';
import Verified from './components/Verified/verified';
import Terms from './components/Terms/Terms';

// Import pages
import { Alquileres, Home, NotFound, Ventas, Search, PropertyDetails } from './pages';

const App = () => {
  return (
    <div className='mx-auto h-fit bg-white'>
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route element={<Layout />}>
          <Route exact path='/welcome' element={<Welcome />} />
          <Route path='/ventas' element={<Ventas />} />
          <Route path='/ventas/*' element={<Search />} />
          <Route path='/alquiler' element={<Alquileres />} />
          <Route path='/alquiler/*' element={<Search />} />
          <Route path='/property/:id' element={<PropertyDetails />} />
          <Route path="/signin" element={<SignIn />}/>
          <Route path="/visit-record" element={<VisitRecord />} />
          <Route path="/sent-request" element={<SentRequest />} />
          <Route path="/register-request" element={<RegisterRequest />} />
          <Route path="/banner" element={<Banner />} />
          <Route path="/change-password" element={<ChangePassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/investor" element={<Investor />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/evaluating" element={<Evaluating />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/access-denied" element={<AccessDenied />} />
          <Route path="/terms" element={<Terms />} />
          <Route path='*' element={<NotFound />} />
          <Route
              path="/verified"
              element={getToken() ? <Verified /> : <Navigate to="/signin" />}
            />
            </Route>
        </Routes>
    </div>)
};
export default App;
