import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import App from './App';
import LoginPage from './pages/LoginPage/LoginPage';
import ResetPasswordPage from './pages/ResetPasswordPage/ResetPasswordPage';
import RegisterPage from './pages/RegisterPage/RegisterPage';
 
const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes; 