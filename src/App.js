import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import paths from './router/paths';

import CommonLayout from './layouts/common';
import HomePage from './pages/home';
import ProfilePage from './pages/profile';
import SearchPage from './pages/search/index copy';
import ForgotPassword from './pages/forgot_password';
import { AuthProvider, AuthRequired } from './context/AuthContext';
import HotelManager from './pages/hotel_manager';
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
          </Routes>
        </CommonLayout>
      {/* <Admin /> */}
      </AuthProvider>
    </Router>
  );
};

export default App;
