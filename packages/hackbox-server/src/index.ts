import { createServer } from 'http';
import { Server } from 'socket.io';

import { GameReference, } from './model';
import { attachListeners } from './attachListeners';

/**
 * Spins up a new hackboxServer that listens on the given port.
 * 
 * @param port the port on which this server will listen
 * @param gameReference the logic for the games types
 */
export const hackboxServer = (port: string | number, gameReference: GameReference) => {
  //TODO: https implementation
  const httpServer = createServer();
  const io = new Server(httpServer, {
    cors: {
      origin: /./, //TODO: we can be more secure by only allowing particular origin. This could be passed in via hackboxServer constructor
      credentials: true
    }
  });

  attachListeners(io, gameReference);

  httpServer.listen(port, () => console.log(`Hackbox online on port ${port}!`));
};

export { Room, Player, GameReference } from './model';