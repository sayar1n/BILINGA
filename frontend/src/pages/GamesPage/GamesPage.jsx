import React, { useState, useEffect } from 'react';
import { useOutletContext, useSearchParams, useNavigate } from 'react-router-dom';
import Tags from '../../components/Tags/Tags';
import GameSlider from '../../components/GameSlider/GameSlider';
import GameGrid from '../../components/GameGrid/GameGrid';
import { gamesData } from '../../data/games/games';
import styles from './GamesPage.module.scss';

const gamesCategories = ['Все', 'Соло', 'Дуо(Бот)'];

const GamesPage = () => {
  const { onItemSelect } = useOutletContext();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [currentFilter, setCurrentFilter] = useState({ 
    type: 'category', 
    value: 'Все',
    level: null
  });

  useEffect(() => {
    const initialFilter = searchParams.get('filter');
    setCurrentFilter(prev => ({
      ...prev,
      value: initialFilter && gamesCategories.includes(initialFilter) ? initialFilter : 'Все'
    }));
  }, [searchParams]);

  const handleFilterChange = (filter) => {
    setCurrentFilter(filter);
  };

  const handleGameSelect = (game) => {
    if (onItemSelect) {
      onItemSelect({
        ...game,
        onPlay: () => {
          if (game.gameRoute) {
            navigate(game.gameRoute);
          }
        }
      });
    }
  };

  const getFilteredContent = () => {
    const filterByLevel = (games) => {
      if (!currentFilter.level) return games;
      return games.filter(game => game.level === currentFilter.level);
    };

    switch (currentFilter.value) {
      case 'Все':
        return {
          solo: filterByLevel(gamesData.solo),
          duo: filterByLevel(gamesData.duo)
        };
      case 'Соло':
        return {
          solo: filterByLevel(gamesData.solo),
          duo: []
        };
      case 'Дуо(Бот)':
        return {
          solo: [],
          duo: filterByLevel(gamesData.duo)
        };
      default:
        return {
          solo: filterByLevel(gamesData.solo),
          duo: filterByLevel(gamesData.duo)
        };
    }
  };

  const filteredContent = getFilteredContent();
  const shouldUseGrid = currentFilter.value === 'Соло' || currentFilter.value === 'Дуо(Бот)';

  return (
    <div className={styles.container}>
      <Tags 
        onFilterChange={handleFilterChange} 
        categories={gamesCategories}
        showMaterialsFilter={false}
        initialActiveTag={currentFilter.value}
      />
      {shouldUseGrid ? (
        <>
          {filteredContent.solo?.length > 0 && (
            <GameGrid 
              title="Соло" 
              games={filteredContent.solo}
              onItemSelect={handleGameSelect}
            />
          )}
          {filteredContent.duo?.length > 0 && (
            <GameGrid 
              title="Дуо(Бот)" 
              games={filteredContent.duo}
              onItemSelect={handleGameSelect}
            />
          )}
        </>
      ) : (
        <>
          {filteredContent.solo?.length > 0 && (
            <GameSlider 
              title="Соло" 
              games={filteredContent.solo}
              onItemSelect={handleGameSelect}
            />
          )}
          {filteredContent.duo?.length > 0 && (
            <GameSlider 
              title="Дуо(Бот)" 
              games={filteredContent.duo}
              onItemSelect={handleGameSelect}
            />
          )}
        </>
      )}
    </div>
  );
};

export default GamesPage; 