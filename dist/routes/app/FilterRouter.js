"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const FilterController_1 = require("../../controllers/app/FilterController");
class FilterRouter {
    constructor() {
        this.router = (0, express_1.Router)();
        this.getRoutes();
        this.postRoutes();
    }
    getRoutes() {
        this.router.get('/list-by-id/:id', FilterController_1.default.getFilterById);
        this.router.get('/list-by-slug/:slug', FilterController_1.default.getFilterBySlug);
    }
    postRoutes() {
        this.router.post('/breadcrumb', FilterController_1.default.getBreadCamp);
    }
}
exports.default = new FilterRouter().router;
