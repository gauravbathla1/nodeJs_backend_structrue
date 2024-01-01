"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const RecentSearchController_1 = require("../../controllers/app/RecentSearchController");
const AuthenticationMiddleware_1 = require("../../middlewares/AuthenticationMiddleware");
const RecentSearchValidator_1 = require("../../validators/app/RecentSearchValidator");
class ReportReason {
    constructor() {
        this.router = (0, express_1.Router)();
        this.postRoutes();
        this.deleteRoutes();
        this.getRoutes();
    }
    getRoutes() {
        this.router.get('/', AuthenticationMiddleware_1.default.user, RecentSearchController_1.default.list);
    }
    postRoutes() {
        this.router.post('/', AuthenticationMiddleware_1.default.user, RecentSearchValidator_1.default.add, RecentSearchController_1.default.add);
    }
    deleteRoutes() {
        this.router.delete('/:id', AuthenticationMiddleware_1.default.user, RecentSearchController_1.default.delete);
        this.router.delete('/', AuthenticationMiddleware_1.default.user, RecentSearchController_1.default.clear);
    }
}
exports.default = new ReportReason().router;
