"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const aggregatePaginate = require('mongoose-aggregate-paginate-v2');
const searchSchema = new mongoose_1.Schema({
    searchText: {
        type: String,
        default: null,
    },
}, { timestamps: true });
searchSchema.plugin(aggregatePaginate);
const SearchModel = (0, mongoose_1.model)('search', searchSchema);
exports.default = SearchModel;
