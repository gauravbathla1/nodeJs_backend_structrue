"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const AuthController_1 = require("../../controllers/app/AuthController");
const userMiddleware_1 = require("../../middlewares/userMiddleware");
const AuthValidator_1 = require("../../validators/app/AuthValidator");
class AuthRouter {
    constructor() {
        this.router = (0, express_1.Router)();
        this.postRoutes();
        this.patchRoutes();
    }
    postRoutes() {
        this.router.post('/signup', userMiddleware_1.default.checkUser, AuthController_1.default.signUp);
        this.router.post('/login', AuthValidator_1.default.login, AuthController_1.default.login);
        this.router.post('/forgot-password', AuthValidator_1.default.forgotPassword, AuthController_1.default.forgotPassword);
        this.router.post('/reset-password', AuthValidator_1.default.resetPassword, AuthController_1.default.resetPassword);
        this.router.post('/resend-verification', AuthValidator_1.default.resendVerification, AuthController_1.default.resendVerification);
    }
    patchRoutes() {
        this.router.patch('/verify-account', AuthController_1.default.verifyAccount);
    }
}
exports.default = new AuthRouter().router;
