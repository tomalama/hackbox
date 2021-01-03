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
var attachListeners = require('./attachListeners');
var socketio = __importStar(require("socket.io"));
var hackbox = function (_a, gameReference) {
    var app = _a.app, port = _a.port, _b = _a.isSecure, isSecure = _b === void 0 ? false : _b;
    var server = require(isSecure ? 'https' : 'http').Server(app);
    // const io = require('socket.io').listen(server);
    var io = socketio.listen(server);
    attachListeners(io, gameReference);
    server.listen(port, function () { return console.log("Hackbox online on port " + port + "!"); });
};
module.exports = hackbox;
