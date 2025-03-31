import React, { useState } from 'react';
import styles from './Rating.module.scss';

const Rating = () => {
  const ratingData = [
    { place: 1, user: 'Иван', score: 120 },
    { place: 2, user: 'Мария', score: 95 },
    { place: 3, user: 'Алексей', score: 80 },
    { place: 4, user: 'Ольга', score: 75 },
    { place: 5, user: 'Дмитрий', score: 70 },
    { place: 6, user: 'Светлана', score: 65 },
    { place: 7, user: 'Павел', score: 60 },
    { place: 8, user: 'Екатерина', score: 55 },
    { place: 9, user: 'Андрей', score: 50 },
  ];

  const tasks = [
    {
      id: 1,
      text: 'Скинуть монеты на карту',
      type: 'important',
      status: '+1 очко',
    },
    {
      id: 2,
      text: 'Дойдите до 5 лвл в понедельник',
      type: 'regular',
      status: 'Награда получена',
    },
  ];

  const currentLevel = 2;
  const totalLevels = 20;
  const visibleLevels = 10;

  const [startLevel, setStartLevel] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [selectedLevel, setSelectedLevel] = useState(currentLevel);
  const [direction, setDirection] = useState('');

  const getVisibleLevels = () => {
    const endLevel = Math.min(startLevel + visibleLevels - 1, totalLevels);
    return Array.from(
      { length: endLevel - startLevel + 1 },
      (_, i) => startLevel + i
    );
  };

  const handleNextLevel = () => {
    if (startLevel + visibleLevels <= totalLevels) {
      setDirection('right');
      setIsTransitioning(true);
      setTimeout(() => {
        setStartLevel(startLevel + 1);
        setIsTransitioning(false);
      }, 300);
    }
  };

  const handlePrevLevel = () => {
    if (startLevel > 1) {
      setDirection('left');
      setIsTransitioning(true);
      setTimeout(() => {
        setStartLevel(startLevel - 1);
        setIsTransitioning(false);
      }, 300);
    }
  };

  const handleLevelClick = (level) => {
    setSelectedLevel(level);
  };

  const displayedLevels = getVisibleLevels();

  return (
    <div className={styles.battlePassContainer}>
      <div className={styles.battlePassTitle}>
        <h1>боевой пропуск</h1>
      </div>

      <div className={styles.sectionsContainer}>
        {/* Секция уровней */}
        <div className={styles.levelsSection}>
          <h2 className={styles.sectionTitle}>Уровни</h2>

          <div className={styles.levelsContent}>
            <div className={styles.progressArea}>
              <div className={styles.progressBar}>
                <div
                  className={styles.progressBarFill}
                  style={{ width: `${(currentLevel / totalLevels) * 100}%` }}
                ></div>
              </div>

              <div className={styles.levelIndicator}>
                <span>Текущий уровень: {currentLevel}</span>
                <span>
                  Следующий уровень:{' '}
                  {currentLevel < totalLevels ? currentLevel + 1 : 'Макс.'}
                </span>
              </div>
            </div>

            <div className={styles.levelSelector}>
              <button
                className={styles.navButton}
                onClick={handlePrevLevel}
                disabled={startLevel === 1}
              >
                &#10094;
              </button>

              <div
                className={`${styles.levelsGroup} ${
                  isTransitioning
                    ? direction === 'left'
                      ? styles.slideOutRight
                      : styles.slideOutLeft
                    : direction === 'left'
                    ? styles.slideInLeft
                    : styles.slideInRight
                }`}
              >
                {displayedLevels.map((level) => (
                  <button
                    key={level}
                    className={`${styles.levelButton} ${
                      level <= currentLevel ? styles.active : ''
                    } ${level === selectedLevel ? styles.selected : ''}`}
                    onClick={() => handleLevelClick(level)}
                  >
                    {level}
                  </button>
                ))}
              </div>

              <button
                className={styles.navButton}
                onClick={handleNextLevel}
                disabled={startLevel + visibleLevels > totalLevels}
              >
                &#10095;
              </button>
            </div>

            <div className={styles.reward}>
              <span className={`${styles.taskMarker} ${styles.reward}`}></span>
              <span className={styles.rewardText}>
                Награда за уровень {selectedLevel}:{' '}
                {selectedLevel === 3
                  ? 'Бутерброд'
                  : `Приз уровня ${selectedLevel}`}
              </span>
            </div>
          </div>
        </div>

        {/* Секция рейтинга */}
        <div className={styles.ratingSection}>
          <h2 className={styles.sectionTitle}>Рейтинг</h2>

          <table className={styles.ratingTable}>
            <thead>
              <tr>
                <td></td>
                <td></td>
                <td></td>
              </tr>
            </thead>
            <thead>
              <tr>
                <th>Место</th>
                <th>Пользователь</th>
                <th>Баллы</th>
              </tr>
            </thead>
            <tbody>
              {ratingData.map((user) => (
                <tr key={user.place}>
                  <td>{user.place}</td>
                  <td>{user.user}</td>
                  <td>{user.score}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Секция заданий */}
        <div className={styles.tasksSection}>
          <h2 className={styles.sectionTitle}>Задания</h2>

          <div className={styles.tasksList}>
            {tasks.map((task) => (
              <div key={task.id} className={styles.taskItem}>
                <div className={styles.taskInfo}>
                  <span
                    className={`${styles.taskMarker} ${styles[task.type]}`}
                  ></span>
                  <span className={styles.taskText}>{task.text}</span>
                </div>
                <div className={styles.taskStatus}>{task.status}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Rating;
