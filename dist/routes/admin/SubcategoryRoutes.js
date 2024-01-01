"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const SubcategoryController_1 = require("../../controllers/admin/SubcategoryController");
const AuthenticationMiddleware_1 = require("../../middlewares/AuthenticationMiddleware");
const FileUploadMiddleware_1 = require("../../middlewares/FileUploadMiddleware");
const SubcategoryValidator_1 = require("../../validators/admin/SubcategoryValidator");
class SubcategoryRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.postRoutes();
        this.patchRoutes();
        this.deleteRoutes();
        this.getRoutes();
        this.putRoutes();
    }
    postRoutes() {
        this.router.post('/', AuthenticationMiddleware_1.default.admin, SubcategoryValidator_1.default.add, SubcategoryController_1.default.add);
    }
    patchRoutes() {
        this.router.patch('/:id', AuthenticationMiddleware_1.default.admin, SubcategoryValidator_1.default.update, SubcategoryController_1.default.update);
        this.router.patch('/:id/status', AuthenticationMiddleware_1.default.admin, SubcategoryController_1.default.activeupdateStatus);
    }
    getRoutes() {
        this.router.get('/:id', AuthenticationMiddleware_1.default.admin, SubcategoryController_1.default.list);
        this.router.get('/:id/subcategory', AuthenticationMiddleware_1.default.admin, SubcategoryController_1.default.get);
    }
    deleteRoutes() {
        this.router.delete('/:id', AuthenticationMiddleware_1.default.admin, SubcategoryController_1.default.delete);
    }
    putRoutes() {
        this.router.put('/', AuthenticationMiddleware_1.default.admin, FileUploadMiddleware_1.default.upload, SubcategoryController_1.default.uploadImage);
    }
}
exports.default = new SubcategoryRoutes().router;
