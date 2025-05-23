export const wordSets = {
  sets: [
    {
      id: 1,
      title: "Ударения ЭФБО-05-23",
      author: {
        name: "Мамаева Карина Уллубиевна",
        role: "Учитель",
        avatar: "/avatars/teacher1.jpg"
      },
      terms: 1,
      words: [
        {
          id: 1,
          english: "beautiful",
          transcription: "[ˈbjuːtɪfʊl]",
          russian: "красивый",
          hint: "Представьте бьющийся фонтан - он красивый и грациозный"
        },
        {
          id: 2,
          english: "happiness",
          transcription: "[ˈhæpɪnəs]",
          russian: "счастье",
          hint: "Хэппи-энд в фильме всегда приносит счастье"
        },
        {
          id: 3,
          english: "knowledge",
          transcription: "[ˈnɒlɪdʒ]",
          russian: "знание",
          hint: "Когда учишь новое - это как нож режет незнание"
        }
      ]
    }
  ]
};

export const getSavedSets = () => {
  const savedSets = localStorage.getItem('wordSets');
  return savedSets ? JSON.parse(savedSets) : wordSets.sets;
};

export const saveSet = (newSet) => {
  const currentSets = getSavedSets();
  const updatedSets = [...currentSets, { ...newSet, id: Date.now() }];
  localStorage.setItem('wordSets', JSON.stringify(updatedSets));
  return updatedSets;
};

export default wordSets;
