"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const AuthRoutes_1 = require("./admin/AuthRoutes");
const AuthRoutes_2 = require("./app/AuthRoutes");
const CategoryRoutes_1 = require("./admin/CategoryRoutes");
const QuoteRotes_1 = require("./admin/QuoteRotes");
const Situation_router_1 = require("./admin/Situation.router");
const TechniqueRouter_1 = require("./admin/TechniqueRouter");
const HomeRoutes_1 = require("./app/HomeRoutes");
class Routes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.app();
        this.admin();
    }
    app() {
        this.router.use('/app/auth', AuthRoutes_2.default);
        this.router.use('/app/home', HomeRoutes_1.default);
    }
    admin() {
        this.router.use('/admin/auth', AuthRoutes_1.default);
        this.router.use('/admin/category', CategoryRoutes_1.default);
        this.router.use('/admin/quotes', QuoteRotes_1.default);
        this.router.use('/admin/situation', Situation_router_1.default);
        this.router.use('/admin/technique', TechniqueRouter_1.default);
    }
}
exports.default = new Routes().router;
