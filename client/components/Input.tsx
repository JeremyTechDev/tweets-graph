import router from 'next/router';
import {
  ChangeEvent,
  FC,
  KeyboardEvent,
  useEffect,
  useRef,
  useState,
} from 'react';
import styles from '../styles/Input.module.css';

interface Props {
  defaultValue?: string;
  beforeText?: string;
  afterText?: string;
}

const Input: FC<Props> = ({ beforeText, afterText, defaultValue = '' }) => {
  const [value, setValue] = useState(defaultValue);
  const [width, setWidth] = useState(0);
  const inputRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    setWidth((inputRef.current?.offsetWidth || 0) + 15);
  }, [value]);

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

      <span ref={inputRef} className={`hidden ${styles.input__text}`}>
        {value}
      </span>
      <input
        className={styles.input}
        onChange={handleChange}
        onKeyPress={handleKeyPress}
        style={{ width }}
        value={value}
      />

      <span className={styles.input__text}>{afterText ?? "'s activity"}</span>
    </section>
  );
};

export default Input;
