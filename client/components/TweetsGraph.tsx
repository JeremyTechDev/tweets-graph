import { FC, Fragment, useCallback, useRef } from 'react';
import ReactTooltip from 'react-tooltip';
import parseDate from '../helpers/parseDate';
import { toPng } from 'html-to-image';

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
  const graphRef = useRef<HTMLDivElement>(null);
  const first = tweetsData.data[0];
  const last = tweetsData.data[tweetsData.data.length - 1];

  const filter = (node: HTMLElement) => {
    const exclusionClasses = ['exclude-from-image'];
    return !exclusionClasses.some((className) =>
      node?.classList?.contains(className),
    );
  };

  const handleDownload = useCallback(() => {
    if (graphRef.current === null) {
      return;
    }

    toPng(graphRef.current, { cacheBust: true, filter })
      .then((dataUrl) => {
        const link = document.createElement('a');
        link.download = `${username}-tweets-graph.png`;
        link.href = dataUrl;
        link.click();
      })
      .catch(() => alert('Ops, I cannot do that for you right now 😬'));
  }, [graphRef]);

  return (
    <section className={styles.container} ref={graphRef}>
      <h2>@{username}'s Tweets Calendar Graph</h2>

      <div className={styles.header}>
        <span>
          {tweetsData.meta.total_tweet_count} tweets{' '}
          <span className="hide-on-mobile">
            between {parseDate(first.start).date} and {parseDate(last.end).date}
          </span>
        </span>

        <a
          href={`https://twitter.com/${username}?ref_src=twsrc%5Etfw`}
          className="twitter-follow-button exclude-from-image"
          data-show-count="false"
          data-size="large"
        >
          Follow @{username}
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
          const startTime = parseDate(item.start);
          const endTime = parseDate(item.end);

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
                  {startTime.date}
                  <br />
                  {startTime.time} - {endTime.time}
                </p>
              </ReactTooltip>
            </Fragment>
          );
        })}
      </div>

      <p
        className={`exclude-from-image ${styles.download}`}
        onClick={handleDownload}
      >
        Download
      </p>
    </section>
  );
};

export default TweetsGraph;
