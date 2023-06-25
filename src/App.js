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
import Evaluating from './components/Evaluating/evaluating';
import Layout from './pages/Layout';
import Logout from './components/Logout/logout';
import AccessDenied from './components/AccessDenied/access-denied';
import Terms from './components/Terms/Terms';
import VerifiedAdviser from './components/Verified/verified-adviser';
import Profile from './components/Profile/Profile';
import Properties from './Admin/Components/Properties/Properties';
import ActiveUser from './Admin/Components/ActiveUser/active-user';
import Users from './Admin/Components/Users/Users';
import AdminLayout from './pages/AdminLayout';
import PublicRoutes from './layouts/components/PublicRoutes';
import ProtectedRoutes from './layouts/components/ProtectedRoutes';
import PropertyDetailsAdmin from './Admin/Components/PropertyDetail/property-detail';
import InsertProperty from './Admin/Components/InsertProperty/insert-property';
import InsertUser from './Admin/Components/InsertUser/insert-user';
import Links from './Admin/Components/Links/links';
import ExtraLayout from './layouts/out-layout';
import InsertLink from './Admin/Components/Links/insert-link';

// Import pages
import { Alquileres, Home, NotFound, Ventas, Search, PropertyDetails } from './pages';

const App = () => {
  return (
    <div className='mx-auto h-fit bg-white'>
        <Routes>
          <Route element={<Layout />}>
            <Route element={<ProtectedRoutes/>}>
                <Route path='/ventas' element={<Ventas />} />
                <Route path='/ventas/*' element={<Search />} />
                <Route path='/alquiler' element={<Alquileres />} />
                <Route path='/alquiler/*' element={<Search />} />
                <Route path='/property/:id' element={<PropertyDetails />} />
                <Route path="/user/sent-request" element={<SentRequest />} />
                <Route path="/user/evaluating" element={<Evaluating />} />
                <Route path="/user/access-denied" element={<AccessDenied />} />
                <Route path="/user/verified-adviser" element={<VerifiedAdviser />}/>
                <Route path="/user/profile" element={<Profile />} />
                <Route path="/auth/change-password" element={<ChangePassword />} />
                <Route path="/home/banner" element={<Banner />} />
                <Route path="/home/insert-property" element={<InsertProperty />} />
            </Route>
            <Route element={<PublicRoutes/>}>
                <Route path="/auth/signin" element={<SignIn />}/>
                <Route path="/auth/register-request" element={<RegisterRequest />} />
                <Route path="/auth/reset-password" element={<ResetPassword />} />
                <Route path="/auth/forgot-password" element={<ForgotPassword />} />
                <Route path="/home/visit-record" element={<VisitRecord />} />
                <Route path="/home/terms" element={<Terms />} />
                <Route path="/user/logout" element={<Logout />} />
                <Route path='*' element={<NotFound />} />
            </Route>
          </Route>

          <Route element={<AdminLayout />}>
            <Route element={<ProtectedRoutes/>}>
              <Route exact path="/admin/properties/property-detail/:id" element={<PropertyDetailsAdmin />} />
              <Route exact path="/admin/properties/insert-property" element={<InsertProperty />} />
              <Route exact path="/admin/active-user" element={<ActiveUser />} />
              <Route exact path='/admin/properties' element={<Properties />} />
              <Route exact path='/admin/links' element={<Links />} />
              <Route exact path="/admin/users" element={<Users />} />
              <Route exact path="/admin/users/insert-user" element={<InsertUser />} />
              <Route exact path="/admin/links/insert-link" element={<InsertLink />} />
              <Route exact path="/admin/links/insert-link/:id" element={<InsertLink />} />
              <Route exact path="/admin/users/insert-user/:id" element={<InsertUser />} />
            </Route>
          </Route>
          <Route element={<ExtraLayout />}>
               <Route exact path="/home/investor" element={<Investor />} /> 
          </Route>
          <Route exact path='/' element={<Home />} />
          
      </Routes>
    </div>)
};
export default App;
