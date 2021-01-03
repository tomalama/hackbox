import express from 'express';
import socketio from 'socket.io';

import { attachListeners } from './attachListeners';
import { GameReference } from './model';

export const hackbox = ({ app, port, isSecure = false }: { app: express.Express, port: string | number, isSecure: boolean }, gameReference: GameReference) => {
  const server = require(isSecure ? 'https' : 'http').Server(app);
  const io = socketio.listen(server);

  attachListeners(io, gameReference);

  server.listen(port, () => console.log(`Hackbox online on port ${port}!`));
};