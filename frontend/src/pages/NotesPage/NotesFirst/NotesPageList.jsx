import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { notesData, addNote, deleteNote } from '../../../data/notesUser/notesUser';
import styles from './NotesPageList.module.scss';

const NotesPageList = () => {
  const navigate = useNavigate();
  const [isCreating, setIsCreating] = useState(false);
  const [newNoteTitle, setNewNoteTitle] = useState('');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [noteToDelete, setNoteToDelete] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleCreateNote = async (e) => {
    e.preventDefault();
    if (newNoteTitle.trim()) {
      setIsLoading(true);
      setError(null);
      try {
        const newNote = await addNote(newNoteTitle.trim());
        setNewNoteTitle('');
        setIsCreating(false);
        navigate(`/notes/${newNote.id}`);
      } catch (err) {
        setError('Не удалось создать заметку. Пожалуйста, попробуйте снова.');
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleNoteClick = (noteId) => {
    navigate(`/notes/${noteId}`);
  };

  const handleDeleteClick = (e, note) => {
    e.stopPropagation();
    setNoteToDelete(note);
    setShowDeleteConfirm(true);
  };

  const handleDeleteConfirm = async () => {
    if (noteToDelete) {
      setIsLoading(true);
      setError(null);
      try {
        const success = await deleteNote(noteToDelete.id);
        if (success) {
          setShowDeleteConfirm(false);
          setNoteToDelete(null);
        } else {
          setError('Не удалось удалить заметку. Пожалуйста, попробуйте снова.');
        }
      } catch (err) {
        setError('Произошла ошибка при удалении заметки.');
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleDeleteCancel = () => {
    setShowDeleteConfirm(false);
    setNoteToDelete(null);
    setError(null);
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
      {error && (
        <div className={styles.errorMessage}>
          {error}
        </div>
      )}

      <div className={styles.notesList}>
        {notesData.notes.map((note) => (
          <div
            key={note.id}
            className={styles.noteItem}
            onClick={() => handleNoteClick(note.id)}
          >
            <div className={styles.noteContent}>
              <h3 className={styles.noteTitle}>{note.title}</h3>
              <p className={styles.noteDate}>
                {formatDate(note.updatedAt || note.createdAt)}
              </p>
            </div>
            <button 
              className={styles.deleteButton}
              onClick={(e) => handleDeleteClick(e, note)}
              disabled={isLoading}
            >
              {isLoading && noteToDelete?.id === note.id ? 'Удаление...' : 'Удалить'}
            </button>
          </div>
        ))}
      </div>

      {!isCreating && (
        <button
          className={styles.createNoteButton}
          onClick={() => setIsCreating(true)}
          disabled={isLoading}
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
            disabled={isLoading}
          />
          <div className={styles.formButtons}>
            <button
              type="button"
              className={styles.cancelButton}
              onClick={() => {
                setIsCreating(false);
                setNewNoteTitle('');
                setError(null);
              }}
              disabled={isLoading}
            >
              Отмена
            </button>
            <button
              type="submit"
              className={styles.submitButton}
              disabled={!newNoteTitle.trim() || isLoading}
            >
              {isLoading ? 'Создание...' : 'Создать'}
            </button>
          </div>
        </form>
      )}

      {showDeleteConfirm && noteToDelete && (
        <div className={styles.deleteConfirmOverlay}>
          <div className={styles.deleteConfirmModal}>
            <h3>Удалить заметку?</h3>
            <p>Вы уверены, что хотите удалить заметку "{noteToDelete.title}"? Это действие нельзя отменить.</p>
            {error && <p className={styles.errorText}>{error}</p>}
            <div className={styles.deleteConfirmButtons}>
              <button 
                className={styles.cancelButton} 
                onClick={handleDeleteCancel}
                disabled={isLoading}
              >
                Отмена
              </button>
              <button 
                className={styles.confirmButton} 
                onClick={handleDeleteConfirm}
                disabled={isLoading}
              >
                {isLoading ? 'Удаление...' : 'Удалить'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotesPageList;
