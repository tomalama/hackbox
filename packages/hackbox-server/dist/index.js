"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.hackbox = void 0;
var socket_io_1 = __importDefault(require("socket.io"));
var attachListeners_1 = require("./attachListeners");
var hackbox = function (_a, gameReference) {
    var app = _a.app, port = _a.port, _b = _a.isSecure, isSecure = _b === void 0 ? false : _b;
    var server = require(isSecure ? 'https' : 'http').Server(app);
    var io = socket_io_1.default.listen(server);
    attachListeners_1.attachListeners(io, gameReference);
    server.listen(port, function () { return console.log("Hackbox online on port " + port + "!"); });
};
exports.hackbox = hackbox;
