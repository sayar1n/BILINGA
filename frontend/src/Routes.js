import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import MainFrame from './components/MainFrame/MainFrame';
import Main from './pages/Main/Main';
import LoginPage from './pages/LoginPage/LoginPage';
import ResetPasswordPage from './pages/ResetPasswordPage/ResetPasswordPage';
import RegisterPage from './pages/RegisterPage/RegisterPage';
import GamesPage from './pages/GamesPage/GamesPage';
import Materials from './pages/Materials/Materials';
import NotesPageList from './pages/NotesPage/NotesFirst/NotesPageList';
import NotesPage from './pages/NotesPage/NotesSecond/NotesPage';
import DictionaryPage from './pages/DictionaryPage/DictionaryPage';
import Notifications from './pages/Notifications/Notifications';
import Progress from './pages/Progress/Progress';
import Account from './pages/Account/Account';
import Rating from './pages/Rating/Rating';
import MainFrameSet from './components/MainFrameset/MainFrameSet';
import LogoutHandler from './components/LogoutHandler/LogoutHandler';
import CardsGame from './pages/Games/CardsGame/CardsGame';
import Riddles from './pages/Games/Riddles/Riddles';

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        {/* Маршруты авторизации */}
        <Route path="/auth">
          <Route index element={<Navigate to="/auth/login" replace />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
          <Route path="reset-password" element={<ResetPasswordPage />} />
        </Route>

        {/* Маршрут для выхода */}
        <Route path="/logout" element={<LogoutHandler />} />

        {/* Основной лейаут с обычным сайдбаром */}
        <Route path="/" element={<MainFrame />}>
          <Route index element={<Navigate to="/main" replace />} />
          <Route path="main" element={<Main />} />
          <Route path="games" element={<GamesPage />} />
          <Route path="games/solo" element={<GamesPage />} />
          <Route path="games/duo" element={<GamesPage />} />
          <Route path="games/cards/*" element={<CardsGame />} />
          <Route path="games/riddles" element={<Riddles />} />
          <Route path="materials" element={<Materials />} />
          <Route path="notes" element={<NotesPageList />} />
          <Route path="notes/:id" element={<NotesPage />} />
          <Route path="dictionary" element={<DictionaryPage />} />
          <Route path="notifications" element={<Notifications />} />
          <Route path="progress" element={<Progress />} />
        </Route>

        {/* Лейаут настроек с другим сайдбаром */}
        <Route path="/settings" element={<MainFrameSet />}>
          <Route index element={<Navigate to="/settings/account" replace />} />
          <Route path="account" element={<Account />} />
          <Route path="progress" element={<Progress />} />
          <Route path="rating" element={<Rating />} />
          <Route path="notifications" element={<Notifications />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
