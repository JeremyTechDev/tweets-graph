import data from './data.json';
import { useEffect, useState } from 'react';

import './index.scss';

interface TweetsData {
  data: {
    end: string;
    start: string;
    tweet_count: number;
  }[];

  meta: {
    total_tweet_count: number;
  };
}

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

const TweetsGraph = () => {
  const { max, min } = getMaxAndMinCount(data);

  return (
    <section className="tweets-container">
      <div className="tweets-header">
        <a className="profile-link">{'@<username>'}</a>
      </div>

      <div className="tweets-graph">
        {data.data.map((item) => {
          const KEY = `${item.start}-${item.end}`;
          const modifier = getModifier(max, min, item.tweet_count);

          return <span key={KEY} className={`tweets-graph-item ${modifier}`} />;
        })}
      </div>

      <div className="tweets-footer">Download icobn</div>
    </section>
  );
};

export default TweetsGraph;
