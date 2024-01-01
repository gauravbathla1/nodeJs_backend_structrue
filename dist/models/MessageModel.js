"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const MessageInterface_1 = require("../interfaces/MessageInterface");
const messageSchema = new mongoose_1.Schema({
    text: {
        type: String,
        required: true
    },
    messageType: {
        type: Number,
        required: true,
        enum: [MessageInterface_1.messageType.text, MessageInterface_1.messageType.url, MessageInterface_1.messageType.audio, MessageInterface_1.messageType.video, MessageInterface_1.messageType.image]
    },
    creator: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
    isEdited: {
        type: Boolean,
        default: false
    },
    editHistory: {
        type: [{
                text: String,
                editedAt: Date
            }],
        default: []
    }
}, { timestamps: true });
const MessageModel = (0, mongoose_1.model)('Message', messageSchema);
exports.default = MessageModel;
