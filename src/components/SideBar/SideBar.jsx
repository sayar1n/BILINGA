import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import styles from './SideBar.module.scss';

const SideBar = () => {
  const [showGameSubmenu, setShowGameSubmenu] = useState(false);
  const [showSettingsMenu, setShowSettingsMenu] = useState(false);

  const navigate = useNavigate();

  const handleGameSubmenuClick = (filter) => {
    if (filter) {
      navigate(`/games?filter=${filter}`);
    } else {
      navigate('/games');
    }
  };

  const handleSettingsClick = (e) => {
    e.preventDefault();
    setShowSettingsMenu(!showSettingsMenu);
  };

  // СОВЕТ: нужно мемоизировать компонент Nav так как происходят лишние рендеры
  // функции в обработчиках событий вызывают лишние рендеры
  // каждый раз при изменении showGameSubmenu происходит рендер

  // пример оптимизации отрисовки путей
  // Основные маршруты
  // const mainRoutes = [
  //   { id: 'main', path: '/main', label: 'Главная' },
  //   // остальные пути
  //   // Игры с подменю - обрабатываются отдельно
  // ];
  // // Дополнительные маршруты (футер)
  // const secondaryRoutes = [
  //   { id: 'settings', path: '/settings', label: 'Настройки' },
  //   // остальные пути
  // ];
  // потом просто делаем .map и код становится более читаемым

  return (
    <div className={styles.sidebar}>
      <div className={styles.logo}>BILINGA</div>

      {/* Основная навигация */}
      <nav className={styles.mainNav}>
        {!showSettingsMenu ? (
          <React.Fragment>
            <NavLink to='/main' className={styles.navLink}>
              Главная
            </NavLink>

            {/* Игры с подменю */}
            <div
              className={styles.navItemWithSubmenu}
              onMouseEnter={() => setShowGameSubmenu(true)}
              onMouseLeave={() => setShowGameSubmenu(false)}
            >
              <NavLink
                to='/games'
                className={styles.navLink}
                onClick={() => handleGameSubmenuClick()}
              >
                Игры
              </NavLink>
              {showGameSubmenu && (
                <div className={styles.submenu}>
                  <button
                    className={styles.submenuLink}
                    onClick={() => handleGameSubmenuClick('Соло')}
                  >
                    Соло
                  </button>
                  <button
                    className={styles.submenuLink}
                    onClick={() => handleGameSubmenuClick('Дуо(Бот)')}
                  >
                    Дуо(Бот)
                  </button>
                </div>
              )}
            </div>

            <NavLink
              to='/materials'
              className={`${styles.navLink} ${
                showGameSubmenu ? styles.firstShifted : ''
              }`}
            >
              Материалы
            </NavLink>
            <NavLink
              to='/notes'
              className={`${styles.navLink} ${
                showGameSubmenu ? styles.nextShifted : ''
              }`}
            >
              Заметки
            </NavLink>
            <NavLink
              to='/dictionary'
              className={`${styles.navLink} ${
                showGameSubmenu ? styles.nextShifted : ''
              }`}
            >
              Словари
            </NavLink>
          </React.Fragment>
        ) : (
          // Меню настроек (когда режим настроек включен)
          <React.Fragment>
            <NavLink
              to='/account'
              className={`${styles.navLink} ${
                showGameSubmenu ? styles.nextShifted : ''
              }`}
            >
              Аккаунт
            </NavLink>
            <NavLink
              to='/progress'
              className={`${styles.navLink} ${
                showGameSubmenu ? styles.nextShifted : ''
              }`}
            >
              Прогресс
            </NavLink>
            <NavLink
              to='/rating'
              className={`${styles.navLink} ${
                showGameSubmenu ? styles.nextShifted : ''
              }`}
            >
              Рейтинг
            </NavLink>
            <NavLink
              to='/notifications'
              className={`${styles.navLink} ${
                showGameSubmenu ? styles.nextShifted : ''
              }`}
            >
              Оповещения
            </NavLink>
          </React.Fragment>
        )}
      </nav>

      {/* Дополнительная навигация */}
      <nav className={styles.secondaryNav}>
        <NavLink
          to='/settings'
          className={styles.navLink}
          onClick={handleSettingsClick}
        >
          Настройки
        </NavLink>
        <NavLink to='/support' className={styles.navLink}>
          Поддержка
        </NavLink>
        <NavLink to='/logout' className={styles.navLink}>
          Выйти
        </NavLink>
      </nav>
    </div>
  );
};

export default SideBar;
