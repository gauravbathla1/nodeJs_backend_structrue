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
const ResponseHelper_1 = require("../../helpers/ResponseHelper");
const QuotesService_1 = require("../../services/admin/QuotesService");
class QuotesController {
    createQuote(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let { quote } = req.body;
                yield QuotesService_1.default.createQuote(quote);
                return ResponseHelper_1.default.created(res, "Quote Added successfully", {});
            }
            catch (error) {
                next(error);
            }
        });
    }
    editQuote(req, res, next) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let quoteId = (_a = req.params) === null || _a === void 0 ? void 0 : _a.id;
                let { quote } = req.body;
                yield QuotesService_1.default.editQuote(quoteId, quote);
                return ResponseHelper_1.default.ok(res, "Quote Updated successfully", {});
            }
            catch (error) {
                next(error);
            }
        });
    }
    deleteQuote(req, res, next) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let quoteId = (_a = req.params) === null || _a === void 0 ? void 0 : _a.id;
                const quote = yield QuotesService_1.default.deleteQuotes(quoteId);
                return ResponseHelper_1.default.ok(res, "quote Deleted successfully", { quote });
            }
            catch (error) {
                next(error);
            }
        });
    }
    getQuotes(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let page = req.query.page || 1;
                let options = {
                    page: page || 1,
                    limit: 10,
                    sort: {
                        created_at: -1,
                    },
                };
                let quotes = yield QuotesService_1.default.getQuotes(options);
                return ResponseHelper_1.default.ok(res, "Quotes find successfully", { quotes });
            }
            catch (error) {
                next;
            }
        });
    }
}
exports.default = new QuotesController();
