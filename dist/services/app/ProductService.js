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
const mongoose_1 = require("mongoose");
const CartModel_1 = require("../../models/CartModel");
const ProductReportModel_1 = require("../../models/ProductReportModel");
const WishlistModel_1 = require("../../models/WishlistModel");
// import RecentSearchModel from "../../models/RecentSearchModel";
// import * as mongoose from "mongoose";
class ProductService {
    productList(queryObj) {
        return __awaiter(this, void 0, void 0, function* () {
            let match = {
                isDeleted: false,
                isActive: true
            };
            const sort = queryObj.sort || '-createdAt';
            const pipeline = [
                this.setFilters(queryObj, match),
                this.getSort(sort),
                this.setFacet(queryObj),
                this.countProject()
            ];
            let count = 0;
            let products = [];
            const productData = yield ProductModel_1.default.aggregate(pipeline);
            if (productData && productData.length) {
                count = productData[0].count;
                products = productData[0].products;
            }
            return { count, products };
        });
    }
    // private async setRecentSearch(queryObj: any): Promise<void> {
    //     const userId = queryObj.userId;
    //     const search = queryObj.search;
    //     if (userId) {
    //         const searchExist = await RecentSearchModel.exists({ searchText: search, userId })
    //         if (!searchExist) await RecentSearchModel.create({ searchText: search, userId });
    //     }
    // }
    setFilters(queryObj, match) {
        if (queryObj.categoryId) {
            match.categoryId = new mongoose_1.Types.ObjectId(queryObj.categoryId);
        }
        if (queryObj.categorySlug) {
            match.categorySlug = queryObj.categorySlug;
        }
        const subcategory = queryObj.subcategory;
        if (subcategory && subcategory.length)
            match.subcategorySlug = {
                '$in': subcategory.map((e) => e = e.trim())
            };
        const sectionSlug = queryObj.sectionSlug;
        if (sectionSlug && sectionSlug.trim())
            match.sectionSlug = sectionSlug;
        const brands = queryObj.brands;
        if (brands && brands.length)
            match.brandSlug = {
                '$in': brands.map((e) => e = e.trim())
            };
        const colors = queryObj.colors;
        if (colors && colors.length)
            match.colors = {
                '$in': colors
            };
        const price = queryObj.price;
        if (price && price.length) {
            const [min, max] = price;
            match.salePrice = { $gte: min, $lte: max };
        }
        const attributes = queryObj.attributes;
        if (attributes && attributes.length) {
            const attributeValues = [];
            attributes.forEach((e) => {
                attributeValues.push(...e.values);
            });
            if (attributeValues.length)
                match.attributeValues = {
                    '$in': attributeValues
                };
        }
        console.log('match', JSON.stringify(match));
        return { '$match': match };
    }
    getSort(field) {
        let sort = { 'createdAt': -1 };
        if (field === '-popularity') {
            sort = { 'productSold': -1 };
        }
        if (field === 'popularity') {
            sort = { 'productSold': 1 };
        }
        if (field === 'rating') {
            sort = { 'ratingsAvg': 1 };
        }
        if (field === '-rating') {
            sort = { 'ratingsAvg': -1 };
        }
        if (field === 'price') {
            sort = { 'salePrice': 1 };
        }
        if (field === '-price') {
            sort = { 'salePrice': -1 };
        }
        if (field === 'name') {
            sort = { 'name': 1 };
        }
        if (field === '-name') {
            sort = { 'name': -1 };
        }
        if (field === 'newestFirst') {
            sort = { 'createdAt': -1 };
        }
        return { '$sort': sort };
    }
    skipLimit(skip, limit) {
        return [
            {
                '$skip': skip
            },
            {
                '$limit': limit
            }
        ];
    }
    setFacet(queryObj) {
        const page = queryObj.page * 1 || 1;
        const limit = queryObj.limit * 1 || 16;
        const skip = (page - 1) * limit;
        const facet = {
            'count': [
                {
                    '$count': 'count'
                }
            ],
            'products': [
                ...this.skipLimit(skip, limit),
                this.projectKeys()
            ]
        };
        if (queryObj.userId) {
            const userId = new mongoose_1.Types.ObjectId(queryObj.userId);
            facet.products = [
                ...this.skipLimit(skip, limit),
                this.cartCheck(userId),
                this.wishlistCheck(userId),
                this.projectKeys(true)
            ];
        }
        return { '$facet': facet };
    }
    countProject() {
        return {
            '$project': {
                'count': {
                    '$ifNull': [
                        {
                            '$first': '$count.count'
                        }, 0
                    ]
                },
                'products': '$products'
            }
        };
    }
    wishlistCheck(userId) {
        return {
            '$lookup': {
                'from': 'wishlists',
                'let': {
                    'pid': '$_id'
                },
                'as': 'wishlist',
                'pipeline': [
                    {
                        '$match': {
                            'userId': userId,
                            '$expr': {
                                '$eq': [
                                    '$$pid', '$productId'
                                ]
                            }
                        }
                    }, {
                        '$limit': 1
                    }
                ]
            }
        };
    }
    cartCheck(userId) {
        return {
            '$lookup': {
                'from': 'carts',
                'let': {
                    'pid': '$_id'
                },
                'as': 'cart',
                'pipeline': [
                    {
                        '$match': {
                            'userId': userId,
                            '$expr': {
                                '$eq': [
                                    '$$pid', '$productId'
                                ]
                            }
                        }
                    },
                    {
                        '$limit': 1
                    }
                ]
            }
        };
    }
    projectKeys(isLoggedIn = false) {
        const project = {
            '$project': {
                'coverPhoto': 1,
                'name': 1,
                'salePrice': 1,
                'regularPrice': 1,
                'ratingsTotal': 1,
                'ratingsAvg': 1,
                'slug': 1,
                'isWishlist': {
                    '$ifNull': [
                        '$wishlist',
                        false
                    ]
                },
                'isCart': {
                    '$ifNull': [
                        '$cart',
                        false
                    ]
                },
            }
        };
        if (isLoggedIn) {
            project['$project'].isWishlist = {
                '$gt': [
                    {
                        '$size': '$wishlist'
                    }, 0
                ]
            };
            project['$project'].isCart = {
                '$gt': [
                    {
                        '$size': '$cart'
                    },
                    0
                ]
            };
        }
        return project;
    }
    productDetails(productId, userId) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            const product = yield ProductModel_1.default.findById(productId).lean();
            if (userId) {
                const isCart = yield CartModel_1.default.exists({ productId, userId });
                product.isCart = isCart ? true : false;
                const isReported = yield ProductReportModel_1.default.exists({ productId, userId });
                product.isReported = isReported ? true : false;
                const isWishlist = yield WishlistModel_1.default.exists({ productId, userId });
                product.isWishlist = isWishlist ? true : false;
            }
            else {
                product.isCart = false;
                product.isReported = false;
                product.isWishlist = false;
            }
            const sizes = ((_b = ((_a = product === null || product === void 0 ? void 0 : product.attributes) === null || _a === void 0 ? void 0 : _a.find((e) => e.name === 'sizes'))) === null || _b === void 0 ? void 0 : _b.values) || [];
            product.sizes = sizes;
            const match = {
                '$match': {
                    'isDeleted': false,
                    'isActive': true,
                    'categoryId': product.categoryId
                }
            };
            let pipeline = [
                match,
                this.projectKeys()
            ];
            if (userId) {
                pipeline = [
                    match,
                    this.cartCheck(new mongoose_1.Types.ObjectId(userId)),
                    this.wishlistCheck(new mongoose_1.Types.ObjectId(userId)),
                    this.projectKeys(true)
                ];
            }
            const relatedProducts = yield ProductModel_1.default.aggregate(pipeline);
            return { product, relatedProducts };
        });
    }
}
exports.default = new ProductService();
