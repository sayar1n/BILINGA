import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './SideBar.module.scss';

const SideBar = () => {
  const [showGameSubmenu, setShowGameSubmenu] = useState(false);

  return (
    <div className={styles.sidebar}>
      <div className={styles.logo}>BILINGA</div>
      
      {/* Основная навигация */}
      <nav className={styles.mainNav}>
        <NavLink to="/" className={styles.navLink}>Главная</NavLink>
        
        {/* Игры с подменю */}
        <div 
          className={styles.navItemWithSubmenu}
          onMouseEnter={() => setShowGameSubmenu(true)}
          onMouseLeave={() => setShowGameSubmenu(false)}
        >
          <NavLink to="/games" className={styles.navLink}>Игры</NavLink>
          {showGameSubmenu && (
            <div className={styles.submenu}>
              <NavLink to="/games/solo" className={styles.submenuLink}>Соло</NavLink>
              <NavLink to="/games/duo" className={styles.submenuLink}>Дуо(Бот)</NavLink>
            </div>
          )}
        </div>

        <NavLink 
          to="/materials" 
          className={`${styles.navLink} ${showGameSubmenu ? styles.firstShifted : ''}`}
        >
          Материалы
        </NavLink>
        <NavLink 
          to="/notes" 
          className={`${styles.navLink} ${showGameSubmenu ? styles.nextShifted : ''}`}
        >
          Заметки
        </NavLink>
        <NavLink 
          to="/dictionary" 
          className={`${styles.navLink} ${showGameSubmenu ? styles.nextShifted : ''}`}
        >
          Словари
        </NavLink>
      </nav>

      {/* Дополнительная навигация */}
      <nav className={styles.secondaryNav}>
        <NavLink to="/settings" className={styles.navLink}>Настройки</NavLink>
        <NavLink to="/support" className={styles.navLink}>Поддержка</NavLink>
        <NavLink to="/logout" className={styles.navLink}>Выйти</NavLink>
      </nav>
    </div>
  );
};

export default SideBar;
