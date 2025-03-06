import React, { useState } from 'react';
import Tag from './Tag';
import styles from './Tags.module.scss';
import { gamesData } from '../../data/games/games';
import { materialsData } from '../../data/materials/matireals';

const Tags = ({ onFilterChange }) => {
  const [activeTag, setActiveTag] = useState('Все');
  const [showLevels, setShowLevels] = useState(false);
  const [activeLevel, setActiveLevel] = useState(null);
  const [currentCategory, setCurrentCategory] = useState(null);

  const handleTagClick = (tag) => {
    setActiveTag(tag);
    if (tag === 'Материалы') {
      setShowLevels(false);
      setActiveLevel(null);
      onFilterChange && onFilterChange({ type: 'material', value: 'все' });
    } else {
      setShowLevels(false);
      setActiveLevel(null);
      onFilterChange && onFilterChange({ 
        type: 'category', 
        value: tag,
        level: null 
      });
    }
  };

  const handleExpandClick = (category) => {
    setCurrentCategory(category);
    setShowLevels(prev => !prev);
  };

  const handleLevelClick = (level) => {
    setActiveLevel(level);
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
      <h1 className={styles.mainTitle}>Игры</h1>
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
      {showLevels && (
        <div className={styles.levels}>
          {materialsData.levels.map((level) => (
            <button
              key={level}
              className={`${styles.levelTag} ${activeLevel === level ? styles.active : ''}`}
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