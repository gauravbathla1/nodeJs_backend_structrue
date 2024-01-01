"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const FilterController_1 = require("../../controllers/admin/FilterController");
const AuthenticationMiddleware_1 = require("../../middlewares/AuthenticationMiddleware");
class FilterRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.getRoutes();
    }
    getRoutes() {
        this.router.get('/', AuthenticationMiddleware_1.default.admin, FilterController_1.default.list);
    }
}
exports.default = new FilterRoutes().router;
