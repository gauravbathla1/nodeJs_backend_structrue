"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const mongoose = require("mongoose");
const aggregatePaginate = require('mongoose-aggregate-paginate-v2');
const situationSchema = new mongoose_1.Schema({
    situationName: {
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
    peaceContent: {
        content: {
            type: String,
            default: null,
        },
        animation: {
            type: String,
            default: null,
        }
    },
    flowContent: {
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
situationSchema.plugin(aggregatePaginate);
const SituationModel = (0, mongoose_1.model)('situation', situationSchema);
exports.default = SituationModel;
