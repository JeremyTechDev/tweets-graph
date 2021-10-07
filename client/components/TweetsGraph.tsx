import { FC } from 'react';

import styles from '../styles/TweetsGraph.module.css';

const GROUPS = ['light', 'medium', 'full', 'full'];

const getModifier = (max: number, min: number, count: number) => {
  const group = Math.round(((count - min) * 3) / (max - min));

  if (count === 0) return 'none';
  return GROUPS[group];
};

const getMaxAndMinCount = (tweetsData: TweetsData) => {
  let min = Number.POSITIVE_INFINITY;
  let max = Number.NEGATIVE_INFINITY;
  let tmp: number;

  for (let i = tweetsData.data.length - 1; i >= 0; i--) {
    tmp = tweetsData.data[i].tweet_count;
    if (tmp < min) min = tmp;
    if (tmp > max) max = tmp;
  }

  return { min, max };
};

const TweetsGraph: FC<{ tweetsData: TweetsData }> = ({ tweetsData }) => {
  const { max, min } = getMaxAndMinCount(tweetsData);

  return (
    <section className={styles.container}>
      <div className={styles.header}>
        <a className={styles['profile-link']}>{'@AskJere'}</a>
      </div>

      <div className={styles.graph}>
        {tweetsData.data.map((item) => {
          const KEY = `${item.start}-${item.end}`;
          const modifier = getModifier(max, min, item.tweet_count);

          return (
            <span
              key={KEY}
              className={`${styles.graph__item} ${
                styles['graph__item--' + modifier]
              }`}
            />
          );
        })}
      </div>
    </section>
  );
};

export default TweetsGraph;
