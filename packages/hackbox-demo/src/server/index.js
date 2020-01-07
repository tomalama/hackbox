const express = require('express');
const path = require('path');
const hackbox = require('hackbox-server');
const gameReference = require('./gameReference');

const port = process.env.PORT || 8080;
const app = express();
app.use(express.static('build'));

app.get('/', function(req, res) {
  res.sendFile(path.join('build', 'index.html'));
});

hackbox({ app, port }, gameReference);
