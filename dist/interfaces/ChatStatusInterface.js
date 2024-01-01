"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.chatStatus = void 0;
var chatStatus;
(function (chatStatus) {
    chatStatus[chatStatus["sent"] = 1] = "sent";
    chatStatus[chatStatus["delivered"] = 2] = "delivered";
    chatStatus[chatStatus["seen"] = 3] = "seen";
})(chatStatus = exports.chatStatus || (exports.chatStatus = {}));
