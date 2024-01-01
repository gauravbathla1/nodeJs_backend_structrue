"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const WishlistController_1 = require("../../controllers/app/WishlistController");
const AuthenticationMiddleware_1 = require("../../middlewares/AuthenticationMiddleware");
const WishlistValidator_1 = require("../../validators/app/WishlistValidator");
class WishlistRouter {
    constructor() {
        this.router = (0, express_1.Router)();
        this.postRoutes();
        this.getRoutes();
        this.deleteRoutes();
    }
    postRoutes() {
        this.router.post('/', AuthenticationMiddleware_1.default.user, WishlistValidator_1.default.add, WishlistController_1.default.add);
    }
    getRoutes() {
        this.router.get('/', AuthenticationMiddleware_1.default.user, WishlistController_1.default.list);
    }
    deleteRoutes() {
        this.router.delete('/:id', AuthenticationMiddleware_1.default.user, WishlistController_1.default.delete);
    }
}
exports.default = new WishlistRouter().router;
