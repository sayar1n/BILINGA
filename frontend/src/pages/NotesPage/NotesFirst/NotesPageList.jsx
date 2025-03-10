import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { notesData, addNote } from '../../../data/notesUser/notesUser';
import styles from './NotesPageList.module.scss';

const NotesPageList = () => {
  const navigate = useNavigate();
  const [isCreating, setIsCreating] = useState(false);
  const [newNoteTitle, setNewNoteTitle] = useState('');

  const handleCreateNote = (e) => {
    e.preventDefault();
    if (newNoteTitle.trim()) {
      const newNote = addNote(newNoteTitle.trim());
      setNewNoteTitle('');
      setIsCreating(false);
      navigate(`/notes/${newNote.id}`);
    }
  };

  const handleNoteClick = (noteId) => {
    navigate(`/notes/${noteId}`);
  };

  const formatDate = (dateString) => {
    const options = { 
      day: 'numeric', 
      month: 'long', 
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString('ru-RU', options);
  };

  return (
    <div className={styles.notesContainer}>
      <div className={styles.notesList}>
        {notesData.notes.map((note) => (
          <div
            key={note.id}
            className={styles.noteItem}
            onClick={() => handleNoteClick(note.id)}
          >
            <h3 className={styles.noteTitle}>{note.title}</h3>
            <p className={styles.noteDate}>
              {formatDate(note.updatedAt || note.createdAt)}
            </p>
          </div>
        ))}
      </div>

      {!isCreating && (
        <button
          className={styles.createNoteButton}
          onClick={() => setIsCreating(true)}
        >
          + Создать заметку
        </button>
      )}

      {isCreating && (
        <form className={styles.createNoteForm} onSubmit={handleCreateNote}>
          <input
            type="text"
            className={styles.noteTitleInput}
            value={newNoteTitle}
            onChange={(e) => setNewNoteTitle(e.target.value)}
            placeholder="Название заметки"
            autoFocus
          />
          <div className={styles.formButtons}>
            <button
              type="button"
              className={styles.cancelButton}
              onClick={() => {
                setIsCreating(false);
                setNewNoteTitle('');
              }}
            >
              Отмена
            </button>
            <button
              type="submit"
              className={styles.submitButton}
              disabled={!newNoteTitle.trim()}
            >
              Создать
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default NotesPageList;
