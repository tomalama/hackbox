const io = require('socket.io-client');

export const hackboxClient = async url => {
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

  const startGame = ({ roomId, gameType }) => {
    socket.emit('hb-startGame', { roomId, gameType });
  };

  /**
   * Player methods
   */

  const joinRoom = ({ roomId, playerName }) => {
    return new Promise(resolve => {
      socket.emit('hb-joinRoom', { roomId, playerName });
      socket.on('hb-roomConnectionSuccessful', playerId => {
        resolve(playerId);
      });
    });
  };

  const onStartGame = cb => {
    socket.on('hb-gameStart', gameType => {
      cb(gameType);
    });
  };

  return {
    createRoom,
    onPlayerJoin,
    startGame,
    joinRoom,
    onStartGame
  };
};