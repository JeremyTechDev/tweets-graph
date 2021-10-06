import next from 'next';
import express from 'express';
require('dotenv').config();

const PORT = process.env.PORT || 5000;
const NODE_ENV = process.env.NODE_ENV || 'development';
const dev = NODE_ENV !== 'production';

/**
 * Creates an Express app with a RESTful API
 * @param {NextAppHandler} function NextJS custom app handler
 * @returns {app} Express application
 */
const initServer = (appHandler: any) => {
  const server = express();

  server.use(express.json());

  // give all Next.js's requests to Next.js server
  if (appHandler) {
    server.get('/_next/*', (req, res) => {
      return appHandler(req, res);
    });
    server.get('/static/*', (req, res) => {
      return appHandler(req, res);
    });
  }

  // apply routes
  // server.use('/api/twitter/count');

  // let next handle the default route
  if (appHandler) {
    server.get('*', (req, res) => {
      return appHandler(req, res);
    });
  }

  // start the server
  if (NODE_ENV !== 'test') {
    server.listen(PORT, () => {
      console.info('🚀 Server running:');
      console.table({ PORT, NODE_ENV });
    });
  }

  return server;
};

const app = next({ dev, dir: './dist/client' });
const appHandler = app.getRequestHandler();

app.prepare().then(() => initServer(appHandler));
