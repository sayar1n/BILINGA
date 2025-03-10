import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import SideBarSet from '../SideBarSet/SideBarSet';
import Header from '../Header/Header';
import styles from './MainFrameSet.module.scss';

const MainFrameSet = () => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedType, setSelectedType] = useState('games');

  const handleItemSelect = (item, type) => {
    setSelectedItem(item);
    setSelectedType(type);
  };

  return (
    <div className={styles.mainFrame}>
      <SideBarSet />
      <div className={styles.mainContent}>
        <Header />
        <div className={styles.contentWrapper}>
          <div className={styles.contentContainer}>
            <Outlet context={{ onItemSelect: handleItemSelect }} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainFrameSet;
