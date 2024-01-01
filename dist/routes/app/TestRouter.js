"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const TestController_1 = require("../../controllers/app/TestController");
const AuthenticationMiddleware_1 = require("../../middlewares/AuthenticationMiddleware");
class TestRouter {
    constructor() {
        this.router = (0, express_1.Router)();
        this.postRoutes();
    }
    postRoutes() {
        this.router.post('/', AuthenticationMiddleware_1.default.user, TestController_1.default.test);
    }
}
exports.default = new TestRouter().router;
