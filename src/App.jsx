import SignIn from "./pages/SignIn"
import SignUp from "./pages/SignUp"
import HomePage from "./pages/HomePage"
import Header from "./components/Header"
import SignOutModal from "./components/SignOutModal"
import { SignOutModalProvider } from "./contexts/SignOutModalContext"
import { ForgotPasswordProvider } from "./contexts/ForgotPasswordContext"
import SearchBar from "./components/SearchBar"
import LocationPicker from "./pages/partnership_register/LocationPicker"
import ForgotPassword from "./pages/ForgotPassword"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { SearchBarContextProvider } from "./contexts/SearchBarContext"
import { fake_hotels } from "./mock_data"
import HotelCard from "./components/HotelCard"
import { FilterContextProvider } from "./contexts/FilterContext"
import Filter from "./components/Filter"
import { Provider as ReduxStoreProvider } from 'react-redux'
import store from "./store/store"

function App() {
  return (
    <ReduxStoreProvider store={store}>
      <SearchBarContextProvider>
        <FilterContextProvider>
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
            <Route path="/search" element={<SearchBar />} />
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
            <Route path="/filter" element={
              <Filter />
            } />
            {/* Add other routes here as needed */}
          </Routes>
        </Router>
      </FilterContextProvider>
    </SearchBarContextProvider>
  </ReduxStoreProvider>
  )
}

export default App
