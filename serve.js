/**
 * The purpose of this file is to serve the built
 * production of the application using express.
 */
const express = require('express');
const path = require('path');

const app = express();

app.use(express.static(path.resolve(__dirname, 'dist')));
app.use(express.static(path.resolve(__dirname, 'public')));

app.get('*', (req, res) => res.sendFile(path.join(__dirname, 'dist', 'index.html')));

app.listen(1234, (err) => {
  if (err) {
    console.error(err);
    return;
  }

  console.info('Server listening on port 1234');
});
