"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const LogoController_1 = require("../../controllers/admin/LogoController");
const FileUploadMiddleware_1 = require("../../middlewares/FileUploadMiddleware");
class logoRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.getRoutes();
        this.postRoutes();
        this.patchRutes();
    }
    getRoutes() {
        this.router.get('/get-all-logo', 
        // AuthenticationMiddleware.admin,
        LogoController_1.default.getAllLogo);
    }
    postRoutes() {
        this.router.post('/create', 
        // AuthenticationMiddleware.admin,
        FileUploadMiddleware_1.default.upload, LogoController_1.default.createLogo);
        this.router.post('/edit-logo', FileUploadMiddleware_1.default.upload, LogoController_1.default.edit);
    }
    patchRutes() {
        this.router.patch('/update-status/:id', LogoController_1.default.updateStatus);
        this.router.patch('/update-banner-status/:id', LogoController_1.default.updateLogoBannerStatus);
    }
}
exports.default = new logoRoutes().router;
