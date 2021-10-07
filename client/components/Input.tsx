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
}

const Input: FC<Props> = ({ defaultValue = '' }) => {
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
        You are looking at <span className={styles.highlighted}>@</span>
      </span>

      <span ref={inputRef} className={`hidden ${styles.input__text}`}>
        {value}
      </span>
      <input
        style={{ width }}
        value={value}
        onKeyPress={handleKeyPress}
        onChange={handleChange}
        className={styles.input}
        autoFocus
      />

      <span className={styles.input__text}>'s activity</span>
    </section>
  );
};

export default Input;
