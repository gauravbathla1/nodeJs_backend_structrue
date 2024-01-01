"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const subgroupSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    groupId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'group'
    },
    groupName: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true
    },
    icon: {
        type: String,
        required: true
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
    totalMember: {
        type: Number,
        default: 0
    },
    memberLimit: {
        type: Number,
        required: true
    },
    createdBy: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'user'
    },
    members: {
        type: [mongoose_1.Schema.Types.ObjectId],
        default: []
    }
}, { timestamps: true });
const SubgroupModel = (0, mongoose_1.model)('subgroup', subgroupSchema);
exports.default = SubgroupModel;
