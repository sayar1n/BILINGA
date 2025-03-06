import React, { useState } from 'react';
import Tag from './Tag';
import styles from './Tags.module.scss';
import { gamesData } from '../../data/games/games';
import { materialsData } from '../../data/materials/matireals';

const Tags = ({ onFilterChange }) => {
  const [activeTag, setActiveTag] = useState('Все');
  const [showLevels, setShowLevels] = useState(false);
  const [currentCategory, setCurrentCategory] = useState(null);
  // Храним уровни для каждой категории отдельно
  const [categoryLevels, setCategoryLevels] = useState({
    'Все': null,
    'Игры(Все)': null,
    'Соло': null,
    'Дуо(Бот)': null,
    'Материалы': null
  });

  const handleTagClick = (tag) => {
    setActiveTag(tag);
    if (tag === 'Материалы') {
      setShowLevels(false);
      setCategoryLevels(prev => ({ ...prev, [tag]: null }));
      onFilterChange && onFilterChange({ type: 'material', value: 'все' });
    } else {
      setShowLevels(false);
      onFilterChange && onFilterChange({ 
        type: 'category', 
        value: tag,
        level: categoryLevels[tag]
      });
    }
  };

  const handleExpandClick = (category) => {
    if (currentCategory === category) {
      setShowLevels(prev => !prev);
    } else {
      setShowLevels(true);
    }
    setCurrentCategory(category);
  };

  const handleLevelClick = (level) => {
    // Сохраняем выбранный уровень для текущей категории
    setCategoryLevels(prev => ({
      ...prev,
      [currentCategory]: level
    }));

    if (currentCategory === 'Материалы') {
      onFilterChange && onFilterChange({ type: 'material', value: level });
    } else {
      onFilterChange && onFilterChange({ 
        type: 'category', 
        value: currentCategory,
        level: level 
      });
    }
  };

  return (
    <div className={styles.tagsContainer}>
      <div className={styles.tags}>
        {gamesData.categories.map((tag) => (
          <Tag
            key={tag}
            label={tag}
            active={activeTag === tag}
            onClick={() => handleTagClick(tag)}
            isExpandable={true}
            expanded={showLevels && currentCategory === tag}
            onExpandClick={() => handleExpandClick(tag)}
          />
        ))}
      </div>
      <h1 className={styles.mainTitle}>Игры</h1>
      {showLevels && (
        <div className={styles.levels}>
          {materialsData.levels.map((level) => (
            <button
              key={level}
              className={`${styles.levelTag} ${categoryLevels[currentCategory] === level ? styles.active : ''}`}
              onClick={() => handleLevelClick(level)}
            >
              {level}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default Tags; 