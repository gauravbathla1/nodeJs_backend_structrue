"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const ReportReasonInterface_1 = require("../interfaces/ReportReasonInterface");
const reportReasonSchema = new mongoose_1.Schema({
    reportReason: {
        type: String
    },
    reportType: {
        type: Number,
        enum: [ReportReasonInterface_1.ReportType.Group, ReportReasonInterface_1.ReportType.User, ReportReasonInterface_1.ReportType.Chat]
    },
    isActive: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });
// reportReasonSchema.index({ searchId: 1, userId: 1 }, { unique: true })
const ReportReasonModel = (0, mongoose_1.model)('reportReason', reportReasonSchema);
exports.default = ReportReasonModel;
