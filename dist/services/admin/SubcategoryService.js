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
const ProductModel_1 = require("../../models/ProductModel");
const SectionModel_1 = require("../../models/SectionModel");
const SubcategoryModel_1 = require("../../models/SubcategoryModel");
const ApiFeatures_1 = require("../../utils/ApiFeatures");
const SearchService_1 = require("./SearchService");
class SubcategoryService {
    /**
     *
     * @param name {string} name of subcategory
     * @param category {string} object_id of category
     * @param image {string} absolute path of category image
     * @returns category {Promise<SubCategoryInterface>} new added category
     */
    add(name, category, categorySlug, slug, image) {
        return __awaiter(this, void 0, void 0, function* () {
            const newSubCategory = yield SubcategoryModel_1.default.create({ name, category, image, slug, categorySlug });
            yield SearchService_1.default.addSubcategoryDocument(newSubCategory);
            return newSubCategory;
        });
    }
    /**
     *
     * @param _id id of subcategory
     * @param name name of subcategory
     * @param category related category id
     * @param image image absolute path (url)
     * @returns  {Promise<SubcategoryInterface>}
     */
    update(_id, name, category, image, slug, categorySlug) {
        return __awaiter(this, void 0, void 0, function* () {
            const updatedSubCategory = yield SubcategoryModel_1.default.findByIdAndUpdate(_id, {
                name,
                category,
                image,
                slug,
                categorySlug
            }, {
                new: true
            });
            yield ProductModel_1.default.updateMany({
                subcategoryId: _id
            }, {
                subcategoryName: name,
                subcategorySlug: slug
            });
            yield SectionModel_1.default.updateMany({ subcategory: _id }, { subcategorySlug: slug, subcategoryName: name });
            yield SearchService_1.default.updateSubcategoryDocument(updatedSubCategory);
            return updatedSubCategory;
        });
    }
    /**
     *
     * @param id {String} subcategory id
     * @returns {Promise<SubcategoryInterface>} subcategory data
     */
    get(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const subCategoryData = yield SubcategoryModel_1.default.findById(id);
            return subCategoryData;
        });
    }
    /**
    *
    * @param id {String} subcategory id
    * @returns {Promise<SubcategoryInterface>} subcategory data
    */
    delete(_id, isDeleted) {
        return __awaiter(this, void 0, void 0, function* () {
            const subCategoryData = yield SubcategoryModel_1.default.findByIdAndUpdate(_id, { isDeleted });
            return subCategoryData;
        });
    }
    /**
    *
    * @param queryString req query object
    * @params subcategory id of subcategory
    * @returns
    */
    list(queryString, category) {
        return __awaiter(this, void 0, void 0, function* () {
            const countQuery = SubcategoryModel_1.default.find({ isDeleted: false, category });
            const countFeature = new ApiFeatures_1.ApiFeatures(countQuery, queryString)
                .filtering()
                .searching(['name'])
                .getCount();
            const lisQuery = SubcategoryModel_1.default.find({ isDeleted: false, category });
            const listFeature = new ApiFeatures_1.ApiFeatures(lisQuery, queryString)
                .filtering()
                .searching(['name'])
                .sorting('-createdAt')
                .fieldsLimiting()
                .pagination();
            const count = yield countFeature.query;
            const list = yield listFeature.query;
            return { count, list };
        });
    }
}
exports.default = new SubcategoryService;
