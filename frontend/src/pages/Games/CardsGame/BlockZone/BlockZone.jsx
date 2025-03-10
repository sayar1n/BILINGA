import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SlidesSave from '../../../../components/SlidesSave/SlidesSave';
import { getSavedSets } from '../../../../data/wordset/wordser';
import styles from './BlockZone.scss';

const BlockZone = () => {
  const [sets, setSets] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const loadedSets = getSavedSets();
    setSets(loadedSets);
  }, []);

  const handleSetClick = (set) => {
    navigate(`/games/cards/${set.id}`);
  };

  return (
    <div className={styles.blockZone}>
      <div className={styles.header}>
        <h2 className={styles.title}>Популярные модули с карточками</h2>
      </div>
      <div className={styles.grid}>
        {sets.map((set) => (
          <SlidesSave 
            key={set.id}
            set={set}
            onClick={handleSetClick}
          />
        ))}
      </div>
    </div>
  );
};

export default BlockZone;
