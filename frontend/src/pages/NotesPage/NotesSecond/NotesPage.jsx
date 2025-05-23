import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getNoteById, updateNoteContent, deleteNote } from '../../../data/notesUser/notesUser';
import styles from './NotesPage.module.scss';


const NotesPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [note, setNote] = useState(null);
  const [content, setContent] = useState('');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  useEffect(() => {
    const noteData = getNoteById(Number(id));
    if (noteData) {
      setNote(noteData);
      setContent(noteData.content);
    }
  }, [id]);

  const handleContentChange = (e) => {
    const newContent = e.target.value;
    setContent(newContent);
    updateNoteContent(Number(id), newContent);
  };

  const handleBack = () => {
    navigate('/notes');
  };

  const handleDeleteClick = () => {
    setShowDeleteConfirm(true);
  };

  const handleDeleteConfirm = () => {
    const deleted = deleteNote(Number(id));
    if (deleted) {
      navigate('/notes');
    }
  };

  const handleDeleteCancel = () => {
    setShowDeleteConfirm(false);
  };

  if (!note) {
    return <div>Заметка не найдена</div>;
  }

  return (
    <div className={styles.notesPage}>
      <div className={styles.header}>
        <button className={styles.backButton} onClick={handleBack}>
          ← Назад
        </button>
        <h1 className={styles.title}>{note.title}</h1>
        <button className={styles.deleteButton} onClick={handleDeleteClick}>
          Удалить
        </button>
      </div>
      <textarea
        className={styles.editor}
        value={content}
        onChange={handleContentChange}
        placeholder="Начните писать..."
        autoFocus
      />

      {showDeleteConfirm && (
        <div className={styles.deleteConfirmOverlay}>
          <div className={styles.deleteConfirmModal}>
            <h3>Удалить заметку?</h3>
            <p>Вы уверены, что хотите удалить заметку "{note.title}"? Это действие нельзя отменить.</p>
            <div className={styles.deleteConfirmButtons}>
              <button className={styles.cancelButton} onClick={handleDeleteCancel}>
                Отмена
              </button>
              <button className={styles.confirmButton} onClick={handleDeleteConfirm}>
                Удалить
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotesPage;
