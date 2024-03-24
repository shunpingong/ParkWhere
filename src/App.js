import LoginPage from "./pages/LoginPage";
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ForgotPassword from "./pages/ForgotPassword";
import SignUp from "./pages/SignUp";
import HomePage from "./pages/HomePage";
import NotFound from "./pages/NotFound";
import API from "./components/API";
import ChangePassword from "./pages/ChangePassword";
import EditName from "./pages/EditName";
import UserProfile from "./pages/UserProfile";
import FavouriteCarparks from "./pages/FavouriteCarparks";

/**
 * A component for rendering the entire application.
 * @component
 * @returns {JSX.Element} The App component.
 */
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/homepage" element={<HomePage />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/API" element={<API />} />
        <Route path="/changepassword" element={<ChangePassword />} />
        <Route path="/editname" element={<EditName />} />
        <Route path="/userprofile" element={<UserProfile />} />
        <Route path="/favouritecarparks" element={<FavouriteCarparks />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
