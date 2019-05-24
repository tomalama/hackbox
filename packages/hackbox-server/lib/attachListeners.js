const { UserManager, RoomManager } = require('./objects');
const { generateId } = require('./utils');

const users = new UserManager();
const rooms = new RoomManager();

function attachListeners (io, gameReference) {
  io.on('connect', socket => {
    console.log('hey');
    socket.on('createRoom', data => {
      const id = generateId();

      socket.join(id);
      io.to(id).emit('roomData', { ...rooms.addRoom(id, socket.id, 8) });
    });

    socket.on('joinRoom', data => {
      if (rooms.roomExists(data.roomId) === false) {
        io.to(socket.id).emit('error', 'Room not found');
        return;
      }

      const room = rooms.getRoom(data.roomId);

      if (room.participants.length >= room.maxParticipants) {
        io.to(socket.id).emit('error', 'Room is full');
        return;
      }

      const userId = generateId();

      const newUser = users.addUser(
        userId,
        data.roomId,
        socket.id,
        data.username
      );
      rooms.addUser(room.roomId, newUser);

      io.to(room.socketId).emit('updateData', room);

      io.to(socket.id).emit('roomConnectionSuccessful', { userId });
    });

    socket.on('leaveRoom', data => {});

    socket.on('setGameType', data => {
      const users = rooms.getUsers(data.roomId);

      users.forEach(user => {
        io.to(user.socketId).emit('setGameType', gameReference[data.gameType]);
      });
    });

    socket.on('startGame', data => {
      const users = rooms.getUsers(data.roomId);

      users.forEach(user => {
        io.to(user.socketId).emit('gameStart', data.gameType);
      });

      setTimeout(() => {
        const users = rooms.getUsers(data.roomId);

        users.forEach(user => {
          io.to(user.socketId).emit('gameOver');
        });
      }, gameReference[data.gameType].gameLength);
    });

    socket.on('getUpdatedData', data => {
      const room = rooms.getRoom(data.roomId);

      io.to(room.socketId).emit('update', room);
    });

    socket.on('userAction', data => {
      const room = rooms.getRoom(data.roomId);

      switch (data.gameType) {
        case 'squatRace':
          if (data.actionType === 'squat') {
            rooms.addToUserScore(data.roomId, data.userId, 1);
            io.to(room.socketId).emit('updateData', room);
          }
          break;
        default:
          break;
      }
    });

    socket.on('userStatusUpdate', data => {
      const room = rooms.getRoom(data.roomId);

      rooms.updateUserStatus(data.roomId, data.userId, data.userIsReady);

      if (rooms.allReady(data.roomId)) {
        io.to(room.socketId).emit('playersReady', true);
      } else {
        io.to(room.socketId).emit('playersReady', false);
      }

      io.to(room.socketId).emit('updateData', room);
    });
  });

  io.on('disconnect', socket => {});
}

module.exports = attachListeners;
