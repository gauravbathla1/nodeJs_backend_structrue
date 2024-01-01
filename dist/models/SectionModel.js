"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const sectionSchema = new mongoose_1.Schema({
    category: {
        type: mongoose_1.Types.ObjectId,
        required: true
    },
    subcategory: {
        type: mongoose_1.Types.ObjectId,
        required: true
    },
    name: {
        type: String,
        required: true,
        lowercase: true,
        trim: true
    },
    image: String,
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
    subcategorySlug: {
        type: String,
        lowercase: true,
        trim: true
    },
    categoryName: {
        type: String,
        lowercase: true,
        trim: true
    },
    subcategoryName: {
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
sectionSchema.index({ category: 1, subcategory: 1 });
const SectionModel = (0, mongoose_1.model)('Section', sectionSchema);
exports.default = SectionModel;
