"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const bannerSchema = new mongoose_1.Schema({
    clickUrl: {
        type: String,
    },
    photo: {
        type: String,
    },
    deviceType: {
        type: String,
        enum: ['WEB', 'MOBILE']
    },
    isActive: {
        type: Boolean,
        default: true
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true });
const BannerModel = (0, mongoose_1.model)('Banner', bannerSchema);
exports.default = BannerModel;
