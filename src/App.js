import React from 'react';
// import routes andd route
import { Routes, Route } from 'react-router-dom';
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
import ExtraLayout from './layouts/out-layout';
import InsertLink from './Admin/Components/Links/insert-link';

// Import pages
import { Alquileres, Home, NotFound, Ventas, PropertyDetails } from './pages';
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

import PropertyDetailsSearch from './components/PropertyDetailSearch/property-detail-search';
import PdfViewShared from './components/PdfView/pdf-view-shared';
import ExtraLayoutShared from './layouts/out-layout-shared';
import Portafolio from './components/Portafolio/portfolio';
import { PortafolioDetail } from './components/Portafolio/portfolio-detail';
import PortafolioShare from './components/Portafolio/portfolio-share';
import CheckRole from './layouts/components/CheckRole';
import Notifications from './components/Notifications/notifications';
import SearchResultsCard from './components/SearchResults/search-results-card';
import Contact from './components/Contact/contact';
import LinkList from './Admin/Components/Links/link-list';
import LinkListAdviser from './components/Links/links-adviser';
import SearchCard from './components/SearchResults/property-card';
import MyPropertyList from './components/Verified/my-property-list';
import ContactVisiter from './components/ContactVisiter/contact-visiter';
import Button from './Admin/Components/Buttons/button';
import VisiterSearch from './components/Searchers/visiter-search';
import VideoPlayer from './components/Video/video-player';

const App = () => {
  
  return (
    <div className='mx-auto h-fit bg-white'>
        <Routes>
          <Route element={<Layout />}>
          <Route element={<ProtectedRoutes  />}>
                <Route path='/property/:id' element={<PropertyDetails />} />
                <Route path="/user/verified-adviser" element={<VerifiedAdviser />}/>
                <Route path="/user/profile" element={<Profile />} />
                <Route path="/auth/change-password" element={<ChangePassword />} />
            <Route element={<CheckRole roles={['Super Administrador','Asesor verificado activo','Supervisor']} />}>
                <Route path="/home/insert-property" element={<InsertProperty />} />
            </Route>
            <Route element={<CheckRole roles={['Super Administrador', 'Asesor verificado activo','Supervisor']} />}>
                <Route path="/home/notifications" element={<Notifications />} />
            </Route>
                <Route path="/home/banner" element={<Banner />} />
                <Route exact path="/home/upload/:id" element={<Upload />} />
                <Route path='/home/links' element={<LinkListAdviser />} />
                <Route path="/home/search/property-detail/:id" element={<PropertyDetailsSearch />} />
                <Route path="/home/portfolio" element={<Portafolio />} />
            <Route path="/home/portfolio/portfolio-detail" element={<PortafolioDetail />} />
            <Route exact path="/properties/edit-property/:id" element={<InsertProperty />} />
            <Route path="/home/portfolio/:id" element={<Portafolio />} />
            <Route path="/user/logout" element={<Logout />} />
            <Route exact path="/home/shared-property/:id" element={<SearchCard />} />
            
            
            </Route>
          <Route element={<PublicRoutes />}>
                <Route path="/home/banner/visiter" element={<Banner />} />
                <Route path="/auth/signin" element={<SignIn />}/>
                <Route path="/auth/register-request" element={<RegisterRequest />} />
                <Route path="/auth/reset-password" element={<ResetPassword />} />
                <Route path="/auth/forgot-password" element={<ForgotPassword />} />
                <Route path="/home/visit-record" element={<VisitRecord />} />
                <Route path="/user/terms" element={<Terms />} />
                
                <Route path='*' element={<NotFound />} />
            </Route>
          </Route>

          <Route element={<AdminLayout  />}>
          <Route element={<ProtectedRoutes />}>
            <Route element={<CheckRole roles={['Super Administrador','Supervisor','Asesor verificado activo']} />}>
              <Route exact path="/admin/properties/property-detail/:id" element={<PropertyDetailsAdmin />} />
              <Route exact path="/admin/properties/insert-property" element={<InsertProperty />} />
              <Route exact path="/admin/properties/insert-property/:id" element={<InsertProperty />} />
              
              <Route exact path="/admin/shared-property/:id" element={<SearchCard />} />
              <Route exact path='/admin/properties' element={<Properties />} />
              <Route exact path="/admin/users" element={<Users />} />
              <Route exact path="/admin/users/insert-user" element={<InsertUser />} />
              <Route path='/admin/links' element={<LinkList />} />
              <Route path='/admin/buttons' element={<Button />} />
              <Route exact path="/admin/links/insert-link" element={<InsertLink />} />
              <Route exact path="/admin/links/insert-link/:id" element={<InsertLink />} />
              <Route exact path="/admin/users/insert-user/:id" element={<InsertUser />} />
              <Route exact path="/admin/upload/:id" element={<Upload />} />
            </Route>
            </Route>
          </Route>
          <Route element={<ExtraLayout />}>
               <Route exact path="/home/investor" element={<Investor />} /> 
          </Route>
          <Route element={<ExtraLayoutShared />}>
                <Route exact path="/home/shared-property/:id" element={<SearchCard />} /> 
          </Route>
        <Route exact path='/' element={<Home />} />
            <Route element={<Layout />}>
              <Route path='/ventas' element={<Ventas />} /> 
              <Route path="/home/search/search-results" element={<SearchResultsCard />} />
              <Route path="/home/verified-adviser/my-property-list" element={<MyPropertyList />} />
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
              <Route path="/home/portfolio/share-portfolio/:id" element={<PortafolioShare />} />
              <Route path='/alquiler' element={<Alquileres />} />
              <Route path="/user/evaluating" element={<Evaluating />} />
              <Route path="/user/sent-request" element={<SentRequest />} />
              <Route path="/user/access-denied" element={<AccessDenied />} />
          <Route path="/home/contact" element={<Contact />} />
          <Route path="/home/visiter-contact" element={<ContactVisiter />} />
          <Route path="/home/visiter-search" element={<VisiterSearch />} />
          <Route path="/home/video-player" element={<VideoPlayer />} />
        </Route>
      </Routes>
    </div>)
};
export default App;
