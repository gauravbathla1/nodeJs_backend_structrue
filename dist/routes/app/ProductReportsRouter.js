"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ProductReportController_1 = require("../../controllers/app/ProductReportController");
const AuthenticationMiddleware_1 = require("../../middlewares/AuthenticationMiddleware");
const ProductReportValidator_1 = require("../../validators/app/ProductReportValidator");
class ProductReportRouter {
    constructor() {
        this.router = (0, express_1.Router)();
        this.postRoutes();
    }
    getRoutes() {
    }
    postRoutes() {
        this.router.post('/', AuthenticationMiddleware_1.default.user, ProductReportValidator_1.default.productReport, ProductReportController_1.default.add);
    }
    patchRoutes() {
    }
    putRoutes() {
    }
}
exports.default = new ProductReportRouter().router;
