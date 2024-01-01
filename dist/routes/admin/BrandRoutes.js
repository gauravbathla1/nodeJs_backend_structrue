"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const BrandController_1 = require("../../controllers/admin/BrandController");
const AuthenticationMiddleware_1 = require("../../middlewares/AuthenticationMiddleware");
const FileUploadMiddleware_1 = require("../../middlewares/FileUploadMiddleware");
const BrandValidator_1 = require("../../validators/admin/BrandValidator");
class BrandRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.getRoutes();
        this.postRoutes();
        this.putRoutes();
        this.patchRoutes();
        this.deleteRoutes();
    }
    getRoutes() {
        this.router.get('/', AuthenticationMiddleware_1.default.admin, BrandController_1.default.list);
    }
    postRoutes() {
    }
    patchRoutes() {
        this.router.patch('/:id', AuthenticationMiddleware_1.default.admin, FileUploadMiddleware_1.default.upload, BrandValidator_1.default.editBrand, BrandController_1.default.update);
        this.router.patch('/:id/status', AuthenticationMiddleware_1.default.admin, BrandController_1.default.ChangeBrandStatus);
    }
    putRoutes() {
        this.router.put('/', AuthenticationMiddleware_1.default.admin, FileUploadMiddleware_1.default.upload, BrandValidator_1.default.addBrand, BrandController_1.default.addBrand);
    }
    deleteRoutes() {
    }
}
exports.default = new BrandRoutes().router;
