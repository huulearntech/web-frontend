import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import PATHS from './const/paths';
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
import BookingPage from './pages/booking';

// import Admin from './pages/admin';


const App = () => {
  return (
    <Router>
      <AuthProvider >
        <Routes>
          <Route path={PATHS.notAuthorized} element={<Unauthorized />} />
          <Route path={PATHS.notFound} element={<NotFound />} />
          <Route path={PATHS.home} element={<HomePage />} />
          <Route path={PATHS.search} element={<SearchPage />} />
          <Route path={PATHS.hotelDetail} element={<HotelDetail />} />
          <Route path={PATHS.forgotPassword} element={<ForgotPassword />} />
          <Route path={PATHS.partnershipRegister} element={<PartnershipRegister />} />

          
          {/* Auth required */}
          {/* <Route path={PATHS.admin} element={<Admin />} /> */}

          {/* <Route path={PATHS.account} element={<AuthRequired><ProfilePage /></AuthRequired>} />
          <Route path={PATHS.hotelManager} element={<AuthRequired><HotelManager /></AuthRequired>} />
          <Route path={PATHS.booking} element={<BookingPage />} /> */}

          <Route path={PATHS.account} element={<ProfilePage />} />
          <Route path={PATHS.hotelManager} element={<HotelManager />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default App;
