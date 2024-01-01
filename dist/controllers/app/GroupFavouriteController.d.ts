import { NextFunction } from "express";
import { ReqInterface, ResInterface } from "../../interfaces/ReqInterface";
declare class GroupFavouriteController {
    /**
            * @api {post} api/v1/app/group/mark-as-favourite Mark Favourite
            * @apiHeader {String} App-Version Version Code 1.0.0.
            * @apiHeader {String} deviceType 'WEB'|'IOS'|'ANDROID'
            * @apiHeader {String} Authorization eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyYmZlMGNmMTdiYmU2ZjY2NzI3MzlmMyIsImVtYWlsIjoiYWRtaW5Ad2VmdW5kdXMu
            * @apiVersion 1.0.0
            * @apiName mark-favourite
            * @apiGroup App-Group
            * @apiDescription Send group _id in body.
            *
            * @apiParam {String} groupId
            *
            * @apiParamExample { json } Param-Example-
            *   {
            *        "groupId": "6321d770c49be8f2c62454ac"
            *   }
            *
            * @apiSuccessExample {json} Success-Response
            *    {
            *        "status": 201,
            *        "statusText": "CREATED",
            *        "message": "Group marked as favourite",
            *        "data": {
            *            "favGroup": {
            *                "_id": "6327fe3f8add991102651d86",
            *                "groupId": "6321d770c49be8f2c62454ac",
            *                "userId": "62dfcb21fb89c4b45de44685",
            *                "createdAt": "2022-09-19T05:29:35.786Z",
            *                "updatedAt": "2022-09-19T05:29:35.786Z",
            *                "__v": 0
            *            },
            *            "execTime": 310
            *        }
            *    }
            */
    addToFavourite(req: ReqInterface, res: ResInterface, next: NextFunction): Promise<void>;
    /**
            * @api {delete} api/v1/app/group/remove-from-favourite/:id Remove from Favourite
            * @apiHeader {String} App-Version Version Code 1.0.0.
            * @apiHeader {String} deviceType 'WEB'|'IOS'|'ANDROID'
            * @apiHeader {String} Authorization eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyYmZlMGNmMTdiYmU2ZjY2NzI3MzlmMyIsImVtYWlsIjoiYWRtaW5Ad2VmdW5kdXMu
            * @apiVersion 1.0.0
            * @apiName remove-from-favourite
            * @apiGroup App-Group
            * @apiDescription Send group _id in params.
            *
            * @apiParam {String} groupId
            *
            * @apiSuccessExample {json} Success-Response
            *   {
            *       "status": 200,
            *       "statusText": "SUCCESS",
            *       "message": "Removed from favourite",
            *       "data": {
            *           "execTime": 108
            *       }
            *   }
            */
    RemoveFromFavourite(req: ReqInterface, res: ResInterface, next: NextFunction): Promise<void>;
    /**
   * @api {get} api/v1/app/group/favourite-group Favourite Group
   * @apiHeader {String} App-Version Version Code 1.0.0.
   * @apiHeader {String} deviceType 'WEB'|'IOS'|'ANDROID'
   * @apiHeader {String} Authorization eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9........
   * @apiVersion 1.0.0
   * @apiName favourite-group-list
   * @apiGroup App-Group
   * @apiDescription send page number and limit in query params.
   * @apiSuccessExample {json} Success-Response
   *    {
   *        "status": 200,
   *        "statusText": "SUCCESS",
   *        "message": "Favourite group list fetched",
   *        "data": {
   *           "count": 1,
   *            "list": [
   *                {
   *                    "_id": "63281a39f4437a9ce78f5078",
   *                    "group": {
   *                        "_id": "6321d770c49be8f2c62454ac",
   *                        "groupIcon": null,
   *                        "name": "Fund Raiser",
   *                        "email": "munendra.singh@mobilecoderz.com",
   *                        "description": "this is testing.",
   *                        "showContactInfo": true,
   *                        "phoneNumber": "1234567890",
   *                        "address": "this is address",
   *                        "purpose": "Hello Birds",
   *                        "city": "city",
   *                       "state": "delhi",
   *                       "zipCode": "5555555555",
   *                        "members": [
   *                            "62dfcb21fb89c4b45de44685",
   *                            "631ae66af08c192dadce8e90"
   *                        ],
   *                        "createdBy": {
   *                            "_id": "62dfcb21fb89c4b45de44685",
   *                            "avatar": "user-profiles/1659706277298-pukhraj_saini_mce242.png",
   *                            "displayName": "pk",
   *                            "name": "puhraj saini",
   *                            "customerCode": "WFU516341"
   *                        },
   *                        "isMember": true
   *                    }
   *                }
   *            ],
   *            "execTime": 120
   *        }
   *    }
   */
    favouriteGroupList(req: ReqInterface, res: ResInterface, next: NextFunction): Promise<void>;
}
declare const _default: GroupFavouriteController;
export default _default;
