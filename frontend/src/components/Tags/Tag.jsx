import React from 'react';
import styles from './Tags.module.scss';

const Tag = ({ label, active, onClick, isExpandable, expanded, onExpandClick }) => {
  const handleExpandClick = (e) => {
    e.stopPropagation(); // Предотвращаем всплытие события
    onExpandClick && onExpandClick();
  };

  return (
    <button 
      className={`${styles.tag} ${active ? styles.active : ''}`}
      onClick={onClick}
    >
      <span className={styles.label}>{label}</span>
      {isExpandable && (
        <span 
          className={`${styles.arrow} ${expanded ? styles.expanded : ''}`}
          onClick={handleExpandClick}
        >
          ▼
        </span>
      )}
    </button>
  );
};

export default Tag;
