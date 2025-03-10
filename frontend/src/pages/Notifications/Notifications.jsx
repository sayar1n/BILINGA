import React from 'react';
import { useLocation } from 'react-router-dom';
import styles from './Notifications.module.scss';

const DictionaryPage = () => {
  const location = useLocation();
  const word = location.state?.word;

  return <div className={styles.dictionaryPage}>notifications</div>;
};

export default DictionaryPage;
