interface TweetsData {
  data: {
    end: string;
    start: string;
    tweet_count: number;
    date: string;
    startTime: string;
    endTime: string;
  }[];
  meta: {
    total_tweet_count: number;
    max: number;
    min: number;
  };
}
