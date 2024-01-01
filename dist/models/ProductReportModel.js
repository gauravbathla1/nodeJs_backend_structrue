"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const ProductModel_1 = require("./ProductModel");
const productReportSchema = new mongoose_1.Schema({
    userId: {
        type: mongoose_1.Types.ObjectId,
        required: true
    },
    productId: {
        type: mongoose_1.Types.ObjectId,
        required: true
    },
    reasonId: {
        type: mongoose_1.Types.ObjectId,
        required: true
    },
    reasonText: {
        type: String,
        default: null
    }
}, { timestamps: true });
productReportSchema.index({ userId: 1, productId: 1 }, { unique: true });
productReportSchema.post('save', function (doc) {
    return __awaiter(this, void 0, void 0, function* () {
        yield ProductModel_1.default.findByIdAndUpdate(doc.productId, {
            $inc: { 'totalReports': 1 }
        });
    });
});
const ProductReportModel = (0, mongoose_1.model)('ProductReport', productReportSchema);
exports.default = ProductReportModel;
