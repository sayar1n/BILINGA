import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styles from './CardsZone.module.scss';
import { getSavedSets } from '../../../../data/wordset/wordser';

const CardsZone = () => {
  const { setId } = useParams();
  const [currentSet, setCurrentSet] = useState(null);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  useEffect(() => {
    const sets = getSavedSets();
    const set = sets.find(s => s.id === parseInt(setId));
    setCurrentSet(set);
  }, [setId]);

  const handleNextCard = () => {
    if (currentSet && currentCardIndex < currentSet.words.length - 1) {
      setCurrentCardIndex(prev => prev + 1);
      setIsFlipped(false);
    }
  };

  const handlePrevCard = () => {
    if (currentCardIndex > 0) {
      setCurrentCardIndex(prev => prev - 1);
      setIsFlipped(false);
    }
  };

  const handleFlipCard = () => {
    setIsFlipped(!isFlipped);
  };

  if (!currentSet) {
    return <div className={styles.cardsZone}>Загрузка...</div>;
  }

  const currentCard = currentSet.words[currentCardIndex];

  return (
    <div className={styles.cardsZone}>
      <h2>{currentSet.title}</h2>
      <div className={`${styles.card} ${isFlipped ? styles.flipped : ''}`} onClick={handleFlipCard}>
        <div className={styles.cardInner}>
          <div className={styles.cardFront}>
            <h3>{currentCard.russian}</h3>
            <p className={styles.hint}>{currentCard.hint}</p>
          </div>
          <div className={styles.cardBack}>
            <h3>{currentCard.english}</h3>
            <p className={styles.transcription}>{currentCard.transcription}</p>
          </div>
        </div>
      </div>
      <div className={styles.controls}>
        <button 
          onClick={handlePrevCard} 
          disabled={currentCardIndex === 0}
          className={styles.controlButton}
        >
          Предыдущая
        </button>
        <span className={styles.counter}>
          {currentCardIndex + 1} / {currentSet.words.length}
        </span>
        <button 
          onClick={handleNextCard} 
          disabled={currentCardIndex === currentSet.words.length - 1}
          className={styles.controlButton}
        >
          Следующая
        </button>
      </div>
    </div>
  );
};

export default CardsZone; 