import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getNoteById, updateNoteContent } from '../../../data/notesUser/notesUser';
import styles from './NotesPage.module.scss';

const NotesPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [note, setNote] = useState(null);
  const [content, setContent] = useState('');

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
      </div>
      <textarea
        className={styles.editor}
        value={content}
        onChange={handleContentChange}
        placeholder="Начните писать..."
        autoFocus
      />
    </div>
  );
};

export default NotesPage;
