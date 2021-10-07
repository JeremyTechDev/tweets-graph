import express from 'express';
import oauthLib from '../lib/oauth';

const OAUTH_CALLBACK = process.env.FRONTEND_URL as string;
const BEARER_KEY = process.env.BEARER_KEY as string;

const COOKIE_NAME = 'twitter_oauth_token';

const router = express.Router();
const oauth = oauthLib(OAUTH_CALLBACK);

type GenericObject = { [key: string]: any };
let tokens: GenericObject = {};

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
    console.log(data)

    res.send(data);
  } catch {
    return res.send(500).json({ message: 'Ops, something went wrong!' });
  }
});

/**
 * OAuth Step 1
 */
router.post('/oauth/request_token', async (req, res) => {
  const { oauth_token, oauth_token_secret } =
    (await oauth.getOAuthRequestToken()) as {
      oauth_token: string;
      oauth_token_secret: string;
    };

  res.cookie(COOKIE_NAME, oauth_token, {
    maxAge: 30 * 60 * 1000, // 30 minutes
    secure: true,
    httpOnly: true,
    sameSite: true,
  });

  tokens[oauth_token] = { oauth_token_secret };
  res.json({ oauth_token });
});

/**
 * OAuth step 3
 */
router.post('/oauth/access_token', async (req, res) => {
  try {
    const { oauth_token: req_oauth_token, oauth_verifier } = req.body;
    const oauth_token = req.cookies[COOKIE_NAME];
    const oauth_token_secret = tokens[oauth_token].oauth_token_secret;

    if (oauth_token !== req_oauth_token) {
      return res.status(403).json({ message: 'Request tokens do not match' });
    }

    const { oauth_access_token, oauth_access_token_secret } =
      await oauth.getOAuthAccessToken(
        oauth_token,
        oauth_token_secret,
        oauth_verifier,
      );

    tokens[oauth_token] = {
      ...tokens[oauth_token],
      oauth_access_token,
      oauth_access_token_secret,
    };

    res.json({ success: true });
  } catch (error) {
    res.status(403).json({ message: 'Missing access token' });
  }
});

/**
 * Authentication Access
 */
router.get('/users/profile_banner', async (req, res) => {
  try {
    const oauth_token = req.cookies[COOKIE_NAME];
    const { oauth_access_token, oauth_access_token_secret } =
      tokens[oauth_token];

    const response = await oauth.getProtectedResource(
      'https://api.twitter.com/1.1/account/verify_credentials.json',
      'GET',
      oauth_access_token,
      oauth_access_token_secret,
    );

    res.json(JSON.parse(response.data));
  } catch (error) {
    res.status(403).json({ message: 'Missing, invalid, or expired tokens' });
  }
});

/**
 * Close Twitter Session
 */
router.post('/logout', async (req, res) => {
  try {
    const oauth_token = req.cookies[COOKIE_NAME];
    delete tokens[oauth_token];

    res.cookie(COOKIE_NAME, {}, { maxAge: -1 });
    res.json({ success: true });
  } catch (error) {
    res.status(403).json({ message: 'Missing, invalid, or expired tokens' });
  }
});

export default router;
