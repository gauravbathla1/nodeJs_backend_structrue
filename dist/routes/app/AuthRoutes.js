"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const AuthController_1 = require("../../controllers/app/AuthController");
const AuthValidator_1 = require("../../validators/admin/AuthValidator");
class AuthRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.postRoutes();
    }
    postRoutes() {
        this.router.post('/login', AuthValidator_1.default.socialLogin, AuthController_1.default.socailLogin);
        this.router.post('/guest-login', AuthValidator_1.default.guestLogin, AuthController_1.default.guestLogin);
    }
}
exports.default = new AuthRoutes().router;
