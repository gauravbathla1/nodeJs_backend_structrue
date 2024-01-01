"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const SpeakerController_1 = require("../../controllers/admin/SpeakerController");
const FileUploadMiddleware_1 = require("../../middlewares/FileUploadMiddleware");
class SpeakerRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.getRoutes();
        this.postRoutes();
        this.patchRutes();
    }
    getRoutes() {
        this.router.get('/get-all-speaker', 
        // AuthenticationMiddleware.admin,
        SpeakerController_1.default.getAllSpeakers);
        this.router.get('/get-all-contacts', 
        // AuthenticationMiddleware.admin,
        SpeakerController_1.default.getContactList);
    }
    postRoutes() {
        this.router.post('/create', 
        // AuthenticationMiddleware.admin,
        FileUploadMiddleware_1.default.upload, SpeakerController_1.default.createSpeaker);
        this.router.post('/edit-speaker', FileUploadMiddleware_1.default.upload, SpeakerController_1.default.edit);
    }
    patchRutes() {
        this.router.patch('/update-status/:id', SpeakerController_1.default.updateStatus);
    }
}
exports.default = new SpeakerRoutes().router;
