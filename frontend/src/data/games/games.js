import gamesJson from './games.json';

export const gamesData = {
  categories: gamesJson.categories,
  levels: gamesJson.levels,
  solo: gamesJson.solo.map(game => ({
    ...game,
    description: game.description || 'Описание игры скоро появится'
  })),
  duo: gamesJson.duo.map(game => ({
    ...game,
    description: game.description || 'Описание игры скоро появится'
  }))
};

export default gamesData; 