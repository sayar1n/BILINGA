import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import MainFrame from './components/MainFrame/MainFrame';
import Main from './pages/Main/Main';
import LoginPage from './pages/LoginPage/LoginPage';
import ResetPasswordPage from './pages/ResetPasswordPage/ResetPasswordPage';
import RegisterPage from './pages/RegisterPage/RegisterPage';
import Games from './pages/Games/Games';
import Materials from './pages/Materials/Materials';
import NotesPageList from './pages/NotesPage/NotesFirst/NotesPageList';
import NotesPage from './pages/NotesPage/NotesSecond/NotesPage';
import DictionaryPage from './pages/DictionaryPage/DictionaryPage';
import Notifications from './pages/Notifications/Notifications';
import Progress from './pages/Progress/Progress';
import Account from './pages/Account/Account';
import Rating from './pages/Rating/Rating';
import MainFrameSet from './components/MainFrameset/MainFrameSet'; 

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        {/* Маршруты авторизации */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Основной лейаут с обычным сайдбаром */}
        <Route path="/" element={<MainFrame />}>
          <Route index element={<Navigate to="/main" replace />} />
          <Route path="main" element={<Main />} />
          <Route path="games" element={<Games />} />
          <Route path="games/solo" element={<Games />} />
          <Route path="games/duo" element={<Games />} />
          <Route path="materials" element={<Materials />} />
          <Route path="notes" element={<NotesPageList />} />
          <Route path="notes/:id" element={<NotesPage />} />
          <Route path="dictionary" element={<DictionaryPage />} />
        </Route>

        {/* Лейаут настроек с другим сайдбаром */}
        <Route path="/settings" element={<MainFrameSet />}>
          <Route index element={<Navigate to="/settings/account" replace />} />
          <Route path="account" element={<Account />} />
          <Route path="progress" element={<Progress />} />
          <Route path="rating" element={<Rating />} />
          <Route path="notifications" element={<Notifications />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default AppRoutes;
