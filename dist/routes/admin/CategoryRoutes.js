"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const CategoryController_1 = require("../../controllers/admin/CategoryController");
const AuthenticationMiddleware_1 = require("../../middlewares/AuthenticationMiddleware");
const CategoryValidator_1 = require("../../validators/admin/CategoryValidator");
class CategoryRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.postRoutes();
        this.patchRoutes();
        this.getRoutes();
    }
    postRoutes() {
        this.router.post('/add', AuthenticationMiddleware_1.default.admin, CategoryValidator_1.default.add, CategoryController_1.default.createCategory);
    }
    getRoutes() {
        this.router.get('/list', AuthenticationMiddleware_1.default.admin, CategoryController_1.default.getCategory);
        this.router.get('/-all', AuthenticationMiddleware_1.default.admin, CategoryController_1.default.getAllCategory);
    }
    patchRoutes() {
        this.router.patch('/update/:id', AuthenticationMiddleware_1.default.admin, CategoryValidator_1.default.update, CategoryController_1.default.editCategory);
        this.router.patch('/delete/:id', AuthenticationMiddleware_1.default.admin, CategoryController_1.default.deleteCategory);
    }
}
exports.default = new CategoryRoutes().router;
