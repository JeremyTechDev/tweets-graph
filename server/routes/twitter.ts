import express from 'express';

const BEARER_KEY = process.env.BEARER_KEY as string;

const router = express.Router();

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

    res.send(data);
  } catch {
    return res.send(500).json({ message: 'Ops, something went wrong!' });
  }
});

export default router;
