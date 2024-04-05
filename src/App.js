import LoginPage from "./pages/AuthenticatorUI/LoginPage";
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ForgotPassword from "./pages/AuthenticatorUI/ForgotPassword";
import SignUp from "./pages/AuthenticatorUI/SignUp";
import HomePage from "./pages/HomePageUI/HomePage";
import NotFound from "./pages/AuthenticatorUI/NotFound";
import ChangePassword from "./pages/ProfileUI/ChangePassword";
import EditName from "./pages/ProfileUI/EditName";
import UserProfile from "./pages/ProfileUI/UserProfile";
import FavouriteCarparks from "./pages/HomePageUI/FavouriteCarparks";

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
        <Route path="/changepassword" element={<ChangePassword />} />
        <Route path="/editname" element={<EditName />} />
        <Route path="/userprofile" element={<UserProfile />} />
        <Route path="/favouritecarparks" element={<FavouriteCarparks />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
