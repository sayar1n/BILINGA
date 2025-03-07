import React from 'react';
import { useNavigate } from 'react-router-dom';
import Blob from '../../components/Blobs/Blob';
import styles from './LoginPage.module.scss';

const LoginPage = () => {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // Здесь будет логика авторизации
    console.log('Попытка входа');
  };

  return (
    <div className={styles.loginPage}>
      {/* Добавляем Blobs для фона */}
      {[...Array(7)].map((_, index) => (
        <Blob key={index} index={index + 1} />
      ))}

      {/* Форма входа */}
      <div className={styles.loginWrapper}>
        <div className={styles.loginContainer}>
          <h2>Вход</h2>
          <form onSubmit={handleLogin}>
            <div className={styles.formGroup}>
              <label htmlFor="login">Логин или почта</label>
              <input type="text" id="login" />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="password">Пароль</label>
              <input type="password" id="password" />
            </div>
            <div className={styles.forgotPassword}>
              <span onClick={() => navigate('/reset-password')}>Забыли пароль?</span>
            </div>
            <button className={styles.btn}>Войти</button>
            <div className={styles.registerLink}>
              <span>Нет аккаунта? </span>
              <span onClick={() => navigate('/register')} className={styles.link}>
                Зарегистрироваться
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;