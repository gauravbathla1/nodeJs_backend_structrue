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
const GlobalHelpeer_1 = require("../../helpers/GlobalHelpeer");
const CategoriesModel_1 = require("../../models/CategoriesModel");
const QuoteModel_1 = require("../../models/QuoteModel");
const SearchModel_1 = require("../../models/SearchModel");
const SituationModel_1 = require("../../models/SituationModel");
const TechniqueModel_1 = require("../../models/TechniqueModel");
const mostViewdModel_1 = require("../../models/mostViewdModel");
class HomeServce {
    constructor() { }
    getDailyQuotes() {
        return __awaiter(this, void 0, void 0, function* () {
            let quote = yield QuoteModel_1.default.findOne({ isShowing: true });
            console.log(quote);
            return quote;
        });
    }
    getTechniques(option, search) {
        return __awaiter(this, void 0, void 0, function* () {
            let baseUrl = process.env.S3_ASSET_URL;
            let myAggregate = TechniqueModel_1.default.aggregate([
                {
                    $match: {
                        isDeleted: false,
                        $or: [
                            {
                                techniqueName: { $regex: search ? search : "", $options: "i" },
                            },
                            {
                                categoryName: { $regex: search ? search : "", $options: "i" },
                            },
                        ],
                    },
                },
                {
                    $project: {
                        title: "$techniqueName",
                        image_url: {
                            $concat: [baseUrl, "$image"],
                        },
                        // categoryName:1,
                        // instructionContent:1,
                        // whyItWorksContent:1,
                    },
                },
            ]);
            let techniques = yield TechniqueModel_1.default.aggregatePaginate(myAggregate, option);
            if ((search === null || search === void 0 ? void 0 : search.length) > 2) {
                yield SearchModel_1.default.create({ searchText: search });
            }
            return techniques;
        });
    }
    getSituations(option, search) {
        return __awaiter(this, void 0, void 0, function* () {
            let baseUrl = process.env.S3_ASSET_URL;
            let myAggregate = SituationModel_1.default.aggregate([
                {
                    $match: {
                        isDeleted: false,
                        $or: [
                            {
                                situationName: { $regex: search ? search : "", $options: "i" },
                            },
                            {
                                categoryName: { $regex: search ? search : "", $options: "i" },
                            },
                        ],
                    },
                },
                {
                    $project: {
                        // name: '$situationName',
                        // image:1,
                        // categoryName:1,
                        // peaceContent:1,
                        // flowContent:1,
                        title: "$situationName",
                        image_url: {
                            $concat: [baseUrl, "$image"],
                        },
                    },
                },
            ]);
            let situations = yield SituationModel_1.default.aggregatePaginate(myAggregate, option);
            if ((search === null || search === void 0 ? void 0 : search.length) > 2) {
                yield SearchModel_1.default.create({ searchText: search });
            }
            return situations;
        });
    }
    getCategories(option) {
        let myAggregate = CategoriesModel_1.default.aggregate([
            {
                $match: {
                    isDeleted: false,
                },
            },
            {
                $sort: {
                    createdAt: -1
                }
            },
            {
                $project: {
                    name: 1,
                },
            },
        ]);
        let techniques = CategoriesModel_1.default.aggregatePaginate(myAggregate, option);
        return techniques;
    }
    dashBoard() {
        return __awaiter(this, void 0, void 0, function* () {
            let quotes = yield HomeServce.getQuotes();
            let techniques = yield HomeServce.getTechnique();
            let deepDive = yield HomeServce.getDeepDives();
            let situations = yield HomeServce.getSituation();
            return { quotes, techniques, deepDive, situations };
        });
    }
    static getQuotes() {
        return __awaiter(this, void 0, void 0, function* () {
            let quotes = yield QuoteModel_1.default.findOne({ isShowing: true });
            return quotes;
        });
    }
    static getDeepDives() {
        return __awaiter(this, void 0, void 0, function* () {
            let categories = CategoriesModel_1.default.aggregate([
                {
                    $match: {
                        isActive: true,
                        isDeleted: false,
                    },
                },
                {
                    $sort: {
                        createdAt: -1,
                    },
                },
                {
                    $project: {
                        name: 1,
                    },
                },
                {
                    $limit: 12,
                },
            ]);
            return categories;
        });
    }
    static getSituation() {
        return __awaiter(this, void 0, void 0, function* () {
            let situation = yield SituationModel_1.default.aggregate([
                {
                    $match: {
                        isActive: true,
                        isDeleted: false,
                    },
                },
                {
                    $sort: {
                        createdAt: -1,
                    },
                },
                {
                    $limit: 10,
                },
                {
                    $project: {
                        name: "$situationName",
                    },
                },
            ]);
            return situation;
        });
    }
    static getTechnique() {
        return __awaiter(this, void 0, void 0, function* () {
            let technique = yield TechniqueModel_1.default.aggregate([
                {
                    $match: {
                        isActive: true,
                        isDeleted: false,
                    },
                },
                {
                    $sort: {
                        createdAt: -1,
                    },
                },
                {
                    $limit: 10,
                },
                {
                    $project: {
                        name: "$techniqueName",
                    },
                },
            ]);
            return technique;
        });
    }
    getDetails(id, type, userId, title) {
        return __awaiter(this, void 0, void 0, function* () {
            type = type === null || type === void 0 ? void 0 : type.toLowerCase();
            let baseUrl = process.env.S3_ASSET_URL;
            let data = {};
            if (type == "techniques") {
                data = yield TechniqueModel_1.default.findOne({ _id: id }, {
                    name: "$techniqueName",
                    instructionContent: {
                        content: "$instructionContent.content",
                        animation: {
                            $concat: [baseUrl, "$instructionContent.animation"],
                        },
                    },
                    whyItWorksContent: {
                        content: "$whyItWorksContent.content",
                        animation: {
                            $concat: [baseUrl, "$whyItWorksContent.animation"],
                        },
                    },
                    image: {
                        $concat: [baseUrl, "$image"],
                    },
                    categoryName: 1,
                }).lean();
                // return data;
            }
            else if (type == "situations") {
                data = yield SituationModel_1.default.findOne({ _id: id }, {
                    name: "$situationName",
                    peaceContent: {
                        content: "$peaceContent.content",
                        animation: {
                            $concat: [baseUrl, "$peaceContent.animation"],
                        },
                    },
                    flowContent: {
                        content: "$flowContent.content",
                        animation: {
                            $concat: [baseUrl, "$flowContent.animation"],
                        },
                    },
                    image: {
                        $concat: [baseUrl, "$image"],
                    },
                    categoryName: 1,
                }).lean();
            }
            if (data) {
                data.shareLink = yield GlobalHelpeer_1.default.getShareDeepLink(type, id, title);
            }
            yield HomeServce.maangeViewRecord(data === null || data === void 0 ? void 0 : data.id, type, userId);
            return data;
        });
    }
    ;
    static maangeViewRecord(id, type, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            // let referenceModel;
            let referenceField;
            if (type === "techniques") {
                //  referenceModel = TechniqueModel;
                referenceField = "technique";
            }
            else if (type === "situations") {
                // referenceModel = SituationModel;
                referenceField = "situation";
            }
            else {
                // Handle the case when 'type' is neither 'technique' nor 'situation'
                throw new Error("Invalid 'type' value");
            }
            // Find the record in ViewedModel
            let existingRecord = yield mostViewdModel_1.default.findOne({
                [referenceField]: id,
            });
            if (!existingRecord) {
                // If the record doesn't exist, create a new record and push 'userId' to the 'viewBy' array
                existingRecord = new mostViewdModel_1.default({
                    viewBy: [userId],
                    [referenceField]: id,
                });
            }
            else if (!existingRecord.viewBy.includes(userId)) {
                // If the record exists but 'userId' is not in the 'viewBy' array, push 'userId'
                existingRecord.viewBy.push(userId);
            }
            // Save the record
            yield existingRecord.save();
        });
    }
    ;
    share(shareType, shareId) {
        return __awaiter(this, void 0, void 0, function* () {
            let link = yield GlobalHelpeer_1.default.getShareDeepLink(shareType, shareId, "");
            return link;
        });
    }
}
const UserHomeServce = new HomeServce(); // Create an instance of categoryService
exports.default = UserHomeServce;
