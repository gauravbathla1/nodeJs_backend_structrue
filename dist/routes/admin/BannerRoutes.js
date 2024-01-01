"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const BannerController_1 = require("../../controllers/admin/BannerController");
const AuthenticationMiddleware_1 = require("../../middlewares/AuthenticationMiddleware");
const FileUploadMiddleware_1 = require("../../middlewares/FileUploadMiddleware");
class BannerRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.postRoutes();
        this.patchRoutes();
        this.deleteRoutes();
        this.getRoutes();
        this.putRoutes();
    }
    postRoutes() {
        this.router.post('/', AuthenticationMiddleware_1.default.admin, FileUploadMiddleware_1.default.upload, BannerController_1.default.addBanner);
    }
    patchRoutes() {
        this.router.patch('/:id/status', AuthenticationMiddleware_1.default.admin, BannerController_1.default.activeUpdateStatus);
        this.router.patch('/:id/edit', AuthenticationMiddleware_1.default.admin, FileUploadMiddleware_1.default.upload, BannerController_1.default.edit);
    }
    getRoutes() {
        this.router.get('/', AuthenticationMiddleware_1.default.admin, BannerController_1.default.list);
    }
    deleteRoutes() {
    }
    putRoutes() {
    }
}
exports.default = new BannerRoutes().router;
