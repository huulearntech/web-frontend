import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import paths from './router/paths';
import { AuthProvider, AuthRequired } from './context/AuthContext';

import CommonLayout from './layouts/common';
import HomePage from './pages/home';
import ProfilePage from './pages/profile';
import SearchPage from './pages/search';
import ForgotPassword from './pages/forgot_password';
import HotelManager from './pages/hotel_manager';
import PartnershipRegister from './pages/partnership_register';
// import Admin from './pages/admin';


const App = () => {
  return (
    <Router>
      <AuthProvider >
        <CommonLayout>
          <Routes>
            <Route path={paths.home} element={<HomePage />} />
            <Route path={paths.account} element={<AuthRequired><ProfilePage /></AuthRequired>} />
            <Route path={paths.search} element={<SearchPage />} />
            <Route path={paths.forgotPassword} element={<ForgotPassword />} />
            <Route path={paths.hotelManager} element={<HotelManager />} />
            <Route path={paths.partnershipRegister} element={<PartnershipRegister />} />
          </Routes>
        </CommonLayout>
      {/* <Admin /> */}
      </AuthProvider>
    </Router>
  );
};

export default App;
