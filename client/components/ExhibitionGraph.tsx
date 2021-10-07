import { useEffect, useState } from 'react';
import styles from '../styles/TweetsGraph.module.css';

const GROUPS = ['light', 'medium', 'full', 'none'];

const ExhibitionGraph = () => {
  const [randomArray, setRandomArray] = useState(Array(24 * 7));

  useEffect(() => {
    const interval = setInterval(() => {
      setRandomArray(
        Array.from({ length: 24 * 7 }, () =>
          Math.floor(Math.random() * 24 * 7),
        ),
      );
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className={styles.container}>
      <div className={styles.graph}>
        {randomArray.map((key, index) => {
          const num = Math.floor(Math.random() * 4);

          return (
            <span
              key={`${key}-${index}`}
              className={`${styles.graph__item} ${
                styles['graph__item--' + GROUPS[num]]
              }`}
            />
          );
        })}
      </div>
    </section>
  );
};

export default ExhibitionGraph;
