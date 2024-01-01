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
const ProductModel_1 = require("../../models/ProductModel");
const mongoose_1 = require("mongoose");
const ProductService_1 = require("../../services/app/ProductService");
const SearchModel_1 = require("../../models/SearchModel");
class ProductController {
    /**
        * @api {get} /api/v1/app/product/search?search='text' Product Search
        * @apiHeader {String} App-Version Version Code 1.0.0.
        * @apiHeader {String} deviceType 'WEB'|'IOS'|'ANDROID'
        * @apiVersion 1.0.0
        * @apiName search
        *
        * @apiParam {String} search search text
        * @apiParam {String} [userId] if user logged in
        * @apiGroup App-Product
        *
        * @apiSuccessExample {json} Success-Response-1:
        *  {
        *   ratingsTotal
        *        "data": {
        *            "results": [
        *                           {
        *                    "_id": "62d672c8f055ab9d06da7821",
        *                    "name": "testedd",
        *                    "categoryId": "62d0136cff9b93f5383b08b1",
        *                    "regularPrice": 2500,
        *                    "salePrice": 15000
        *                }
        *            ]
        *        }
        *    }
        *
        */
    productSearch(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const queryString = req.query;
                const search = queryString.search;
                let match = {
                    isActive: true
                };
                if (search.trim()) {
                    match = {
                        title: { '$regex': search.trim() }
                    };
                }
                const results = yield SearchModel_1.default.find(match);
                return ResponseHelper_1.default.ok(res, res.__('search_results'), { results });
            }
            catch (error) {
                next(error);
            }
        });
    }
    /**
            * @api {get} /api/v1/app/product/list?page=1&limit=10 Product List
            * @apiHeader {String} App-Version Version Code 1.0.0.
            * @apiHeader {String} deviceType 'WEB'|'IOS'|'ANDROID'
            * @apiVersion 1.0.0
            * @apiName list
            * @apiGroup App-Product
            * @apiParam {Number} page page no default 1
            * @apiParam {Number} limit default 20
            * @apiParam {String} [product] product id
            * @apiParam {String} [subcategory] subcategory id
            * @apiParam {String} [section] section id
            * @apiSuccessExample {json} Success-Response-1:
            *  {
            *      "status": 200,
            *      "statusText": "SUCCESS",
            *      "message": "Search results",
            *      "data": {
            *          "results": [
            *              {
            *                  "_id": "631839c539987006d0011022",
            *                  "title": "american tourist",
            *                  "belongsTo": 4,
            *                  "categorySlug": "bags-and-luggage",
            *                  "subcategorySlug": "ladies-bags",
            *                  "sectionSlug": "luggage",
            *                  "categoryId": "62d0063bff9b93f5383b0109",
            *                  "subcategoryId": "62dfd514fb89c4b45de44fa8",
            *                  "sectionId": "62dfd690fb89c4b45de4501a",
            *                  "createdAt": "2022-09-07T06:27:17.727Z",
            *                  "updatedAt": "2022-09-07T06:27:17.727Z",
            *                  "__v": 0
            *              }
            *          ],
            *          "execTime": 42
            *      }
            *  }
            *
            */
    productList(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let page = Number(req.query.page) || 1;
                let limit = Number(req.query.limit) || 20;
                let skip = (page - 1) * limit;
                const match = {
                    'isDeleted': false
                };
                const product = req.query.product;
                const subcategory = req.query.subcategory;
                const section = req.query.section;
                if (product)
                    match.product = new mongoose_1.Types.ObjectId(product);
                if (subcategory)
                    match.subcategory = new mongoose_1.Types.ObjectId(subcategory);
                if (section)
                    match.section = new mongoose_1.Types.ObjectId(section);
                const aggregate = [
                    {
                        '$match': match
                    },
                    {
                        '$facet': {
                            'count': [
                                {
                                    '$count': 'count'
                                }
                            ],
                            'products': [
                                {
                                    '$skip': skip
                                },
                                {
                                    '$limit': limit
                                },
                                {
                                    '$project': {
                                        'isDeleted': 0
                                    }
                                }
                            ]
                        }
                    },
                    {
                        '$project': {
                            'count': {
                                '$first': '$count.count'
                            },
                            'products': '$products'
                        }
                    }
                ];
                const data = yield ProductModel_1.default.aggregate(aggregate);
                return ResponseHelper_1.default.ok(res, res.__('product_list'), data[0]);
            }
            catch (error) {
                next(error);
            }
        });
    }
    /**
            * @api {post} /api/v1/app/product/list Product List with Filter
            * @apiHeader {String} App-Version Version Code 1.0.0.
            * @apiHeader {String} deviceType 'WEB'|'IOS'|'ANDROID'
            * @apiVersion 1.0.0
            * @apiName list-filter
            * @apiGroup App-Product
            * @apiParam {Number} page page no default 1
            * @apiParam {Number} limit default 16
            * @apiParam {String} [categoryId] required if slug not provided
            * @apiParam {String} [categorySlug] required if categoryId not provided
            * @apiParam {String[]} [subcategory] array of subcategory slugs
            * @apiParam {String[]} [brands] array of brand slugs
            * @apiParam {Sting[]} [colors] array of colors name
            * @apiParam {Number} [price] [minPrice, maxPrice]
            * @apiParam {String} [sort] default,  popularity eg: price|-price|name|-name|rating|-rating|newestFirst
            * @apiParam {String} [userId] when user logged in
            * @apiDescription categoryId is mandatory, send query keys from filter list given every key in filter list. keyname 'queryKey'
            *
            * @apiParamExample {json} Request-Body
            * {
            *        "page": 1,
            *         "categoryId": "62dfd43efb89c4b45de44199",
            *        "limit": 10,
            *        "price": [450, 5000],
            *         "sort": "-price",
            *        "subcategory": ["dresses"]
            *    }
            *
            * @apiParamExample {json} Request-Body 2
            * {
            *        "page": 1,
            *        "limit": 29,
            *        "sort": "-price",
            *        "userId": "62e0e20233728726535d2de1",
            *        "attributes": [
            *            {
            *                "queryKey": "fabric",
            *                "values": ["regular", "nylon"]
            *            },
            *            {
            *                "queryKey": "sizes",
            *                "values": ["xs"]
            *            }
            *        ]
            *    }
            * @apiSuccessExample {json} Success-Response:
            * {
            *        "status": 200,
            *        "statusText": "SUCCESS",
            *        "message": "Product fetched successfully",
            *        "data": {
            *            "count": 1,
            *            "products": [
            *                {
            *                    "_id": "62dfd626fb89c4b45de44fee",
            *                    "name": "Toys",
            *                    "regularPrice": 3000,
            *                    "salePrice": 2000,
            *                    "coverPhoto": "product/62dfd626fb89c4b45de44fee/cover-photo/default.jpeg"
            *                }
            *            ],
            *            "execTime": 143
            *        }
            *    }
            *
            *
            */
    productListFilter(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const queryObj = req.body;
                if (queryObj === null || queryObj === void 0 ? void 0 : queryObj.price) {
                    const [min, max] = queryObj === null || queryObj === void 0 ? void 0 : queryObj.price;
                    if (min > max)
                        return ResponseHelper_1.default.badRequest(res, res.__('min_max_price'));
                }
                const data = yield ProductService_1.default.productList(queryObj);
                return ResponseHelper_1.default.ok(res, res.__('product_list'), data);
            }
            catch (error) {
                next(error);
            }
        });
    }
    /**
          * @api {get} /api/v1/app/product/details/_id? Product Details
          * @apiHeader {String} App-Version Version Code 1.0.0.
          * @apiHeader {String} deviceType 'WEB'|'IOS'|'ANDROID'
          * @apiVersion 1.0.0
          * @apiName product-detail
          * @apiGroup App-Product
          *
          * @apiParam {String} userId if user logged in
          * @apiDescription pass product _id as param, send userId as query params when user logged in
          * @apiSuccessExample {json} Success-Response-1:
           *  {
            *      "status": 200,
            *      "statusText": "SUCCESS",
            *      "message": "Product details fetched successfully",
            *      "data": {
            *          "product": {
            *              "_id": "62fe12f0cc3eefbecc5226b2",
            *              "name": "cricketBat",
            *              "sku": "DYVZW5ENH3",
            *              "categoryId": "62f5dcf020098408379216ae",
            *              "categoryName": "sports",
            *              "subcategoryName": "cricket bat",
            *              "subcategoryId": "62f5dd0b20098408379216bf",
            *              "sectionId": "62f5dd1a20098408379216d9",
            *              "sectionName": "sports",
            *              "brandId": "62f5e10b2009840837921794",
            *              "brandName": "mrf",
            *              "author": "SG Brand",
            *              "stock": 23,
            *              "description": "<p>it is used for check price and services</p>",
            *              "regularPrice": 3000,
            *              "salePrice": 2000,
            *              "taxClass": "Spray Water Sprinkler Bodies - WaterSense",
            *              "taxStatus": "accepted",
            *              "taxClassCode": "21101803A0001",
            *              "stockQuantity": 20,
            *              "allowBackOrders": true,
            *              "lowStockThreshold": 12,
            *              "soldIndividualStock": 10,
            *              "weight": 20,
            *              "weightUnit": "kg",
            *              "dimensions": "20X45",
            *              "shippingClass": "delievery boy",
            *              "upSells": true,
            *              "crossSells": false,
            *              "material": "plastic",
            *              "purchasedNote": "checkedd ",
            *              "menuOrder": "it is used",
            *              "isReviewEnabled": true,
            *              "adminCommissionType": "cased",
            *              "adminCommission": 23,
            *              "isDeleted": false,
            *              "isActive": true,
            *              "cashbackTypes": [
            *                  {
            *                      "cashbackType": "IndividualUser",
            *                      "amount": 200,
            *                      "_id": "62fe1559cc3eefbecc522797"
            *                  },
            *                  {
            *                      "cashbackType": "GoldCashback",
            *                      "amount": 300,
            *                      "_id": "62fe1559cc3eefbecc522798"
            *                  },
            *                  {
            *                      "cashbackType": "BronzeCashback",
            *                      "amount": 400,
            *                      "_id": "62fe1559cc3eefbecc522799"
            *                  },
            *                  {
            *                      "cashbackType": "SilverCashback",
            *                      "amount": 500,
            *                      "_id": "62fe1559cc3eefbecc52279a"
            *                  }
            *              ],
            *              "photos": [
            *                  "product/62fe12f0cc3eefbecc5226b2/photos/090c67b15b6dde2b626622d49ed5b098.jpg",
            *                  "product/62fe12f0cc3eefbecc5226b2/photos/bats.jpg",
            *                  "product/62fe12f0cc3eefbecc5226b2/photos/shirt.jpg"
            *              ],
            *              "colors": [
            *                  "Red",
            *                  "Blue",
            *                  "Green",
            *                  "Yellow"
            *              ],
            *              "ratingsTotal": 0,
            *              "ratingsAvg": 0,
            *              "totalReports": 0,
            *              "productSold": 0,
            *              "attributeValues": [],
            *              "attributes": [],
            *              "createdAt": "2022-08-18T10:22:40.130Z",
            *              "updatedAt": "2022-08-18T10:32:57.226Z",
            *              "__v": 2,
            *              "coverPhoto": "product/62fe12f0cc3eefbecc5226b2/cover-photo/default.jpeg",
            *              "isCart": false,
            *              "isReported": false,
            *              "isWishlist": false
            *          },
            *          "relatedProducts": [
            *              {
            *                  "_id": "62f5ee73f3a7e3dfc73acf00",
            *                  "name": "Ball",
            *                  "regularPrice": 3000,
            *                  "salePrice": 2000,
            *                  "ratingsTotal": 0,
            *                  "ratingsAvg": 0,
            *                  "coverPhoto": "product/62f5ee73f3a7e3dfc73acf00/cover-photo/default.jpeg",
            *                  "isWishlist": false,
            *                  "isCart": false
            *              },
            *              {
            *                  "_id": "62fe12f0cc3eefbecc5226b2",
            *                  "name": "cricketBat",
            *                  "regularPrice": 3000,
            *                  "salePrice": 2000,
            *                  "ratingsTotal": 0,
            *                  "ratingsAvg": 0,
            *                  "coverPhoto": "product/62fe12f0cc3eefbecc5226b2/cover-photo/default.jpeg",
            *                  "isWishlist": false,
            *                  "isCart": false
            *              }
            *          ],
            *          "execTime": 166
            *      }
            *  }
            */
    productDetails(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = req.query.userId;
                const productId = req.params.id;
                if (!(yield ProductModel_1.default.findById(productId)))
                    return ResponseHelper_1.default.badRequest(res, res.__('invalid_product_id'), { productId });
                const data = yield ProductService_1.default.productDetails(productId, userId);
                res.logMsg = 'Product detail fetched successfully';
                ResponseHelper_1.default.ok(res, res.__('product_details'), data);
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.default = new ProductController();
