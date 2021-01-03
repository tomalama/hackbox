"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// const { PlayerManager, RoomManager } = require('./objects');
var generateId = require('./utils').generateId;
var playerManager_1 = require("./playerManager");
var roomManager_1 = require("./roomManager");
var players = new playerManager_1.PlayerManager();
var roomManager = new roomManager_1.RoomManager();
function attachListeners(io, gameReference) {
    io.on('connect', function (socket) {
        /**
         * Room events
         */
        socket.on('hb-createRoom', function () {
            var id = generateId();
            socket.join(id);
            var room = roomManager.addRoom(id, socket.id, 8);
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
        socket.on('hb-startGame', function (_a) {
            var roomId = _a.roomId, gameType = _a.gameType;
            var players = roomManager.getPlayers(roomId);
            players.forEach(function (player) {
                io.to(player.socketId).emit('hb-gameStart', gameType);
            });
            setTimeout(function () {
                var players = roomManager.getPlayers(roomId);
                players.forEach(function (player) {
                    io.to(player.socketId).emit('hb-gameOver');
                });
            }, gameReference[gameType].gameLength);
        });
        /**
       * Player events
       */
        socket.on('hb-joinRoom', function (_a) {
            var roomId = _a.roomId, playerName = _a.playerName;
            if (roomManager.roomExists(roomId) === false) {
                io.to(socket.id).emit('hb-error', 'Room not found');
                return;
            }
            var room = roomManager.getRoom(roomId);
            if (room.players.length >= room.maxPlayers) {
                io.to(socket.id).emit('hb-error', 'Room is full');
                return;
            }
            var playerId = generateId();
            var newPlayer = players.addPlayer({ id: playerId, roomId: roomId, socketId: socket.id, name: playerName });
            roomManager.addPlayer(roomId, newPlayer);
            io.to(room.socketId).emit('hb-onPlayerJoin', room);
            io.to(socket.id).emit('hb-roomConnectionSuccessful', playerId);
        });
        socket.on('hb-leaveRoom', function () { });
        socket.on('hb-getUpdatedData', function (data) {
            var room = roomManager.getRoom(data.id);
            io.to(room.socketId).emit('hb-update', room);
        });
        socket.on('hb-playerAction', function (data) {
            var room = roomManager.getRoom(data.id);
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
        socket.on('hb-playerStatusUpdate', function (data) {
            var room = roomManager.getRoom(data.id);
            roomManager.updatePlayerStatus(data.id, data.playerId, data.playerIsReady);
            if (roomManager.allReady(data.id)) {
                io.to(room.socketId).emit('hb-playersReady', true);
            }
            else {
                io.to(room.socketId).emit('hb-playersReady', false);
            }
            io.to(room.socketId).emit('hb-updateData', room);
        });
    });
    io.on('hb-disconnect', function (socket) { });
}
module.exports = attachListeners;
