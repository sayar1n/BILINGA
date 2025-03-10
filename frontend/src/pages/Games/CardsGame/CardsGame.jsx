import React from 'react';
import { Routes, Route } from 'react-router-dom';
import styles from './CardsGame.module.scss';
import BlockZone from './BlockZone/BlockZone';
import CardsZone from './CardsZone/CardsZone';

const CardsGame = () => {
  return (
    <div className={styles.cardsGame}>
      <Routes>
        <Route path="/" element={<BlockZone />} />
        <Route path="/:setId" element={<CardsZone />} />
      </Routes>
    </div>
  );
};

export default CardsGame; 