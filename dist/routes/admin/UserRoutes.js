"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const UserController_1 = require("../../controllers/admin/UserController");
const AuthenticationMiddleware_1 = require("../../middlewares/AuthenticationMiddleware");
class UserRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.getRoutes();
        this.patchRoutes();
    }
    getRoutes() {
        this.router.get('/', AuthenticationMiddleware_1.default.admin, UserController_1.default.list);
        this.router.get('/:id', AuthenticationMiddleware_1.default.admin, UserController_1.default.findUserById);
    }
    patchRoutes() {
        this.router.patch('/:id/status', AuthenticationMiddleware_1.default.admin, UserController_1.default.activeUpdateStatus);
    }
}
exports.default = new UserRoutes().router;
