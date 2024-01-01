"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const SearchConstant_1 = require("../constants/SearchConstant");
const searchSchema = new mongoose_1.Schema({
    title: {
        type: String,
        lowercase: true,
        trim: true
    },
    icon: {
        type: String
    },
    belongsTo: {
        type: Number,
        enum: Object.values(SearchConstant_1.SEARCH_BELONGS_TO)
    },
    categorySlug: {
        type: String,
    },
    subcategorySlug: {
        type: String
    },
    sectionSlug: {
        type: String
    },
    productSlug: {
        type: String
    }
}, { timestamps: true });
searchSchema.index({ title: 1 }, { textIndexVersion: 1 });
const SearchModel = (0, mongoose_1.model)('search', searchSchema);
exports.default = SearchModel;
