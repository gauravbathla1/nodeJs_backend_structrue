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
const CategoryModel_1 = require("../../models/CategoryModel");
const mongoose_1 = require("mongoose");
const SubcategoryModel_1 = require("../../models/SubcategoryModel");
const SectionModel_1 = require("../../models/SectionModel");
class CategoryController {
    /**
        * @api {get} /api/v1/app/category Category List
        * @apiHeader {String} App-Version Version Code 1.0.0.
        * @apiHeader {String} deviceType 'WEB'|'IOS'|'ANDROID'
        * @apiVersion 1.0.0
        * @apiName category-list
        * @apiGroup App-Category
        *
        * @apiSuccessExample {json} Success-Response-1:
        *  {
        *        "status": 200,
        *        "statusText": "SUCCESS",
        *        "message": "Category list get successfully",
        *        "data": {
        *            "categories": [
        *                {
        *                    "_id": "62c565ce198c336e57acf4a7",
        *                    "name": "Women's Fashion",
        *                    "image": "category/1657103792052-test3.jpeg"
        *                }
        *            ],
        *        }
        *    }
        *
        */
    categoryList(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const categories = yield CategoryModel_1.default.find({
                    isDeleted: false,
                    isActive: true
                }, {
                    name: 1,
                    image: 1,
                    updatedAt: 1,
                    createdAt: 1,
                    slug: 1
                }).lean();
                return ResponseHelper_1.default.ok(res, res.__('category_list'), { categories });
            }
            catch (error) {
                next(error);
            }
        });
    }
    /**
        * @api {get} /api/v1/app/category/sub-list-id/:id Sub Category List
        * @apiHeader {String} App-Version Version Code 1.0.0.
        * @apiHeader {String} deviceType 'WEB'|'IOS'|'ANDROID'
        * @apiVersion 1.0.0
        * @apiName subcategory-list-id
        * @apiGroup App-Category
        * @apiDescription pass category _id as params
        * @apiSuccessExample {json} Success-Response-1:
        *  {
        *        "status": 200,
        *        "statusText": "SUCCESS",
        *        "message": "Subcategory List",
        *        "data": {
        *            "subcategories": [
        *                {
        *                    "_id": "62c57716f96069e70cf20b57",
        *                    "name": "Women's Clothings",
        *                    "category": "62c565ce198c336e57acf4a7",
        *                    "createdAt": "2022-07-06T11:50:46.672Z",
        *                    "updatedAt": "2022-07-06T11:50:46.672Z",
        *                    "sections": [
        *                        {
        *                            "_id": "62c57985e157e053e48266ce",
        *                            "category": "62c565ce198c336e57acf4a7",
        *                            "subcategory": "62c57716f96069e70cf20b57",
        *                            "name": "dresses",
        *                            "createdAt": "2022-07-06T12:01:09.501Z",
        *                            "updatedAt": "2022-07-06T12:01:09.501Z"
        *                        }
        *                    ]
        *                }
        *            ],
        *        }
        *    }
        *
        */
    subcategoryListById(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const categoryId = req.params.id;
                const isExists = yield CategoryModel_1.default.exists({ _id: categoryId });
                if (!isExists) {
                    return ResponseHelper_1.default.badRequest(res, res.__('invalid_category_id'), { categoryId });
                }
                const subcategories = yield SubcategoryModel_1.default.aggregate([
                    {
                        '$match': {
                            'category': new mongoose_1.Types.ObjectId(categoryId)
                        }
                    },
                    {
                        '$lookup': {
                            'from': 'sections',
                            'as': 'sections',
                            'let': {
                                'sid': '$_id'
                            },
                            'pipeline': [
                                {
                                    '$match': {
                                        'isDeleted': false,
                                        'isActive': true,
                                        '$expr': {
                                            '$eq': [
                                                '$$sid', '$subcategory'
                                            ]
                                        }
                                    }
                                },
                                {
                                    '$project': {
                                        'name': 1,
                                        'category': 1,
                                        'subcategory': 1,
                                        'createdAt': 1,
                                        'updatedAt': 1,
                                        'slug': 1
                                    }
                                }
                            ]
                        }
                    },
                    {
                        '$project': {
                            'name': 1,
                            'image': 1,
                            'category': 1,
                            'createdAt': 1,
                            'updatedAt': 1,
                            'sections': 1,
                            'slug': 1
                        }
                    }
                ]);
                return ResponseHelper_1.default.ok(res, res.__('subcategory_list'), { subcategories });
            }
            catch (error) {
                next(error);
            }
        });
    }
    /**
        * @api {get} /api/v1/app/category/sub-list-slug/:categorySlug Sub Category List For web
        * @apiHeader {String} App-Version Version Code 1.0.0.
        * @apiHeader {String} deviceType 'WEB'|'IOS'|'ANDROID'
        * @apiVersion 1.0.0
        * @apiName subcategory-list-slug
        * @apiGroup App-Category
        * @apiDescription pass category slug as params
        * @apiSuccessExample {json} Success-Response-1:
        *  {
        *        "status": 200,
        *        "statusText": "SUCCESS",
        *        "message": "Subcategory list successfully",
        *        "data": {
        *            "subcategories": [
        *                {
        *                    "_id": "62c57716f96069e70cf20b57",
        *                    "name": "women's clothings",
        *                    "category": "62c565ce198c336e57acf4a7",
        *                    "image": "category/1658837115264-download (17).jfif",
        *                    "createdAt": "2022-07-06T11:50:46.672Z",
        *                    "updatedAt": "2022-09-02T09:50:18.262Z",
        *                    "slug": "womens-clothings-1",
        *                    "sections": true
        *                }
        *            ],
        *            "execTime": 83
        *        }
        *    }
        *
        */
    subcategoryListBySlug(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const slug = req.params.slug;
                const category = yield CategoryModel_1.default.findOne({ slug: slug });
                if (!category) {
                    return ResponseHelper_1.default.badRequest(res, res.__('category_not_found'), { slug });
                }
                const subcategories = yield SubcategoryModel_1.default.aggregate([
                    {
                        '$match': {
                            category: category._id
                        }
                    },
                    {
                        '$lookup': {
                            'from': 'sections',
                            'as': 'sections',
                            'let': {
                                'sid': '$_id'
                            },
                            'pipeline': [
                                {
                                    '$match': {
                                        'isDeleted': false,
                                        'isActive': true,
                                        '$expr': {
                                            '$eq': [
                                                '$$sid', '$subcategory'
                                            ]
                                        }
                                    }
                                },
                                {
                                    '$limit': 1
                                }
                            ]
                        }
                    },
                    {
                        '$lookup': {
                            'from': 'products',
                            'let': {
                                'sid': '$_id'
                            },
                            'as': 'productData',
                            'pipeline': [
                                {
                                    '$match': {
                                        'isDeleted': false,
                                        'isActive': true,
                                        '$expr': {
                                            '$eq': [
                                                '$$sid', '$subcategoryId'
                                            ]
                                        }
                                    }
                                },
                                {
                                    '$count': 'count'
                                }
                            ]
                        }
                    },
                    {
                        '$project': {
                            'name': 1,
                            'image': 1,
                            'category': 1,
                            'createdAt': 1,
                            'updatedAt': 1,
                            'sections': {
                                '$gt': [
                                    {
                                        '$size': '$sections'
                                    },
                                    0
                                ]
                            },
                            'slug': 1,
                            'categorySlug': 1,
                            'categoryName': 1,
                            'productCount': {
                                '$ifNull': [
                                    {
                                        '$first': '$productData.count'
                                    },
                                    0
                                ]
                            }
                        }
                    }
                ]);
                return ResponseHelper_1.default.ok(res, res.__('subcategory_list'), { subcategories });
            }
            catch (error) {
                next(error);
            }
        });
    }
    /**
        * @api {get} /api/v1/app/category/list Category List All
        * @apiHeader {String} App-Version Version Code 1.0.0.
        * @apiHeader {String} deviceType 'WEB'|'IOS'|'ANDROID'
        * @apiVersion 1.0.0
        * @apiName category-list-all
        * @apiGroup App-Category
        *
        * @apiSuccessExample {json} Success-Response-1:
        *  {
        *        "status": 200,
        *        "statusText": "SUCCESS",
        *        "message": "Category list get successfully",
        *        "data": {
        *            "categories": [
        *                {
        *                    "_id": "62c565ce198c336e57acf4a7",
        *                    "name": "Women's Fashion",
        *                    "createdAt": "2022-07-06T10:37:02.361Z",
        *                    "updatedAt": "2022-07-06T10:37:02.361Z",
        *                    "subcategories": [
        *                        {
        *                            "_id": "62c57716f96069e70cf20b57",
        *                            "name": "Women's Clothings",
        *                            "category": "62c565ce198c336e57acf4a7",
        *                            "createdAt": "2022-07-06T11:50:46.672Z",
        *                            "updatedAt": "2022-07-06T11:50:46.672Z",
        *                            "sections": [
        *                                {
        *                                    "_id": "62c57985e157e053e48266ce",
        *                                    "category": "62c565ce198c336e57acf4a7",
        *                                    "subcategory": "62c57716f96069e70cf20b57",
        *                                    "name": "dresses",
        *                                    "createdAt": "2022-07-06T12:01:09.501Z",
        *                                    "updatedAt": "2022-07-06T12:01:09.501Z"
        *                                }
        *                            ]
        *                        },
        *                        {
        *                            "_id": "62cbf6f7217ec71559014f10",
        *                            "name": "Women Shoes",
        *                            "category": "62c565ce198c336e57acf4a7",
        *                            "createdAt": "2022-07-11T10:09:59.139Z",
        *                            "updatedAt": "2022-07-11T10:09:59.139Z",
        *                            "sections": [
        *                                {
        *                                    "_id": "62cbf717217ec71559014f16",
        *                                    "category": "62c565ce198c336e57acf4a7",
        *                                    "subcategory": "62cbf6f7217ec71559014f10",
        *                                    "name": "section",
        *                                    "createdAt": "2022-07-11T10:10:31.469Z",
        *                                    "updatedAt": "2022-07-11T10:10:31.469Z"
        *                                },
        *                                {
        *                                    "_id": "62cbf71d217ec71559014f1c",
        *                                    "category": "62c565ce198c336e57acf4a7",
        *                                    "subcategory": "62cbf6f7217ec71559014f10",
        *                                    "name": "section2",
        *                                    "createdAt": "2022-07-11T10:10:37.202Z",
        *                                    "updatedAt": "2022-07-11T10:10:37.202Z"
        *                                },
        *                                {
        *                                    "_id": "62cbf721217ec71559014f22",
        *                                    "category": "62c565ce198c336e57acf4a7",
        *                                    "subcategory": "62cbf6f7217ec71559014f10",
        *                                    "name": "section3",
        *                                    "createdAt": "2022-07-11T10:10:41.907Z",
        *                                    "updatedAt": "2022-07-11T10:10:41.907Z"
        *                                },
        *                                {
        *                                    "_id": "62cbf728217ec71559014f28",
        *                                    "category": "62c565ce198c336e57acf4a7",
        *                                    "subcategory": "62cbf6f7217ec71559014f10",
        *                                    "name": "section4",
        *                                    "createdAt": "2022-07-11T10:10:48.625Z",
        *                                    "updatedAt": "2022-07-11T10:10:48.625Z"
        *                                },
        *                                {
        *                                    "_id": "62cbf72e217ec71559014f2e",
        *                                    "category": "62c565ce198c336e57acf4a7",
        *                                    "subcategory": "62cbf6f7217ec71559014f10",
        *                                    "name": "section5",
        *                                    "createdAt": "2022-07-11T10:10:54.059Z",
        *                                    "updatedAt": "2022-07-11T10:10:54.059Z"
        *                                }
        *                            ]
        *                        },
        *                        {
        *                            "_id": "62cbf741217ec71559014f33",
        *                            "name": "Plus Size",
        *                            "category": "62c565ce198c336e57acf4a7",
        *                            "createdAt": "2022-07-11T10:11:13.554Z",
        *                            "updatedAt": "2022-07-11T10:11:13.554Z",
        *                            "sections": [
        *                                {
        *                                    "_id": "62cbf752217ec71559014f39",
        *                                    "category": "62c565ce198c336e57acf4a7",
        *                                    "subcategory": "62cbf741217ec71559014f33",
        *                                    "name": "section1",
        *                                    "createdAt": "2022-07-11T10:11:30.687Z",
        *                                    "updatedAt": "2022-07-11T10:11:30.687Z"
        *                                },
        *                                {
        *                                    "_id": "62cbf757217ec71559014f3f",
        *                                    "category": "62c565ce198c336e57acf4a7",
        *                                    "subcategory": "62cbf741217ec71559014f33",
        *                                    "name": "section2",
        *                                    "createdAt": "2022-07-11T10:11:35.803Z",
        *                                    "updatedAt": "2022-07-11T10:11:35.803Z"
        *                                },
        *                                {
        *                                    "_id": "62cbf75d217ec71559014f45",
        *                                    "category": "62c565ce198c336e57acf4a7",
        *                                    "subcategory": "62cbf741217ec71559014f33",
        *                                    "name": "section3",
        *                                    "createdAt": "2022-07-11T10:11:41.428Z",
        *                                    "updatedAt": "2022-07-11T10:11:41.428Z"
        *                                },
        *                                {
        *                                    "_id": "62cbf764217ec71559014f4b",
        *                                    "category": "62c565ce198c336e57acf4a7",
        *                                    "subcategory": "62cbf741217ec71559014f33",
        *                                    "name": "section4",
        *                                    "createdAt": "2022-07-11T10:11:48.132Z",
        *                                    "updatedAt": "2022-07-11T10:11:48.132Z"
        *                                },
        *                                {
        *                                    "_id": "62cbf769217ec71559014f51",
        *                                    "category": "62c565ce198c336e57acf4a7",
        *                                    "subcategory": "62cbf741217ec71559014f33",
        *                                    "name": "section5",
        *                                    "createdAt": "2022-07-11T10:11:53.945Z",
        *                                    "updatedAt": "2022-07-11T10:11:53.945Z"
        *                                }
        *                            ]
        *                        },
        *                        {
        *                            "_id": "62cbf77a217ec71559014f5d",
        *                            "name": "Women's bottems",
        *                            "category": "62c565ce198c336e57acf4a7",
        *                            "createdAt": "2022-07-11T10:12:10.631Z",
        *                            "updatedAt": "2022-07-11T10:12:10.631Z",
        *                            "sections": [
        *                                {
        *                                    "_id": "62cbf78d217ec71559014f63",
        *                                    "category": "62c565ce198c336e57acf4a7",
        *                                    "subcategory": "62cbf77a217ec71559014f5d",
        *                                    "name": "bottems 1",
        *                                    "createdAt": "2022-07-11T10:12:29.933Z",
        *                                    "updatedAt": "2022-07-11T10:12:29.933Z"
        *                                },
        *                                {
        *                                    "_id": "62cbf792217ec71559014f69",
        *                                    "category": "62c565ce198c336e57acf4a7",
        *                                    "subcategory": "62cbf77a217ec71559014f5d",
        *                                    "name": "bottems 2",
        *                                    "createdAt": "2022-07-11T10:12:34.558Z",
        *                                    "updatedAt": "2022-07-11T10:12:34.558Z"
        *                                },
        *                                {
        *                                    "_id": "62cbf799217ec71559014f6f",
        *                                    "category": "62c565ce198c336e57acf4a7",
        *                                    "subcategory": "62cbf77a217ec71559014f5d",
        *                                    "name": "bottems 3",
        *                                    "createdAt": "2022-07-11T10:12:41.492Z",
        *                                    "updatedAt": "2022-07-11T10:12:41.492Z"
        *                                }
        *                            ]
        *                        },
        *                        {
        *                            "_id": "62cbf7a9217ec71559014f74",
        *                            "name": "Women's Top",
        *                            "category": "62c565ce198c336e57acf4a7",
        *                            "createdAt": "2022-07-11T10:12:57.423Z",
        *                            "updatedAt": "2022-07-11T10:12:57.423Z",
        *                            "sections": [
        *                                {
        *                                    "_id": "62cbf7b8217ec71559014f7a",
        *                                    "category": "62c565ce198c336e57acf4a7",
        *                                    "subcategory": "62cbf7a9217ec71559014f74",
        *                                    "name": "Top 1",
        *                                    "createdAt": "2022-07-11T10:13:12.001Z",
        *                                    "updatedAt": "2022-07-11T10:13:12.001Z"
        *                                },
        *                                {
        *                                    "_id": "62cbf7bd217ec71559014f80",
        *                                    "category": "62c565ce198c336e57acf4a7",
        *                                    "subcategory": "62cbf7a9217ec71559014f74",
        *                                    "name": "Top 2",
        *                                    "createdAt": "2022-07-11T10:13:17.058Z",
        *                                    "updatedAt": "2022-07-11T10:13:17.058Z"
        *                                },
        *                                {
        *                                    "_id": "62cbf7c1217ec71559014f86",
        *                                    "category": "62c565ce198c336e57acf4a7",
        *                                    "subcategory": "62cbf7a9217ec71559014f74",
        *                                    "name": "Top 3",
        *                                    "createdAt": "2022-07-11T10:13:21.776Z",
        *                                    "updatedAt": "2022-07-11T10:13:21.776Z"
        *                                },
        *                                {
        *                                    "_id": "62cbf7c6217ec71559014f8c",
        *                                    "category": "62c565ce198c336e57acf4a7",
        *                                    "subcategory": "62cbf7a9217ec71559014f74",
        *                                    "name": "Top 4",
        *                                    "createdAt": "2022-07-11T10:13:26.753Z",
        *                                    "updatedAt": "2022-07-11T10:13:26.753Z"
        *                                }
        *                            ]
        *                        },
        *                        {
        *                            "_id": "62cbf82d217ec71559014fa8",
        *                            "name": "Women's Jwellary",
        *                            "category": "62c565ce198c336e57acf4a7",
        *                            "createdAt": "2022-07-11T10:15:09.993Z",
        *                            "updatedAt": "2022-07-11T10:15:09.993Z",
        *                            "sections": [
        *                                {
        *                                    "_id": "62cbf83d217ec71559014fb5",
        *                                    "category": "62c565ce198c336e57acf4a7",
        *                                    "subcategory": "62cbf82d217ec71559014fa8",
        *                                    "name": "jw 4",
        *                                    "createdAt": "2022-07-11T10:15:25.741Z",
        *                                    "updatedAt": "2022-07-11T10:15:25.741Z"
        *                                },
        *                                {
        *                                    "_id": "62cbf843217ec71559014fbb",
        *                                    "category": "62c565ce198c336e57acf4a7",
        *                                    "subcategory": "62cbf82d217ec71559014fa8",
        *                                    "name": "jw 1",
        *                                    "createdAt": "2022-07-11T10:15:31.089Z",
        *                                    "updatedAt": "2022-07-11T10:15:31.089Z"
        *                                },
        *                                {
        *                                    "_id": "62cbf848217ec71559014fcf",
        *                                    "category": "62c565ce198c336e57acf4a7",
        *                                    "subcategory": "62cbf82d217ec71559014fa8",
        *                                    "name": "jw 2",
        *                                    "createdAt": "2022-07-11T10:15:36.169Z",
        *                                    "updatedAt": "2022-07-11T10:15:36.169Z"
        *                                },
        *                                {
        *                                    "_id": "62cbf84c217ec71559014fdc",
        *                                    "category": "62c565ce198c336e57acf4a7",
        *                                    "subcategory": "62cbf82d217ec71559014fa8",
        *                                    "name": "jw 3",
        *                                    "createdAt": "2022-07-11T10:15:40.621Z",
        *                                    "updatedAt": "2022-07-11T10:15:40.621Z"
        *                                },
        *                                {
        *                                    "_id": "62cbf851217ec71559014fe2",
        *                                    "category": "62c565ce198c336e57acf4a7",
        *                                    "subcategory": "62cbf82d217ec71559014fa8",
        *                                    "name": "jw 4",
        *                                    "createdAt": "2022-07-11T10:15:45.399Z",
        *                                    "updatedAt": "2022-07-11T10:15:45.399Z"
        *                                }
        *                            ]
        *                        }
        *                    ]
        *                },
        *            ],
        *        }
        *    }
        *
        */
    categoryListAll(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const categories = yield CategoryModel_1.default.aggregate([
                    {
                        '$match': {
                            'isDeleted': false,
                            'isActive': true,
                        }
                    },
                    {
                        '$lookup': {
                            'from': 'subcategories',
                            'let': {
                                'sid': '$_id'
                            },
                            'as': 'subcategories',
                            'pipeline': [
                                {
                                    '$match': {
                                        'isDeleted': false,
                                        'isActive': true,
                                        '$expr': {
                                            '$eq': [
                                                '$$sid', '$category'
                                            ]
                                        }
                                    }
                                },
                                {
                                    '$project': {
                                        '_id': 1,
                                        'name': 1,
                                        'category': 1,
                                        'createdAt': 1,
                                        'updatedAt': 1,
                                        'slug': 1,
                                        'categorySlug': 1,
                                    }
                                },
                                {
                                    '$lookup': {
                                        'from': 'sections',
                                        'as': 'sections',
                                        'let': {
                                            'sid': '$_id'
                                        },
                                        'pipeline': [
                                            {
                                                '$match': {
                                                    'isDeleted': false,
                                                    'isActive': true,
                                                    '$expr': {
                                                        '$eq': [
                                                            '$$sid', '$subcategory'
                                                        ]
                                                    }
                                                }
                                            },
                                            {
                                                '$project': {
                                                    'name': 1,
                                                    'category': 1,
                                                    'subcategory': 1,
                                                    'createdAt': 1,
                                                    'updatedAt': 1,
                                                    'slug': 1,
                                                    'subcategorySlug': 1,
                                                    'categorySlug': 1,
                                                }
                                            }
                                        ]
                                    }
                                }
                            ]
                        }
                    },
                    {
                        '$project': {
                            '_id': 1,
                            'name': 1,
                            'createdAt': 1,
                            'updatedAt': 1,
                            'subcategories': 1,
                            'slug': 1
                        }
                    }
                ]);
                return ResponseHelper_1.default.ok(res, res.__('category_list'), { categories });
            }
            catch (error) {
                next(error);
            }
        });
    }
    /**
       * @api {get} /api/v1/app/category/store Store List
       * @apiHeader {String} App-Version Version Code 1.0.0.
       * @apiHeader {String} deviceType 'WEB'|'IOS'|'ANDROID'
       * @apiVersion 1.0.0
       * @apiName store-list
       * @apiGroup App-Category
       *
       * @apiSuccessExample {json} Success-Response-1:
       *  {
       *        "status": 200,
       *        "statusText": "SUCCESS",
       *        "message": "Store list fetch successfully",
       *        "data": {
       *            "stores": [
       *                {
       *                    "_id": "62c6a900437247fa040492c9",
       *                    "name": "Babies, Kids and toys",
       *                    "image": "category/1658833169064-download (5).jfif",
       *                    "updatedAt": "2022-07-07T09:36:00.816Z",
       *                    "productCount": 0
       *                }
       *            ],
       *            "execTime": 42
       *        }
       *    }
       *
       */
    storeList(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const aggregate = [
                    {
                        '$match': {
                            'isActive': true,
                            'isDeleted': false
                        }
                    },
                    {
                        '$lookup': {
                            'from': 'products',
                            'let': {
                                'cid': '$_id'
                            },
                            'as': 'productData',
                            'pipeline': [
                                {
                                    '$match': {
                                        'isDeleted': false,
                                        'isActive': true,
                                        '$expr': {
                                            '$eq': [
                                                '$$cid', '$categoryId'
                                            ]
                                        }
                                    }
                                },
                                {
                                    '$count': 'count'
                                }
                            ]
                        }
                    },
                    {
                        '$project': {
                            '_id': 1,
                            'name': 1,
                            'image': 1,
                            'createdAtAt': 1,
                            'updatedAt': 1,
                            'slug': 1,
                            'productCount': {
                                '$ifNull': [
                                    {
                                        '$first': '$productData.count'
                                    },
                                    0
                                ]
                            }
                        }
                    }
                ];
                const stores = yield CategoryModel_1.default.aggregate(aggregate);
                return ResponseHelper_1.default.ok(res, res.__('store_list'), { stores });
            }
            catch (error) {
                next(error);
            }
        });
    }
    /**
    * @api {get} /api/v1/app/category/section-list/:subcategorySlug Sections list
    * @apiHeader {String} App-Version Version Code 1.0.0.
    * @apiHeader {String} deviceType 'WEB'|'IOS'|'ANDROID'
    * @apiVersion 1.0.0
    * @apiName section-list
    * @apiGroup App-Category
    * @apiDescription pass categorySlug, subcategorySlug as params
    * @apiSuccessExample {json} Success-Response-1:
    *  {
    *        "status": 200,
    *        "statusText": "SUCCESS",
    *        "message": "Section list get successfully",
    *        "data": {
    *            "sections": [
    *                {
    *                    "_id": "62dfdac2fb89c4b45de45382",
    *                    "category": "62c6a900437247fa040492c9",
    *                    "subcategory": "62dfd4dffb89c4b45de44f77",
    *                    "name": "section2",
    *                    "createdAt": "2022-07-26T12:14:58.953Z",
    *                    "updatedAt": "2022-09-06T11:58:53.467Z",
    *                    "slug": "section2-1-2",
    *                    "image": "section/2022-02-25 (2).png",
    *                    "productCount": 0
    *                }
    *            ],
    *            "execTime": 97
    *        }
    *    }
    *
    */
    sectionList(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const subcategorySlug = req.params.subcategorySlug;
                const subcategory = yield SubcategoryModel_1.default.findOne({ slug: subcategorySlug });
                if (!subcategory) {
                    return ResponseHelper_1.default.badRequest(res, res.__('category_not_found'), { slug: subcategorySlug });
                }
                const sections = yield SectionModel_1.default.aggregate([
                    {
                        '$match': {
                            'subcategory': subcategory._id,
                            'isActive': true,
                            'isDeleted': false
                        }
                    },
                    {
                        '$lookup': {
                            'from': 'products',
                            'let': {
                                'sid': '$_id'
                            },
                            'as': 'productData',
                            'pipeline': [
                                {
                                    '$match': {
                                        'isDeleted': false,
                                        'isActive': true,
                                        '$expr': {
                                            '$eq': [
                                                '$$sid', '$sectionId'
                                            ]
                                        }
                                    }
                                },
                                {
                                    '$count': 'count'
                                }
                            ]
                        }
                    },
                    {
                        '$project': {
                            'name': 1,
                            'image': 1,
                            'category': 1,
                            'createdAt': 1,
                            'updatedAt': 1,
                            'subcategory': 1,
                            'productCount': {
                                '$ifNull': [
                                    {
                                        '$first': '$productData.count'
                                    },
                                    0
                                ]
                            },
                            'slug': 1,
                            'categorySlug': 1,
                            'subcategorySlug': 1,
                            'subcategoryName': 1,
                            'categoryName': 1,
                        }
                    }
                ]);
                return ResponseHelper_1.default.ok(res, res.__('section_list'), { sections });
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.default = new CategoryController();
