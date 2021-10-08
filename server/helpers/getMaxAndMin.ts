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

export default getMaxAndMinCount;
