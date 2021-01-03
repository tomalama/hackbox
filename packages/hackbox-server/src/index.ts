const attachListeners = require('./attachListeners');
import * as socketio from 'socket.io';

const hackbox = ({ app, port, isSecure = false }, gameReference) => {
  const server = require(isSecure ? 'https' : 'http').Server(app);
  // const io = require('socket.io').listen(server);
  const io = socketio.listen(server);

  attachListeners(io, gameReference);

  server.listen(port, () => console.log(`Hackbox online on port ${port}!`));
};

module.exports = hackbox;
