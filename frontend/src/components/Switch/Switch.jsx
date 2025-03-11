import React from 'react';
import styles from './Switch.module.scss';

const Switch = ({ checked, onChange, label }) => {
  return (
    <div className={styles.switchContainer}>
      <label className={styles.toggleSwitch}>
        <input type='checkbox' checked={checked} onChange={onChange} />
        <span className={styles.toggleSlider}></span>
      </label>
      {label && <span className={styles.switchLabel}>{label}</span>}
    </div>
  );
};

export default Switch;
