import React, { useState, useEffect, useRef } from 'react';
import styles from './GameCard.module.scss';

const GameCard = ({ title, author, image }) => {
  const [showTruck, setShowTruck] = useState(false);
  const [animationStage, setAnimationStage] = useState(0);
  const audioRef = useRef(null);
  
  useEffect(() => {
    let timeout;
    if (showTruck) {
      // Воспроизводим звук
      if (audioRef.current) {
        audioRef.current.currentTime = 0;
        audioRef.current.play().catch(e => console.log('Ошибка воспроизведения звука:', e));
      }
      
      // Через 50мс начинаем анимацию роста
      timeout = setTimeout(() => {
        setAnimationStage(1);
      }, 50);
      
      timeout = setTimeout(() => {
        setAnimationStage(0);
        setTimeout(() => {
          setShowTruck(false);
        }, 300);
      }, 900);
    }
    
    return () => {
      if (timeout) clearTimeout(timeout);
    };
  }, [showTruck]);
  
  const handleClick = () => {
    if (image === '/malchick.jpg') {
      setShowTruck(true);
    }
  };
  
  return (
    <>
      <audio 
        ref={audioRef} 
        src="/Batman Transition - Sound Effect (HD).mp3"
        preload="auto"
      />
      
      {showTruck && (
        <div 
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.6)',
            zIndex: 9999,
            transition: 'all 0.3s ease',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              backgroundImage: 'url(/fura.jpg)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              width: animationStage ? '150vw' : '10vw',
              height: animationStage ? '150vh' : '10vh',
              transform: animationStage ? 'scale(0.8)' : 'scale(0.5)',
              transition: 'all 0.8s cubic-bezier(0.165, 0.84, 0.44, 1)',
              borderRadius: animationStage ? '0' : '20%',
              boxShadow: '0 0 30px rgba(0,0,0,0.8)',
            }}
          />
        </div>
      )}
      <div className={styles.card} onClick={handleClick}>
        <div className={styles.imageWrapper}>
          <img src={image} alt={title} className={styles.image} />
        </div>
        <div className={styles.info}>
          <h3 className={styles.title}>{title}</h3>
          <p className={styles.author}>{author}</p>
        </div>
      </div>
    </>
  );
};

export default GameCard;