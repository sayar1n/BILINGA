import React from 'react';
import { useLocation } from 'react-router-dom';
import styles from './DictionaryPage.module.scss';

const DictionaryPage = () => {
  const location = useLocation();
  const word = location.state?.word;

  if (!word) {
    return (
      <div className={styles.dictionaryPage}>
        <h1>Словарь</h1>
        <p>Используйте поиск для просмотра слов</p>
      </div>
    );
  }

  return (
    <div className={styles.dictionaryPage}>
      <div className={styles.wordHeader}>
        <h1 className={styles.word}>{word.word}</h1>
        <span className={styles.partOfSpeech}>({word.partOfSpeech})</span>
      </div>
      <div className={styles.transcription}>[{word.transcription}]</div>
      <div className={styles.translation}>{word.translation}</div>
      <div className={styles.examples}>
        <h2>Примеры с переводом</h2>
        <div className={styles.example}>
          <div className={styles.englishExample}>
            Show me your beautiful {word.word}.
          </div>
          <div className={styles.russianExample}>
            Покажи мне свой красивый {word.translation}.
          </div>
        </div>
      </div>
      {word.synonyms?.length > 0 && (
        <div className={styles.synonyms}>
          <h2>Синонимы</h2>
          <div className={styles.synonymsList}>
            {word.synonyms.join(', ')}
          </div>
        </div>
      )}
    </div>
  );
};

export default DictionaryPage;
