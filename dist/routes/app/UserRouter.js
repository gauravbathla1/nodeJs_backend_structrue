"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const UserController_1 = require("../../controllers/app/UserController");
class UserRouter {
    constructor() {
        this.router = (0, express_1.Router)();
        this.postRoutes();
        this.getRoutes();
    }
    getRoutes() {
        this.router.get('/sponser-logo', UserController_1.default.getSponserLogo);
        this.router.get('/speaker', UserController_1.default.getSpeaker);
    }
    postRoutes() {
        this.router.post('/contact', UserController_1.default.contactForm);
    }
}
exports.default = new UserRouter().router;
