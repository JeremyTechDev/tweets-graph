import router from 'next/router';
import { ChangeEvent, FC, KeyboardEvent, useState } from 'react';
import InputAutoSize from 'react-input-autosize';
import styles from '../styles/Input.module.css';

interface Props {
  placeholder?: string;
  beforeText?: string;
  afterText?: string;
  defaultValue?: string;
}

const Input: FC<Props> = ({
  afterText,
  beforeText,
  placeholder,
  defaultValue = '',
}) => {
  const [value, setValue] = useState(defaultValue);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const handleKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      router.push(`/${value}`);
    }
  };

  return (
    <section className={styles.input__container}>
      <span className={styles.input__text}>
        {beforeText || 'You are looking at'}{' '}
        <span className={styles.highlighted}>@</span>
      </span>

      <InputAutoSize
        autoComplete="off"
        inputClassName={styles.input}
        onChange={handleChange}
        onKeyPress={handleKeyPress}
        placeholder={placeholder}
        value={value}
      />

      <span className={styles.input__text}>{afterText ?? "'s activity"}</span>
    </section>
  );
};

export default Input;
