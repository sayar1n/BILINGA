import React from 'react';
import { useLocation } from 'react-router-dom';
import SideBar from './components/SideBar/SideBar';
import './App.css';

function App() {
  const location = useLocation();
  const isAuthPage = ['/login', '/register', '/reset-password'].includes(location.pathname);

  if (isAuthPage) {
    return null; // Не показываем сайдбар на страницах авторизации
  }

  return (
    <div className="app">
      <SideBar />
      <main className="main-content">
        {/* Здесь будет основной контент */}
      </main>
    </div>
  );
}

export default App;
