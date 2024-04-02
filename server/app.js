const express = require('express');
const cors = require('cors');
const chalk = require('chalk');
const { errorHandler, notFoundHandler } = require('./middleware');
const { isDev } = require('../utils');
const { PORT } = require('./routers/utils');
const router = require('./routers');

const app = express();

app.use(cors());
app.use('/instances', router);
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
  console.error('this app should only be run in development environments');
}
