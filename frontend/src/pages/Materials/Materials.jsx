import React, { useState, useEffect } from 'react';
import { useOutletContext, useSearchParams } from 'react-router-dom';
import Tags from '../../components/Tags/Tags';
import GameGrid from '../../components/GameGrid/GameGrid';
import GameSlider from '../../components/GameSlider/GameSlider';
import { materialsData } from '../../data/materials/matireals';
import styles from './Materials.module.scss';

const materialsCategories = ['Все', 'Книги', 'Статьи'];

const Materials = () => {
  const { onItemSelect } = useOutletContext();
  const [searchParams] = useSearchParams();

  const [currentFilter, setCurrentFilter] = useState({ 
    type: 'category', 
    value: 'Все',
    level: null
  });

  useEffect(() => {
    const initialFilter = searchParams.get('filter');
    setCurrentFilter(prev => ({
      ...prev,
      value: initialFilter && materialsCategories.includes(initialFilter) ? initialFilter : 'Все'
    }));
  }, [searchParams]);

  const handleFilterChange = (filter) => {
    setCurrentFilter(filter);
  };

  const getFilteredContent = () => {
    const filterByLevel = (materials) => {
      if (!currentFilter.level) return materials;
      return materials.filter(material => material.level === currentFilter.level);
    };

    const filterByType = (type) => {
      return materialsData.content.filter(material => material.materialType === type);
    };

    switch (currentFilter.value) {
      case 'Все':
        return {
          books: filterByLevel(filterByType('book')),
          articles: filterByLevel(filterByType('article'))
        };
      case 'Книги':
        return {
          books: filterByLevel(filterByType('book')),
          articles: []
        };
      case 'Статьи':
        return {
          books: [],
          articles: filterByLevel(filterByType('article'))
        };
      default:
        return {
          books: filterByLevel(filterByType('book')),
          articles: filterByLevel(filterByType('article'))
        };
    }
  };

  const filteredContent = getFilteredContent();
  const shouldUseGrid = currentFilter.value === 'Книги' || currentFilter.value === 'Статьи';

  return (
    <div className={styles.container}>
      <Tags 
        onFilterChange={handleFilterChange} 
        categories={materialsCategories}
        showLevelsFilter={true}
        levels={materialsData.levels}
        initialActiveTag={currentFilter.value}
      />
      {shouldUseGrid ? (
        <>
          {filteredContent.books?.length > 0 && (
            <GameGrid 
              title="Книги" 
              games={filteredContent.books}
              onItemSelect={onItemSelect}
            />
          )}
          {filteredContent.articles?.length > 0 && (
            <GameGrid 
              title="Статьи" 
              games={filteredContent.articles}
              onItemSelect={onItemSelect}
            />
          )}
        </>
      ) : (
        <>
          {filteredContent.books?.length > 0 && (
            <GameSlider 
              title="Книги" 
              games={filteredContent.books}
              onItemSelect={onItemSelect}
            />
          )}
          {filteredContent.articles?.length > 0 && (
            <GameSlider 
              title="Статьи" 
              games={filteredContent.articles}
              onItemSelect={onItemSelect}
            />
          )}
        </>
      )}
    </div>
  );
};

export default Materials; 