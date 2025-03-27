import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../../components/Input/Input';
import styles from './Account.module.scss';
import { getUser, deleteAccount } from '../../services/auth.service';

const Account = () => {
  const navigate = useNavigate();
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  // Состояние для отображаемых данных пользователя (верхняя часть страницы)
  const [displayUserData, setDisplayUserData] = useState({
    username: 'Пользователь',
    email: 'email@example.com',
    avatar: '/avatar.jpg',
    alt: 'U',
  });
  
  // Состояние для редактируемых данных пользователя (форма)
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    phone: '',
  });
  
  // Состояние для модального окна удаления аккаунта
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState('');
  const [deleteError, setDeleteError] = useState('');

  // Функция для загрузки данных пользователя
  const loadUserData = useCallback(() => {
    const user = getUser();
    console.log('Загружены данные пользователя:', user);
    
    if (user) {
      // Устанавливаем отображаемые данные
      const displayData = {
        username: user.username || 'Пользователь',
        email: user.email || 'email@example.com',
        avatar: '/avatar.jpg',
        alt: user.username ? user.username.substring(0, 2).toUpperCase() : 'U',
      };
      
      console.log('Устанавливаем отображаемые данные:', displayData);
      setDisplayUserData(displayData);
      
      // Устанавливаем данные формы
      setFormData(prevData => ({
        ...prevData,
        username: user.username || '',
        email: user.email || ''
      }));
      
      console.log('Данные формы обновлены');
    } else {
      console.log('Пользователь не найден, используем данные по умолчанию');
    }
  }, []);

  // Получаем данные пользователя при загрузке компонента
  useEffect(() => {
    loadUserData();
  }, [loadUserData]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  // Обработчик изменения поля подтверждения удаления
  const handleDeleteConfirmationChange = (e) => {
    setDeleteConfirmation(e.target.value);
    setDeleteError('');
  };

  // Обработчик нажатия на кнопку "Удалить аккаунт"
  const handleDeleteClick = () => {
    setShowDeleteModal(true);
  };

  // Обработчик закрытия модального окна
  const handleCloseModal = () => {
    setShowDeleteModal(false);
    setDeleteConfirmation('');
    setDeleteError('');
  };

  // Обработчик подтверждения удаления аккаунта
  const handleConfirmDelete = async () => {
    if (deleteConfirmation !== 'Удалить') {
      setDeleteError('Пожалуйста, введите "Удалить" для подтверждения');
      return;
    }

    try {
      const result = await deleteAccount();
      if (result.success) {
        // Проверяем, что пользователь действительно удален
        const user = getUser();
        if (user) {
          console.error('Ошибка: пользователь все еще существует после удаления');
          setDeleteError('Произошла ошибка при удалении аккаунта. Пожалуйста, попробуйте еще раз.');
          return;
        }
        
        // Перенаправляем на страницу входа
        navigate('/auth/login');
      } else {
        setDeleteError(result.message || 'Произошла ошибка при удалении аккаунта');
      }
    } catch (error) {
      console.error('Error deleting account:', error);
      setDeleteError('Произошла ошибка при удалении аккаунта');
    }
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

  // Обработчик отправки формы (сохранение изменений)
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Проверяем, если пользователь хочет изменить пароль
    if (formData.currentPassword && formData.newPassword && formData.confirmPassword) {
      // Проверяем, совпадают ли новый пароль и подтверждение
      if (formData.newPassword !== formData.confirmPassword) {
        alert('Новый пароль и подтверждение пароля не совпадают');
        return;
      }
      
      // Получаем текущего пользователя
      const user = getUser();
      if (!user) {
        alert('Пользователь не найден');
        return;
      }
      
      // Проверяем, совпадает ли текущий пароль
      if (user.password !== formData.currentPassword) {
        alert('Текущий пароль введен неверно');
        return;
      }
      
      // Обновляем пароль пользователя
      const updatedUser = {
        ...user,
        username: formData.username || user.username,
        email: formData.email || user.email,
        password: formData.newPassword
      };
      
      console.log('Обновляем пользователя с новым паролем:', updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
      
      // Отправляем событие изменения localStorage
      window.dispatchEvent(new Event('storage'));
      
      // Обновляем пользователя в списке пользователей
      const usersStr = localStorage.getItem('users');
      if (usersStr) {
        try {
          const users = JSON.parse(usersStr);
          const userIndex = users.findIndex(u => 
            u.username === user.username || u.email === user.email
          );
          
          if (userIndex !== -1) {
            users[userIndex] = updatedUser;
            localStorage.setItem('users', JSON.stringify(users));
            console.log('Обновлен пользователь в списке пользователей:', users);
          }
        } catch (e) {
          console.error('Error updating user in users list:', e);
        }
      }
      
      // Очищаем поля пароля
      setFormData(prev => ({
        ...prev,
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      }));
      
      // Показываем уведомление об успешном изменении пароля
      alert('Пароль успешно изменен');
    } else if (formData.currentPassword || formData.newPassword || formData.confirmPassword) {
      // Если заполнены не все поля пароля
      alert('Для изменения пароля необходимо заполнить все поля: текущий пароль, новый пароль и подтверждение пароля');
      return;
    }
    
    // Обновляем отображаемые данные пользователя
    const newDisplayData = {
      username: formData.username || 'Пользователь',
      email: formData.email || 'email@example.com',
      avatar: '/avatar.jpg',
      alt: formData.username ? formData.username.substring(0, 2).toUpperCase() : 'U',
    };
    
    console.log('Обновляем отображаемые данные:', newDisplayData);
    setDisplayUserData(newDisplayData);
    
    // Обновляем данные пользователя в localStorage (если не обновляли пароль)
    if (!(formData.currentPassword && formData.newPassword && formData.confirmPassword)) {
      const user = getUser();
      if (user) {
        const updatedUser = {
          ...user,
          username: formData.username,
          email: formData.email
        };
        
        console.log('Обновляем данные пользователя в localStorage:', updatedUser);
        localStorage.setItem('user', JSON.stringify(updatedUser));
        
        // Отправляем событие изменения localStorage
        window.dispatchEvent(new Event('storage'));
        
        // Обновляем пользователя в списке пользователей
        const usersStr = localStorage.getItem('users');
        if (usersStr) {
          try {
            const users = JSON.parse(usersStr);
            const userIndex = users.findIndex(u => 
              u.username === user.username || u.email === user.email
            );
            
            if (userIndex !== -1) {
              users[userIndex] = updatedUser;
              localStorage.setItem('users', JSON.stringify(users));
              console.log('Обновлен пользователь в списке пользователей:', users);
            }
          } catch (e) {
            console.error('Error updating user in users list:', e);
          }
        }
      }
    }
    
    // Перезагружаем данные пользователя
    loadUserData();
    
    console.log('Изменения сохранены:', formData);
    
    // Показываем уведомление об успешном сохранении
    if (!(formData.currentPassword && formData.newPassword && formData.confirmPassword)) {
      alert('Изменения успешно сохранены');
    }
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
            alt={displayUserData.alt}
            className={styles.avatar}
          />
        </div>
        <div className={styles.userInfo}>
          <h2 className={styles.userName}>{displayUserData.username}</h2>
          <p className={styles.userEmail}>{displayUserData.email}</p>
          <button className={styles.verifyButton} onClick={handleDeleteClick}>
            <span className={styles.verifyIcon}>Х</span>
            <span>Удалить аккаунт</span>
          </button>
        </div>
      </div>

      {/* Форма настроек аккаунта */}
      <form onSubmit={handleSubmit} className={styles.formContainer}>
        <div className={styles.formGrid}>
          <Input
            id='username'
            label='Имя'
            placeholder='Введите новый никнейм'
            value={formData.username}
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

      {/* Модальное окно подтверждения удаления */}
      {showDeleteModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <h3 className={styles.modalTitle}>Подтверждение удаления аккаунта</h3>
            <p className={styles.modalText}>
              Вы уверены, что хотите удалить свой аккаунт? Это действие нельзя отменить.
              Все ваши данные будут удалены.
            </p>
            <p className={styles.modalText}>
              Для подтверждения введите <strong>Удалить</strong>
            </p>
            <input
              type="text"
              className={styles.modalInput}
              value={deleteConfirmation}
              onChange={handleDeleteConfirmationChange}
              placeholder="Введите 'Удалить'"
            />
            {deleteError && <p className={styles.modalError}>{deleteError}</p>}
            <div className={styles.modalButtons}>
              <button
                type="button"
                className={styles.modalCancelButton}
                onClick={handleCloseModal}
              >
                Отмена
              </button>
              <button
                type="button"
                className={styles.modalDeleteButton}
                onClick={handleConfirmDelete}
              >
                Удалить аккаунт
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Account;
