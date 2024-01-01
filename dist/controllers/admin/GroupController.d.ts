import { NextFunction } from "express";
import { ReqInterface, ResInterface } from "../../interfaces/ReqInterface";
declare class GroupController {
    /**
        * @api {get} /api/v1/admin/group Group list
        * @apiHeader {String} App-Version Version Code 1.0.0.
        * @apiHeader {String} deviceType 'WEB'|'IOS'|'ANDROID'
        * @apiVersion 1.0.0
        * @apiName get-group-list
        * @apiGroup Admin-Group
        * @apiSuccessExample {json} Success-Response:
        *HTTP/1.1 200 OK
        *    {
        *        "status": 200,
        *        "statusText": "SUCCESS",
        *        "message": "Group list fetched",
        *        "data": {
        *            "list": [
        *                {
        *                    "_id": "631867a72f264cd844f1949b",
        *                    "groupIcon": null,
        *                    "groupCode": "GT5301681",
        *                    "name": "test",
        *                    "purposeId": "631747bcd77165ad9c3a8575",
        *                    "purposeText": "testing purpose 123",
        *                    "description": "this is testing.",
        *                    "goalInterval": "1",
        *                    "goalPrice": 100,
        *                    "showContactInfo": true,
        *                    "phoneNumber": "1234567890",
        *                    "email": "test@gmail.com",
        *                    "address": "this is address",
        *                    "showSocialInfo": true,
        *                    "facebookUrl": "fb.com",
        *                    "twitterUrl": "twitter.com",
        *                    "members": [
        *                        "62dfcb21fb89c4b45de44685"
        *                    ],
        *                    "createdBy": "62dfcb21fb89c4b45de44685",
        *                    "totalMembers": 1,
        *                    "totalSubgroup": 0,
        *                    "subGroupLimit": 0,
        *                    "isDeleted": false,
        *                    "createdAt": "2022-09-07T09:43:03.164Z",
        *                    "updatedAt": "2022-09-07T09:43:03.164Z",
        *                    "__v": 0
        *                }
        *            ],
        *            "count": 2,
        *            "execTime": 131
        *        }
        *    }
        *
        */
    groupList(req: ReqInterface, res: ResInterface, next: NextFunction): Promise<void>;
    /**
      * @api {get} /api/v1/admin/group/:id Group Details
      * @apiHeader {String} App-Version Version Code 1.0.0.
      * @apiHeader {String} deviceType 'WEB'|'IOS'|'ANDROID'
      * @apiHeader {String} Authorization eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyYmZlMGNmMTdiYmU2ZjY2NzI3MzlmMyIsImVtYWlsIjoiYWRtaW5Ad2VmdW5kdXMuY29tIiwiaWF0IjoxNjU3Njk1MzQzLCJleHAiOjE2NTc3ODE3NDN9.HAJ40QWHuL2QeXo3GVQZKziiiQHbLsq0hyuMM-SgfaY
      * @apiVersion 1.0.0
      * @apiName group-details
      * @apiGroup Admin-Group
      * @apiSuccessExample {json} Success-Response:
      *   {
      *        "status": 200,
      *        "statusText": "SUCCESS",
      *        "message": "Group details",
      *        "data": {
      *            "group": {
      *                "_id": "631867a72f264cd844f1949b",
      *                "groupIcon": null,
      *                "groupCode": "GT5301681",
      *                "name": "test",
      *                "description": "this is testing.",
      *                "goalInterval": "1",
      *                "goalPrice": 100,
      *                "showContactInfo": true,
      *                "phoneNumber": "1234567890",
      *                "email": "test@gmail.com",
      *                "address": "this is address",
      *                "showSocialInfo": true,
      *                "facebookUrl": "fb.com",
      *                "twitterUrl": "twitter.com",
      *                "city": "Test",
      *                "state": "Test",
      *                "zipCode": "1233",
      *                "totalSubgroup": 0,
      *                "subGroupLimit": 0,
      *                "createdBy": {
      *                    "_id": "62dfcb21fb89c4b45de44685",
      *                    "avatar": "user-profiles/1659706277298-pukhraj_saini_mce242.png",
      *                    "displayName": "pk",
      *                    "customerCode": "WFU516341"
      *                },
      *               "purpose": {
      *               "_id": "631eddcced7496146e770bf1",
      *               "text": "Fund Raising for Birds"
      *                },
      *                "totalMembers": 1,
      *                "isJoined": true,
      *                "isAdmin": true
      *            },
      *            "execTime": 135
      *        }
      *    }
      */
    groupDetails(req: ReqInterface, res: ResInterface, next: NextFunction): Promise<void>;
    /**
     * @api {patch} /api/v1/admin/group Delete Groups
     * @apiHeader {String} App-Version Version Code 1.0.0.
     * @apiHeader {String} Authorization
     * @apiVersion 1.0.0
     * @apiName Delete Group
     * @apiGroup Admin-Group
     *
     * @apiParamExample {json} Request-body
     * {
     *   groupIds = ["631eddcced7496146e770bf1"]
     * }
     * @apiSuccessExample {json} Success-Response:
     * {
     *    "status": 200,
     *    "statusText": "SUCCESS",
     *    "message": "Group deleted"
     *}
     *
     */
    removeGroup(req: ReqInterface, res: ResInterface, next: NextFunction): Promise<void>;
    groupMembers(req: ReqInterface, res: ResInterface, next: NextFunction): Promise<void>;
}
declare const _default: GroupController;
export default _default;
