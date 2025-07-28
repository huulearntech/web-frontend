import React from "react"
import SignIn from "./pages/SignIn"
import SignUp from "./pages/SignUp"
import Header from "./components/Header"
import SignOutModal from "./components/SignOutModal"
import { SignOutModalProvider } from "./contexts/SignOutModalContext"
import { ForgotPasswordProvider } from "./contexts/ForgotPasswordContext"
import SearchBar from "./components/SearchBar"
import LocationPicker from "./pages/partnership_register/LocationPicker"
import ForgotPassword from "./pages/ForgotPassword"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { SearchBarContextProvider } from "./contexts/SearchBarContext"

function App() {
  return (
    <SignOutModalProvider>
      <ForgotPasswordProvider>
        <SearchBarContextProvider>

          <Router>
            <Routes>
              <Route path="/"
                element={
                  <>
                    <Header />
                    <SignOutModal />
                  </>
                }
              />
              <Route path="/search" element={<SearchBar />} />
              {/* Add other routes here as needed */}
              <Route path="/signin" element={<SignIn />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/location" element={<LocationPicker />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              {/* Add other routes here as needed */}
            </Routes>
          </Router>
        </SearchBarContextProvider>
      </ForgotPasswordProvider>
    </SignOutModalProvider>
  )
}

export default App
