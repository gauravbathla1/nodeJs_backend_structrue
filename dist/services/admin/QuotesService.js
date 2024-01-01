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
const QuoteModel_1 = require("../../models/QuoteModel");
class QuotesService {
    createQuote(Quotes) {
        return __awaiter(this, void 0, void 0, function* () {
            let quote = new QuoteModel_1.default({
                quote: Quotes
            });
            yield quote.save();
            return quote;
        });
    }
    editQuote(quoteId, quotes) {
        return __awaiter(this, void 0, void 0, function* () {
            let quote = QuoteModel_1.default.findByIdAndUpdate({ _id: quoteId }, { quote: quotes }, { new: true });
            return quote;
        });
    }
    deleteQuotes(quoteId) {
        return __awaiter(this, void 0, void 0, function* () {
            let quote = QuoteModel_1.default.findByIdAndUpdate({ _id: quoteId }, { isDeleted: true }, { new: true });
            return quote;
        });
    }
    getQuotes(options) {
        return __awaiter(this, void 0, void 0, function* () {
            let myAggregate = QuoteModel_1.default.aggregate([{
                    $match: {
                        isDeleted: false
                    }
                }]);
            let quotes = QuoteModel_1.default.aggregatePaginate(myAggregate, options);
            return quotes;
        });
    }
    ;
    updateQuotesPosition() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let currentQuote = yield QuoteModel_1.default.findOne({ isShowing: true });
                let nextQuote = yield QuoteModel_1.default.findOne({ createdAt: { $gt: currentQuote === null || currentQuote === void 0 ? void 0 : currentQuote.createdAt }, isDeleted: false });
                if (nextQuote) {
                    nextQuote.isShowing = true;
                    currentQuote.isShowing = false;
                    yield currentQuote.save();
                    yield nextQuote.save();
                    return;
                }
                else {
                    let quote = yield QuoteModel_1.default.findOne({ isDeleted: false }).sort('createdAt');
                    quote.isShowing = true;
                    if (currentQuote) {
                        currentQuote.isShowing = false;
                        yield currentQuote.save();
                    }
                    yield quote.save();
                    return;
                }
            }
            catch (error) {
                console.log(error);
            }
        });
    }
}
const quotesAdminService = new QuotesService(); // Create an instance of categoryService
exports.default = quotesAdminService;
// export default new SpeakerService();
