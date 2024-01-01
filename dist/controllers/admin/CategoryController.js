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
const CategoryService_1 = require("../../services/admin/CategoryService");
class CategoryController {
    createCategory(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let { name } = req.body;
                const category = yield CategoryService_1.default.createCategory(name);
                return ResponseHelper_1.default.created(res, "Category Added successfully", { category });
            }
            catch (error) {
                next(error);
            }
        });
    }
    ;
    getCategory(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let page = req.query.page || 1;
                let options = {
                    page: page || 1,
                    limit: 10,
                    sort: {
                        createdAt: -1,
                    },
                };
                const category = yield CategoryService_1.default.getCategory(options);
                return ResponseHelper_1.default.created(res, "Category Added successfully", { category });
            }
            catch (error) {
                next(error);
            }
        });
    }
    ;
    getAllCategory(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const category = yield CategoryService_1.default.getAllCategories();
                return ResponseHelper_1.default.created(res, "Category Added successfully", { category });
            }
            catch (error) {
                next(error);
            }
        });
    }
    editCategory(req, res, next) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let categoryId = (_a = req.params) === null || _a === void 0 ? void 0 : _a.id;
                let { name } = req.body;
                const category = yield CategoryService_1.default.editCategory(categoryId, name);
                return ResponseHelper_1.default.ok(res, "Category Updated successfully", { category });
            }
            catch (error) {
                next(error);
            }
        });
    }
    deleteCategory(req, res, next) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let categoryId = (_a = req.params) === null || _a === void 0 ? void 0 : _a.id;
                const category = yield CategoryService_1.default.deleteCategory(categoryId);
                return ResponseHelper_1.default.ok(res, "Category Deleted successfully", { category });
            }
            catch (error) {
                next(error);
            }
        });
    }
}
;
exports.default = new CategoryController();
