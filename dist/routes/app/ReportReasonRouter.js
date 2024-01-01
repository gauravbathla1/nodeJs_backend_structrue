"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ReportReasonController_1 = require("../../controllers/app/ReportReasonController");
class ReportReason {
    constructor() {
        this.router = (0, express_1.Router)();
        this.getRoutes();
    }
    getRoutes() {
        this.router.get('/:id', ReportReasonController_1.default.getReportReasonList);
    }
}
exports.default = new ReportReason().router;
