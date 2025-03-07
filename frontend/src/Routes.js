import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="login" element={<LoginPage />} />
        <Route path="reset-password" element={<ResetPasswordPage />} />
        <Route path="register" element={<RegisterPage />} />
        <Route path="/" element={<MainFrame />}>
          <Route path="main" element={<Main />} />
          <Route path="games" element={<Games />} />
          <Route path="games/solo" element={<Games />} />
          <Route path="games/duo" element={<Games />} />
          <Route path="materials" element={<Materials />} />
          <Route path="notes" element={<NotesPageList />} />
          <Route path="notes/:id" element={<NotesPage />} />
          <Route path="dictionary" element={<DictionaryPage />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default AppRoutes; 