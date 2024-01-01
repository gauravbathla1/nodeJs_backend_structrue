"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const SectionController_1 = require("../../controllers/admin/SectionController");
const AuthenticationMiddleware_1 = require("../../middlewares/AuthenticationMiddleware");
const FileUploadMiddleware_1 = require("../../middlewares/FileUploadMiddleware");
const SectionValidator_1 = require("../../validators/admin/SectionValidator");
class SectionRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.postRoutes();
        this.patchRoutes();
        this.deleteRoutes();
        this.getRoutes();
    }
    postRoutes() {
        this.router.post('/', AuthenticationMiddleware_1.default.admin, FileUploadMiddleware_1.default.upload, SectionValidator_1.default.add, SectionController_1.default.add);
    }
    patchRoutes() {
        this.router.patch('/:id', AuthenticationMiddleware_1.default.admin, FileUploadMiddleware_1.default.upload, SectionValidator_1.default.add, SectionController_1.default.update);
        this.router.patch('/:id/status', AuthenticationMiddleware_1.default.admin, SectionController_1.default.activeupdateStatus);
    }
    getRoutes() {
        // this.router.get(
        //     '/list/:id',
        //     AuthenticationMiddleware.admin,
        //     SectionController.list
        // );
        this.router.get('/:id', AuthenticationMiddleware_1.default.admin, SectionController_1.default.list);
    }
    deleteRoutes() {
        this.router.delete('/:id', AuthenticationMiddleware_1.default.admin, SectionController_1.default.delete);
    }
}
exports.default = new SectionRoutes().router;
