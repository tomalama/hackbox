"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoomManager = void 0;
var model_1 = require("./model");
var RoomManager = /** @class */ (function () {
    function RoomManager() {
        this.rooms = [];
    }
    RoomManager.prototype.addRoom = function (id, socketId, maxPlayers) {
        var room = new model_1.Room(id, socketId, maxPlayers);
        this.rooms.push(room);
        return room;
    };
    RoomManager.prototype.removeRoom = function (id) {
        var removedRoom = this.getRoom(id);
        this.rooms = this.rooms.filter(function (room) { return room.id !== id; });
        return removedRoom;
    };
    RoomManager.prototype.getRoom = function (id) {
        if (!this.roomExists(id)) {
            throw Error('Room not found.');
        }
        return this.rooms.find(function (room) { return room.id === id; });
    };
    RoomManager.prototype.getRooms = function () {
        return this.rooms;
    };
    RoomManager.prototype.addPlayer = function (roomId, player) {
        var room = this.getRoom(roomId);
        if (!room) {
            return false;
        }
        if (room.players.length >= room.maxPlayers) {
            return false;
        }
        if (room) {
            room.players.push(player);
        }
        return true;
    };
    RoomManager.prototype.removePlayer = function (roomId, playerId) {
        var room = this.getRoom(roomId);
        var removedPlayer = room.players.find(function (player) { return player.id === playerId; });
        if (!removedPlayer) {
            throw Error('Player not found.');
        }
        return removedPlayer;
    };
    RoomManager.prototype.getPlayers = function (roomId) {
        var room = this.getRoom(roomId);
        return room === null || room === void 0 ? void 0 : room.players;
    };
    RoomManager.prototype.updatePlayerStatus = function (roomId, playerId, playerIsReady) {
        var room = this.getRoom(roomId);
        var player = room.players.filter(function (player) { return player.id === playerId; })[0];
        if (player == null) {
            return false;
        }
        player.isReady = playerIsReady;
        return true;
    };
    RoomManager.prototype.addToPlayerScore = function (roomId, playerId, amount) {
        var room = this.getRoom(roomId);
        if (!room) {
            return false;
        }
        var player = room.players.find(function (player) {
            return player.id == playerId;
        });
        if (player == null) {
            return false;
        }
        player.score += amount;
        return true;
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
