"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ChatReportController_1 = require("../../controllers/admin/ChatReportController");
const AuthenticationMiddleware_1 = require("../../middlewares/AuthenticationMiddleware");
class ChatRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.getRoutes();
        this.deleteRoutes();
        this.patchRoutes();
    }
    getRoutes() {
        this.router.get('/report-list', AuthenticationMiddleware_1.default.admin, ChatReportController_1.default.reportsList);
    }
    patchRoutes() {
        this.router.patch('/report-respond/:id', AuthenticationMiddleware_1.default.admin, ChatReportController_1.default.reportRespondTo);
    }
    deleteRoutes() {
        this.router.delete('/report-delete/:id', AuthenticationMiddleware_1.default.admin, ChatReportController_1.default.deleteReport);
    }
}
exports.default = new ChatRoutes().router;
