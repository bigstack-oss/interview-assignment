const express = require('express');
const fs = require('fs');
const router = express.Router();
const path = require('path');
const { transformOnInterval } = require('./utils');
const filePath = path.join(__dirname, '..', 'data', 'instances.json');

router.get('/', (_req, res) => {
  fs.readFile(filePath, 'utf-8', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).end('unable to read data file');
      return;
    }
    const result = transformOnInterval(data);
    res.status(200).json(result);
  });
});

module.exports = router;
