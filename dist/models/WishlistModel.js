"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const wishlistSchema = new mongoose_1.Schema({
    productId: {
        type: mongoose_1.Types.ObjectId,
        required: true
    },
    userId: {
        type: mongoose_1.Types.ObjectId,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});
wishlistSchema.index({ user: 1, product: 1 });
const WishlistModel = (0, mongoose_1.model)('Wishlist', wishlistSchema);
exports.default = WishlistModel;
