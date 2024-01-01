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
const ProductReportModel_1 = require("../../models/ProductReportModel");
class ProductReportService {
    list(queryString) {
        return __awaiter(this, void 0, void 0, function* () {
            // const countQuery = productReportModel.find();
            // const countFeature = new ApiFeatures(countQuery, queryString)
            //     .searching(['text'])
            //     .getCount();
            // const lisQuery = productReportModel.find();
            // const listFeature = new ApiFeatures(lisQuery, queryString)
            //     .searching(['text'])
            //     .sorting('-createdAt')
            //     .pagination();
            // const count = await countFeature.query;
            // const list = await listFeature.query;
            const page = queryString.page * 1 || 1;
            const search = queryString.search;
            const limit = queryString.limit * 1 || 100;
            let skip = (page - 1) * limit;
            let match = {};
            if (search && search.trim()) {
                match = {
                    'product.name': {
                        '$regex': search,
                        '$options': '$i'
                    }
                };
            }
            const agg = [
                [
                    {
                        '$lookup': {
                            'from': 'products',
                            'localField': 'productId',
                            'foreignField': '_id',
                            'as': 'product'
                        }
                    }, {
                        '$unwind': {
                            'path': '$product'
                        }
                    }, {
                        '$lookup': {
                            'from': 'users',
                            'localField': 'userId',
                            'foreignField': '_id',
                            'as': 'reporter'
                        }
                    }, {
                        '$unwind': {
                            'path': '$reporter'
                        }
                    }, {
                        '$project': {
                            'createdAt': 1,
                            'product': {
                                'name': 1,
                                '_id': 1,
                                'salePrice': 1,
                                'coverPhoto': 1
                            },
                            'reporter': {
                                'name': 1,
                                '_id': 1
                            },
                            'reasonText': 1
                        }
                    }, {
                        '$match': match
                    },
                    {
                        '$facet': {
                            'count': [
                                {
                                    '$count': 'count'
                                }
                            ],
                            'reports': [
                                {
                                    '$sort': {
                                        'createdAt': -1
                                    }
                                }, {
                                    '$skip': skip
                                }, {
                                    '$limit': limit
                                }
                            ]
                        }
                    }, {
                        '$project': {
                            'count': {
                                '$first': '$count.count'
                            },
                            'reports': 1
                        }
                    }
                ]
            ];
            const reports = yield ProductReportModel_1.default.aggregate(agg);
            return reports;
        });
    }
}
exports.default = new ProductReportService;
