"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const CategoryController_1 = require("../../controllers/app/CategoryController");
class CategoryRouter {
    constructor() {
        this.router = (0, express_1.Router)();
        this.getRoutes();
    }
    getRoutes() {
        this.router.get('/', CategoryController_1.default.categoryList);
        this.router.get('/list', CategoryController_1.default.categoryListAll);
        this.router.get('/stores', CategoryController_1.default.storeList);
        this.router.get('/:sub-list-id/:id', CategoryController_1.default.subcategoryListById);
        this.router.get('/:sub-list-slug/:slug', CategoryController_1.default.subcategoryListBySlug);
        this.router.get('/section-list/:subcategorySlug', CategoryController_1.default.sectionList);
    }
}
exports.default = new CategoryRouter().router;
