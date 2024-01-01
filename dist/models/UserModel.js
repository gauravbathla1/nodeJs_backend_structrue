"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const aggregatePaginate = require('mongoose-aggregate-paginate-v2');
const userSchema = new mongoose_1.Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
        lowercase: true,
        default: null
    },
    guestId: {
        type: String,
        default: null
    },
    isEmailVerified: {
        type: Boolean,
        default: true
    },
    isAccountActive: {
        type: Boolean,
        default: true
    },
    account_type: [{
            type: String,
            default: 'Email'
        }],
    deviceId: {
        type: String,
        default: null
    },
    google_info: {
        social_id: { type: String, default: null },
        social_token: { type: String, default: null },
    },
    apple_info: {
        social_id: { type: String, default: null },
        social_token: { type: String, default: null },
    },
    lastLogin: {
        type: Date
    }
}, { timestamps: true });
userSchema.plugin(aggregatePaginate);
const UserModel = (0, mongoose_1.model)('user', userSchema);
exports.default = UserModel;
