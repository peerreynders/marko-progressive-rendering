import express from 'express';
import compressionMiddleware from 'compression';
import markoMiddleware from '@marko/express';
import buildNameMiddleware from './middleware/build-name';
import indexPage from './pages/index';
import fragmentsPage from './pages/fragments';

const port = process.env.PORT || 3000;

express()
  .use(compressionMiddleware()) // Enable gzip compression for all HTTP responses.
  .use('/static', express.static('dist/client')) // Serve assets generated from webpack.
  .use(markoMiddleware()) // Enables res.marko.
  .use(buildNameMiddleware) // Tells Marko which client assets (modern or legacy) to use.
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
