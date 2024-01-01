"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const aggregatePaginate = require('mongoose-aggregate-paginate-v2');
const viewedSchema = new mongoose_1.Schema({
    viewBy: [{
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: 'user'
        }],
    situation: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'situation'
    },
    technique: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'technique'
    }
}, { timestamps: true });
viewedSchema.plugin(aggregatePaginate);
const ViewModel = (0, mongoose_1.model)('view', viewedSchema);
exports.default = ViewModel;
