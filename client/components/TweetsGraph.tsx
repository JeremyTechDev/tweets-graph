import { FC } from 'react';

import styles from '../styles/TweetsGraph.module.css';

const MODIFIERS = ['light', 'medium', 'full', 'full'];

const getModifier = (max: number, min: number, count: number) => {
  const group = Math.round(((count - min) * 3) / (max - min));

  if (count === 0) return 'none';
  return MODIFIERS[group];
};

interface Props {
  tweetsData: TweetsData;
  username: string;
}

const TweetsGraph: FC<Props> = ({ tweetsData, username }) => {
  return (
    <section className={styles.container}>
      <div className={styles.header}>
        <a
          className={styles['profile-link']}
          href={`https://twitter.com/${username}`}
          target="_blank"
        >
          @{username}
        </a>
      </div>

      <div className={styles.graph}>
        {tweetsData.data.map((item) => {
          const KEY = `${item.start}-${item.end}`;
          const modifier = getModifier(
            tweetsData.meta.max,
            tweetsData.meta.min,
            item.tweet_count,
          );

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
