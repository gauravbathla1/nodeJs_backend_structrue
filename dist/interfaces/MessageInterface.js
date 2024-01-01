"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.messageType = void 0;
var messageType;
(function (messageType) {
    messageType[messageType["text"] = 1] = "text";
    messageType[messageType["url"] = 2] = "url";
    messageType[messageType["audio"] = 3] = "audio";
    messageType[messageType["video"] = 4] = "video";
    messageType[messageType["image"] = 5] = "image";
})(messageType = exports.messageType || (exports.messageType = {}));
