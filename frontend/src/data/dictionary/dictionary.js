import dictionaryJson from './dictionary.json';

export const dictionaryData = {
  words: dictionaryJson.words
};

export const searchWord = (query) => {
  return dictionaryData.words.filter(word => 
    word.word.toLowerCase().includes(query.toLowerCase()) ||
    word.translation.toLowerCase().includes(query.toLowerCase())
  );
};

export default dictionaryData;
