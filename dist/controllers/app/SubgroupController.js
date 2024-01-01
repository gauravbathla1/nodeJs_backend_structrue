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
const mongoose_1 = require("mongoose");
const ResponseHelper_1 = require("../../helpers/ResponseHelper");
const SubgroupMember_1 = require("../../models/SubgroupMember");
const SubgroupModel_1 = require("../../models/SubgroupModel");
const SubgroupService_1 = require("../../services/app/SubgroupService");
class SubgroupController {
    /**
            * @api {post} api/v1/app/subgroup/create Create Subgroup
            * @apiHeader {String} App-Version Version Code 1.0.0.
            * @apiHeader {String} deviceType 'WEB'|'IOS'|'ANDROID'
            * @apiHeader {String} Authorization eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyYmZlMGNmMTdiYmU2ZjY2NzI3MzlmMyIsImVtYWlsIjoiYWRtaW5Ad2VmdW5kdXMu
            * @apiVersion 1.0.0
            * @apiName create-subgroup
            * @apiGroup App-Subgroup
            * @apiDescription request body send as form data
            *
            * @apiParam {File} icon group Icon
            * @apiParam {String} name
            * @apiParam {String} description
            * @apiParam {String} groupId
            * @apiParam {String} groupName
            *
            * @apiSuccessExample {json} Success-Response
            *    {
            *        "status": 201,
            *        "statusText": "CREATED",
            *        "message": "Subgroup created",
            *        "data": {
            *            "subgroup": {
            *                "name": "test subgroup",
            *                "groupId": "631867a72f264cd844f1949b",
            *                "groupName": "test",
            *                "description": "testing description",
            *                "icon": "subgroup-icons/1663669796552-1658308824367-Screenshot_1.png",
            *                "isDeleted": false,
            *                "totalMember": 0,
            *                "memberLimit": 20,
            *                "createdBy": "62dfcb21fb89c4b45de44685",
            *                "members": [
            *                    "62dfcb21fb89c4b45de44685"
            *                ],
            *                "_id": "6329962671f2088a688e8f00",
            *                "createdAt": "2022-09-20T10:29:58.072Z",
            *                "updatedAt": "2022-09-20T10:29:58.072Z",
            *                "__v": 0
            *            },
            *            "execTime": 1856
            *        }
            *    }
            *
            */
    createSubgroup(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const subgroupData = req.body;
                const { icon } = req.files;
                const subgroup = yield SubgroupService_1.default.createGroup(subgroupData, icon, req.user);
                if (subgroup.groupNotFound)
                    return ResponseHelper_1.default.badRequest(res, res.__('invalid_groupId'));
                if (subgroup.notAdmin)
                    return ResponseHelper_1.default.badRequest(res, res.__('not_group_creater'));
                res.logMsg = `*${req.user._id}* created subroup *${subgroup.subgroup._id}*`;
                return ResponseHelper_1.default.created(res, res.__('subgroup_created'), { subgroup: subgroup.subgroup });
            }
            catch (error) {
                next(error);
            }
        });
    }
    /**
            * @api {get} api/v1/app/subgroup/details/:id Subgroup Details
            * @apiHeader {String} App-Version Version Code 1.0.0.
            * @apiHeader {String} deviceType 'WEB'|'IOS'|'ANDROID'
            * @apiHeader {String} Authorization eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyYmZlMGNmMTdiYmU2ZjY2NzI3MzlmMyIsImVtYWlsIjoiYWRtaW5Ad2VmdW5kdXMu
            * @apiVersion 1.0.0
            * @apiName subgroup-details
            * @apiGroup App-Subgroup
            * @apiDescription send subgroup _id in param
            * @apiSuccessExample {json} Success-Response
            *    {
            *        "status": 200,
            *        "statusText": "SUCCESS",
            *        "message": "Subgroup fetched",
            *        "data": {
            *            "subgroup": {
            *                "_id": "6329bfe5078d13c6551f0096",
            *                "name": "test subgroup",
            *                "groupName": "test",
            *                "description": "testing description",
            *                "icon": "subgroup-icons/1663680483894-1658308824367-Screenshot_1.png",
            *                "totalMember": 1,
            *                "memberLimit": 20,
            *                "createdBy": {
            *                    "_id": "62dfcb21fb89c4b45de44685",
            *                    "email": "pukhraj47@mailinator.com",
            *                    "avatar": "user-profiles/1659706277298-pukhraj_saini_mce242.png",
            *                    "displayName": "pk",
            *                    "name": "puhraj saini",
            *                    "customerCode": "WFU516341"
            *                },
            *                "group": {
            *                    "_id": "63315a738cc30e709d3dc51f",
            *                    "groupIcon": "group-icons/1664178802742-10x-featured-social-media-image-size.png",
            *                    "groupCode": "GT0441937",
            *                    "name": "Fund tester x2"
            *                },
            *                "createdAt": "2022-09-20T13:28:05.563Z",
            *                "isAdmin": true
            *            },
            *            "execTime": 126
            *        }
            *    }
            *
            */
    subgroupDetails(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const subgroupId = req.params.id;
                const result = yield SubgroupService_1.default.subgroupDetails(subgroupId, req.user);
                if (result.subgroupNotFound)
                    return ResponseHelper_1.default.badRequest(res, res.__('invalid_subgroupId'));
                return ResponseHelper_1.default.ok(res, res.__('subgroup_fetched'), { subgroup: result.subgroup });
            }
            catch (error) {
                next(error);
            }
        });
    }
    /**
            * @api {get} api/v1/app/subgroup/list/:id Subgroup List
            * @apiHeader {String} App-Version Version Code 1.0.0.
            * @apiHeader {String} deviceType 'WEB'|'IOS'|'ANDROID'
            * @apiHeader {String} Authorization eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyYmZlMGNmMTdiYmU2ZjY2NzI3MzlmMyIsImVtYWlsIjoiYWRtaW5Ad2VmdW5kdXMu
            * @apiVersion 1.0.0
            * @apiName subgroup-list
            * @apiGroup App-Subgroup
            * @apiDescription send group _id in params
            * @apiSuccessExample {json} Success-Response
            *
            *    {
            *        "status": 200,
            *        "statusText": "SUCCESS",
            *        "message": "Subgroup list fetched",
            *        "data": {
            *            "count": 3,
            *            "list": [
            *                {
            *                    "_id": "6329bfe5078d13c6551f0096",
            *                    "name": "test subgroup",
            *                    "description": "testing description",
            *                    "icon": "subgroup-icons/1663680483894-1658308824367-Screenshot_1.png",
            *                    "totalMember": 1,
            *                    "memberLimit": 20,
            *                    "createdBy": {
            *                        "_id": "62dfcb21fb89c4b45de44685",
            *                        "avatar": "user-profiles/1659706277298-pukhraj_saini_mce242.png",
            *                        "displayName": "pk",
            *                        "name": "pukhraj saini"
            *                    },
            *                    "createdAt": "2022-09-20T13:28:05.563Z",
            *                    "group": {
            *                        "_id": "631867a72f264cd844f1949b",
            *                        "groupIcon": null,
            *                        "name": "test",
            *                        "email": "test@gmail.com"
            *                    },
            *                    "isJoined": true
            *                }
            *            ],
            *            "execTime": 83
            *        }
            *    }
            */
    subgroupList(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const groupId = req.params.id;
                const queryString = req.query;
                const condition = {
                    groupId: new mongoose_1.Types.ObjectId(groupId),
                    isDeleted: false
                };
                const result = yield SubgroupModel_1.default.aggregate(SubgroupService_1.default.listAggPipeline(condition, req.user._id, queryString));
                let count = 0;
                let list = [];
                if (result.length) {
                    count = result[0].count;
                    list = result[0].list;
                }
                res.logMsg = `Subgroup of group *${groupId}* fetched`;
                return ResponseHelper_1.default.ok(res, res.__('subgroup_list_fetched'), { count, list });
            }
            catch (error) {
                next(error);
            }
        });
    }
    /**
            * @api {get} api/v1/app/subgroup/user-subgroup User's Subgroup
            * @apiHeader {String} App-Version Version Code 1.0.0.
            * @apiHeader {String} deviceType 'WEB'|'IOS'|'ANDROID'
            * @apiHeader {String} Authorization eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyYmZlMGNmMTdiYmU2ZjY2NzI3MzlmMyIsImVtYWlsIjoiYWRtaW5Ad2VmdW5kdXMu
            * @apiVersion 1.0.0
            * @apiName user's-subgroup
            * @apiGroup App-Subgroup
            * @apiDescription pagination and search implemented.

            * @apiSuccessExample {json} Success-Response
            *
            *    {
            *        "status": 200,
            *        "statusText": "SUCCESS",
            *        "message": "Subgroup list fetched",
            *        "data": {
            *            "count": 3,
            *            "list": [
            *                {
            *                    "_id": "6329bfe5078d13c6551f0096",
            *                    "name": "test subgroup",
            *                    "description": "testing description",
            *                    "icon": "subgroup-icons/1663680483894-1658308824367-Screenshot_1.png",
            *                    "totalMember": 1,
            *                    "memberLimit": 20,
            *                    "createdBy": {
            *                        "_id": "62dfcb21fb89c4b45de44685",
            *                        "avatar": "user-profiles/1659706277298-pukhraj_saini_mce242.png",
            *                        "displayName": "pk",
            *                        "name": "puhraj saini"
            *                    },
            *                    "createdAt": "2022-09-20T13:28:05.563Z",
            *                    "group": {
            *                        "_id": "631867a72f264cd844f1949b",
            *                        "groupIcon": null,
            *                        "name": "test",
            *                        "email": "test@gmail.com"
            *                    },
            *                    "isJoined": true
            *                }
            *            ],
            *            "execTime": 83
            *        }
            *    }
            */
    userSubgroupList(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const queryString = req.query;
                const search = queryString.search;
                const condition = {
                    createdBy: req.user._id,
                    isDeleted: false
                };
                if (search && search.trim()) {
                    condition['name'] = {
                        '$regex': search,
                        '$options': "$i"
                    };
                }
                console.log('cond', condition);
                const result = yield SubgroupModel_1.default.aggregate(SubgroupService_1.default.listAggPipeline(condition, req.user._id, queryString));
                let count = 0;
                let list = [];
                console.log('res', result);
                if (result[0].count) {
                    count = result[0].count;
                    list = result[0].list;
                }
                res.logMsg = `Subgroup of user *${req.user._id}* fetched`;
                return ResponseHelper_1.default.ok(res, res.__('subgroup_list_fetched'), { count, list });
            }
            catch (error) {
                next(error);
            }
        });
    }
    /**
            * @api {get} api/v1/app/subgroup/member-list Member List
            * @apiHeader {String} App-Version Version Code 1.0.0.
            * @apiHeader {String} deviceType 'WEB'|'IOS'|'ANDROID'
            * @apiHeader {String} Authorization eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyYmZlMGNmMTdiYmU2ZjY2NzI3MzlmMyIsImVtYWlsIjoiYWRtaW5Ad2VmdW5kdXMu
            * @apiVersion 1.0.0
            * @apiName member-list
            * @apiGroup App-Subgroup
            * @apiDescription pagination and searching implemented.
            * @apiSuccessExample {json} Success-Response
            *    {
            *        "status": 200,
            *        "statusText": "SUCCESS",
            *        "message": "Subgroup member list fetched",
            *        "data": {
            *            "count": 1,
            *            "list": [
            *                {
            *                    "_id": "632c6304d422846ce0f6e573",
            *                    "subgroupId": "632c6304d422846ce0f6e571",
            *                    "isAdmin": true,
            *                    "member": {
            *                        "_id": "62dfcb21fb89c4b45de44685",
            *                        "email": "pukhraj47@mailinator.com",
            *                        "avatar": "user-profiles/1659706277298-pukhraj_saini_mce242.png",
            *                        "displayName": "pk",
            *                        "name": "puhraj saini",
            *                        "customerCode": "WFU516341"
            *                    }
            *                }
            *            ],
            *            "execTime": 119
            *        }
            *    }
            */
    memberList(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const subgroupId = req.params.id;
                const queryString = req.query;
                const page = Number(queryString.page) * 1 || 1;
                const limit = Number(queryString.limit) * 1 || 10;
                const skip = (page - 1) * limit;
                const search = queryString.search;
                let searchMatch = {};
                if (search && search.trim()) {
                    searchMatch['member.name'] = {
                        '$regex': search,
                        '$options': '$i'
                    };
                }
                const pipeline = [
                    {
                        $match: {
                            subgroupId: new mongoose_1.Types.ObjectId(subgroupId),
                            isDeleted: false
                        }
                    },
                    {
                        '$lookup': {
                            'from': 'users',
                            'localField': 'memberId',
                            'foreignField': '_id',
                            'as': 'member'
                        }
                    },
                    {
                        '$unwind': {
                            'path': '$member',
                            'preserveNullAndEmptyArrays': true
                        }
                    },
                    {
                        '$match': searchMatch
                    },
                    {
                        '$facet': {
                            'count': [
                                {
                                    '$count': 'count'
                                }
                            ],
                            'list': [
                                {
                                    '$sort': {
                                        'createdAt': -1
                                    }
                                }, {
                                    '$skip': skip
                                }, {
                                    '$limit': limit
                                },
                                {
                                    '$project': {
                                        '_id': 1,
                                        'isAdmin': 1,
                                        'subgroupId': 1,
                                        'member': {
                                            '_id': 1,
                                            'avatar': 1,
                                            'name': 1,
                                            'displayName': 1,
                                            'email': 1,
                                            'customerCode': 1
                                        }
                                    }
                                }
                            ]
                        }
                    }, {
                        '$project': {
                            'count': {
                                '$first': '$count.count'
                            },
                            'list': 1
                        }
                    }
                ];
                const result = yield SubgroupMember_1.default.aggregate(pipeline);
                let count = 0;
                let list = [];
                if (result[0].count) {
                    count = result[0].count;
                    list = result[0].list;
                }
                res.logMsg = `Subgroup member list of subgroup *${subgroupId}* fetched`;
                return ResponseHelper_1.default.ok(res, res.__('subgroup_member_list'), { count, list });
            }
            catch (error) {
                next(error);
            }
        });
    }
    /**
            * @api {post} api/v1/app/subgroup/add-member Add Member
            * @apiHeader {String} App-Version Version Code 1.0.0.
            * @apiHeader {String} deviceType 'WEB'|'IOS'|'ANDROID'
            * @apiHeader {String} Authorization eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyYmZlMGNmMTdiYmU2ZjY2NzI3MzlmMyIsImVtYWlsIjoiYWRtaW5Ad2VmdW5kdXMu
            * @apiVersion 1.0.0
            * @apiName add-member
            * @apiGroup App-Subgroup
            * @apiParam {String} subgroupId
            * @apiParam {String} memberId
            * @apiParamExample {json} req-body
            * {
            *    "subgroupId": "632d85681bd1704d0237a260",
            *    "memberId": "62c2bf3302eb83542c409e24"
            * }
            * @apiSuccessExample {json} Success-Response
            *    {
            *        "status": 201,
            *        "statusText": "CREATED",
            *        "message": "Member added successfully",
            *        "data": {
            *            "subgroup": {
            *                "_id": "632d85681bd1704d0237a260",
            *                "name": "test subgroup",
            *                "groupId": "6321d770c49be8f2c62454ac",
            *                "groupName": "test wewewew",
            *                "description": "testing description",
            *                "icon": "subgroup-icons/1663927654184-file_example_PNG_500kB.png",
            *                "isDeleted": false,
            *                "totalMember": 2,
            *                "memberLimit": 20,
            *                "createdBy": "62dfcb21fb89c4b45de44685",
            *                "members": [
            *                    "62dfcb21fb89c4b45de44685",
            *                    "632c6396731b6d708b3fb73e",
            *                    "62c2bf3302eb83542c409e24"
            *                ],
            *                "createdAt": "2022-09-23T10:07:36.899Z",
            *                "updatedAt": "2022-09-23T10:08:45.095Z",
            *                "__v": 2
            *            },
            *            "execTime": 209
            *        }
            *    }
            */
    addMember(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { subgroupId, memberId } = req.body;
                const result = yield SubgroupService_1.default.addMember(subgroupId, memberId);
                if (result.subgroupNotFound)
                    return ResponseHelper_1.default.badRequest(res, res.__('invalid_subgroupId'));
                if (result.limitExceed)
                    return ResponseHelper_1.default.badRequest(res, res.__('subgroup_limit_exceed'));
                if (result.alreadyMember)
                    return ResponseHelper_1.default.badRequest(res, res.__('already_subgroup_member'));
                if (result.notGroupMember)
                    return ResponseHelper_1.default.badRequest(res, res.__('not_a_group_member'));
                res.logMsg = `Member added to subgroup *${subgroupId}* member *${memberId}*`;
                return ResponseHelper_1.default.created(res, res.__('member_added'), { subgroup: result.subgroup });
            }
            catch (error) {
                next(error);
            }
        });
    }
    /**
            * @api {post} api/v1/app/subgroup/remove-member/:_id Remove Member
            * @apiHeader {String} App-Version Version Code 1.0.0.
            * @apiHeader {String} deviceType 'WEB'|'IOS'|'ANDROID'
            * @apiHeader {String} Authorization eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyYmZlMGNmMTdiYmU2ZjY2NzI3MzlmMyIsImVtYWlsIjoiYWRtaW5Ad2VmdW5kdXMu
            * @apiVersion 1.0.0
            * @apiName remove-member
            * @apiGroup App-Subgroup
            * @apiDescription send subgroup _id as params
            * @apiParam {String} memberId member _id of subgroup member
            * @apiParamExample {json} req-body
            * {
            *    "memberId": "62c2bf3302eb83542c409e24"
            * }
            * @apiSuccessExample {json} Success-Response
            * {
            *        "status": 200,
            *        "statusText": "SUCCESS",
            *        "message": "Subgroup member removed successfully",
            *  }
            *
            */
    removeMember(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const subgroupId = req.params.id;
                const memberId = req.body.memberId;
                const user = req.user;
                const result = yield SubgroupService_1.default.removeMember(memberId, subgroupId, user);
                if (result.memberNotExists)
                    return ResponseHelper_1.default.badRequest(res, res.__('subgroup_member_not_exists'));
                if (result.notAdmin)
                    return ResponseHelper_1.default.badRequest(res, res.__('not_admin'));
                res.logMsg = `member *${memberId}* removed from subgroup *${subgroupId}*`;
                return ResponseHelper_1.default.ok(res, res.__('subgroup_member_removed'), {});
            }
            catch (error) {
                next(error);
            }
        });
    }
    /**
            * @api {delete} api/v1/app/subgroup/delete/:_id Delete subgroup
            * @apiHeader {String} App-Version Version Code 1.0.0.
            * @apiHeader {String} deviceType 'WEB'|'IOS'|'ANDROID'
            * @apiHeader {String} Authorization eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyYmZlMGNmMTdiYmU2ZjY2NzI3MzlmMyIsImVtYWlsIjoiYWRtaW5Ad2VmdW5kdXMu
            * @apiVersion 1.0.0
            * @apiName delete
            * @apiGroup App-Subgroup
            *
            * @apiDescription send subgroup _id as params
            * @apiSuccessExample {json} Success-Response
            *
            * {
            *       "status": 200,
            *       "statusText": "SUCCESS",
            *       "message": "Subgroup deleted successfully"
            * }
            *
            */
    deleteSubgroup(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const subgroupId = req.params.id;
                const user = req.user;
                const result = yield SubgroupService_1.default.deleteSubgroup(subgroupId, user);
                if (result.notAdmin)
                    return ResponseHelper_1.default.badRequest(res, res.__('only_admin_delete_subgroup'));
                if (result.subgroupNotExists)
                    return ResponseHelper_1.default.badRequest(res, res.__('invalid_subgroup_id'));
                res.logMsg = `Subgroup *${subgroupId}* deleted`;
                return ResponseHelper_1.default.ok(res, res.__('subgroup_deleted'), {});
            }
            catch (error) {
                next(error);
            }
        });
    }
    /**
            * @api {get} api/v1/app/subgroup/group-member-list/:_id Group member list for adding member to subgroup
            * @apiHeader {String} App-Version Version Code 1.0.0.
            * @apiHeader {String} deviceType 'WEB'|'IOS'|'ANDROID'
            * @apiHeader {String} Authorization eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyYmZlMGNmMTdiYmU2ZjY2NzI3MzlmMyIsImVtYWlsIjoiYWRtaW5Ad2VmdW5kdXMu
            * @apiVersion 1.0.0
            * @apiName  group-member-list
            * @apiGroup App-Subgroup
            * @apiParam {String} search search text
            *
            * @apiDescription pass subgroup id as params
            *
            * @apiSuccessExample {json} Success-Response
            * {
            *        "status": 200,
            *        "statusText": "SUCCESS",
            *        "message": "Member list fetched successfully",
            *        "data": {
            *            "list": [
            *                {
            *                    "_id": "631ae66af08c192dadce8e90",
            *                    "email": "pukhraj24@mailinator.com",
            *                    "customerCode": "WFU134285",
            *                    "avatar": "user-profiles/1664178007332-10x-featured-social-media-image-size.png",
            *                    "description": "Why do we use it?It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).",
            *                    "firstName": "puhraj",
            *                    "lastName": "saini",
            *                    "name": "puhraj saini"
            *                }
            *            ],
            *            "count": 1,
            *            "execTime": 175
            *        }
            *    }
            *
            */
    groupMemberListToAddSubgroup(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const subgroupId = req.params.id;
                const user = req.user;
                const queryString = req.query;
                const subgroupData = yield SubgroupService_1.default.groupMemberListToAddSubgroup(subgroupId, queryString, user);
                if (subgroupData.subgroupNotExists)
                    return ResponseHelper_1.default.badRequest(res, res.__('invalid_subgroup_id'));
                return ResponseHelper_1.default.ok(res, res.__('member_list'), subgroupData.result);
            }
            catch (error) {
                next(error);
            }
        });
    }
    /**
            * @api {patch} api/v1/app/subgroup/edit/:id Edit Subgroup
            * @apiHeader {String} App-Version Version Code 1.0.0.
            * @apiHeader {String} deviceType 'WEB'|'IOS'|'ANDROID'
            * @apiHeader {String} Authorization eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyYmZlMGNmMTdiYmU2ZjY2NzI3MzlmMyIsImVtYWlsIjoiYWRtaW5Ad2VmdW5kdXMu
            * @apiVersion 1.0.0
            * @apiName edit-subgroup
            * @apiGroup App-Subgroup
            * @apiDescription request body send as form data
            *
            * @apiParam {File} [icon] group Icon
            * @apiParam {String} [name]
            * @apiParam {String} [description]
            * @apiParam {String} [groupId]
            * @apiParam {String} [groupName]
            *
            * @apiSuccessExample {json} Success-Response
            *    {
            *        "status": 201,
            *        "statusText": "CREATED",
            *        "message": "subgroup_edited",
            *        "data": {
            *            "subgroup": {
            *                "_id": "6332bf09a40d148e8c4dd51b",
            *                "name": "testing",
            *                "groupId": "63315a738cc30e709d3dc51f",
            *                "groupName": "test",
            *                "description": "lorem ipsum",
            *                "icon": "subgroup-icons/1664270088090-85e642626dbbbee704edf3f6f33ef837.jpg",
            *                "isDeleted": false,
            *                "totalMember": 0,
            *                "memberLimit": 20,
            *                "createdBy": "62dfcb21fb89c4b45de44685",
            *                "members": [
            *                    "62dfcb21fb89c4b45de44685"
            *                ],
            *                "createdAt": "2022-09-27T09:14:49.797Z",
            *                "updatedAt": "2022-09-27T09:16:16.535Z",
            *                "__v": 0
            *            },
            *            "execTime": 169
            *        }
            *    }
            *
            */
    editSubgroup(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const subgroupData = req.body;
                const { icon } = req.files;
                const subgroupId = req.params.id;
                const subgroup = yield SubgroupService_1.default.editSubgroup(subgroupId, subgroupData, req.user, icon);
                if (subgroup.subgroupNotFound)
                    return ResponseHelper_1.default.badRequest(res, res.__('invalid_subgroup_id'));
                if (subgroup.notAdmin)
                    return ResponseHelper_1.default.badRequest(res, res.__('only_admin_can_edit'));
                res.logMsg = `*${subgroupId}* is edited`;
                return ResponseHelper_1.default.created(res, res.__('subgroup_edited'), { subgroup: subgroup.subgroup });
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.default = new SubgroupController();
