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
class TestController {
    test(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // const data = await GroupMemberModel.updateMany({}, { isChatBlocked: false });
                // await ChatService.removeFromRoom(req.user._id, '6328426c6efefacb67f3cb60')
                return ResponseHelper_1.default.ok(res, 'ok', {});
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.default = new TestController();
