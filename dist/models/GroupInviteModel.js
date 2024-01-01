"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const GroupInviteInterface_1 = require("../interfaces/GroupInviteInterface");
const inviteSchema = new mongoose_1.Schema({
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    groupCode: {
        type: String,
        trim: true,
    },
    groupId: {
        type: mongoose_1.Types.ObjectId,
    },
    invitedBy: {
        type: mongoose_1.Types.ObjectId,
    },
    status: {
        type: Number,
        enum: [GroupInviteInterface_1.GroupInviteStatus.accepted, GroupInviteInterface_1.GroupInviteStatus.invited],
        default: GroupInviteInterface_1.GroupInviteStatus.invited
    }
}, { timestamps: true });
inviteSchema.index({ groupId: 1, invitedBy: 1, email: 1 }, { unique: true });
inviteSchema.index({ groupCode: 1 });
const GroupInviteModel = (0, mongoose_1.model)('GroupInvite', inviteSchema);
exports.default = GroupInviteModel;
