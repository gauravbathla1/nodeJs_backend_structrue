"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const GroupRequestInterface_1 = require("../interfaces/GroupRequestInterface");
const requestSchema = new mongoose_1.Schema({
    userId: {
        type: mongoose_1.Types.ObjectId,
        required: true
    },
    groupId: {
        type: mongoose_1.Types.ObjectId,
        required: true
    },
    groupCode: {
        type: String,
    },
    sendBy: {
        type: mongoose_1.Types.ObjectId,
        required: true
    },
    status: {
        type: Number,
        enum: [GroupRequestInterface_1.GroupRequestStatus.accepted, GroupRequestInterface_1.GroupRequestStatus.pending, GroupRequestInterface_1.GroupRequestStatus.rejected],
        default: GroupRequestInterface_1.GroupRequestStatus.pending
    }
}, { timestamps: true });
requestSchema.index({ userId: 1, groupId: 1, sendBy: 1 }, { unique: true });
const GroupRequestModel = (0, mongoose_1.model)('GroupRequest', requestSchema);
exports.default = GroupRequestModel;
