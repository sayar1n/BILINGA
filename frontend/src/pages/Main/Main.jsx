import React, { useState } from 'react';
import Tags from '../../components/Tags/Tags';
import GameSlider from '../../components/GameSlider/GameSlider';
import { gamesData } from '../../data/games';
import styles from './Main.module.scss';

const Main = () => {
  const [currentFilter, setCurrentFilter] = useState({ type: 'category', value: 'Все' });

  const handleFilterChange = (filter) => {
    setCurrentFilter(filter);
  };

  const getFilteredContent = () => {
    if (currentFilter.type === 'material') {
      if (currentFilter.value === 'all') {
        // Собираем все материалы из всех уровней
        const allMaterials = Object.values(gamesData.materials.content)
          .flat()
          .map(material => ({ ...material }));
        return {
          materials: allMaterials
        };
      }
      return {
        materials: gamesData.materials.content[currentFilter.value] || []
      };
    }

    const allGames = {
      solo: [...gamesData.solo],
      duo: [...gamesData.duo]
    };

    switch (currentFilter.value) {
      case 'Все':
        return allGames;
      case 'Игры(Все)':
        return allGames;
      case 'Соло':
        return {
          solo: gamesData.solo,
          duo: []
        };
      case 'Дуо(Бот)':
        return {
          solo: [],
          duo: gamesData.duo
        };
      default:
        return {
          solo: gamesData.solo.filter(game => game.tags.includes(currentFilter.value)),
          duo: gamesData.duo.filter(game => game.tags.includes(currentFilter.value))
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
        />
      ) : (
        <>
          {filteredContent.solo?.length > 0 && (
            <GameSlider title="Соло" games={filteredContent.solo} />
          )}
          {filteredContent.duo?.length > 0 && (
            <GameSlider title="Дуо(Бот)" games={filteredContent.duo} />
          )}
        </>
      )}
    </div>
  );
};

export default Main; 