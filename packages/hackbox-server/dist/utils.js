"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateId = void 0;
var generateId = function () {
    return Math.random()
        .toString(36)
        .substr(2, 5)
        .toUpperCase();
};
exports.generateId = generateId;
