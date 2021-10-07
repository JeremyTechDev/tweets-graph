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
