"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ColorController_1 = require("../../controllers/admin/ColorController");
const AuthenticationMiddleware_1 = require("../../middlewares/AuthenticationMiddleware");
class ColorRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.getRoutes();
        this.postRoutes();
        this.deleteRoutes();
    }
    postRoutes() {
        this.router.post("/", AuthenticationMiddleware_1.default.admin, ColorController_1.default.addColor);
    }
    getRoutes() {
        this.router.get("/", AuthenticationMiddleware_1.default.admin, ColorController_1.default.getColor);
    }
    deleteRoutes() {
        this.router.delete('/:id', AuthenticationMiddleware_1.default.admin, ColorController_1.default.delete);
    }
}
exports.default = new ColorRoutes().router;
