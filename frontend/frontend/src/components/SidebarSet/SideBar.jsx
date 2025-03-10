import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './SideBar.module.scss';


const SideBarSet = () => {
  return (
    <div className={styles.sidebar}>
      <div className={styles.logo}>BILINGA</div>
      
      {/* Основная навигация */}
      <nav className={styles.mainNav}>
        <NavLink to="/" className={styles.navLink}>Главная</NavLink>
        <NavLink to="/games" className={styles.navLink}>Игры</NavLink>
        <NavLink to="/materials" className={styles.navLink}>Материалы</NavLink>
        <NavLink to="/notes" className={styles.navLink}>Заметки</NavLink>
        <NavLink to="/dictionary" className={styles.navLink}>Словари</NavLink>
      </nav>

      {/* Дополнительная навигация */}
      <nav className={styles.secondaryNav}>
        <NavLink to="/sidebar" className={styles.navLink}>Домой</NavLink>
        <NavLink to="/support" className={styles.navLink}>Поддержка</NavLink>
        <NavLink to="/logout" className={styles.navLink}>Выйти</NavLink>
      </nav>
    </div>
  );
};

export default SideBarSet;
