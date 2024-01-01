"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const subcategorySchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
        lowercase: true,
        trim: true
    },
    category: {
        type: mongoose_1.Types.ObjectId,
        required: true
    },
    image: {
        type: String,
    },
    slug: {
        type: String,
        lowercase: true,
        trim: true
    },
    categorySlug: {
        type: String,
        lowercase: true,
        trim: true
    },
    categoryName: {
        type: String,
        lowercase: true,
        trim: true
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
subcategorySchema.index({ categorySlug: 1, slug: 1 }, { unique: true });
subcategorySchema.index({ categoryName: 1, name: 1 }, { unique: true });
const SubcategoryModel = (0, mongoose_1.model)('Subcategory', subcategorySchema);
exports.default = SubcategoryModel;
