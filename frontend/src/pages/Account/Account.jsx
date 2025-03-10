import React, { useState } from 'react';
import Input from '../../components/Input/Input';
import styles from './Account.module.scss';

const Account = () => {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    phone: '',
  });

  const userData = {
    name: 'Alexandra Zavoykina',
    email: 'alex@gmail.com',
    avatar: '/avatar.jpg',
    alt: 'AZ',
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const icons = {
    name: (
      <svg
        width='16'
        height='16'
        viewBox='0 0 16 16'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path
          d='M8 8C10.21 8 12 6.21 12 4C12 1.79 10.21 0 8 0C5.79 0 4 1.79 4 4C4 6.21 5.79 8 8 8ZM8 10C5.33 10 0 11.34 0 14V16H16V14C16 11.34 10.67 10 8 10Z'
          fill='#CCCCCC'
        />
      </svg>
    ),
    email: (
      <svg
        width='16'
        height='16'
        viewBox='0 0 16 16'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path
          d='M14 3H2C1.45 3 1 3.45 1 4V12C1 12.55 1.45 13 2 13H14C14.55 13 15 12.55 15 12V4C15 3.45 14.55 3 14 3ZM14 5L8 8.5L2 5V4L8 7.5L14 4V5Z'
          fill='#CCCCCC'
        />
      </svg>
    ),
    phone: (
      <svg
        width='16'
        height='16'
        viewBox='0 0 16 16'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path
          d='M3.5 1C2.67 1 2 1.67 2 2.5V13.5C2 14.33 2.67 15 3.5 15H12.5C13.33 15 14 14.33 14 13.5V2.5C14 1.67 13.33 1 12.5 1H3.5ZM8 12C7.17 12 6.5 11.33 6.5 10.5C6.5 9.67 7.17 9 8 9C8.83 9 9.5 9.67 9.5 10.5C9.5 11.33 8.83 12 8 12ZM5.5 5.5C5.5 3.84 6.84 2.5 8.5 2.5C10.16 2.5 11.5 3.84 11.5 5.5C11.5 7.16 10.16 8.5 8.5 8.5C6.84 8.5 5.5 7.16 5.5 5.5Z'
          fill='#CCCCCC'
        />
      </svg>
    ),
    password: (
      <svg
        width='16'
        height='16'
        viewBox='0 0 16 16'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path
          d='M12 1H10V3H12V5H10V7H12V9H4V15H2V9H0V7H2V5H0V3H2V1H4V0H10V1H12Z'
          fill='#CCCCCC'
        />
        <path
          d='M6 9C6.55228 9 7 8.55228 7 8C7 7.44772 6.55228 7 6 7C5.44772 7 5 7.44772 5 8C5 8.55228 5.44772 9 6 9Z'
          fill='white'
        />
      </svg>
    ),
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form data submitted:', formData);
    // Тут логика отправки данных на сервер
  };

  return (
    <div className={styles.accountSettingsContainer}>
      <div className={styles.headerBg}></div>

      {/* Профиль пользователя */}
      <div className={styles.profile}>
        <div className={styles.avatarWrapper}>
          <img
            // src={userData.avatar}
            src='https://via.placeholder.com/90'
            alt={userData.alt}
            className={styles.avatar}
          />
        </div>
        <div className={styles.userInfo}>
          <h2 className={styles.userName}>{userData.name}</h2>
          <p className={styles.userEmail}>{userData.email}</p>
          <button className={styles.verifyButton}>
            <span className={styles.verifyIcon}>Х</span>
            <span>Удалить аккаунт</span>
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className={styles.formContainer}>
        <div className={styles.formGrid}>
          <Input
            id='name'
            label='Имя'
            placeholder='Введите новый никнейм'
            value={formData.name}
            onChange={handleChange}
            icon={icons.name}
          />

          <Input
            id='currentPassword'
            label='Текущий пароль'
            placeholder='Введите текущий пароль'
            value={formData.currentPassword}
            onChange={handleChange}
            isPassword={true}
            showPassword={showCurrentPassword}
            toggleShowPassword={() =>
              setShowCurrentPassword(!showCurrentPassword)
            }
            icon={icons.password}
          />
          <Input
            id='email'
            label='Почта'
            type='email'
            placeholder='Введите новый почтовый адрес'
            value={formData.email}
            onChange={handleChange}
            icon={icons.email}
          />
          <Input
            id='newPassword'
            label='Новый пароль'
            placeholder='Введите новый пароль'
            value={formData.newPassword}
            onChange={handleChange}
            isPassword={true}
            showPassword={showNewPassword}
            toggleShowPassword={() => setShowNewPassword(!showNewPassword)}
            icon={icons.password}
          />
          <Input
            id='phone'
            label='Телефон'
            type='tel'
            placeholder='Введите новый номер телефона'
            value={formData.phone}
            onChange={handleChange}
            icon={icons.phone}
          />

          <Input
            id='confirmPassword'
            label='Подтверждение пароля'
            placeholder='Подтвердите новый пароль'
            value={formData.confirmPassword}
            onChange={handleChange}
            isPassword={true}
            showPassword={showConfirmPassword}
            toggleShowPassword={() =>
              setShowConfirmPassword(!showConfirmPassword)
            }
            icon={icons.password}
          />
        </div>

        <button type='submit' className={styles.saveButton}>
          Сохранить изменения
        </button>
      </form>
    </div>
  );
};

export default Account;
