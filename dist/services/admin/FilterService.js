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
const CategoryModel_1 = require("../../models/CategoryModel");
const FilterModel_1 = require("../../models/FilterModel");
const ApiFeatures_1 = require("../../utils/ApiFeatures");
class FilterService {
    /**
     * @description create filter
     * @param categoryId
     * @returns
     */
    createFilter(categoryId) {
        return __awaiter(this, void 0, void 0, function* () {
            const isFilterExists = yield FilterModel_1.default.exists({ categoryId });
            if (!isFilterExists)
                yield FilterModel_1.default.create({ categoryId });
            return;
        });
    }
    /**
     *
     * @param categoryId
     * @param data {
            colors?: string[],
            brand?: { _id: string | ObjectId, name: string },
            subcategory?: { _id: string | ObjectId, name: string },
            price?: number,
            attributeList?: { name: string, values: string[] }[]
        }
     * @returns void
     */
    updateFilter(categoryId, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const { colors, brand, subcategory, price, rating, attributeList } = data;
            let filter = yield FilterModel_1.default.findOne({ categoryId });
            if (!filter) {
                const category = yield CategoryModel_1.default.findById(categoryId);
                filter = yield FilterModel_1.default.create({ categoryId, categorySlug: category.slug });
            }
            if (colors)
                filter = yield this.updateColors(filter, colors);
            if (brand)
                filter = yield this.updateBrands(filter, brand);
            if (subcategory)
                filter = yield this.updateSubcategories(filter, subcategory);
            if (price)
                filter = yield this.updatePrice(filter, price);
            if (price)
                filter = yield this.updateRatings(filter, rating);
            if (attributeList)
                filter = yield this.updateAttributes(filter, attributeList);
            yield filter.save();
            return;
        });
    }
    /**
     *
     * @param filter
     * @param colors
     * @returns updated filter
     */
    updateColors(filter, colors) {
        return __awaiter(this, void 0, void 0, function* () {
            colors.forEach((color) => {
                if (!filter.color.list.includes(color)) {
                    filter.color.list.push(color);
                }
            });
            return filter;
        });
    }
    updateRatings(filter, rating) {
        return __awaiter(this, void 0, void 0, function* () {
            const ratingAvg = Math.floor(rating);
            if (ratingAvg && !filter.rating.list.includes(ratingAvg))
                filter.rating.list.push(ratingAvg);
            return filter;
        });
    }
    /**
     *
     * @param filter
     * @param brand
     * @returns updated filter
     */
    updateBrands(filter, brand) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!filter.brands.list.some((e) => JSON.stringify(e._id) === JSON.stringify(brand._id)))
                filter.brands.list.push(brand);
            return filter;
        });
    }
    /**
     *
     * @param filter
     * @param subcategory
     * @returns updated filter
     */
    updateSubcategories(filter, subcategory) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!filter.subcategories.list.some((e) => JSON.stringify(e._id) === JSON.stringify(subcategory._id)))
                filter.subcategories.list.push(subcategory);
            return filter;
        });
    }
    /**
     *
     * @param filter
     * @param price
     * @returns updated filter
     */
    updatePrice(filter, price) {
        return __awaiter(this, void 0, void 0, function* () {
            if (filter.price.maxPrice < price) {
                filter.price.maxPrice = price;
            }
            if (filter.price.minPrice > price || filter.price.minPrice === 0) {
                filter.price.minPrice = price;
            }
            return filter;
        });
    }
    /**
     * @param filter
     * @param list
     * @returns updated filter
     */
    updateAttributes(filter, list) {
        return __awaiter(this, void 0, void 0, function* () {
            const attributes = filter.attributes.attributes;
            list.forEach((item) => {
                const attribute = attributes.find((e) => e.queryKey === item.name);
                if (attribute) {
                    item.values.forEach((element) => {
                        if (!attribute.list.includes(element))
                            attribute.list.push(element);
                    });
                }
                else {
                    attributes.push({ displayKey: item.name, queryKey: item.name, list: [...item.values] });
                }
            });
            return filter;
        });
    }
    /**
     *
     * @param queryString
     * @returns
     */
    list(queryString) {
        return __awaiter(this, void 0, void 0, function* () {
            const countQuery = FilterModel_1.default.find({});
            const countFeature = new ApiFeatures_1.ApiFeatures(countQuery, queryString)
                .getCount();
            const lisQuery = FilterModel_1.default.find({});
            const listFeature = new ApiFeatures_1.ApiFeatures(lisQuery, queryString)
                .fieldsLimiting()
                .pagination();
            const count = yield countFeature.query;
            const list = yield listFeature.query;
            return { list, count };
        });
    }
}
exports.default = new FilterService();
