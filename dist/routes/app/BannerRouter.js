"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const BannerController_1 = require("../../controllers/app/BannerController");
class BannerRouter {
    constructor() {
        this.router = (0, express_1.Router)();
        this.getRoutes();
    }
    getRoutes() {
        this.router.get('/', BannerController_1.default.getBannerList);
    }
}
exports.default = new BannerRouter().router;
