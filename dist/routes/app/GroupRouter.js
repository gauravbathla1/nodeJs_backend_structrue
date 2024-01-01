"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const GroupController_1 = require("../../controllers/app/GroupController");
const GroupFavouriteController_1 = require("../../controllers/app/GroupFavouriteController");
const GroupInviteController_1 = require("../../controllers/app/GroupInviteController");
const GroupRequestController_1 = require("../../controllers/app/GroupRequestController");
const AuthenticationMiddleware_1 = require("../../middlewares/AuthenticationMiddleware");
const FileUploadMiddleware_1 = require("../../middlewares/FileUploadMiddleware");
const GroupValidator_1 = require("../../validators/app/GroupValidator");
class GroupRouter {
    constructor() {
        this.router = (0, express_1.Router)();
        this.postRoutes();
        this.getRoutes();
        this.patchRoutes();
        this.deleteRoutes();
    }
    postRoutes() {
        this.router.post('/create', AuthenticationMiddleware_1.default.user, FileUploadMiddleware_1.default.upload, GroupValidator_1.default.createGroup, GroupController_1.default.createGroup);
        this.router.post('/add-member', AuthenticationMiddleware_1.default.user, GroupValidator_1.default.addMember, GroupRequestController_1.default.addMember);
        this.router.post('/mark-as-favourite', AuthenticationMiddleware_1.default.user, GroupValidator_1.default.addToFavourite, GroupFavouriteController_1.default.addToFavourite);
        this.router.post('/join', AuthenticationMiddleware_1.default.user, GroupValidator_1.default.join, GroupController_1.default.joinGroup);
        this.router.post('/invite-members', AuthenticationMiddleware_1.default.user, GroupValidator_1.default.inviteMember, GroupInviteController_1.default.inviteMember);
    }
    getRoutes() {
        this.router.get('/list', AuthenticationMiddleware_1.default.user, GroupController_1.default.groupList);
        this.router.get('/details/:id', AuthenticationMiddleware_1.default.user, GroupController_1.default.groupDetails);
        this.router.get('/group-purpose/list', AuthenticationMiddleware_1.default.user, GroupController_1.default.groupPurpose);
        this.router.get('/member-list/:id', AuthenticationMiddleware_1.default.user, GroupController_1.default.groupMemberList);
        this.router.get('/user-list/:id', AuthenticationMiddleware_1.default.user, GroupRequestController_1.default.userList);
        this.router.get('/request-list', AuthenticationMiddleware_1.default.user, GroupRequestController_1.default.requestList);
        this.router.get('/search', 
        // AuthenticationMiddleware.user,
        GroupController_1.default.searchGroup);
        this.router.get('/all-list', AuthenticationMiddleware_1.default.user, GroupController_1.default.allGroupList);
        this.router.get('/search-suggestions', 
        // AuthenticationMiddleware.user,
        GroupController_1.default.searchSuggestions);
        this.router.get('/top-cashback-groups', 
        // AuthenticationMiddleware.user,
        GroupController_1.default.topCashBackGroups);
        this.router.get('/featured-groups', 
        // AuthenticationMiddleware.user,
        GroupController_1.default.featuredGroup);
        this.router.get('/favourite-group', AuthenticationMiddleware_1.default.user, GroupFavouriteController_1.default.favouriteGroupList);
    }
    patchRoutes() {
        this.router.patch('/edit/:id', AuthenticationMiddleware_1.default.user, FileUploadMiddleware_1.default.upload, GroupValidator_1.default.editGroup, GroupController_1.default.editGroup);
        this.router.patch('/request-action/:id', AuthenticationMiddleware_1.default.user, GroupValidator_1.default.groupRequestAction, GroupRequestController_1.default.groupRequestAction);
        this.router.patch('/remove-member/:id', AuthenticationMiddleware_1.default.user, GroupValidator_1.default.removeMember, GroupController_1.default.removeGroupMember);
    }
    deleteRoutes() {
        this.router.delete('/delete/:id', AuthenticationMiddleware_1.default.user, GroupController_1.default.deleteGroup);
        this.router.delete('/leave/:id', AuthenticationMiddleware_1.default.user, GroupController_1.default.leaveGroup);
        this.router.delete('/remove-from-favourite/:id', AuthenticationMiddleware_1.default.user, GroupFavouriteController_1.default.RemoveFromFavourite);
    }
}
exports.default = new GroupRouter().router;
