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
import RequireRole from './layouts/components/RequireRole';
import Upload from './components/UploadImage/upload';
import VentaCasaApartamento from './components/Searchers/venta-casa-apartamento';
import AlquilerCasaApartamento from './components/Searchers/alquiler-casa-apartamento';
import VentaLotes from './components/Searchers/venta-lotes';
import AlquilerLotes from './components/Searchers/alquiler-lotes';
import VentaLocalesComerciales from './components/Searchers/venta-locales-comerciales';
import AlquilerLocalesComerciales from './components/Searchers/alquiler-locales-comerciales';
import VentaEdificios from './components/Searchers/venta-edificios';
import AlquilerEdificios from './components/Searchers/alquiler-edificios';
import VentaBodegas from './components/Searchers/venta-bodegas';
import AlquilerBodegas from './components/Searchers/alquiler-bodegas';
import VentaOficinas from './components/Searchers/venta-oficinas';
import AlquilerOficinas from './components/Searchers/alquiler-oficinas';
import SearchResults from './components/SearchResults/search-results';
import SearchResultsActive from './components/SearchResults/search-results-active';
import PropertyDetailsSearch from './components/PropertyDetailSearch/property-detail-search';

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
                <Route path="/user/verified-adviser" element={<VerifiedAdviser />}/>
                <Route path="/user/profile" element={<Profile />} />
                <Route path="/auth/change-password" element={<ChangePassword />} />
                <Route path="/home/insert-property" element={<InsertProperty />} />
                <Route path="/home/banner" element={<Banner />} />
                <Route exact path="/home/upload/:id" element={<Upload />} />
                <Route path="/home/search/selling-house-apartment" element={<VentaCasaApartamento />} />
                <Route path="/home/search/rent-house-apartment" element={<AlquilerCasaApartamento />} />
                <Route path="/home/search/selling-lots" element={<VentaLotes />} />
                <Route path="/home/search/rent-lots" element={<AlquilerLotes />} />
                <Route path="/home/search/selling-commercials" element={<VentaLocalesComerciales />} />
                <Route path="/home/search/rent-commercials" element={<AlquilerLocalesComerciales />} />
                <Route path="/home/search/selling-buildings" element={<VentaEdificios />} />
                <Route path="/home/search/rent-buildings" element={<AlquilerEdificios />} />
                <Route path="/home/search/selling-store" element={<VentaBodegas />} />
                <Route path="/home/search/rent-store" element={<AlquilerBodegas />} />
                <Route path="/home/search/selling-office" element={<VentaOficinas />} />
                <Route path="/home/search/rent-office" element={<AlquilerOficinas />} />
                <Route path="/home/search/search-results" element={<SearchResults />} />
                <Route exact path="/home/search/property-detail/:id" element={<PropertyDetailsSearch />} />
            </Route>
          <Route element={<PublicRoutes />}>
                <Route path="/home/banner/visiter" element={<Banner />} />
                <Route path="/user/sent-request" element={<SentRequest />} />
                <Route path="/user/evaluating" element={<Evaluating />} />
                <Route path="/user/access-denied" element={<AccessDenied />} />
                <Route path="/auth/signin" element={<SignIn />}/>
                <Route path="/auth/register-request" element={<RegisterRequest />} />
                <Route path="/auth/reset-password" element={<ResetPassword />} />
                <Route path="/auth/forgot-password" element={<ForgotPassword />} />
                <Route path="/home/visit-record" element={<VisitRecord />} />
                <Route path="/user/terms" element={<Terms />} />
                <Route path="/user/logout" element={<Logout />} />
                
                <Route path='*' element={<NotFound />} />
            </Route>
          </Route>

          <Route element={<AdminLayout />}>
            <Route element={<ProtectedRoutes/>}>
              <Route exact path="/admin/properties/property-detail/:id" element={<PropertyDetailsAdmin />} />
              <Route exact path="/admin/properties/insert-property" element={<InsertProperty />} />
              <Route exact path="/admin/properties/insert-property/:id" element={<InsertProperty />} />
              <Route exact path='/admin/properties' element={<Properties />} />
              <Route exact path='/admin/links' element={<Links />} />
              <Route exact path="/admin/users" element={<Users />} />
              <Route exact path="/admin/users/insert-user" element={<InsertUser />} />
              <Route exact path="/admin/links/insert-link" element={<InsertLink />} />
              <Route exact path="/admin/links/insert-link/:id" element={<InsertLink />} />
              <Route exact path="/admin/users/insert-user/:id" element={<InsertUser />} />
              <Route exact path="/admin/upload/:id" element={<Upload />} />
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
