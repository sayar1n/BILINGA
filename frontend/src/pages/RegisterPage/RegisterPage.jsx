import React from 'react';
import { useNavigate } from 'react-router-dom';
import Blob from '../../components/Blobs/Blob';
import styles from './RegisterPage.module.scss';

const RegisterPage = () => {
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    // Здесь будет логика регистрации
    console.log('Попытка регистрации');
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
          <form onSubmit={handleRegister}>
            <div className={styles.formGroup}>
              <label htmlFor="email">Email</label>
              <input 
                type="email" 
                id="email" 
                placeholder="Введите email"
                required 
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="password">Пароль</label>
              <input 
                type="password" 
                id="password" 
                placeholder="Введите пароль"
                required 
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="confirmPassword">Подтверждение пароля</label>
              <input 
                type="password" 
                id="confirmPassword" 
                placeholder="Повторите пароль"
                required 
              />
            </div>
            <button className={styles.btn}>Зарегистрироваться</button>
            <div className={styles.forgotPassword}>
              <span onClick={() => navigate('/login')}>Уже есть аккаунт? Войти</span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;