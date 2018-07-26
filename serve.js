/**
 * The purpose of this file is to serve the built
 * production of the application using express.
 */
const express = require('express');
const path = require('path');

const app = express();

app.use(express.static(path.join(__dirname, 'dist')));

app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, 'dist', 'index.html'))
);

app.listen(1234, err => {
  err
    ? console.error(err)
    : console.info('Server listening on port 1234');
});
