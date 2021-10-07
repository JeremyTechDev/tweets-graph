import express from 'express';

const BEARER_KEY = process.env.BEARER_KEY as string;

const router = express.Router();

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

/**
 * Gets the tweets count of the last 7 days given a username
 */
router.get('/count/:username', async (req, res) => {
  try {
    const username = req.params.username || '';

    const response = await fetch(
      `https://api.twitter.com/2/tweets/counts/recent?query=from:${username}&granularity=hour`,
      {
        headers: {
          Authorization: `Bearer ${BEARER_KEY}`,
        },
      },
    );

    const data = await response.json();
    data.meta = { ...data.meta, ...getMaxAndMinCount(data) };

    res.send(data);
  } catch {
    return res.send(500).json({ message: 'Ops, something went wrong!' });
  }
});

export default router;
