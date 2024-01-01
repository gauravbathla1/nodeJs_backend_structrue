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
const CategoriesModel_1 = require("../../models/CategoriesModel");
class CategoryService {
    createCategory(categoryName) {
        return __awaiter(this, void 0, void 0, function* () {
            let category = new CategoriesModel_1.default({
                name: categoryName
            });
            yield category.save();
            return category;
        });
    }
    getCategory(options) {
        return __awaiter(this, void 0, void 0, function* () {
            let myAggregate = CategoriesModel_1.default.aggregate([
                {
                    '$match': {
                        'isActive': true,
                        'isDeleted': false
                    }
                }, {
                    '$sort': {
                        'createdAt': -1
                    }
                },
                {
                    '$lookup': {
                        'from': 'situations',
                        'localField': '_id',
                        'let': {
                            'catId': '$_id'
                        },
                        'foreignField': 'categoryId',
                        'as': 'situation',
                        'pipeline': [
                            {
                                '$match': {
                                    'isDeleted': false
                                }
                            }
                        ]
                    }
                }, {
                    '$lookup': {
                        'from': 'techniques',
                        'localField': '_id',
                        'let': {
                            'catId': '$_id'
                        },
                        'foreignField': 'categoryId',
                        'as': 'techniques',
                        'pipeline': [
                            {
                                '$match': {
                                    'isDeleted': false
                                }
                            }
                        ]
                    }
                }, {
                    '$addFields': {
                        'total': {
                            '$sum': [
                                {
                                    '$size': '$techniques'
                                }, {
                                    '$size': '$situation'
                                }
                            ]
                        }
                    }
                }, {
                    '$unset': [
                        'situation', 'techniques'
                    ]
                }
            ]);
            let categories = CategoriesModel_1.default.aggregatePaginate(myAggregate, options);
            return categories;
        });
    }
    getAllCategories() {
        return __awaiter(this, void 0, void 0, function* () {
            let categories = CategoriesModel_1.default.find({ isDeleted: false }).sort({ name: 1 }).select('name');
            return categories;
        });
    }
    editCategory(categoryId, categoryName) {
        return __awaiter(this, void 0, void 0, function* () {
            let category = CategoriesModel_1.default.findByIdAndUpdate({ _id: categoryId }, { name: categoryName }, { new: true });
            return category;
        });
    }
    deleteCategory(categoryId) {
        return __awaiter(this, void 0, void 0, function* () {
            let category = CategoriesModel_1.default.findByIdAndUpdate({ _id: categoryId }, { isDeleted: true }, { new: true });
            return category;
        });
    }
}
const categoryAdminService = new CategoryService(); // Create an instance of categoryService
exports.default = categoryAdminService;
// export default new SpeakerService();
