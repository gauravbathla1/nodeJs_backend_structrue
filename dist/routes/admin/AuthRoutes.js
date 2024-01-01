"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const AuthController_1 = require("../../controllers/admin/AuthController");
const AuthenticationMiddleware_1 = require("../../middlewares/AuthenticationMiddleware");
const AuthValidator_1 = require("../../validators/admin/AuthValidator");
const UserControoller_1 = require("../../controllers/admin/UserControoller");
class AuthRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.postRoutes();
        this.getRoutes();
        this.patchRoutes();
    }
    getRoutes() {
        this.router.get('/dashboard', UserControoller_1.default.getDashBoardData);
        this.router.get('/', AuthenticationMiddleware_1.default.admin, UserControoller_1.default.getUserList);
    }
    postRoutes() {
        this.router.post('/login', AuthValidator_1.default.login, AuthController_1.default.login);
        this.router.post('/change-password', AuthenticationMiddleware_1.default.admin, AuthValidator_1.default.changePassword, AuthController_1.default.changePassword);
        this.router.post('/forgot-password', AuthValidator_1.default.forgotPassword, AuthController_1.default.forgetPassword);
        this.router.post('/verify-link', AuthenticationMiddleware_1.default.admin, AuthController_1.default.verifyLink);
        this.router.post('/reset-password', AuthenticationMiddleware_1.default.admin, AuthController_1.default.resetPassword);
    }
    patchRoutes() {
        this.router.get('/user/:id', AuthenticationMiddleware_1.default.admin, UserControoller_1.default.updateUserStats);
    }
}
exports.default = new AuthRoutes().router;
