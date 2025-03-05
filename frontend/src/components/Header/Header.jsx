import React from 'react';
import styles from './Header.module.scss';

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.searchContainer}>
        <input 
          type="text" 
          placeholder="Поиск" 
          className={styles.searchInput}
        />
        <button className={styles.searchButton}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15.7 14.3L11.5 10.1C12.4 9 13 7.6 13 6C13 2.7 10.3 0 7 0C3.7 0 1 2.7 1 6C1 9.3 3.7 12 7 12C8.6 12 10 11.4 11.1 10.5L15.3 14.7C15.5 14.9 15.8 15 16 15C16.2 15 16.5 14.9 16.7 14.7C17.1 14.3 17.1 13.7 15.7 14.3ZM7 10C4.8 10 3 8.2 3 6C3 3.8 4.8 2 7 2C9.2 2 11 3.8 11 6C11 8.2 9.2 10 7 10Z" fill="#666666"/>
          </svg>
        </button>
      </div>

      <div className={styles.userSection}>
        <button className={styles.notificationButton}>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M16 7C16 5.4087 15.3679 3.88258 14.2426 2.75736C13.1174 1.63214 11.5913 1 10 1C8.4087 1 6.88258 1.63214 5.75736 2.75736C4.63214 3.88258 4 5.4087 4 7C4 14 1 16 1 16H19C19 16 16 14 16 7Z" stroke="#666666" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M11.7295 19C11.5537 19.3031 11.3014 19.5547 10.9978 19.7295C10.6941 19.9044 10.3499 19.9965 9.99953 19.9965C9.64915 19.9965 9.30492 19.9044 9.0013 19.7295C8.69769 19.5547 8.44534 19.3031 8.26953 19" stroke="#666666" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        <div className={styles.userProfile}>
          <div className={styles.userAvatar}>
            <img src="https://via.placeholder.com/32" alt="User avatar" />
          </div>
          <span className={styles.username}>Username</span>
          <button className={styles.dropdownButton}>
            <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1 1L6 6L11 1" stroke="#666666" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
