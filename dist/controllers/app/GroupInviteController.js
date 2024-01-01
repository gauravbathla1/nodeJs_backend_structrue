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
const GroupInviteService_1 = require("../../services/app/GroupInviteService");
class GroupInviteController {
    /**
           * @api {post} api/v1/app/group/invite-member Invite a member to join wefundus and a group via email
           * @apiHeader {String} App-Version Version Code 1.0.0.
           * @apiHeader {String} deviceType 'WEB'|'IOS'|'ANDROID'
           * @apiHeader {String} Authorization eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9........
           * @apiVersion 1.0.0
           * @apiName invite-member
           * @apiGroup App-Group
           *
           * @apiParam {String} groupId
           * @apiParam {String[]} emails array of email ids
           * @apiParam {String} content
           *
           * @apiParamExample {json} Request-Body
           * {
           *         "groupId": "6321d770c49be8f2c62454ac",
           *         "emails": [
           *             "pukhraj@mailinator.com",
           *             "pukhraj1@mailinator.com",
           *             "pukhraj2@mailinator.com",
           *             "pukhraj3@mailinator.com",
           *             "pukhraj4@mailinator.com",
           *             "pukhraj5@mailinator.com"
           *         ],
           *         "content": "aaiye or join wefundus for growing an orgnasition"
           *     }
           *
           * @apiSuccessExample {json} Success-Response
           *   {
           *         "status": 200,
           *         "statusText": "SUCCESS",
           *         "message": "Invitation sent successfully",
           *     }
           *
           */
    inviteMember(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = req.user;
                const emails = req.body.emails;
                const groupId = req.body.groupId;
                const content = req.body.content;
                const result = yield GroupInviteService_1.default.inviteMember(user, groupId, emails, content);
                if (result.groupNotExists)
                    return ResponseHelper_1.default.badRequest(res, res.__('invalid_group_id'));
                if (result.notAdmin)
                    return ResponseHelper_1.default.badRequest(res, res.__('only_admin_can_invite'));
                return ResponseHelper_1.default.ok(res, res.__('invitation_sent'), {});
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.default = new GroupInviteController();
