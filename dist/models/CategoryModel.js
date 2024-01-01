"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const categorySchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    image: {
        type: String,
    },
    isActive: {
        type: Boolean,
        default: true
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
    slug: {
        type: String,
        unique: true,
        lowercase: true
    },
    productSold: {
        type: Number,
        default: 0
    },
    attributes: {
        type: [String],
        default: []
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
const CategoryModel = (0, mongoose_1.model)('Category', categorySchema);
exports.default = CategoryModel;
