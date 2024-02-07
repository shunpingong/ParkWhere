import './App.css';
import  LoginPage  from './pages/loginPage';
import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ForgotPassword from './pages/forgotPassword';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
