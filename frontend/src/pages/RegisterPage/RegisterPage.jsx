import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Blob from '../../components/Blobs/Blob';
import styles from './RegisterPage.module.scss';
import { register } from '../../services/auth.service';

const RegisterPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
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

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.username.trim() || !formData.email.trim() || !formData.password.trim()) {
      setError('Пожалуйста, заполните все поля');
      return;
    }

    try {
      await register(formData.username, formData.email, formData.password);
      navigate('/auth/login');
    } catch (err) {
      console.error('Registration error in component:', err);
      setError(typeof err === 'string' ? err : 'Произошла ошибка при регистрации');
    }
  };

  return (
    <div className={styles.loginPage}>
      {/* Добавляем Blobs для фона */}
      {[...Array(7)].map((_, index) => (
        <Blob key={index} index={index + 1} />
      ))}

      {/* Форма регистрации */}
      <div className={styles.loginWrapper}>
        <div className={styles.loginContainer}>
          <h2>Регистрация</h2>
          {error && <div className={styles.error}>{error}</div>}
          <form onSubmit={handleRegister}>
            <div className={styles.formGroup}>
              <label htmlFor="email">Email</label>
              <input 
                type="email" 
                id="email" 
                placeholder="Введите email"
                value={formData.email}
                onChange={handleChange}
                required 
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="username">Имя пользователя</label>
              <input 
                type="text" 
                id="username" 
                placeholder="Введите имя пользователя"
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
                placeholder="Введите пароль"
                value={formData.password}
                onChange={handleChange}
                required 
              />
            </div>
            <button className={styles.btn} type="submit">Зарегистрироваться</button>
            <div className={styles.forgotPassword}>
              <span onClick={() => navigate('/auth/login')}>Уже есть аккаунт? Войти</span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;