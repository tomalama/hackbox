const io = require('socket.io-client');

const hackboxClient = async url => {
  const socket = await io.connect(url);

  /**
   * Room methods
   */

  const createRoom = () => {
    return new Promise(resolve => {
      socket.emit('hb-createRoom');
      socket.on('hb-roomData', data => {
        resolve(data);
      });
    });
  };

  const onPlayerJoin = cb => {
    socket.on('hb-onPlayerJoin', room => {
      cb(room);
    });
  };

  /**
   * Player methods
   */

  const joinRoom = (roomId, name) => {
    return new Promise(resolve => {
      socket.emit('hb-joinRoom', { roomId, name });
      socket.on('hb-roomConnectionSuccessful', playerId => {
        resolve(playerId);
      });
    });
  };

  return {
    createRoom,
    onPlayerJoin,
    joinRoom
  };
};

module.exports = hackboxClient;
