import React, { useState } from 'react';
import GameCard from '../GameCard/GameCard';
import styles from './GameSlider.module.scss';

const GameSlider = ({ title, games }) => {
  const [startIndex, setStartIndex] = useState(0);
  const cardsToShow = 5;

  const handlePrev = () => {
    setStartIndex(Math.max(0, startIndex - 1));
  };

  const handleNext = () => {
    setStartIndex(Math.min(games.length - cardsToShow, startIndex + 1));
  };

  return (
    <div className={styles.sliderContainer}>
      <h2 className={styles.title}>{title}</h2>
      <div className={styles.slider}>
        <button 
          className={`${styles.navButton} ${styles.prevButton}`}
          onClick={handlePrev}
          disabled={startIndex === 0}
        >
          &#8249;
        </button>
        <div className={styles.cardsContainer}>
          {games.slice(startIndex, startIndex + cardsToShow).map((game) => (
            <GameCard
              key={game.id}
              title={game.title}
              author={game.author}
              image={game.image}
            />
          ))}
        </div>
        <button 
          className={`${styles.navButton} ${styles.nextButton}`}
          onClick={handleNext}
          disabled={startIndex >= games.length - cardsToShow}
        >
          &#8250;
        </button>
      </div>
    </div>
  );
};

export default GameSlider; 