"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const aggregatePaginate = require('mongoose-aggregate-paginate-v2');
const categorySchema = new mongoose_1.Schema({
    name: {
        type: String,
        default: null,
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
categorySchema.plugin(aggregatePaginate);
const CategoryModel = (0, mongoose_1.model)('category', categorySchema);
exports.default = CategoryModel;
