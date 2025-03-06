import materialsJson from './matireals.json';

export const materialsData = {
  levels: materialsJson.levels,
  content: materialsJson.content.map(material => ({
    ...material,
    description: material.description || 'Описание материала скоро появится'
  }))
};

export default materialsData;
