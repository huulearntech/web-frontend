import { Provider as ReduxStoreProvider } from 'react-redux'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import store from "./store/store"

import SignIn from "./pages/SignIn"
import SignUp from "./pages/SignUp"
import HomePage from "./pages/HomePage"
import ForgotPassword from "./pages/ForgotPassword"
import SearchPage from './pages/search'
import HotelDetail from "./pages/hotel_detail"

import Header from "./components/Header"
import SignOutModal from "./components/SignOutModal"
import LocationPicker from "./pages/partnership_register/LocationPicker"
import HotelCard from "./components/HotelCard"

import { SignOutModalProvider } from "./contexts/SignOutModalContext"
import { ForgotPasswordProvider } from "./contexts/ForgotPasswordContext"
import { SearchBarContextProvider } from "./contexts/SearchBarContext"

import { fake_hotels } from "./mock_data"

function App() {
  return (
    <ReduxStoreProvider store={store}>
      <SearchBarContextProvider>
          <Router>
            <Routes>
            <Route path="/"
              element={
                <SignOutModalProvider>
                  <Header />
                  <SignOutModal />
                  <HomePage />
                </SignOutModalProvider>
              }
            />
            <Route path="/search" element={<SearchPage />} />
            {/* Add other routes here as needed */}
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/location" element={<LocationPicker />} />
            <Route path="/forgot-password" element={
              <ForgotPasswordProvider>
                <ForgotPassword />
              </ForgotPasswordProvider>
            } />
            <Route path="/hotels" element={<HotelCard hotel={fake_hotels[2]} />} />
            <Route path="/hotel-detail/:hotelId" element={<HotelDetail />} />
            {/* Add other routes here as needed */}
          </Routes>
        </Router>
    </SearchBarContextProvider>
  </ReduxStoreProvider>
  )
}

export default App
