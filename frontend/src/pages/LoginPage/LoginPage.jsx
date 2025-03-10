import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Blob from '../../components/Blobs/Blob';
import styles from './LoginPage.module.scss';
const { login } = require('../../services/auth.service');

const LoginPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!formData.username.trim() || !formData.password.trim()) {
      setError('Пожалуйста, заполните все поля');
      return;
    }
    
    try {
      await login(formData.username, formData.password);
      navigate('/'); // Перенаправление на главную страницу после успешного входа
    } catch (err) {
      console.error('Login error in component:', err);
      setError(typeof err === 'string' ? err : 'Неверное имя пользователя или пароль');
    }
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
          {error && <div className={styles.error}>{error}</div>}
          <form onSubmit={handleLogin}>
            <div className={styles.formGroup}>
              <label htmlFor="username">Логин или почта</label>
              <input 
                type="text" 
                id="username"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="password">Пароль</label>
              <input 
                type="password" 
                id="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            <div className={styles.forgotPassword}>
              <span onClick={() => navigate('/auth/reset-password')}>Забыли пароль?</span>
            </div>
            <button className={styles.btn} type="submit">Войти</button>
            <div className={styles.registerLink}>
              <span>Нет аккаунта? </span>
              <span onClick={() => navigate('/auth/register')} className={styles.link}>
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