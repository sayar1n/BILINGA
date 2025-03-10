import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './SideBarSet.module.scss';


const SideBarSet = () => {
  return (
    <div className={styles.sidebar}>
      <div className={styles.logo}>BILINGA</div>
      
      {/* Основная навигация */}
      <nav className={styles.mainNav}>
        <NavLink to="/settings/account" className={styles.navLink}>Аккаунт</NavLink>
        <NavLink to="/settings/progress" className={styles.navLink}>Прогресс</NavLink>
        <NavLink to="/settings/rating" className={styles.navLink}>Рейтинг</NavLink>
        <NavLink to="/settings/notifications" className={styles.navLink}>Оповещения</NavLink>
      </nav>

      {/* Дополнительная навигация */}
      <nav className={styles.secondaryNav}>
        <NavLink to="/main" className={styles.navLink}>Домой</NavLink>
        <NavLink to="/support" className={styles.navLink}>Поддержка</NavLink>
        <NavLink to="/logout" className={styles.navLink}>Выйти</NavLink>
      </nav>
    </div>
  );
};

export default SideBarSet;
