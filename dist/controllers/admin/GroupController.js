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
const GroupModel_1 = require("../../models/GroupModel");
const ApiFeatures_1 = require("../../utils/ApiFeatures");
const GroupService_1 = require("../../services/admin/GroupService");
class GroupController {
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
    groupList(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const queryString = req.query;
                const query = GroupModel_1.default.find({ isDeleted: false });
                const countQuery = GroupModel_1.default.find({ isDeleted: false });
                const listFeature = new ApiFeatures_1.ApiFeatures(query, queryString)
                    .filtering()
                    .searching(['name', 'groupCode'])
                    .sorting('-createdAt')
                    .pagination();
                const countFeature = new ApiFeatures_1.ApiFeatures(countQuery, queryString)
                    .filtering()
                    .searching(['name', 'groupCode'])
                    .getCount();
                const count = yield countFeature.query;
                const list = yield listFeature.query.populate('createdBy');
                res.logMsg = 'Group list fetched.';
                return ResponseHelper_1.default.ok(res, res.__('group_list'), { list, count });
            }
            catch (error) {
                next(error);
            }
        });
    }
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
    groupDetails(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const groupId = req.params.id;
                const exist = yield GroupModel_1.default.exists({ _id: groupId });
                if (!exist) {
                    return ResponseHelper_1.default.badRequest(res, res.__('group_does_not_exist'));
                }
                const group = yield GroupService_1.default.groupDetails(groupId);
                return ResponseHelper_1.default.ok(res, res.__('group_details'), { group });
            }
            catch (error) {
                next(error);
            }
        });
    }
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
    removeGroup(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const groupIds = req.body.groupIds;
                yield GroupService_1.default.deleteGroups(groupIds);
                res.logMsg = `groups deleted successfully`;
                let msg = 'groups_deleted';
                if (groupIds.length === 1) {
                    msg = 'group_deleted';
                }
                return ResponseHelper_1.default.ok(res, res.__(msg), {});
            }
            catch (error) {
                next(error);
            }
        });
    }
    groupMembers(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const groupId = req.params.id;
                const page = Number(req.query.page) * 1 || 1;
                const limit = Number(req.query.limit) * 1 || 20;
                let skip = (page - 1) * limit;
                const search = req.query.search;
                const result = yield GroupService_1.default.groupMemberList(groupId, skip, limit, search);
                return ResponseHelper_1.default.ok(res, res.__('Group_Member_list'), result);
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.default = new GroupController();
