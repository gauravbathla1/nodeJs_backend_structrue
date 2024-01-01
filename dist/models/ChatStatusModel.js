"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const ChatStatusInterface_1 = require("../interfaces/ChatStatusInterface");
const chatStatusSchema = new mongoose_1.Schema({
    groupId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'group',
        required: true
    },
    lastChatId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Chat'
    },
    userId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User"
    },
    status: {
        type: Number,
        required: true,
        enum: [ChatStatusInterface_1.chatStatus.sent, ChatStatusInterface_1.chatStatus.delivered, ChatStatusInterface_1.chatStatus.seen]
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
}, { timestamps: true });
chatStatusSchema.index({ groupId: 1, userId: 1, status: 1 }, { unique: true });
const ChatStatusModel = (0, mongoose_1.model)('ChatStatus', chatStatusSchema);
exports.default = ChatStatusModel;
