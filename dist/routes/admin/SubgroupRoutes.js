"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const SubgroupController_1 = require("../../controllers/admin/SubgroupController");
const AuthenticationMiddleware_1 = require("../../middlewares/AuthenticationMiddleware");
class SubgroupRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.getRoutes();
    }
    getRoutes() {
        this.router.get("/", AuthenticationMiddleware_1.default.admin, SubgroupController_1.default.subgroupList);
        this.router.get("/:id", AuthenticationMiddleware_1.default.admin, SubgroupController_1.default.subgroupDetails);
    }
}
exports.default = new SubgroupRoutes().router;
