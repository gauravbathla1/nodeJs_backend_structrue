"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const adminSchema = new mongoose_1.Schema({
    email: {
        type: String,
        lowercase: true,
        trim: true,
        default: null
    },
    password: {
        type: String,
    },
    name: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    passwordChangedAt: {
        type: Date,
    },
    otp: {
        type: Number,
        default: null
    },
    otp_expiry: {
        type: Date,
        default: null
    }
}, { timestamps: true });
const AdminModel = (0, mongoose_1.model)('Admin', adminSchema);
exports.default = AdminModel;
