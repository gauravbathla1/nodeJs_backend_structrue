"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const chatSchema = new mongoose_1.Schema({
    groupId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Group",
        required: true
    },
    messageId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Message',
        required: true
    },
    senderId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "user",
        required: true
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
}, { timestamps: true });
chatSchema.index({ messageId: 1, groupId: 1, senderId: 1 }, { unique: true });
chatSchema.index({ groupId: 1 });
const ChatModel = (0, mongoose_1.model)('Chat', chatSchema);
exports.default = ChatModel;
