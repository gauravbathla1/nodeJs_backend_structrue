"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const SubgroupController_1 = require("../../controllers/app/SubgroupController");
const AuthenticationMiddleware_1 = require("../../middlewares/AuthenticationMiddleware");
const FileUploadMiddleware_1 = require("../../middlewares/FileUploadMiddleware");
const SubgroupValidator_1 = require("../../validators/app/SubgroupValidator");
class SubgroupRouter {
    constructor() {
        this.router = (0, express_1.Router)();
        this.postRoutes();
        this.getRoutes();
        this.patchRoutes();
        this.deleteRoutes();
    }
    postRoutes() {
        this.router.post('/create', AuthenticationMiddleware_1.default.user, FileUploadMiddleware_1.default.upload, SubgroupValidator_1.default.createSubgroup, SubgroupController_1.default.createSubgroup);
        this.router.post('/add-member', AuthenticationMiddleware_1.default.user, SubgroupValidator_1.default.addMember, SubgroupController_1.default.addMember);
    }
    getRoutes() {
        this.router.get('/list/:id', AuthenticationMiddleware_1.default.user, SubgroupController_1.default.subgroupList);
        this.router.get('/user-subgroup', AuthenticationMiddleware_1.default.user, SubgroupController_1.default.userSubgroupList);
        this.router.get('/details/:id', AuthenticationMiddleware_1.default.user, SubgroupController_1.default.subgroupDetails);
        this.router.get('/member-list/:id', AuthenticationMiddleware_1.default.user, SubgroupController_1.default.memberList);
        this.router.get('/group-member-list/:id', AuthenticationMiddleware_1.default.user, SubgroupController_1.default.groupMemberListToAddSubgroup);
    }
    patchRoutes() {
        this.router.patch('/remove-member/:id', AuthenticationMiddleware_1.default.user, SubgroupValidator_1.default.removeMember, SubgroupController_1.default.removeMember);
        this.router.patch('/edit/:id', AuthenticationMiddleware_1.default.user, FileUploadMiddleware_1.default.upload, SubgroupValidator_1.default.editSubgroup, SubgroupController_1.default.editSubgroup);
    }
    deleteRoutes() {
        this.router.delete('/delete/:id', AuthenticationMiddleware_1.default.user, SubgroupController_1.default.deleteSubgroup);
    }
}
exports.default = new SubgroupRouter().router;
