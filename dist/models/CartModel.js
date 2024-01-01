"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const CartSchema = new mongoose_1.Schema({
    productId: {
        type: mongoose_1.Types.ObjectId,
        required: true
    },
    userId: {
        type: mongoose_1.Types.ObjectId,
        required: true
    },
    quantity: {
        type: Number,
    },
    color: {
        type: String,
        default: null
    },
    attributes: {
        type: [
            {
                _id: false,
                name: String,
                value: String
            }
        ],
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
});
const CartModel = (0, mongoose_1.model)('Cart', CartSchema);
exports.default = CartModel;
