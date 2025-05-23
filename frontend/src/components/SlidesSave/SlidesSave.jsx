import React from 'react';
import styles from './SlidesSave.module.scss';

const SlidesSave = ({ set, onClick }) => {
  return (
    <div className={styles.slideCard} onClick={() => onClick(set)}>
      <div className={styles.content}>
        <h3 className={styles.title}>{set.title}</h3>
        <div className={styles.terms}>
          <span className={styles.termsCount}>{set.terms} термин</span>
        </div>
      </div>
      <div className={styles.author}>
        <div className={styles.authorInfo}>
          <img 
            src={set.author.avatar} 
            alt={set.author.name} 
            className={styles.avatar}
          />
          <span className={styles.name}>{set.author.name}</span>
        </div>
        <span className={styles.role}>{set.author.role}</span>
      </div>
    </div>
  );
};

export default SlidesSave; 