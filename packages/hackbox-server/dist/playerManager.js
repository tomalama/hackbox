"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlayerManager = void 0;
var PlayerManager = /** @class */ (function () {
    function PlayerManager() {
        this.players = [];
    }
    PlayerManager.prototype.addPlayer = function (_a) {
        var id = _a.id, roomId = _a.roomId, socketId = _a.socketId, name = _a.name;
        var player = {
            id: id,
            roomId: roomId,
            socketId: socketId,
            name: name,
            isReady: false,
            score: 0
        };
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
