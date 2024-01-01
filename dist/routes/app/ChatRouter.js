"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ChatController_1 = require("../../controllers/app/ChatController");
const AuthenticationMiddleware_1 = require("../../middlewares/AuthenticationMiddleware");
class ChatRouter {
    constructor() {
        this.router = (0, express_1.Router)();
        this.getRoutes();
        this.postRoutes();
    }
    getRoutes() {
        this.router.get('/my-groups', AuthenticationMiddleware_1.default.user, ChatController_1.default.myGroupForMessage);
        this.router.get('/join-groups', AuthenticationMiddleware_1.default.user, ChatController_1.default.joinGroupForChat);
        this.router.get('/history/:id', AuthenticationMiddleware_1.default.user, ChatController_1.default.chatHistory);
        this.router.get('/group-members/:id', AuthenticationMiddleware_1.default.user, ChatController_1.default.chatGroupMembers);
        this.router.get('/report-reason-list', AuthenticationMiddleware_1.default.user, ChatController_1.default.chatReportReasonList);
    }
    postRoutes() {
        this.router.post('/user-removed', ChatController_1.default.blockUserForRemoval);
        this.router.post('/report', AuthenticationMiddleware_1.default.user, ChatController_1.default.chatReportByUser);
    }
}
exports.default = new ChatRouter().router;
