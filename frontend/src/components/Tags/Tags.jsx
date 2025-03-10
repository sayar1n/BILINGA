import React, { useState, useEffect } from 'react';
import Tag from './Tag';
import styles from './Tags.module.scss';
import { gamesData } from '../../data/games/games';
import { materialsData } from '../../data/materials/matireals';

const Tags = ({ 
  onFilterChange, 
  categories = gamesData.categories, 
  showMaterialsFilter = true,
  initialActiveTag = 'Все'
}) => {
  const [activeTag, setActiveTag] = useState(initialActiveTag);
  const [showLevels, setShowLevels] = useState(false);
  const [showTypes, setShowTypes] = useState(false);
  const [currentCategory, setCurrentCategory] = useState(null);
  const [selectedType, setSelectedType] = useState(null);
  
  // Обновляем активный тег при изменении initialActiveTag
  useEffect(() => {
    setActiveTag(initialActiveTag);
    handleTagClick(initialActiveTag);
  }, [initialActiveTag]);

  // Храним уровни для каждой категории отдельно
  const [categoryLevels, setCategoryLevels] = useState(
    categories.reduce((acc, category) => {
      acc[category] = null;
      return acc;
    }, {})
  );

  const handleTagClick = (tag) => {
    setActiveTag(tag);
    if (tag === 'Материалы' && showMaterialsFilter) {
      setShowLevels(false);
      setShowTypes(false);
      setCategoryLevels(prev => ({ ...prev, [tag]: null }));
      setSelectedType(null);
      onFilterChange && onFilterChange({ type: 'material', value: 'все' });
    } else {
      setShowLevels(false);
      setShowTypes(false);
      onFilterChange && onFilterChange({ 
        type: 'category', 
        value: tag,
        level: categoryLevels[tag]
      });
    }
  };

  const handleExpandClick = (category) => {
    if (currentCategory === category) {
      if (category === 'Материалы' && showMaterialsFilter) {
        setShowLevels(!showLevels);
        setShowTypes(!showTypes);
      } else {
        setShowLevels(!showLevels);
        setShowTypes(false);
      }
    } else {
      if (category === 'Материалы' && showMaterialsFilter) {
        setShowLevels(true);
        setShowTypes(true);
      } else {
        setShowLevels(true);
        setShowTypes(false);
      }
    }
    setCurrentCategory(category);
  };

  const handleLevelClick = (level) => {
    setCategoryLevels(prev => ({
      ...prev,
      [currentCategory]: level
    }));

    if (currentCategory === 'Материалы' && showMaterialsFilter) {
      onFilterChange && onFilterChange({ 
        type: 'material', 
        value: level,
        materialType: selectedType 
      });
    } else {
      onFilterChange && onFilterChange({ 
        type: 'category', 
        value: currentCategory,
        level: level 
      });
    }
  };

  const handleTypeClick = (type) => {
    setSelectedType(type === selectedType ? null : type);
    if (currentCategory === 'Материалы' && showMaterialsFilter) {
      onFilterChange && onFilterChange({ 
        type: 'material', 
        value: categoryLevels[currentCategory],
        materialType: type === selectedType ? null : type
      });
    }
  };

  return (
    <div className={styles.tagsContainer}>
      <div className={styles.tags}>
        {categories.map((tag) => (
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
      
      {showMaterialsFilter && currentCategory === 'Материалы' && showTypes && (
        <div className={styles.types}>
          <button
            className={`${styles.typeTag} ${!selectedType ? styles.active : ''}`}
            onClick={() => handleTypeClick(null)}
          >
            Все
          </button>
          {materialsData.types.map((type) => (
            <button
              key={type}
              className={`${styles.typeTag} ${selectedType === type ? styles.active : ''}`}
              onClick={() => handleTypeClick(type)}
            >
              {type === 'book' ? 'Книга' : 'Статья'}
            </button>
          ))}
        </div>
      )}

      {showLevels && (
        <div className={styles.levels}>
          <button
            className={`${styles.levelTag} ${!categoryLevels[currentCategory] ? styles.active : ''}`}
            onClick={() => handleLevelClick(null)}
          >
            Все уровни
          </button>
          {(showMaterialsFilter && currentCategory === 'Материалы' ? materialsData.levels : gamesData.levels).map((level) => (
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