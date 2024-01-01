"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const aggregatePaginate = require('mongoose-aggregate-paginate-v2');
const quoteSchema = new mongoose_1.Schema({
    quote: {
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
    },
    isShowing: {
        type: Boolean,
        default: false,
    }
}, { timestamps: true });
quoteSchema.plugin(aggregatePaginate);
const QuoteModelModel = (0, mongoose_1.model)('quotes', quoteSchema);
exports.default = QuoteModelModel;
