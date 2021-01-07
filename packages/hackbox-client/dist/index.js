"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hackboxClient = void 0;
var socket_io_client_1 = require("socket.io-client");
var hackboxClient = /** @class */ (function () {
    function hackboxClient(url) {
        this.socket = socket_io_client_1.io(url);
    }
    /**
     * Room methods
     */
    hackboxClient.prototype.createRoom = function () {
        var _this = this;
        return new Promise(function (resolve) {
            _this.socket.emit('hb-createRoom');
            _this.socket.on('hb-roomData', function (room) {
                resolve(room);
            });
        });
    };
    ;
    hackboxClient.prototype.onPlayerJoin = function (callbackFn) {
        this.socket.on('hb-onPlayerJoin', function (room) {
            callbackFn(room);
        });
    };
    ;
    hackboxClient.prototype.startGame = function (_a) {
        var roomId = _a.roomId, gameType = _a.gameType;
        this.socket.emit('hb-startGame', { roomId: roomId, gameType: gameType });
    };
    ;
    hackboxClient.prototype.getRooms = function () {
        var _this = this;
        return new Promise(function (resolve) {
            _this.socket.emit('hb-getRooms');
            _this.socket.on('hb-roomsData', function (rooms) {
                resolve(rooms);
            });
        });
    };
    /**
     * Player methods
     */
    hackboxClient.prototype.joinRoom = function (_a) {
        var _this = this;
        var roomId = _a.roomId, playerName = _a.playerName;
        return new Promise(function (resolve) {
            _this.socket.emit('hb-joinRoom', { roomId: roomId, playerName: playerName });
            _this.socket.on('hb-roomConnectionSuccessful', function (playerId) {
                resolve(playerId);
            });
        });
    };
    ;
    hackboxClient.prototype.onStartGame = function (callbackFn) {
        this.socket.on('hb-gameStart', function (gameType) {
            callbackFn(gameType);
        });
    };
    ;
    return hackboxClient;
}());
exports.hackboxClient = hackboxClient;
;
