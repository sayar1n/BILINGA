import React from 'react';
import { useLocation } from 'react-router-dom';
import './App.css';

function App() {
  const location = useLocation();
  const isAuthPage = location.pathname.startsWith('/auth');

  if (isAuthPage) {
    return null; // Не показываем сайдбар на страницах авторизации
  }

  return (
    <div className="app">
      <main className="main-content">
        {/* Здесь будет основной контент */}
      </main>
    </div>
  );
}

export default App;
