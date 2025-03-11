import React, { useState } from 'react';
import ProgressBar from '../../components/ProgressBar/ProgressBar';
import styles from './Progress.module.scss';

const ProgressPage = () => {
  // Данные пользователя
  const userData = {
    name: 'Alexandra Zavoykina',
    email: 'alexbidlo@gmail.com',
    avatar: '/avatar.jpg',
    alt: 'AZ',
  };

  // Данные для прогресс-баров
  const progressData = [
    { level: 'A1', percent: 61 },
    { level: 'A2', percent: 76 },
    { level: 'B1', percent: 0 },
    { level: 'B2', percent: 100 },
    { level: 'C1+', percent: 50 },
  ];

  // Данные для детального просмотра уровня
  const levelsData = [
    {
      level: 'A1',
      completed: 6,
      total: 10,
      percent: 60,
      tip: 'Совет: Попробуйте пройти ещё несколько игр и заданий для улучшения вашего прогресса.',
    },
    {
      level: 'A2',
      completed: 8,
      total: 10,
      percent: 76,
      tip: 'Отлично! Вы уже прошли большую часть заданий в этом уровне.',
    },
    {
      level: 'B1',
      completed: 0,
      total: 15,
      percent: 0,
      tip: 'Начните изучение этого уровня с простых игр для закрепления базовых знаний.',
    },
    {
      level: 'B2',
      completed: 12,
      total: 12,
      percent: 100,
      tip: 'Поздравляем! Вы полностью освоили этот уровень.',
    },
    {
      level: 'C1+',
      completed: 6,
      total: 12,
      percent: 50,
      tip: 'Продолжайте практиковать сложные темы для закрепления навыков продвинутого уровня.',
    },
  ];

  // Состояние для отслеживания текущего отображаемого уровня
  const [currentLevelIndex, setCurrentLevelIndex] = useState(0);
  const currentLevel = levelsData[currentLevelIndex];

  // Обработчики для переключения между уровнями
  const handlePrevLevel = () => {
    setCurrentLevelIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : levelsData.length - 1
    );
  };

  const handleNextLevel = () => {
    setCurrentLevelIndex((prevIndex) =>
      prevIndex < levelsData.length - 1 ? prevIndex + 1 : 0
    );
  };

  return (
    <div className={styles.container}>
      {/* Зеленый фон вверху */}
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
        </div>
      </div>

      {/* Карточки с прогрессом */}
      <div className={styles.cards}>
        {/* Карточка общей сводки */}
        <div className={styles.card}>
          <h3 className={styles.cardTitle}>Общая сводка</h3>
          <div className={styles.progressBars}>
            {progressData.map((item) => (
              <ProgressBar
                key={item.level}
                level={item.level}
                percent={item.percent}
              />
            ))}
          </div>
        </div>

        {/* Карточка сводки по уровням */}
        <div className={styles.card}>
          <h3 className={styles.cardTitle}>Сводка по уровням</h3>
          <div className={styles.levelDetail}>
            <div className={styles.levelNav}>
              <button
                className={styles.navBtn}
                onClick={handlePrevLevel}
                aria-label='Предыдущий уровень'
              >
                <span className={styles.arrow}>&#10094;</span>
              </button>
              <h4 className={styles.levelTitle}>
                Уровень {currentLevel.level}
              </h4>
              <button
                className={styles.navBtn}
                onClick={handleNextLevel}
                aria-label='Следующий уровень'
              >
                <span className={styles.arrow}>&#10095;</span>
              </button>
            </div>

            <div className={styles.levelInfo}>
              <p className={styles.levelProgress}>
                Пройдено игр: {currentLevel.completed}/{currentLevel.total}
              </p>
              <div className={styles.progressBar}>
                <div
                  className={styles.progressFill}
                  style={{ width: `${currentLevel.percent}%` }}
                />
              </div>
              <p className={styles.levelTip}>{currentLevel.tip}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Кнопка сброса прогресса */}
      <button className={styles.resetBtn}>
        <span className={styles.resetIcon}>✕</span> Сбросить прогресс
      </button>
    </div>
  );
};

export default ProgressPage;
