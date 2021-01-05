import socketio from 'socket.io';

import { generateId }  from './utils';
import { PlayerManager } from './playerManager';
import { RoomManager } from './roomManager';
import { GameReference } from './model';

const players = new PlayerManager();
const roomManager = new RoomManager();

export function attachListeners (io: socketio.Server, gameReference: GameReference): void {
  io.on('connect', socket => {
    /**
     * Room events
     */
    socket.on('hb-createRoom', () => {
      const id = generateId();
      socket.join(id);
      const room = roomManager.addRoom(id, socket.id, 8);
      io.to(id).emit('hb-roomData', room);
    });

    // socket.on('hb-setGameType', ({ roomId, gameType }) => {
    //   const players = roomManager.getPlayers(roomId);

    //   players.forEach(player => {
    //     io.to(player.socketId).emit(
    //       'hb-setGameType',
    //       gameReference[gameType]
    //     );
    //   });
    // });

    socket.on('hb-startGame', ({ roomId, gameType }) => {
      const players = roomManager.getPlayers(roomId);

      players.forEach(player => {
        io.to(player.socketId).emit('hb-gameStart', gameType);
      });

      setTimeout(() => {
        const players = roomManager.getPlayers(roomId);

        players.forEach(player => {
          io.to(player.socketId).emit('hb-gameOver');
        });
      }, gameReference[gameType].gameLength);
    });

    socket.on('hb-getRooms', () => {
      const rooms = roomManager.getRooms();
      io.to(socket.id).emit('hb-roomsData', rooms);
    });

    /**
   * Player events
   */
    socket.on('hb-joinRoom', ({ roomId, playerName }) => {
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
      const newPlayer = players.addPlayer(playerId, roomId, socket.id, playerName);
      roomManager.addPlayer(roomId, newPlayer);

      io.to(room.socketId).emit('hb-onPlayerJoin', room);
      io.to(socket.id).emit('hb-roomConnectionSuccessful', playerId);
    });

    socket.on('hb-leaveRoom', () => {});

    socket.on('hb-getUpdatedData', data => {
      const room = roomManager.getRoom(data.id);

      io.to(room.socketId).emit('hb-update', room);
    });

    socket.on('hb-playerAction', data => {
      const room = roomManager.getRoom(data.id);

      switch (data.gameType) {
        case 'squatRace':
          if (data.actionType === 'squat') {
            roomManager.addToPlayerScore(data.id, data.playerId, 1);
            io.to(room.socketId).emit('hb-updateData', room);
          }
          break;
        default:
          break;
      }
    });

    socket.on('hb-playerStatusUpdate', data => {
      const room = roomManager.getRoom(data.id);

      roomManager.updatePlayerStatus(
        data.id,
        data.playerId,
        data.playerIsReady
      );

      if (roomManager.allReady(data.id)) {
        io.to(room.socketId).emit('hb-playersReady', true);
      } else {
        io.to(room.socketId).emit('hb-playersReady', false);
      }

      io.to(room.socketId).emit('hb-updateData', room);
    });
  });

  io.on('hb-disconnect', socket => {});
}
