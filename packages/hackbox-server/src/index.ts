import express from 'express';
import * as socketio from 'socket.io';

import { attachListeners } from './attachListeners';

export const hackbox = ({ app, port, isSecure = false }: { app: express.Express, port: string | number, isSecure: boolean }, gameReference) => {
  const server = require(isSecure ? 'https' : 'http').Server(app);
  // const io = require('socket.io').listen(server);
  const io = socketio.listen(server);

  attachListeners(io, gameReference);

  server.listen(port, () => console.log(`Hackbox online on port ${port}!`));
};