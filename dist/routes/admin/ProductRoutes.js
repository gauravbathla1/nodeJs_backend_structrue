"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ProductController_1 = require("../../controllers/admin/ProductController");
const AuthenticationMiddleware_1 = require("../../middlewares/AuthenticationMiddleware");
const FileUploadMiddleware_1 = require("../../middlewares/FileUploadMiddleware");
const ProductValidator_1 = require("../../validators/admin/ProductValidator");
class ProductRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.postRoutes();
        this.patchRoutes();
        this.deleteRoutes();
        this.getRoutes();
        this.putRoutes();
        this.patchRoutes();
    }
    postRoutes() {
        this.router.post('/', AuthenticationMiddleware_1.default.admin, ProductValidator_1.default.add, ProductController_1.default.add);
    }
    getRoutes() {
        this.router.get('/', AuthenticationMiddleware_1.default.admin, ProductController_1.default.list);
        this.router.get('/test', AuthenticationMiddleware_1.default.admin, ProductController_1.default.test);
        this.router.get('/:id', AuthenticationMiddleware_1.default.admin, ProductController_1.default.fetchProduct);
    }
    deleteRoutes() {
        this.router.delete('/:id', AuthenticationMiddleware_1.default.admin, ProductController_1.default.delete);
        this.router.delete('/:id/cover', AuthenticationMiddleware_1.default.admin, ProductController_1.default.deleteCoverImage);
        this.router.delete('/:id/photo', AuthenticationMiddleware_1.default.admin, ProductController_1.default.deletePhoto);
    }
    putRoutes() {
        // this.router.put(
        //     '/coverphoto/:id', AuthenticationMiddleware.admin,
        //     FileUploadMiddleware.upload,
        //     ProductController.changeCoverImage
        // );
        this.router.put('/:id', AuthenticationMiddleware_1.default.admin, FileUploadMiddleware_1.default.upload, ProductController_1.default.uploadImage);
        this.router.put('/edit/:id', AuthenticationMiddleware_1.default.admin, ProductController_1.default.edit);
    }
    patchRoutes() {
        this.router.patch('/:id', AuthenticationMiddleware_1.default.admin, ProductController_1.default.edit);
        this.router.patch('/:id/status', AuthenticationMiddleware_1.default.admin, ProductController_1.default.activeupdateStatus);
        this.router.patch('/:id/attributes', AuthenticationMiddleware_1.default.admin, ProductController_1.default.addAttributes);
    }
}
exports.default = new ProductRoutes().router;
