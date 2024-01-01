"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const colorSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    code: {
        type: String,
        required: true,
        trim: true,
        maxlength: 7,
        minlength: 7
    },
}, { timestamps: true });
colorSchema.index({ name: 1 }, { unique: true });
colorSchema.index({ code: 1 }, { unique: true });
const ColorModel = (0, mongoose_1.model)('color', colorSchema);
exports.default = ColorModel;
