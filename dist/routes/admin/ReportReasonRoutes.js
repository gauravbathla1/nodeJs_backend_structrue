"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ReportReasonController_1 = require("../../controllers/admin/ReportReasonController");
const AuthenticationMiddleware_1 = require("../../middlewares/AuthenticationMiddleware");
const ReportReasonValidator_1 = require("../../validators/admin/ReportReasonValidator");
class ReportReasonRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.postRoutes();
        this.patchRoutes();
        this.getRoutes();
    }
    postRoutes() {
        this.router.post('/', AuthenticationMiddleware_1.default.admin, ReportReasonValidator_1.default.add, ReportReasonController_1.default.add);
    }
    patchRoutes() {
        this.router.patch('/:id', AuthenticationMiddleware_1.default.admin, ReportReasonController_1.default.update);
        this.router.patch('/:id/status', AuthenticationMiddleware_1.default.admin, ReportReasonController_1.default.activeupdateStatus);
    }
    getRoutes() {
        this.router.get('/', AuthenticationMiddleware_1.default.admin, ReportReasonController_1.default.list);
    }
}
exports.default = new ReportReasonRoutes().router;
