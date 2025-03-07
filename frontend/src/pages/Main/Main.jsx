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
    level: null,
    materialType: null
  });

  const handleFilterChange = (filter) => {
    // Сохраняем предыдущий materialType если он не указан в новом фильтре
    const newFilter = {
      ...filter,
      materialType: filter.materialType !== undefined ? filter.materialType : currentFilter.materialType
    };
    setCurrentFilter(newFilter);
  };

  const getFilteredContent = () => {
    if (currentFilter.type === 'material') {
      let filteredMaterials = materialsData.content;

      // Фильтрация по уровню
      if (currentFilter.value && currentFilter.value !== 'все') {
        filteredMaterials = filteredMaterials.filter(material => 
          material.level === currentFilter.value
        );
      }

      // Фильтрация по типу материала (книга/статья)
      if (currentFilter.materialType) {
        filteredMaterials = filteredMaterials.filter(material => 
          material.materialType === currentFilter.materialType
        );
      }

      return {
        materials: filteredMaterials,
        solo: [],
        duo: []
      };
    }

    const filterByLevel = (games) => {
      if (!currentFilter.level) return games;
      return games.filter(game => game.level === currentFilter.level);
    };

    const filterMaterialsByType = (materials) => {
      if (!currentFilter.materialType) return materials;
      return materials.filter(material => 
        material.materialType === currentFilter.materialType
      );
    };

    switch (currentFilter.value) {
      case 'Все':
        return {
          solo: filterByLevel(gamesData.solo),
          duo: filterByLevel(gamesData.duo),
          materials: filterMaterialsByType(
            currentFilter.level ? 
              materialsData.content.filter(material => material.level === currentFilter.level) :
              materialsData.content
          )
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
        let materials = materialsData.content;
        if (currentFilter.level) {
          materials = materials.filter(material => material.level === currentFilter.level);
        }
        if (currentFilter.materialType) {
          materials = materials.filter(material => material.materialType === currentFilter.materialType);
        }
        return {
          solo: [],
          duo: [],
          materials: materials
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

  const getTitle = () => {
    let title = 'Материалы';
    if (currentFilter.value && currentFilter.value !== 'все') {
      title += ` ${currentFilter.value}`;
    }
    if (currentFilter.materialType) {
      title += ` (${currentFilter.materialType === 'book' ? 'Книги' : 'Статьи'})`;
    }
    return title;
  };

  return (
    <div className={styles.container}>
      <Tags onFilterChange={handleFilterChange} />
      {currentFilter.type === 'material' ? (
        <GameSlider 
          title={getTitle()}
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
              title={getTitle()}
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