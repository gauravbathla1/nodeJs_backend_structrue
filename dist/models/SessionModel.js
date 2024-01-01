"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const sessionSchema = new mongoose_1.Schema({
    user: {
        type: mongoose_1.Types.ObjectId,
        required: true,
        ref: 'user'
    },
    isActive: {
        type: Boolean,
        default: true
    },
    deviceType: {
        type: String,
    },
    deviceToken: {
        type: String,
    },
    deviceId: {
        type: String
    },
    deviceName: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true });
const SessionModel = (0, mongoose_1.model)('session', sessionSchema);
exports.default = SessionModel;
