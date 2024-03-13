import './App.css';
import LoginPage from './pages/loginPage';
import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ForgotPassword from './pages/forgotPassword';
import SignUp from './pages/signUp';
import HomePage from './pages/homePage';
import NotFound from './pages/notFound';
import API from './pages/API';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/homePage" element={<HomePage />} />
        <Route path='*' element={<NotFound />}/>
        <Route path='/API' element={<API/>} />
      </Routes>
    </BrowserRouter>
    
  )
}

export default App;
