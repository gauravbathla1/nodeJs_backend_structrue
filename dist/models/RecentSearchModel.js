"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const recentSearchSchema = new mongoose_1.Schema({
    userId: {
        type: mongoose_1.Types.ObjectId,
        required: true
    },
    searchText: {
        type: String,
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
recentSearchSchema.index({ searchText: 1, userId: 1 }, { unique: true });
const RecentSearchModel = (0, mongoose_1.model)('recentSearch', recentSearchSchema);
exports.default = RecentSearchModel;
