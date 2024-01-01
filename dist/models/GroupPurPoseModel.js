"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const GroupPurposeSchema = new mongoose_1.Schema({
    text: {
        type: String,
        required: true,
        trim: true
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, { timestamps: true });
const GroupPurposeModel = (0, mongoose_1.model)('groupPurpose', GroupPurposeSchema);
exports.default = GroupPurposeModel;
