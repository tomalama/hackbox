"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Room = exports.Player = void 0;
/**
 * A player of a hackbox game.
 */
var Player = /** @class */ (function () {
    function Player(id, socketId, name) {
        this.id = id;
        this.socketId = socketId;
        this.name = name;
        this.isReady = false;
        this.score = 0;
    }
    return Player;
}());
exports.Player = Player;
/**
 * A room that hosts a game.
 */
var Room = /** @class */ (function () {
    function Room(id, socketId, maxPlayers) {
        this.id = id;
        this.socketId = socketId;
        this.maxPlayers = maxPlayers;
        this.players = [];
    }
    return Room;
}());
exports.Room = Room;
