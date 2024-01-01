"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const HomeContoller_1 = require("../../controllers/app/HomeContoller");
const AuthenticationMiddleware_1 = require("../../middlewares/AuthenticationMiddleware");
class HomeRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.postRoutes();
        this.getRoutes();
    }
    postRoutes() {
        this.router.post('/common/technique-situation', AuthenticationMiddleware_1.default.user, HomeContoller_1.default.getCommonTechniqueOrSitutation);
        this.router.post('/share', HomeContoller_1.default.share);
    }
    getRoutes() {
        this.router.get('/quotes', AuthenticationMiddleware_1.default.user, HomeContoller_1.default.getQuote);
        this.router.get('/detail', AuthenticationMiddleware_1.default.user, HomeContoller_1.default.getDetails);
        this.router.get('/', AuthenticationMiddleware_1.default.user, AuthenticationMiddleware_1.default.updateLogin, HomeContoller_1.default.dashboard);
        this.router.get('/categories', AuthenticationMiddleware_1.default.user, HomeContoller_1.default.getCategories);
        this.router.get('/situations', AuthenticationMiddleware_1.default.user, HomeContoller_1.default.getSituation);
        this.router.get('/techniques', AuthenticationMiddleware_1.default.user, HomeContoller_1.default.getTechniques);
    }
}
exports.default = new HomeRoutes().router;
