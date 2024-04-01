const express = require('express');
const chalk = require('chalk');
const cookieParser = require('cookie-parser');
const compression = require('compression');
const helmet = require('helmet');
const hpp = require('hpp');
const { httpLogger, errorHandler, notFoundHandler } = require('./middleware');
const { isDev, paths } = require('../utils');
const { PORT } = require('./utils');
const https = require('https');

const app = express();

app.use(helmet());
app.use(httpLogger());
app.use(cookieParser());
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }), hpp());

// serve files in production environment
if (!isDev) {
  app.use('/build', express.static(`${paths.public}/build`));
  app.get('*', (_req, res) => {
    res.sendFile(`${paths.public}/index.html`);
  });
}

app.use(notFoundHandler());
app.use(errorHandler());

if (isDev) {
  app
    .listen(PORT, () => {
      console.info(chalk.cyan(`Express server is listening PORT (${PORT})`));
    })
    .on('error', error => {
      console.error(`ERROR: ${chalk.red(error.message)}`);
    });
} else {
  // production runs on https
  https
    .createServer({}, app)
    .listen(PORT, () => {
      console.info(chalk.cyan(`Express server is listening PORT (${PORT})`));
    })
    .on('error', error => {
      console.error(
        `Express server failed. ERROR: ${chalk.red(error.message)}`
      );
    });
}
