"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const LogTypeConstant_1 = require("./LogTypeConstant");
const logSchema = new mongoose_1.Schema({
    execStatus: {
        type: Number,
        enum: Object.values(LogTypeConstant_1.LOG_EXEC_STATUS),
        default: LogTypeConstant_1.LOG_EXEC_STATUS.success
    },
    api: {
        type: String
    },
    user: {
        type: String
    },
    session: {
        type: String
    },
    method: {
        type: String,
    },
    status: {
        type: Number,
    },
    message: {
        type: String,
    },
    execTime: {
        type: Number // time in ms
    },
    data: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});
logSchema.index({ api: 1 });
const LogModel = (0, mongoose_1.model)('Log', logSchema);
exports.default = LogModel;
