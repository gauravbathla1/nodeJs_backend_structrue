"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const CartController_1 = require("../../controllers/app/CartController");
const AuthenticationMiddleware_1 = require("../../middlewares/AuthenticationMiddleware");
class CartRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.postRoutes();
        this.patchRoutes();
        this.getRoutes();
        this.deleteRoutes();
    }
    postRoutes() {
        this.router.post('/', AuthenticationMiddleware_1.default.user, 
        // CartValidator.add,
        CartController_1.default.add);
    }
    patchRoutes() {
        this.router.patch('/:id/:order', AuthenticationMiddleware_1.default.user, CartController_1.default.update);
    }
    getRoutes() {
        this.router.get('/', AuthenticationMiddleware_1.default.user, CartController_1.default.list);
    }
    deleteRoutes() {
        this.router.delete('/:id', AuthenticationMiddleware_1.default.user, CartController_1.default.delete);
        this.router.delete('/', AuthenticationMiddleware_1.default.user, CartController_1.default.clear);
    }
}
exports.default = new CartRoutes().router;
