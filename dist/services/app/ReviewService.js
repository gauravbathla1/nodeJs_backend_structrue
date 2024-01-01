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
const ReviewModel_1 = require("../../models/ReviewModel");
class ReviewService {
    /**
    *
    * @param productId
    * @param userId
    * @param rating
    * @param description
    * @returns new added review
    */
    add(productId, userId, rating, description) {
        return __awaiter(this, void 0, void 0, function* () {
            const newReview = yield ReviewModel_1.default.create({ productId, userId, rating, description });
            return newReview;
        });
    }
    /** @param id {String} review id for updating review
   * @param rating rating of review
   * @param description description of review
   * @returns {Promise<ReviewInterface>} updated review
   */
    edit(_id, rating, description) {
        return __awaiter(this, void 0, void 0, function* () {
            const editreview = yield ReviewModel_1.default.findByIdAndUpdate(_id, {
                rating,
                description,
            }, {
                new: true
            });
            return editreview;
        });
    }
}
exports.default = new ReviewService();
