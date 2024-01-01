"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const mongoose = require("mongoose");
const aggregatePaginate = require('mongoose-aggregate-paginate-v2');
const techniqueSchema = new mongoose_1.Schema({
    techniqueName: {
        type: String,
        default: null,
    },
    image: {
        type: String,
        default: null,
    },
    categoryName: {
        type: String,
        default: null,
    },
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'category'
    },
    instructionContent: {
        content: {
            type: String,
            default: null,
        },
        animation: {
            type: String,
            default: null,
        }
    },
    whyItWorksContent: {
        content: {
            type: String,
            default: null,
        },
        animation: {
            type: String,
            default: null,
        }
    },
    isActive: {
        type: Boolean,
        default: true,
    },
    isDeleted: {
        type: Boolean,
        default: false,
    }
}, { timestamps: true });
techniqueSchema.plugin(aggregatePaginate);
const TechniqueModel = (0, mongoose_1.model)('technique', techniqueSchema);
exports.default = TechniqueModel;
