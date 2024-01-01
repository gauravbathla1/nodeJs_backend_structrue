"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const ReportReasonInterface_1 = require("../interfaces/ReportReasonInterface");
const chatReportSchema = new mongoose_1.Schema({
    groupId: {
        type: mongoose_1.Types.ObjectId,
        required: true
    },
    reportedBy: {
        type: mongoose_1.Types.ObjectId,
        required: true
    },
    reportedUser: {
        type: mongoose_1.Types.ObjectId,
        required: true
    },
    reportType: {
        type: Number,
        default: ReportReasonInterface_1.ReportType.Chat
    },
    chatText: {
        type: String,
        default: null
    },
    reasonText: {
        type: String,
        default: null
    },
    messageId: {
        type: mongoose_1.Types.ObjectId,
        default: null
    }
}, { timestamps: true });
const ChatReportModel = (0, mongoose_1.model)('ChatReport', chatReportSchema);
exports.default = ChatReportModel;
