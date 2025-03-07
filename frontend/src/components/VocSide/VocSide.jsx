import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { searchWord } from '../../data/dictionary/dictionary';
import styles from './VocSide.module.scss';

const VocSide = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [foundWord, setFoundWord] = useState(null);

  const isNotesPage = location.pathname.startsWith('/notes');
  const isDictionaryPage = location.pathname.startsWith('/dictionary');
  const title = isNotesPage ? 'Быстрый поиск\nпо словарю' : 'Поиск по словарю';

  const handleSearch = () => {
    if (!searchQuery.trim()) return;
    
    const results = searchWord(searchQuery);
    if (results.length > 0) {
      if (isDictionaryPage) {
        // На странице словаря отправляем результат в MainFrame
        navigate('/dictionary', { state: { word: results[0] } });
        setSearchQuery('');
      } else {
        // На других страницах (включая Notes) показываем результат в VocSide
        setFoundWord(results[0]);
      }
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const resetSearch = () => {
    setSearchQuery('');
    setFoundWord(null);
  };

  return (
    <div className={styles.vocSide}>
      <div className={styles.content}>
        {(!foundWord || isDictionaryPage) ? (
          <>
            <h2 className={styles.title}>{title}</h2>
            <div className={styles.searchContainer}>
              <input
                type="text"
                className={styles.searchInput}
                placeholder="Введите слово..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={handleKeyPress}
              />
            </div>
            <button
              className={styles.searchButton}
              onClick={handleSearch}
              disabled={!searchQuery.trim()}
            >
              Поиск
            </button>
          </>
        ) : (
          <div className={styles.wordCard}>
            <button className={styles.backButton} onClick={resetSearch}>
              ← Назад
            </button>
            <h3 className={styles.word}>{foundWord.word}</h3>
            <div className={styles.wordType}>{foundWord.partOfSpeech}</div>
            <div className={styles.translation}>{foundWord.translation}</div>
            {foundWord.synonyms?.length > 0 && (
              <div className={styles.synonyms}>
                Синонимы: {foundWord.synonyms.join(', ')}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default VocSide;
