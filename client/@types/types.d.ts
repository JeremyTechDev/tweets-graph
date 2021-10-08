interface TweetsData {
  data: TweetsCount[];
  meta: {
    total_tweet_count: number;
    max: number;
    min: number;
  };
}

interface TweetsCount {
  end: string;
  start: string;
  tweet_count: number;
}
