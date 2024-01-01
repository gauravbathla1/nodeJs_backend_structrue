import { NextFunction } from "express";
import { ResInterface, ReqInterface } from "../../interfaces/ReqInterface";
declare class GroupInviteController {
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
    inviteMember(req: ReqInterface, res: ResInterface, next: NextFunction): Promise<void>;
}
declare const _default: GroupInviteController;
export default _default;
