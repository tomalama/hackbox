const { PlayerManager, RoomManager } = require('./objects');
const { generateId } = require('./utils');

const players = new PlayerManager();
const roomManager = new RoomManager();

function attachListeners (io, gameReference) {
  io.on('connect', socket => {
    socket.on('hb-createRoom', () => {
      const id = generateId();
      socket.join(id);
      const room = roomManager.addRoom(id, socket.id, 8);
      io.to(id).emit('hb-roomData', room);
    });

    socket.on('hb-joinRoom', ({ roomId, name }) => {
      if (roomManager.roomExists(roomId) === false) {
        io.to(socket.id).emit('hb-error', 'Room not found');
        return;
      }

      const room = roomManager.getRoom(roomId);
      if (room.players.length >= room.maxPlayers) {
        io.to(socket.id).emit('hb-error', 'Room is full');
        return;
      }

      const playerId = generateId();
      const newPlayer = players.addPlayer(playerId, roomId, socket.id, name);
      roomManager.addPlayer(room.roomId, newPlayer);

      io.to(room.socketId).emit('hb-onPlayerJoin', room);
      io.to(socket.id).emit('hb-roomConnectionSuccessful', playerId);
    });

    socket.on('hb-leaveRoom', data => {});

    socket.on('hb-setGameType', data => {
      const players = roomManager.getPlayers(data.roomId);

      players.forEach(player => {
        io.to(player.socketId).emit(
          'hb-setGameType',
          gameReference[data.gameType]
        );
      });
    });

    socket.on('hb-startGame', data => {
      const players = roomManager.getPlayers(data.roomId);

      players.forEach(player => {
        io.to(player.socketId).emit('hb-gameStart', data.gameType);
      });

      setTimeout(() => {
        const players = roomManager.getPlayers(data.roomId);

        players.forEach(player => {
          io.to(player.socketId).emit('hb-gameOver');
        });
      }, gameReference[data.gameType].gameLength);
    });

    socket.on('hb-getUpdatedData', data => {
      const room = roomManager.getRoom(data.roomId);

      io.to(room.socketId).emit('hb-update', room);
    });

    socket.on('hb-playerAction', data => {
      const room = roomManager.getRoom(data.roomId);

      switch (data.gameType) {
        case 'squatRace':
          if (data.actionType === 'squat') {
            roomManager.addToPlayerScore(data.roomId, data.playerId, 1);
            io.to(room.socketId).emit('hb-updateData', room);
          }
          break;
        default:
          break;
      }
    });

    socket.on('hb-playerStatusUpdate', data => {
      const room = roomManager.getRoom(data.roomId);

      roomManager.updatePlayerStatus(
        data.roomId,
        data.playerId,
        data.playerIsReady
      );

      if (roomManager.allReady(data.roomId)) {
        io.to(room.socketId).emit('hb-playersReady', true);
      } else {
        io.to(room.socketId).emit('hb-playersReady', false);
      }

      io.to(room.socketId).emit('hb-updateData', room);
    });
  });

  io.on('hb-disconnect', socket => {});
}

module.exports = attachListeners;
