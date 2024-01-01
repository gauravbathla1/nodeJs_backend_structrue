"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const brandSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
        lowercase: true
    },
    categories: {
        type: [mongoose_1.Types.ObjectId],
        default: []
    },
    isActive: {
        type: Boolean,
        default: true
    },
    logo: {
        type: String,
        default: null
    },
    slug: {
        type: String,
        lowercase: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
    timeStamp: {
        type: Number,
        default: Date.now
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });
brandSchema.index({ name: 1 }, { unique: true });
const BrandModel = (0, mongoose_1.model)('Brand', brandSchema);
exports.default = BrandModel;
