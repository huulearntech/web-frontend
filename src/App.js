import React, { use } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import paths from './router/paths';
import { AuthProvider, AuthRequired } from './context/AuthContext';

import HomePage from './pages/home';
import ProfilePage from './pages/profile';
import SearchPage from './pages/search';
import ForgotPassword from './pages/forgot_password';
import HotelManager from './pages/hotel_manager';
import PartnershipRegister from './pages/partnership_register';
import HotelDetail from './pages/hotel_detail';
import Unauthorized from './pages/unauthorized';
import NotFound from './pages/not_found';
// import Admin from './pages/admin';


const App = () => {
  return (
    <Router>
      <AuthProvider >
        <Routes>
          <Route path={paths.notAuthorized} element={<Unauthorized />} />
          <Route path={paths.notFound} element={<NotFound />} />
          <Route path={paths.home} element={<HomePage />} />
          <Route path={paths.account} element={<ProfilePage />} />
          <Route path={paths.search} element={<SearchPage />} />
          <Route path={paths.hotelDetail} element={<HotelDetail />} />
          <Route path={paths.forgotPassword} element={<ForgotPassword />} />
          <Route path={paths.partnershipRegister} element={<PartnershipRegister />} />

          {/* Admin layout */}
          {/* <Route path={paths.admin} element={<Admin />} /> */}
          
          {/* Auth required */}
          {/* <Route path={paths.account} element={<AuthRequired><ProfilePage /></AuthRequired>} /> */}
          <Route path={paths.hotelManager} element={<AuthRequired><HotelManager /></AuthRequired>} />


        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default App;
