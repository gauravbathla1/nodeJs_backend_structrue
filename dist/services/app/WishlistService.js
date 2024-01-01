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
const WishlistModel_1 = require("../../models/WishlistModel");
const ApiFeatures_1 = require("../../utils/ApiFeatures");
class WishlistService {
    /**
     * @param ProductId {string} product of user
     * @param next {NextFunction} next function
     * @return {Promise<UserInterface>} add wishlist
     */
    add(productId, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const newWishlist = yield WishlistModel_1.default.create({ productId, userId });
            return newWishlist;
        });
    }
    /**
     *
     * @param queryString
     * @returns
     */
    list(queryString) {
        return __awaiter(this, void 0, void 0, function* () {
            const countQuery = WishlistModel_1.default.find({ isDeleted: false });
            const countFeature = new ApiFeatures_1.ApiFeatures(countQuery, queryString)
                .filtering()
                .searching(['name'])
                .getCount();
            const lisQuery = WishlistModel_1.default.find({ isDeleted: false });
            const listFeature = new ApiFeatures_1.ApiFeatures(lisQuery, queryString)
                .filtering()
                .searching(['name'])
                .sorting('-createdAt')
                .pagination();
            const count = yield countFeature.query;
            const list = yield listFeature.query;
            return { list, count };
        });
    }
}
exports.default = new WishlistService();
