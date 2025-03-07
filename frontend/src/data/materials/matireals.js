import materialsJson from './matireals.json';

export const materialsData = {
  levels: materialsJson.levels,
  types: materialsJson.types,
  content: materialsJson.content.map(material => ({
    ...material,
    description: material.description || 'Описание материала скоро появится'
  }))
};

export const filterMaterials = (materials, filters) => {
  return materials.filter(material => {
    const levelMatch = !filters.level || material.level === filters.level;
    const typeMatch = !filters.materialType || material.materialType === filters.materialType;
    return levelMatch && typeMatch;
  });
};

export default materialsData;
