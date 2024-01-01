"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const TechniqueController_1 = require("../../controllers/admin/TechniqueController");
const AuthenticationMiddleware_1 = require("../../middlewares/AuthenticationMiddleware");
class TechniqueRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.postRoutes();
        this.patchRoutes();
        this.getRoutes();
    }
    postRoutes() {
        this.router.post('/add', AuthenticationMiddleware_1.default.admin, TechniqueController_1.default.createTechnique);
    }
    getRoutes() {
        this.router.get('/', AuthenticationMiddleware_1.default.admin, TechniqueController_1.default.getTechnique);
    }
    patchRoutes() {
        this.router.patch('/update/:id', AuthenticationMiddleware_1.default.admin, TechniqueController_1.default.editTechnique);
        this.router.patch('/delete/:id', AuthenticationMiddleware_1.default.admin, TechniqueController_1.default.deleteTechnique);
    }
}
exports.default = new TechniqueRoutes().router;
