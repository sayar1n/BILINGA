import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  riddlesData,
  randomAnswerOptions,
} from '../../../data/riddles/riddles';
import styles from './Riddles.module.scss';

const Riddles = () => {
  const navigate = useNavigate();
  const [currentRiddle, setCurrentRiddle] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [incorrectAnswer, setIncorrectAnswer] = useState(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [loading, setLoading] = useState(true);
  const [answerOptions, setAnswerOptions] = useState([]);

  const getCorrectAnswer = (riddle) => {
    const answerText = riddle.answer.replace(/\.$/, '');

    if (answerText.includes('"')) {
      const match = answerText.match(/\"(.*?)\"/);
      if (match) return match[1];
    }

    return answerText;
  };
  const generateAnswerOptions = React.useCallback((riddle) => {
    const correctAnswer = getCorrectAnswer(riddle);

    let options = [];

    options.push({
      text: correctAnswer,
      isCorrect: true,
    });

    while (options.length < 4) {
      const randomAnswer =
        randomAnswerOptions[
          Math.floor(Math.random() * randomAnswerOptions.length)
        ];

      if (
        !options.some((option) => option.text === randomAnswer) &&
        randomAnswer.toLowerCase() !== correctAnswer.toLowerCase()
      ) {
        options.push({
          text: randomAnswer,
          isCorrect: false,
        });
      }
    }

    options.sort(() => Math.random() - 0.5);

    setAnswerOptions(options);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (riddlesData.length > 0) {
        const firstRiddle = riddlesData[0];
        setCurrentRiddle(firstRiddle);
        generateAnswerOptions(firstRiddle);
      }
      setLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [generateAnswerOptions]);

  const handleAnswerClick = (selectedAnswer, isCorrect) => {
    if (isCorrect) {
      handleCorrectAnswer();
    } else {
      setIncorrectAnswer(selectedAnswer);
      setTimeout(() => {
        setIncorrectAnswer(null);
      }, 800);
    }
  };

  const handleCorrectAnswer = () => {
    setIsTransitioning(true);

    const nextIndex = (currentIndex + 1) % riddlesData.length;
    const nextRiddle = riddlesData[nextIndex];

    setTimeout(() => {
      setCurrentIndex(nextIndex);
      setCurrentRiddle(nextRiddle);
      generateAnswerOptions(nextRiddle); // генерация новых вариантов ответов
      setIsTransitioning(false);
    }, 500);
  };

  const handleBackClick = () => {
    navigate(-1);
  };

  if (loading) return <div className={styles.loading}>Загрузка загадок...</div>;
  if (!currentRiddle)
    return <div className={styles.error}>Загадки не найдены :(</div>;

  const riddleText = currentRiddle.riddle || 'Загадка не найдена';

  return (
    <div className={styles.container}>
      <div className={styles.backButton} onClick={handleBackClick}>
        <svg
          data-slot='icon'
          fill='none'
          stroke-width='1.5'
          stroke='currentColor'
          viewBox='0 0 24 24'
          xmlns='http://www.w3.org/2000/svg'
          aria-hidden='true'
        >
          <path
            stroke-linecap='round'
            stroke-linejoin='round'
            d='M6.75 15.75 3 12m0 0 3.75-3.75M3 12h18'
          ></path>
        </svg>
      </div>
      <div
        className={`${styles.riddleContainer} ${
          isTransitioning ? styles.fadeOut : styles.fadeIn
        }`}
      >
        <h1 className={styles.riddleTitle}>{riddleText}</h1>

        <div className={styles.optionsGrid}>
          {answerOptions.map((option, index) => (
            <div
              key={index}
              className={`${styles.option} 
                ${incorrectAnswer === option.text ? styles.shake : ''} 
                ${incorrectAnswer === option.text ? styles.incorrect : ''}`}
              onClick={() => handleAnswerClick(option.text, option.isCorrect)}
            >
              {option.text}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Riddles;
