import React, { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from '../SideBar/SideBar';
import Header from '../Header/Header';
import InfoSide from '../InfoSide/InfoSide';
import VocSide from '../VocSide/VocSide';
import styles from './MainFrameLearning.module.scss';

const MainFrame = () => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedType, setSelectedType] = useState('games');
  const location = useLocation();

  const handleItemSelect = (item, type) => {
    setSelectedItem(item);
    setSelectedType(type);
  };

  const isNotesOrDictionary = location.pathname.startsWith('/notes') || location.pathname.startsWith('/dictionary');

  return (
    <div className={styles.mainFrame}>
      <Sidebar />
      <div className={styles.mainContent}>
        <Header />
        <div className={styles.contentWrapper}>
          <div className={styles.contentContainer}>
            <Outlet context={{ onItemSelect: handleItemSelect }} />
          </div>
        </div>
      </div>
      {isNotesOrDictionary ? (
        <VocSide />
      ) : (
        <InfoSide item={selectedItem} type={selectedType} />
      )}
    </div>
  );
};

export default MainFrame;
