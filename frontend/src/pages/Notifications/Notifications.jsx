import React, { useState } from 'react';
import Switch from '../../components/Switch/Switch';
import styles from './Notifications.module.scss';

// SVG иконки
const icons = {
  telegram: (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      x='0px'
      y='0px'
      width='100'
      height='100'
      viewBox='0,0,256,256'
    >
      <g
        fill='#ffffff'
        fill-rule='nonzero'
        stroke='none'
        stroke-width='1'
        stroke-linecap='butt'
        stroke-linejoin='miter'
        stroke-miterlimit='10'
        stroke-dasharray=''
        stroke-dashoffset='0'
        font-family='none'
        font-weight='none'
        font-size='none'
        text-anchor='none'
      >
        <g transform='scale(5.33333,5.33333)'>
          <path d='M5.83,23.616c12.568,-5.529 28.832,-12.27 31.077,-13.203c5.889,-2.442 7.696,-1.974 6.795,3.434c-0.647,3.887 -2.514,16.756 -4.002,24.766c-0.883,4.75 -2.864,5.313 -5.979,3.258c-1.498,-0.989 -9.059,-5.989 -10.7,-7.163c-1.498,-1.07 -3.564,-2.357 -0.973,-4.892c0.922,-0.903 6.966,-6.674 11.675,-11.166c0.617,-0.59 -0.158,-1.559 -0.87,-1.086c-6.347,4.209 -15.147,10.051 -16.267,10.812c-1.692,1.149 -3.317,1.676 -6.234,0.838c-2.204,-0.633 -4.357,-1.388 -5.195,-1.676c-3.227,-1.108 -2.461,-2.543 0.673,-3.922z'></path>
        </g>
      </g>
    </svg>
  ),
  key: (
    <svg
      width='13'
      height='13'
      viewBox='0 0 13 13'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M1 12H12M1 12V9.17696L6.5 3.53089M1 12L3.75 12L9.24999 6.35392M6.5 3.53089L8.47218 1.50631L8.47337 1.50511C8.74485 1.22642 8.88083 1.08683 9.03758 1.03454C9.17566 0.988486 9.32441 0.988486 9.46249 1.03454C9.61913 1.08679 9.75496 1.22622 10.0261 1.50452L11.2222 2.7324C11.4944 3.01189 11.6306 3.1517 11.6816 3.31285C11.7265 3.45459 11.7265 3.60728 11.6816 3.74903C11.6306 3.91006 11.4941 4.05026 11.2222 4.32935L9.24999 6.35392M6.5 3.53089L9.24999 6.35392'
        stroke='#6C6C6C'
        stroke-linecap='round'
        stroke-linejoin='round'
      />
    </svg>
  ),
  logout: (
    <svg
      width='13'
      height='13'
      viewBox='0 0 13 13'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M6.5 8.5625L8.5625 6.5M8.5625 6.5L6.5 4.4375M8.5625 6.5H1M4.4375 3.2334V3.20013C4.4375 2.43006 4.4375 2.04474 4.58737 1.75061C4.71919 1.49189 4.92939 1.28169 5.18811 1.14987C5.48224 1 5.86756 1 6.63763 1H9.80013C10.5702 1 10.9547 1 11.2488 1.14987C11.5076 1.28169 11.7185 1.49189 11.8503 1.75061C12 2.04445 12 2.42931 12 3.19788V9.80246C12 10.571 12 10.9553 11.8503 11.2492C11.7185 11.5079 11.5076 11.7185 11.2488 11.8503C10.955 12 10.5707 12 9.80212 12H6.63538C5.86681 12 5.48195 12 5.18811 11.8503C4.92939 11.7185 4.71919 11.5077 4.58737 11.249C4.4375 10.9548 4.4375 10.5701 4.4375 9.8V9.76562'
        stroke='#6C6C6C'
        stroke-linecap='round'
        stroke-linejoin='round'
      />
    </svg>
  ),
  info: (
    <svg
      width='20'
      height='20'
      viewBox='0 0 20 20'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M10 9V14M10 19C5.02944 19 1 14.9706 1 10C1 5.02944 5.02944 1 10 1C14.9706 1 19 5.02944 19 10C19 14.9706 14.9706 19 10 19ZM10.0498 6V6.1L9.9502 6.1002V6H10.0498Z'
        stroke='#1E3758'
        stroke-width='2'
        stroke-linecap='round'
        stroke-linejoin='round'
      />
    </svg>
  ),
};

const Notifications = () => {
  // Состояние для переключателей
  const [telegramConnected, setTelegramConnected] = useState(true);
  const [firstNotificationEnabled, setFirstNotificationEnabled] =
    useState(true);
  const [secondNotificationEnabled, setSecondNotificationEnabled] =
    useState(false);
  const [recentActivityNotifications, setRecentActivityNotifications] =
    useState(true);
  const [appUpdateNotifications, setAppUpdateNotifications] = useState(true);

  // Обработчик для кнопки "Сохранить изменения"
  const handleSaveChanges = () => {
    console.log('Сохранены настройки уведомлений:', {
      telegramConnected,
      firstNotificationEnabled,
      secondNotificationEnabled,
      recentActivityNotifications,
      appUpdateNotifications
    });
  };

  return (
    <div className={styles.notificationsContainer}>
      <div className={styles.blueHeader}></div>

      <div className={styles.contentWrapper}>
        {/* Информационное сообщение */}
        <div className={styles.infoMessage} style={{ display: telegramConnected ? 'none' : 'flex' }}>
          <span className={styles.infoIcon}>{icons.info}</span>
          <span>
            Подключите нашего AI Telegram-бота чтобы получать уведомления!
          </span>
        </div>

        {/* Блок подключения к Telegram */}
        <div className={styles.notificationBlock}>
          <div className={styles.blockHeader}>
            <h2 className={styles.blockTitle}>Подключение к Telegram-боту</h2>
            <div className={styles.connectedTag} style={{ display: telegramConnected ? 'block' : 'none' }}>
              Подключено
            </div>
          </div>

          <div className={styles.notificationSettings}>
            <div className={styles.settingColumn}>
              <div className={styles.settingRow}>
                <div className={styles.settingControl}>
                  <Switch
                    checked={firstNotificationEnabled}
                    onChange={() =>
                      setFirstNotificationEnabled(!firstNotificationEnabled)
                    }
                    label={'Время первой рассылки'}
                  />
                  <span className={styles.timeValue}>
                    12:00
                    <svg
                      width='17'
                      height='17'
                      viewBox='0 0 17 17'
                      fill='none'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <path
                        d='M8.5 4.33333V8.5H12.6667M8.5 16C4.35786 16 1 12.6421 1 8.5C1 4.35786 4.35786 1 8.5 1C12.6421 1 16 4.35786 16 8.5C16 12.6421 12.6421 16 8.5 16Z'
                        stroke='#222222'
                        stroke-linecap='round'
                        stroke-linejoin='round'
                      />
                    </svg>
                  </span>
                </div>
              </div>
              <div className={styles.settingRow}>
                <div className={styles.settingControl}>
                  <Switch
                    checked={secondNotificationEnabled}
                    onChange={() =>
                      setSecondNotificationEnabled(!secondNotificationEnabled)
                    }
                    label={'Время второй рассылки'}
                  />
                  <span className={styles.timeValue}>
                    18:00
                    <svg
                      width='17'
                      height='17'
                      viewBox='0 0 17 17'
                      fill='none'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <path
                        d='M8.5 4.33333V8.5H12.6667M8.5 16C4.35786 16 1 12.6421 1 8.5C1 4.35786 4.35786 1 8.5 1C12.6421 1 16 4.35786 16 8.5C16 12.6421 12.6421 16 8.5 16Z'
                        stroke='#222222'
                        stroke-linecap='round'
                        stroke-linejoin='round'
                      />
                    </svg>
                  </span>
                </div>
              </div>
              <button className={styles.saveButton} onClick={handleSaveChanges}>
                Сохранить изменения
              </button>
            </div>

            <div className={styles.telegramLoginInput}>
              <div className={styles.inputLabel}>
                <span className={styles.telegramIcon}>{icons.telegram}</span>
                <span className={styles.labelText}>Введите логин Telegram</span>
              </div>
              <input
                type='text'
                className={styles.telegramInput}
                placeholder=''
              />
            </div>
          </div>
        </div>

        {/* Блок информации о входе */}
        <div className={styles.notificationBlockLastLogin}>
          <div>
            <h2 className={styles.blockTitle}>Совершён вход</h2>
            <p className={styles.loginInfo}>
              Пользователь Alex произвел(а) вход в систему 13.01.2024 в 18:00.
            </p>
          </div>
          <div className={styles.actionButtonsLastLogin}>
            <button className={styles.actionButton}>
              <span className={styles.keyIcon}>{icons.key}</span>Сменить пароль
            </button>
            <button className={styles.actionButton}>
              <span className={styles.logoutIcon}>{icons.logout}</span>Выйти из
              аккаунта
            </button>
          </div>
        </div>

        {/* Блок уведомлений о действиях */}
        <div className={styles.notificationBlock}>
          <div className={styles.blockHeaderColumn}>
            <h2 className={styles.blockTitle}>
              Уведомления о преодолении или недавних действиях
            </h2>
            <Switch
              checked={recentActivityNotifications}
              onChange={() =>
                setRecentActivityNotifications(!recentActivityNotifications)
              }
              label={'Отображать уведомления'}
            />
          </div>
        </div>

        {/* Блок уведомлений об обновлении */}
        <div className={styles.notificationBlock}>
          <div className={styles.blockHeaderColumn}>
            <h2 className={styles.blockTitle}>
              Уведомления об обновлении в приложении
            </h2>
            <Switch
              checked={appUpdateNotifications}
              onChange={() =>
                setAppUpdateNotifications(!appUpdateNotifications)
              }
              label={'Отображать уведомления'}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notifications;
