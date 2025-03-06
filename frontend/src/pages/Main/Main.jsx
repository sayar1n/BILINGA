import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import Tags from '../../components/Tags/Tags';
import GameSlider from '../../components/GameSlider/GameSlider';
import { gamesData } from '../../data/games/games';
import { materialsData } from '../../data/materials/matireals';
import styles from './Main.module.scss';

const Main = () => {
  const { onItemSelect } = useOutletContext();

  const [currentFilter, setCurrentFilter] = useState({ 
    type: 'category', 
    value: 'Все',
    level: null 
  });

  const handleFilterChange = (filter) => {
    setCurrentFilter(filter);
  };

  const getFilteredContent = () => {
    if (currentFilter.type === 'material') {
      if (currentFilter.value === 'все') {
        return {
          materials: materialsData.content,
          solo: [],
          duo: []
        };
      }
      return {
        materials: materialsData.content.filter(material => material.level === currentFilter.value),
        solo: [],
        duo: []
      };
    }

    const filterByLevel = (games) => {
      if (!currentFilter.level) return games;
      return games.filter(game => game.level === currentFilter.level);
    };

    switch (currentFilter.value) {
      case 'Все':
        return {
          solo: filterByLevel(gamesData.solo),
          duo: filterByLevel(gamesData.duo),
          materials: currentFilter.level ? 
            materialsData.content.filter(material => material.level === currentFilter.level) :
            materialsData.content
        };
      case 'Игры(Все)':
        return {
          solo: filterByLevel(gamesData.solo),
          duo: filterByLevel(gamesData.duo),
          materials: []
        };
      case 'Соло':
        return {
          solo: filterByLevel(gamesData.solo),
          duo: [],
          materials: []
        };
      case 'Дуо(Бот)':
        return {
          solo: [],
          duo: filterByLevel(gamesData.duo),
          materials: []
        };
      case 'Материалы':
        return {
          solo: [],
          duo: [],
          materials: currentFilter.level ? 
            materialsData.content.filter(material => material.level === currentFilter.level) :
            materialsData.content
        };
      default:
        return {
          solo: filterByLevel(gamesData.solo.filter(game => game.tags.includes(currentFilter.value))),
          duo: filterByLevel(gamesData.duo.filter(game => game.tags.includes(currentFilter.value))),
          materials: []
        };
    }
  };

  const filteredContent = getFilteredContent();

  return (
    <div className={styles.container}>
      <Tags onFilterChange={handleFilterChange} />
      {currentFilter.type === 'material' ? (
        <GameSlider 
          title={`Материалы ${currentFilter.value}`} 
          games={filteredContent.materials}
          onItemSelect={onItemSelect}
        />
      ) : (
        <>
          {filteredContent.solo?.length > 0 && (
            <GameSlider 
              title="Соло" 
              games={filteredContent.solo}
              onItemSelect={onItemSelect}
            />
          )}
          {filteredContent.duo?.length > 0 && (
            <GameSlider 
              title="Дуо(Бот)" 
              games={filteredContent.duo}
              onItemSelect={onItemSelect}
            />
          )}
          {filteredContent.materials?.length > 0 && (
            <GameSlider 
              title="Материалы" 
              games={filteredContent.materials}
              onItemSelect={onItemSelect}
            />
          )}
        </>
      )}
    </div>
  );
};

export default Main; 