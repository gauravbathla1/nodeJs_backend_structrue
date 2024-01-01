"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const favoriteSchema = new mongoose_1.Schema({
    groupId: {
        type: mongoose_1.Types.ObjectId,
        required: true
    },
    userId: {
        type: mongoose_1.Types.ObjectId,
        required: true
    }
}, { timestamps: true });
favoriteSchema.index({ groupId: 1, userId: 1 }, { unique: true });
const GroupFavoriteModel = (0, mongoose_1.model)('GroupFavorite', favoriteSchema);
exports.default = GroupFavoriteModel;
