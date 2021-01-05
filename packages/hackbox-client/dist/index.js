"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.hackboxClient = void 0;
var io = __importStar(require("socket.io-client"));
var hackboxClient = /** @class */ (function () {
    function hackboxClient(url) {
        this.socket = io.connect(url);
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
