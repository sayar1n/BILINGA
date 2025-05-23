import React from 'react';
import styles from './ProgressBar.module.scss';

const ProgressBar = ({ level, percent, color }) => {
  return (
    <div className={styles.progressBarContainer}>
      <div className={styles.progressBar}>
        <div
          className={styles.progressFill}
          style={{
            width: `${percent}%`,
            backgroundColor: color || 'var(--color-progressbar)',
          }}
        />
      </div>
      <div className={styles.progressLabel}>
        <span>{level}</span>
        <span>{percent}%</span>
      </div>
    </div>
  );
};

export default ProgressBar;
