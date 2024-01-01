import { NextFunction } from "express";
import { ReqInterface, ResInterface } from "../../interfaces/ReqInterface";
declare class SubgroupController {
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
    createSubgroup(req: ReqInterface, res: ResInterface, next: NextFunction): Promise<void>;
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
    subgroupDetails(req: ReqInterface, res: ResInterface, next: NextFunction): Promise<void>;
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
    subgroupList(req: ReqInterface, res: ResInterface, next: NextFunction): Promise<void>;
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
    userSubgroupList(req: ReqInterface, res: ResInterface, next: NextFunction): Promise<void>;
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
    memberList(req: ReqInterface, res: ResInterface, next: NextFunction): Promise<void>;
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
    addMember(req: ReqInterface, res: ResInterface, next: NextFunction): Promise<void>;
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
    removeMember(req: ReqInterface, res: ResInterface, next: NextFunction): Promise<void>;
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
    deleteSubgroup(req: ReqInterface, res: ResInterface, next: NextFunction): Promise<void>;
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
    groupMemberListToAddSubgroup(req: ReqInterface, res: ResInterface, next: NextFunction): Promise<void>;
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
    editSubgroup(req: ReqInterface, res: ResInterface, next: NextFunction): Promise<void>;
}
declare const _default: SubgroupController;
export default _default;
