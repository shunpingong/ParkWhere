import LoginPage from './pages/LoginPage';
import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ForgotPassword from './pages/ForgotPassword';
import SignUp from './pages/SignUp';
import HomePage from './pages/HomePage';
import NotFound from './pages/NotFound';
import API from './components/API';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/homepage" element={<HomePage />} />
        <Route path='*' element={<NotFound />}/>
        <Route path='/API' element={<API/>} />
      </Routes>
    </BrowserRouter>
    
  )
}

export default App;
