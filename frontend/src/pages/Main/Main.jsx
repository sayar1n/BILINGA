import React from 'react';
import GameSlider from '../../components/GameSlider/GameSlider';
import { gamesData } from '../../data/games';
import styles from './Main.module.scss';

const Main = () => {
  return (
    <div className={styles.container}>
      <GameSlider title="Соло" games={gamesData.solo} />
      <GameSlider title="Дуо(Бот)" games={gamesData.duo} />
    </div>
  );
};

export default Main; 