"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const GroupMemberInterface_1 = require("../interfaces/GroupMemberInterface");
const groupMemberSchema = new mongoose_1.Schema({
    group: {
        type: mongoose_1.Types.ObjectId,
        ref: 'group',
        required: true
    },
    groupCode: {
        type: String,
        required: true
    },
    member: {
        type: mongoose_1.Types.ObjectId,
        ref: 'user',
        required: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    isMuted: {
        type: Boolean,
        default: false
    },
    isLeft: {
        type: Boolean,
        default: false
    },
    leftTime: {
        type: Date,
        default: null
    },
    isRemoved: {
        type: Boolean,
        default: false
    },
    removedBy: {
        type: mongoose_1.Types.ObjectId,
        ref: 'user'
    },
    removeTime: {
        type: Date,
        default: null
    },
    isChatBlocked: {
        type: Boolean,
        default: false
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
    groupRequestStatus: {
        type: Number,
        enum: [GroupMemberInterface_1.GroupRequestStatus.accepted, GroupMemberInterface_1.GroupRequestStatus.pending, GroupMemberInterface_1.GroupRequestStatus.rejected, GroupMemberInterface_1.GroupRequestStatus.noRequest],
        default: GroupMemberInterface_1.GroupRequestStatus.pending
    },
    requestSentBy: {
        type: mongoose_1.Types.ObjectId
    },
    subgroups: {
        type: [mongoose_1.Types.ObjectId],
        default: []
    }
}, { timestamps: true });
groupMemberSchema.index({ member: 1, group: 1 }, { unique: true });
const GroupMemberModel = (0, mongoose_1.model)('groupMember', groupMemberSchema);
exports.default = GroupMemberModel;
