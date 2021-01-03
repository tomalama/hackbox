import express from 'express';
import path from 'path';
import { hackbox } from '../../../hackbox-server/dist/index.js';
import { gameReference } from './gameReference.js';

const port = process.env.PORT || 8080;
const app = express();
app.use(express.static('build'));

app.get('/', function(req, res) {
  res.sendFile(path.join('build', 'index.html'));
});

hackbox({ app, port }, gameReference);
