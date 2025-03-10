import React from 'react';
import styles from './Blob.module.scss';

const Blob = ({ index }) => {
  return <div className={`${styles.blob} ${styles[`blob${index}`]}`}></div>;
};

export default Blob;