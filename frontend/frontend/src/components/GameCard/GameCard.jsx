import React from 'react';
import styles from './GameCard.module.scss';

const GameCard = ({ title, author, image }) => {
  return (
    <div className={styles.card}>
      <div className={styles.imageWrapper}>
        <img src={image} alt={title} className={styles.image} />
      </div>
      <div className={styles.info}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.author}>{author}</p>
      </div>
    </div>
  );
};

export default GameCard; 