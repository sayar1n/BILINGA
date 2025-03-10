import React from 'react';
import { useNavigate } from 'react-router-dom';
import Blob from '../../components/Blobs/Blob';
import styles from './ResetPasswordPage.module.scss';

const ResetPasswordPage = () => {
  const navigate = useNavigate();

  const handleResetPassword = (e) => {
    e.preventDefault();
    // Здесь будет логика восстановления пароля
    console.log('Попытка восстановления пароля');
  };

  return (
    <div className={styles.loginPage}>
      {/* Добавляем Blobs для фона */}
      {[...Array(7)].map((_, index) => (
        <Blob key={index} index={index + 1} />
      ))}

      {/* Форма восстановления */}
      <div className={styles.loginWrapper}>
        <div className={styles.loginContainer}>
          <h2>Восстановление пароля</h2>
          <form onSubmit={handleResetPassword}>
            <div className={styles.formGroup}>
              <label htmlFor="email">Email</label>
              <input 
                type="email" 
                id="email" 
                placeholder="Введите ваш email"
                required 
              />
            </div>
            <button className={styles.btn}>Восстановить пароль</button>
            <div className={styles.forgotPassword}>
              <span onClick={() => navigate('/login')}>Вернуться к входу</span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordPage;