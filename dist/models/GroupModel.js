"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const GroupInterface_1 = require("../interfaces/GroupInterface");
const groupSchema = new mongoose_1.Schema({
    groupIcon: {
        type: String,
        default: null
    },
    groupCode: {
        type: String,
        unique: true,
        required: true
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    purposeId: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true
    },
    purposeText: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    goalInterval: {
        type: String,
        required: true,
        enum: [GroupInterface_1.GoalInterval.daily, GroupInterface_1.GoalInterval.weekly, GroupInterface_1.GoalInterval.yearly]
    },
    goalPrice: {
        type: Number,
        required: true
    },
    showContactInfo: {
        type: Boolean,
        default: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        trim: true
    },
    address: {
        type: String,
        required: true
    },
    city: {
        type: String,
        default: null
    },
    state: {
        type: String,
        default: null
    },
    zipCode: {
        type: String,
        default: null
    },
    showSocialInfo: {
        type: Boolean,
        default: true
    },
    facebookUrl: {
        type: String,
        default: null
    },
    twitterUrl: {
        type: String,
        default: null
    },
    members: {
        type: [mongoose_1.Schema.Types.ObjectId],
        dafault: []
    },
    createdBy: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'user'
    },
    totalMembers: {
        type: Number,
        default: 1
    },
    totalSubgroup: {
        type: Number,
        default: 0
    },
    subGroupLimit: {
        type: Number,
        default: 0
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
    groupSubscribed: {
        type: Boolean,
        default: false
    },
    subGroupSubscribed: {
        type: Boolean,
        default: false
    },
    featuredRank: {
        type: Number,
        default: 0
    },
    totalCashback: {
        type: Number,
        default: 0
    },
    isVerifiedByAdmin: {
        type: Boolean,
        default: false
    },
    isActive: {
        type: Boolean,
        default: false
    },
}, { timestamps: true });
const GroupModel = (0, mongoose_1.model)('group', groupSchema);
exports.default = GroupModel;
