"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const chatBlockSchema = new mongoose_1.Schema({
    userId: {
        type: mongoose_1.Types.ObjectId,
        ref: 'User',
        required: true
    },
    groupId: {
        type: mongoose_1.Types.ObjectId,
        ref: 'Group',
        required: true
    },
    blockedBy: {
        type: mongoose_1.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, { timestamps: true });
const ChatBlockModel = (0, mongoose_1.model)('ChatBlock', chatBlockSchema);
exports.default = ChatBlockModel;
