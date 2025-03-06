import React from 'react';
import styles from './InfoSide.module.scss';

const InfoSide = ({ item, type }) => {
  // Если item не передан, показываем заглушку
  const defaultItem = {
    title: 'Выберите игру или материал',
    description: 'Нажмите на карточку, чтобы увидеть подробную информацию',
    image: 'https://via.placeholder.com/200x250'
  };

  const currentItem = item || defaultItem;
  const buttonText = type === 'materials' ? 'Читать сейчас' : 'Играть сейчас';

  return (
    <div className={styles.infoSide}>
      <div className={styles.content}>
        <div className={styles.imageContainer}>
          <img src={currentItem.image} alt={currentItem.title} className={styles.image} />
        </div>
        <div className={styles.info}>
          <h2 className={styles.title}>{currentItem.title}</h2>
          <p className={styles.description}>{currentItem.description}</p>
        </div>
        {item && ( // Показываем кнопку только если есть выбранный item
          <button className={styles.actionButton}>
            {buttonText} <span className={styles.arrow}>▶</span>
          </button>
        )}
      </div>
    </div>
  );
};

// Добавляем значения по умолчанию для props
InfoSide.defaultProps = {
  type: 'games'
};

export default InfoSide;
