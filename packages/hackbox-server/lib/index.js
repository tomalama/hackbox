const attachListeners = require('./attachListeners');

const hackbox = ({ app, port }, gameReference) => {
  const server = require('http').Server(app);
  const io = require('socket.io').listen(server);

  attachListeners(io, gameReference);

  server.listen(port, () =>
    console.log(`Hackbox online listening on port ${port}!`)
  );
};

module.exports = hackbox;
