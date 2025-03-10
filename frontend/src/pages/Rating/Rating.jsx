import React from 'react';
import { useLocation } from 'react-router-dom';
import styles from './DictionaryPage.module.scss';

const DictionaryPage = () => {
  const location = useLocation();
  const word = location.state?.word;

  return <div className={styles.dictionaryPage}>rating</div>;
};

export default DictionaryPage;
