"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoomManager = void 0;
var model_1 = require("./model");
var RoomManager = /** @class */ (function () {
    function RoomManager() {
        this.rooms = [];
    }
    RoomManager.prototype.addRoom = function (id, socketId, maxPlayers) {
        var room = new model_1.Room();
        room.id = id;
        room.socketId = socketId;
        room.maxPlayers = maxPlayers;
        room.players = [];
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
    RoomManager.prototype.getRooms = function () {
        return this.rooms;
    };
    RoomManager.prototype.addPlayer = function (roomId, player) {
        var room = this.getRoom(roomId);
        if (room.players.length >= room.maxPlayers) {
            return false;
        }
        room.players.push(player);
        return true;
    };
    RoomManager.prototype.removePlayer = function (roomId, playerId) {
        var room = this.getRoom(roomId);
        //TODO: check if succesfully removed and return true/false
        room === null || room === void 0 ? void 0 : room.players.filter(function (player) { return player.id !== playerId; });
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
        return true;
    };
    RoomManager.prototype.addToPlayerScore = function (roomId, playerId, amount) {
        var room = this.getRoom(roomId);
        var player = room.players.filter(function (player) { return player.id === playerId; })[0];
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
