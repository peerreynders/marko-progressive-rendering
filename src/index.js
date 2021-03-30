import express from 'express';
import compressionMiddleware from 'compression';
import markoMiddleware from '@marko/express';
import indexPage from './pages/index';
import fragmentsPage from './pages/fragments';

const port = process.env.PORT || 3000;

express()
  .use(compressionMiddleware()) // Enable gzip compression for all HTTP responses.
  .use('/static', express.static('dist/client')) // Serve assets generated from rollup.
  .use(markoMiddleware()) // Enables res.marko.
  .get('/fragments', fragmentsPage)
  .get('/', indexPage)
  .listen(port, (err) => {
    if (err) {
      throw err;
    }

    if (port !== '0') {
      console.log(`Listening on port ${port}`);
    }
  });
