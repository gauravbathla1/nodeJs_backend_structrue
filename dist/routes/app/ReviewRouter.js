"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ReviewController_1 = require("../../controllers/app/ReviewController");
const AuthenticationMiddleware_1 = require("../../middlewares/AuthenticationMiddleware");
const ReviewValidator_1 = require("../../validators/app/ReviewValidator");
class BannerRouter {
    constructor() {
        this.router = (0, express_1.Router)();
        this.postRoutes();
        this.patchRoutes();
    }
    postRoutes() {
        this.router.post('/', AuthenticationMiddleware_1.default.user, ReviewValidator_1.default.addReview, ReviewController_1.default.add);
    }
    patchRoutes() {
        this.router.patch('/:id', AuthenticationMiddleware_1.default.user, ReviewValidator_1.default.editReview, ReviewController_1.default.edit);
    }
}
exports.default = new BannerRouter().router;
