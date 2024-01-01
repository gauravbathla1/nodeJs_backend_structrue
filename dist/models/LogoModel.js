"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const logoSchema = new mongoose_1.Schema({
    name: {
        type: String,
        default: null
    },
    isActive: {
        type: Boolean,
        default: false
    },
    logo: {
        type: String,
        default: null
    },
    sponserType: {
        type: String,
        enum: ['gold', 'silver', 'main']
    },
    email: {
        type: String,
        default: null
    },
    isBannerActive: {
        type: Boolean,
        default: false
    },
}, { timestamps: true });
const LogoModel = (0, mongoose_1.model)('logo', logoSchema);
exports.default = LogoModel;
