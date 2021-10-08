import { FC, Fragment } from 'react';
import ReactTooltip from 'react-tooltip';

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
        <span>
          {tweetsData.meta.total_tweet_count} tweets between{' '}
          {tweetsData.data[0].date} and{' '}
          {tweetsData.data[tweetsData.data.length - 1].date}{' '}
        </span>

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
            <Fragment key={KEY}>
              <span
                data-tip
                data-for={KEY}
                className={`${styles.graph__item} ${
                  styles['graph__item--' + modifier]
                }`}
              />

              <ReactTooltip id={KEY} type="light" effect="solid">
                <h3>
                  {item.tweet_count}{' '}
                  {item.tweet_count === 1 ? 'tweet' : 'tweets'}
                </h3>
                <p>
                  {item.date}
                  <br />
                  {item.startTime} - {item.endTime}
                </p>
              </ReactTooltip>
            </Fragment>
          );
        })}
      </div>
    </section>
  );
};

export default TweetsGraph;
