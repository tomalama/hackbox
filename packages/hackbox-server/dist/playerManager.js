"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlayerManager = void 0;
var model_1 = require("./model");
var PlayerManager = /** @class */ (function () {
    function PlayerManager() {
        this.players = [];
    }
    PlayerManager.prototype.addPlayer = function (playerId, roomId, socketId, name) {
        var player = new model_1.Player();
        player.id = playerId;
        player.roomId = roomId;
        player.socketId = socketId;
        player.name = name;
        player.isReady = false;
        player.score = 0;
        this.players.push(player);
        return player;
    };
    PlayerManager.prototype.removePlayer = function (id) {
        var removedPlayer = this.players.find(function (player) { return player.id === id; });
        if (removedPlayer) {
            this.players = this.players.filter(function (player) { return player.id !== id; });
        }
        return removedPlayer;
    };
    PlayerManager.prototype.getPlayer = function (id) {
        return this.players.find(function (player) { return player.id === id; });
    };
    return PlayerManager;
}());
exports.PlayerManager = PlayerManager;
