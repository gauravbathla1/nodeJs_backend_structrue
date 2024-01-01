"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const QuotesController_1 = require("../../controllers/admin/QuotesController");
const AuthenticationMiddleware_1 = require("../../middlewares/AuthenticationMiddleware");
const QuotesValidaer_1 = require("../../validators/admin/QuotesValidaer");
class CategoryRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.postRoutes();
        this.patchRoutes();
        this.getRoutes();
    }
    postRoutes() {
        this.router.post('/add', AuthenticationMiddleware_1.default.admin, QuotesValidaer_1.default.add, QuotesController_1.default.createQuote);
    }
    getRoutes() {
        this.router.get('/', AuthenticationMiddleware_1.default.admin, QuotesController_1.default.getQuotes);
    }
    patchRoutes() {
        this.router.patch('/update/:id', AuthenticationMiddleware_1.default.admin, QuotesValidaer_1.default.update, QuotesController_1.default.editQuote);
        this.router.patch('/delete/:id', AuthenticationMiddleware_1.default.admin, QuotesController_1.default.deleteQuote);
    }
}
exports.default = new CategoryRoutes().router;
