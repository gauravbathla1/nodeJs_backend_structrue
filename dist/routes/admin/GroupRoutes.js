"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const GroupController_1 = require("../../controllers/admin/GroupController");
const AuthenticationMiddleware_1 = require("../../middlewares/AuthenticationMiddleware");
class GroupRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.getRoutes();
        this.deleteRoutes();
    }
    getRoutes() {
        this.router.get("/", AuthenticationMiddleware_1.default.admin, GroupController_1.default.groupList);
        this.router.get("/:id", AuthenticationMiddleware_1.default.admin, GroupController_1.default.groupDetails);
        this.router.get('/:id/members', AuthenticationMiddleware_1.default.admin, GroupController_1.default.groupMembers);
    }
    deleteRoutes() {
        this.router.patch("/", AuthenticationMiddleware_1.default.admin, GroupController_1.default.removeGroup);
    }
}
exports.default = new GroupRoutes().router;
