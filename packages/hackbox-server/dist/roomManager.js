"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoomManager = void 0;
var RoomManager = /** @class */ (function () {
    function RoomManager() {
        this.rooms = [];
    }
    RoomManager.prototype.addRoom = function (id, socketId, maxPlayers) {
        var room = { id: id, socketId: socketId, maxPlayers: maxPlayers, players: [] };
        this.rooms.push(room);
        return room;
    };
    RoomManager.prototype.removeRoom = function (id) {
        var removedRoom = this.rooms.filter(function (room) { return room.id === id; })[0];
        if (removedRoom) {
            this.rooms = this.rooms.filter(function (room) { return room.id !== id; });
        }
        return removedRoom;
    };
    RoomManager.prototype.getRoom = function (id) {
        return this.rooms.find(function (room) { return room.id === id; });
    };
    RoomManager.prototype.addPlayer = function (roomId, player) {
        var room = this.getRoom(roomId);
        if (room.players.length >= room.maxPlayers) {
            return false;
        }
        room.players.push(player);
    };
    RoomManager.prototype.removePlayer = function (roomId, playerId) {
        var room = this.getRoom(roomId);
        room.players.filter(function (player) { return player.id !== playerId; });
    };
    RoomManager.prototype.getPlayers = function (roomId) {
        var room = this.getRoom(roomId);
        return room.players;
    };
    RoomManager.prototype.updatePlayerStatus = function (roomId, playerId, playerIsReady) {
        var room = this.getRoom(roomId);
        var player = room.players.filter(function (player) { return player.id === playerId; })[0];
        if (player == null) {
            return false;
        }
        player.isReady = playerIsReady;
    };
    RoomManager.prototype.addToPlayerScore = function (roomId, playerId, amount) {
        var room = this.getRoom(roomId);
        var player = room.players.filter(function (player) { return player.id === playerId; })[0];
        if (player == null) {
            return false;
        }
        player.score += amount;
    };
    RoomManager.prototype.allReady = function (roomId) {
        var room = this.getRoom(roomId);
        room.players.forEach(function (player) {
            if (player.isReady === false) {
                return false;
            }
        });
        return true;
    };
    RoomManager.prototype.roomExists = function (id) {
        var found = this.rooms.find(function (room) { return room.id === id; });
        if (found) {
            return true;
        }
        return false;
    };
    return RoomManager;
}());
exports.RoomManager = RoomManager;
