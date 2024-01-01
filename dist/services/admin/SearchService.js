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
const SearchConstant_1 = require("../../constants/SearchConstant");
const SearchModel_1 = require("../../models/SearchModel");
class SearchService {
    /**
     *
     * @param category
     * @returns true
     */
    addCategoryDocument(category) {
        return __awaiter(this, void 0, void 0, function* () {
            yield SearchModel_1.default.create({
                title: category.name,
                belongsTo: SearchConstant_1.SEARCH_BELONGS_TO.category,
                categoryId: category._id,
                categorySlug: category.slug,
                queryKey: 'categorySlug',
                icon: category.image
            });
            return true;
        });
    }
    /**
     *
     * @param category category document
     * @param isActive boolean
     * @returns true
     */
    updateCategoryDocument(category, isActive = true) {
        return __awaiter(this, void 0, void 0, function* () {
            yield SearchModel_1.default.updateMany({
                belongsTo: SearchConstant_1.SEARCH_BELONGS_TO.category,
                categoryId: category._id
            }, {
                categorySlug: category.slug,
                title: category.name,
                icon: category.name,
                isActive
            });
            return true;
        });
    }
    /**
     *
     * @param subcategory subcategory document
     * @returns true
     */
    addSubcategoryDocument(subcategory) {
        return __awaiter(this, void 0, void 0, function* () {
            yield SearchModel_1.default.create({
                title: subcategory.name,
                belongsTo: SearchConstant_1.SEARCH_BELONGS_TO.subcategory,
                categoryId: subcategory.category,
                categorySlug: subcategory.categorySlug,
                queryKey: 'subcategorySlug',
                icon: subcategory.image,
                subcategoryId: subcategory._id,
                subcategorySlug: subcategory.slug
            });
            return true;
        });
    }
    /**
     *
     * @param subcategory document
     * @param isActive boolean
     * @returns true
     */
    updateSubcategoryDocument(subcategory, isActive = true) {
        return __awaiter(this, void 0, void 0, function* () {
            yield SearchModel_1.default.updateMany({
                belongsTo: SearchConstant_1.SEARCH_BELONGS_TO.subcategory,
                subcategoryId: subcategory._id
            }, {
                title: subcategory.name,
                icon: subcategory.image,
                subcategorySlug: subcategory.slug,
                isActive
            });
            return true;
        });
    }
    /**
     *
     * @param section section document
     * @returns true
     */
    addSectionDocument(section) {
        return __awaiter(this, void 0, void 0, function* () {
            yield SearchModel_1.default.create({
                title: section.name,
                belongsTo: SearchConstant_1.SEARCH_BELONGS_TO.section,
                categoryId: section.category,
                categorySlug: section.categorySlug,
                queryKey: 'sectionSlug',
                icon: section.image,
                sectionId: section._id,
                sectionSlug: section.slug,
                subcategoryId: section.subcategory,
                subcategorySlug: section.subcategorySlug,
            });
            return true;
        });
    }
    /**
     *
     * @param section document
     * @param isActive boolean
     * @returns true
     */
    updateSectionDocument(section, isActive = true) {
        return __awaiter(this, void 0, void 0, function* () {
            yield SearchModel_1.default.updateMany({
                belongsTo: SearchConstant_1.SEARCH_BELONGS_TO.section,
                sectionId: section._id
            }, {
                title: section.name,
                icon: section.image,
                sectionSlug: section.slug,
                isActive
            });
            return true;
        });
    }
    /**
     *
     * @param product Product Document
     * @returns true
     */
    addProductDocument(product) {
        return __awaiter(this, void 0, void 0, function* () {
            yield SearchModel_1.default.create({
                title: product.name,
                belongsTo: SearchConstant_1.SEARCH_BELONGS_TO.product,
                categoryId: product.categoryId,
                categorySlug: product.categorySlug,
                productId: product._id,
                productSlug: product.slug,
                subcategoryId: product.subcategoryId,
                subcategorySlug: product.subcategorySlug,
                sectionId: product.sectionId,
                sectionSlug: product.sectionSlug,
            });
            return true;
        });
    }
    /**
     *
     * @param product Product Document
     * @param isActive boolean
     * @returns true
     */
    updateProductDocument(product, isActive = true) {
        return __awaiter(this, void 0, void 0, function* () {
            yield SearchModel_1.default.updateOne({
                belongsTo: SearchConstant_1.SEARCH_BELONGS_TO.product,
                productId: product._id
            }, {
                title: product.name,
                isActive,
                productSlug: product.slug
            });
            return true;
        });
    }
}
exports.default = new SearchService();
