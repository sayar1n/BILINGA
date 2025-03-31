import riddlesJson from './riddles.json';

export const riddlesData = riddlesJson.map((riddle) => ({
  ...riddle,
  translation: riddle.translation || 'Перевод загадки скоро появится',
}));

export default riddlesData;

// массив случайных ответов
export const randomAnswerOptions = [
  'Dog',
  'Oven',
  'Kettle',
  'Mouse',
  'Book',
  'Sun',
  'Moon',
  'Star',
  'Tree',
  'Window',
  'Car',
  'Phone',
  'Table',
  'Chair',
  'Coffee',
  'Spoon',
  'Fork',
  'Plate',
  'Cup',
  'Knife',
  'Pen',
  'Pencil',
  'Paper',
  'Board',
  'Lamp',
  'Pillow',
  'Blanket',
  'Clock',
  'Key',
  'Cat',
  'Water',
  'Radio',
  'Mirror',
  'Refrigerator',
  'Picture',
];
