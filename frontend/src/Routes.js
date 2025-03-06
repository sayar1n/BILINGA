import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainFrame from './components/MainFrame/MainFrame';
import Main from './pages/Main/Main';
import LoginPage from './pages/LoginPage/LoginPage';
import ResetPasswordPage from './pages/ResetPasswordPage/ResetPasswordPage';
import RegisterPage from './pages/RegisterPage/RegisterPage';

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="login" element={<LoginPage />} />
        <Route path="reset-password" element={<ResetPasswordPage />} />
        <Route path="register" element={<RegisterPage />} />
        <Route path="/" element={<MainFrame />}>
          <Route path="main" element={<Main />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default AppRoutes; 