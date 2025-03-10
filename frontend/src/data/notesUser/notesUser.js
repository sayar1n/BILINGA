import notesJson from './notesUser.json';

export const notesData = {
  notes: notesJson.notes
};

export const addNote = (title) => {
  const newNote = {
    id: notesData.notes.length + 1,
    title,
    content: '',
    createdAt: new Date().toISOString()
  };
  notesData.notes.push(newNote);
  return newNote;
};

export const updateNoteContent = (id, content) => {
  const note = notesData.notes.find(note => note.id === id);
  if (note) {
    note.content = content;
    note.updatedAt = new Date().toISOString();
  }
  return note;
};

export const getNoteById = (id) => {
  return notesData.notes.find(note => note.id === id);
};

export default notesData;
