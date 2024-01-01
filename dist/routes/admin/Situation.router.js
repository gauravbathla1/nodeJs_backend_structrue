"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const SituationController_1 = require("../../controllers/admin/SituationController");
const AuthenticationMiddleware_1 = require("../../middlewares/AuthenticationMiddleware");
const FileUploadMiddleware_1 = require("../../middlewares/FileUploadMiddleware");
class SituationRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.postRoutes();
        this.patchRoutes();
        this.getRoutes();
    }
    postRoutes() {
        this.router.post('/add', AuthenticationMiddleware_1.default.admin, SituationController_1.default.createSituation);
        this.router.post('/upload-image', AuthenticationMiddleware_1.default.admin, FileUploadMiddleware_1.default.upload, SituationController_1.default.uploadImage);
    }
    getRoutes() {
        this.router.get('/', AuthenticationMiddleware_1.default.admin, SituationController_1.default.getSituation);
    }
    patchRoutes() {
        this.router.patch('/update/:id', AuthenticationMiddleware_1.default.admin, SituationController_1.default.editSituation);
        this.router.patch('/delete/:id', AuthenticationMiddleware_1.default.admin, SituationController_1.default.deleteSituation);
    }
}
exports.default = new SituationRoutes().router;
