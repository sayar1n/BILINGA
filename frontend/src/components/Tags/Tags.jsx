import React, { useState } from 'react';
import Tag from './Tag';
import styles from './Tags.module.scss';
import { gamesData } from '../../data/games';

const Tags = ({ onFilterChange }) => {
  const [activeTag, setActiveTag] = useState('Все');
  const [showLevels, setShowLevels] = useState(false);
  const [activeLevel, setActiveLevel] = useState(null);

  const handleTagClick = (tag) => {
    setActiveTag(tag);
    if (tag === 'Материалы') {
      setShowLevels(false);
      setActiveLevel(null);
      onFilterChange && onFilterChange({ type: 'material', value: 'все' });
    } else {
      setShowLevels(false);
      setActiveLevel(null);
      onFilterChange && onFilterChange({ type: 'category', value: tag });
    }
  };

  const handleExpandClick = () => {
    setShowLevels(!showLevels);
  };

  const handleLevelClick = (level) => {
    setActiveLevel(level);
    onFilterChange && onFilterChange({ type: 'material', value: level });
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
            isExpandable={tag === 'Материалы'}
            expanded={showLevels}
            onExpandClick={tag === 'Материалы' ? handleExpandClick : undefined}
          />
        ))}
      </div>
      {showLevels && (
        <div className={styles.levels}>
          {gamesData.materials.levels.map((level) => (
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