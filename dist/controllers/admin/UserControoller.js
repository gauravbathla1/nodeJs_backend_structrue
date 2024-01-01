"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const ResponseHelper_1 = require("../../helpers/ResponseHelper");
const UserService_1 = require("../../services/admin/UserService");
class UserController {
    getDashBoardData(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let data = yield UserService_1.default.getDashBoardData();
                return ResponseHelper_1.default.ok(res, "dashboard data find succesfully", data);
            }
            catch (error) {
                next(error);
            }
        });
    }
    ;
    getUserList(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let page = req.query.page || 1;
                let options = {
                    page: page || 1,
                    limit: 10,
                    sort: {
                        createdAt: -1,
                    },
                };
                let data = yield UserService_1.default.getUserList(options);
                return ResponseHelper_1.default.ok(res, "User list find succesfully", data);
            }
            catch (error) {
                console.log(error);
                next(error);
            }
        });
    }
    ;
    updateUserStats(req, res, next) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let userId = (_a = req === null || req === void 0 ? void 0 : req.params) === null || _a === void 0 ? void 0 : _a.id;
                let user = yield UserService_1.default.updateUserStatus(userId);
                return ResponseHelper_1.default.ok(res, "User list find succesfully", user);
            }
            catch (error) {
                next(error);
            }
        });
    }
}
;
exports.default = new UserController();
