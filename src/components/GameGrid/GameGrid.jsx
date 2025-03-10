import React from 'react';
import GameCard from '../GameCard/GameCard';
import styles from './GameGrid.module.scss';

const GameGrid = ({ title, games, onItemSelect }) => {
  const handleCardClick = (game) => {
    onItemSelect && onItemSelect(game, game.type);
  };

  return (
    <div className={styles.gridContainer}>
      <h2 className={styles.title}>{title}</h2>
      <div className={styles.grid}>
        {games.map((game) => (
          <div 
            key={game.id}
            onClick={() => handleCardClick(game)}
            className={styles.cardWrapper}
          >
            <GameCard
              title={game.title}
              author={game.author}
              image={game.image}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default GameGrid; 