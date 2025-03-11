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
              width='20'
              height='12'
              viewBox='0 0 20 12'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M10.0004 4.00462C12.2095 4.00462 14.0004 5.7955 14.0004 8.0046C14.0004 10.2138 12.2095 12.0046 10.0004 12.0046C7.79121 12.0046 6.00036 10.2138 6.00036 8.0046C6.00036 5.7955 7.79121 4.00462 10.0004 4.00462ZM10.0004 0.5C14.6139 0.5 18.5965 3.65001 19.7015 8.0644C19.8021 8.4662 19.5579 8.8735 19.1561 8.9741C18.7542 9.0746 18.347 8.8305 18.2464 8.4286C17.3075 4.67796 13.9217 2 10.0004 2C6.0773 2 2.69046 4.68026 1.75322 8.4332C1.65286 8.835 1.24572 9.0794 0.843845 8.9791C0.441975 8.8787 0.197555 8.4716 0.297915 8.0697C1.40101 3.65272 5.38485 0.5 10.0004 0.5Z'
                fill='#ABB1BB'
              />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
};

export default Input;
