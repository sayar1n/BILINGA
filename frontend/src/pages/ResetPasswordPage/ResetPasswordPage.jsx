import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Blob from '../../components/Blobs/Blob';
import styles from './ResetPasswordPage.module.scss';
import { resetPassword } from '../../services/auth.service';

const ResetPasswordPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setIsLoading(true);

    // Простая валидация email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Пожалуйста, введите корректный email');
      setIsLoading(false);
      return;
    }

    try {
      const result = await resetPassword(email);
      setSuccess(result.message || 'Инструкции по восстановлению пароля отправлены на вашу почту. Проверьте папку "Входящие" или "Спам".');
      setTimeout(() => {
        navigate('/auth/login');
      }, 5000);
    } catch (error) {
      console.error('Ошибка при восстановлении пароля:', error);
      setError(error.message || 'Произошла ошибка при восстановлении пароля');
    } finally {
      setIsLoading(false);
    }
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
          <form onSubmit={handleSubmit}>
            <div className={styles.formGroup}>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Введите ваш email"
                disabled={isLoading}
                required
              />
            </div>

            {error && <div className={styles.error}>{error}</div>}
            {success && <div className={styles.success}>{success}</div>}

            <button className={styles.btn} disabled={isLoading}>
              {isLoading ? 'Отправка...' : 'Восстановить пароль'}
            </button>

            <div className={styles.forgotPassword}>
              <span onClick={() => navigate('/auth/login')}>
                Вернуться к входу
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordPage;