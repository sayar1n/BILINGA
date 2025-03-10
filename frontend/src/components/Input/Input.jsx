import React from 'react';
import styles from './Input.module.scss';

const Input = ({
  id,
  label,
  type = 'text',
  placeholder,
  value,
  onChange,
  icon,
  isPassword = false,
  showPassword,
  toggleShowPassword,
}) => {
  return (
    <div className={styles.formGroup}>
      {label && (
        <label htmlFor={id} className={styles.label}>
          {label}
        </label>
      )}
      <div className={styles.inputWrapper}>
        <input
          type={isPassword ? (showPassword ? 'text' : 'password') : type}
          id={id}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={styles.input}
        />
        {icon && <span className={styles.inputIcon}>{icon}</span>}

        {isPassword && (
          <button
            type='button'
            className={styles.passwordToggle}
            onClick={toggleShowPassword}
          >
            <svg
              width='16'
              height='16'
              viewBox='0 0 16 16'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M8 3C4.5 3 1.5 5.7 0 9.5C1.5 13.3 4.5 16 8 16C11.5 16 14.5 13.3 16 9.5C14.5 5.7 11.5 3 8 3ZM8 14C5.8 14 3.8 12.8 2.5 10.5C3.8 8.2 5.8 7 8 7C10.2 7 12.2 8.2 13.5 10.5C12.2 12.8 10.2 14 8 14ZM8 9C7.2 9 6.5 9.7 6.5 10.5C6.5 11.3 7.2 12 8 12C8.8 12 9.5 11.3 9.5 10.5C9.5 9.7 8.8 9 8 9Z'
                fill='#CCCCCC'
              />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
};

export default Input;
