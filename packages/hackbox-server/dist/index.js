"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hackboxServer = void 0;
var http_1 = require("http");
var socket_io_1 = require("socket.io");
var attachListeners_1 = require("./attachListeners");
/**
 * Spins up a new hackboxServer that listens on the given port.
 *
 * @param port the port on which this server will listen
 * @param gameReference the logic for the games types
 */
var hackboxServer = function (port, gameReference) {
    //TODO: https implementation
    var httpServer = http_1.createServer();
    var io = new socket_io_1.Server(httpServer, {
        cors: {
            origin: /./,
            credentials: true
        }
    });
    attachListeners_1.attachListeners(io, gameReference);
    httpServer.listen(port, function () { return console.log("Hackbox online on port " + port + "!"); });
};
exports.hackboxServer = hackboxServer;
