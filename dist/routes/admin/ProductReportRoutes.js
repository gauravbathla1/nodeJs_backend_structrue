"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ProductReportController_1 = require("../../controllers/admin/ProductReportController");
const AuthenticationMiddleware_1 = require("../../middlewares/AuthenticationMiddleware");
class ProductReportRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.getRoutes();
    }
    getRoutes() {
        this.router.get('/', AuthenticationMiddleware_1.default.admin, ProductReportController_1.default.list);
    }
}
exports.default = new ProductReportRoutes().router;
