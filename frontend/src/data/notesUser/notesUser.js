import notesJson from './notesUser.json';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

// Загрузка заметок из localStorage при инициализации
const loadNotesFromStorage = () => {
  const savedNotes = localStorage.getItem('userNotes');
  return savedNotes ? JSON.parse(savedNotes) : notesJson.notes;
};

export const notesData = {
  notes: loadNotesFromStorage()
};

// Сохранение заметок в localStorage
const saveNotesToStorage = () => {
  localStorage.setItem('userNotes', JSON.stringify(notesData.notes));
};

export const addNote = async (title) => {
  try {
    const response = await axios.post(`${API_URL}/api/notes`, { title });
    const newNote = response.data;
    notesData.notes.push(newNote);
    saveNotesToStorage();
    return newNote;
  } catch (error) {
    console.error('Error creating note:', error);
    // Fallback to local creation if API fails
    const newNote = {
      id: Date.now(), // Используем timestamp как временный id
      title,
      content: '',
      createdAt: new Date().toISOString()
    };
    notesData.notes.push(newNote);
    saveNotesToStorage();
    return newNote;
  }
};

export const updateNoteContent = async (id, content) => {
  try {
    const response = await axios.put(`${API_URL}/api/notes/${id}`, { content });
    const updatedNote = response.data;
    const note = notesData.notes.find(note => note.id === id);
    if (note) {
      note.content = content;
      note.updatedAt = new Date().toISOString();
      saveNotesToStorage();
    }
    return note;
  } catch (error) {
    console.error('Error updating note:', error);
    // Fallback to local update if API fails
    const note = notesData.notes.find(note => note.id === id);
    if (note) {
      note.content = content;
      note.updatedAt = new Date().toISOString();
      saveNotesToStorage();
    }
    return note;
  }
};

export const getNoteById = (id) => {
  return notesData.notes.find(note => note.id === id);
};

export const deleteNote = async (id) => {
  try {
    await axios.delete(`${API_URL}/api/notes/${id}`);
    const index = notesData.notes.findIndex(note => note.id === id);
    if (index !== -1) {
      notesData.notes.splice(index, 1);
      saveNotesToStorage();
      return true;
    }
    return false;
  } catch (error) {
    console.error('Error deleting note:', error);
    // Fallback to local deletion if API fails
    const index = notesData.notes.findIndex(note => note.id === id);
    if (index !== -1) {
      notesData.notes.splice(index, 1);
      saveNotesToStorage();
      return true;
    }
    return false;
  }
};

export default notesData;
