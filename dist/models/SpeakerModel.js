"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const speakerSchema = new mongoose_1.Schema({
    name: {
        type: String,
        default: null
    },
    isActive: {
        type: Boolean,
        default: false
    },
    profilePic: {
        type: String,
        default: null
    },
    title: {
        type: String,
        default: null
    },
    companyName: {
        type: String,
        default: null
    },
}, { timestamps: true });
const SpeakerModel = (0, mongoose_1.model)('speaker', speakerSchema);
exports.default = SpeakerModel;
