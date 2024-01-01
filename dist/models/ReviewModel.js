"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const reviewSchema = new mongoose_1.Schema({
    productId: {
        type: mongoose_1.Types.ObjectId,
        required: true
    },
    userId: {
        type: mongoose_1.Types.ObjectId,
        required: true
    },
    rating: {
        type: Number,
    },
    description: {
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
const ReviewModel = (0, mongoose_1.model)('Review', reviewSchema);
exports.default = ReviewModel;
