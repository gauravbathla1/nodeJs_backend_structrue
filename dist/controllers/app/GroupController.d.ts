import { ReqInterface, ResInterface } from '../../interfaces/ReqInterface';
import { NextFunction } from 'express';
declare class GroupController {
    /**
            * @api {post} api/v1/app/group/create Create Group
            * @apiHeader {String} App-Version Version Code 1.0.0.
            * @apiHeader {String} deviceType 'WEB'|'IOS'|'ANDROID'
            * @apiHeader {String} Authorization eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyYmZlMGNmMTdiYmU2ZjY2NzI3MzlmMyIsImVtYWlsIjoiYWRtaW5Ad2VmdW5kdXMu
            * @apiVersion 1.0.0
            * @apiName create-group
            * @apiGroup App-Group
            * @apiDescription request body send as form data
            *
            * @apiParam {File} [groupIcon] group Icon
            * @apiParam {String} name
            * @apiParam {String} description
            * @apiParam {number} goalInterval 1 for 'daily', 2 for 'weekly', 3 for 'yearly'
            * @apiParam {number} goalPrice target
            * @apiParam {boolean} [showContactInfo]
            * @apiParam {String} phoneNumber
            * @apiParam {String} email
            * @apiParam {String} address
            * @apiParam {boolean} showSocialInfo
            * @apiParam {string} [facebookUrl]
            * @apiParam {string} [twitterUrl]
            * @apiParam {string} city
            * @apiParam {string} state
            * @apiParam {string} [zipCode]
            * @apiParam {string} purpose send either _id OR string if Other is true.
            * @apiParam {boolean} others
            *
            *
            * @apiSuccessExample {json} Success-Response
            *  {
            *        "status": 201,
            *        "statusText": "CREATED",
            *        "message": "Group created",
            *        "data": {
            *            "group": {
            *                "groupIcon": null,
            *                "groupCode": "GT002071",
            *                "name": "test",
            *                "purposeId": "631747bcd77165ad9c3a8575",
            *                "purposeText": "testing purpose 123",
            *                "description": "this is testing.",
            *                "goalInterval": "1",
            *                "goalPrice": 100,
            *                "showContactInfo": true,
            *                "phoneNumber": "1234567890",
            *                "email": "mailto:test@gmail.com",
            *                "address": "this is address",
            *                "showSocialInfo": true,
            *                "facebookUrl": "fb.com",
            *                "twitterUrl": "twitter.com",
            *                "members": [
            *                    "62dfcb21fb89c4b45de44685"
            *                ],
            *                "createdBy": "62dfcb21fb89c4b45de44685",
            *                "_id": "63184ba488bd4c83c23bb897",
            *                "createdAt": "2022-09-07T07:43:32.193Z",
            *                "updatedAt": "2022-09-07T07:43:32.193Z",
            *                "__v": 0
            *            },
            *            "execTime": 246
            *        }
            *    }
            *
            */
    createGroup(req: ReqInterface, res: ResInterface, next: NextFunction): Promise<void>;
    /**
        * @api {get} /api/v1/app/group/list Group list
        * @apiHeader {String} App-Version Version Code 1.0.0.
        * @apiHeader {String} deviceType 'WEB'|'IOS'|'ANDROID'
        * @apiHeader {String} Authorization eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyYmZlMGNmMTdiYmU2ZjY2NzI3MzlmMyIsImVtYWlsIjoiYWRtaW5Ad2VmdW5kdXMuY29tIiwiaWF0IjoxNjU3Njk1MzQzLCJleHAiOjE2NTc3ODE3NDN9.HAJ40QWHuL2QeXo3GVQZKziiiQHbLsq0hyuMM-SgfaY
        * @apiVersion 1.0.0
        * @apiName get-group-list
        * @apiGroup App-Group
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
        * @api {get} /api/v1/app/group/details/:id Group Details
        * @apiHeader {String} App-Version Version Code 1.0.0.
        * @apiHeader {String} deviceType 'WEB'|'IOS'|'ANDROID'
        * @apiHeader {String} Authorization eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyYmZlMGNmMTdiYmU2ZjY2NzI3MzlmMyIsImVtYWlsIjoiYWRtaW5Ad2VmdW5kdXMuY29tIiwiaWF0IjoxNjU3Njk1MzQzLCJleHAiOjE2NTc3ODE3NDN9.HAJ40QWHuL2QeXo3GVQZKziiiQHbLsq0hyuMM-SgfaY
        * @apiVersion 1.0.0
        * @apiName group-details
        * @apiGroup App-Group
        * @apiSuccessExample {json} Success-Response:
        *HTTP/1.1 200 OK
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
            * @api {patch} api/v1/app/group/edit/:id Edit Group
            * @apiHeader {String} App-Version Version Code 1.0.0.
            * @apiHeader {String} deviceType 'WEB'|'IOS'|'ANDROID'
            * @apiHeader {String} Authorization eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyYmZlMGNmMTdiYmU2ZjY2NzI3MzlmMyIsImVtYWlsIjoiYWRtaW5Ad2VmdW5kdXMu
            * @apiVersion 1.0.0
            * @apiName edit-group
            * @apiGroup App-Group
            * @apiDescription request body send as form data
            *
            * @apiParam {File} [groupIcon] group Icon
            * @apiParam {String} [name]
            * @apiParam {String} [description]
            * @apiParam {number} [goalInterval] 1 for 'daily', 2 for 'weekly', 3 for 'yearly'
            * @apiParam {number} [goalPrice] target
            * @apiParam {boolean} [showContactInfo]
            * @apiParam {String} [phoneNumber]
            * @apiParam {String} [email]
            * @apiParam {String} [address]
            * @apiParam {boolean} [showSocialInfo]
            * @apiParam {string} [facebookUrl]
            * @apiParam {string} [twitterUrl]
            * @apiParam {string} [city]
            * @apiParam {string} [state]
            * @apiParam {string} [zipCode]
            *
            *
            * @apiSuccessExample {json} Success-Response
            *    {
            *        "status": 200,
            *        "statusText": "SUCCESS",
            *        "message": "Group edited",
            *        "data": {
            *            "group": {
            *                "_id": "631867c02f264cd844f194ab",
            *                "groupIcon": "group-icons/1662632226790-85e642626dbbbee704edf3f6f33ef837.jpg",
            *                "groupCode": "GT6596499",
            *                "name": "testing edit",
            *                "purposeId": "631747bcd77165ad9c3a8575",
            *                "purposeText": "testing purpose 123",
            *                "description": "this is testing edit.",
            *                "goalInterval": "2",
            *                "goalPrice": 101,
            *                "showContactInfo": true,
            *                "phoneNumber": "12345678901",
            *                "email": "testedit@gmail.com",
            *                "address": "this is address edit",
            *                "showSocialInfo": true,
            *                "facebookUrl": "fb.com",
            *                "twitterUrl": "twitter.com",
            *                "members": [
            *                    "62dfcb21fb89c4b45de44685"
            *                ],
            *                "createdBy": "62dfcb21fb89c4b45de44685",
            *                "totalMembers": 1,
            *                "totalSubgroup": 0,
            *                "subGroupLimit": 0,
            *                "isDeleted": false,
            *                "createdAt": "2022-09-07T09:43:28.367Z",
            *                "updatedAt": "2022-09-08T10:17:08.368Z",
            *                "__v": 0
            *            },
            *            "execTime": 1781
            *        }
            *    }
            *
            */
    editGroup(req: ReqInterface, res: ResInterface, next: NextFunction): Promise<void>;
    /**
            * @api {delete} api/v1/app/group/delete/:id Delete Group
            * @apiHeader {String} App-Version Version Code 1.0.0.
            * @apiHeader {String} deviceType 'WEB'|'IOS'|'ANDROID'
            * @apiHeader {String} Authorization eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyYmZlMGNmMTdiYmU2ZjY2NzI3MzlmMyIsImVtYWlsIjoiYWRtaW5Ad2VmdW5kdXMu
            * @apiVersion 1.0.0
            * @apiName delete-group
            * @apiGroup App-Group
            * @apiSuccessExample {json} Success-Response
            *{
            *    "status": 200,
            *    "statusText": "SUCCESS",
            *    "message": "Group deleted",
            *    "data": {
            *        "group": {
            *            "_id": "631867c02f264cd844f194ab",
            *            "groupIcon": "group-icons/1662632226790-85e642626dbbbee704edf3f6f33ef837.jpg",
            *            "groupCode": "GT6596499",
            *            "name": "testing edit",
            *            "purposeId": "631747bcd77165ad9c3a8575",
            *            "purposeText": "testing purpose 123",
            *            "description": "this is testing edit.",
            *            "goalInterval": "2",
            *            "goalPrice": 101,
            *            "showContactInfo": true,
            *            "phoneNumber": "12345678901",
            *            "email": "testedit@gmail.com",
            *            "address": "this is address edit",
            *            "showSocialInfo": true,
            *            "facebookUrl": "fb.com",
            *            "twitterUrl": "twitter.com",
            *            "members": [
            *                "62dfcb21fb89c4b45de44685"
            *            ],
            *            "createdBy": "62dfcb21fb89c4b45de44685",
            *            "totalMembers": 1,
            *            "totalSubgroup": 0,
            *            "subGroupLimit": 0,
            *            "isDeleted": true,
            *            "createdAt": "2022-09-07T09:43:28.367Z",
            *            "updatedAt": "2022-09-08T11:21:55.449Z",
            *            "__v": 0
            *        },
            *        "execTime": 167
            *    }
            *}
            *
            */
    deleteGroup(req: ReqInterface, res: ResInterface, next: NextFunction): Promise<void>;
    /**
        * @api {get} /api/v1/app/group-purpose/list Group Purpose list
        * @apiHeader {String} App-Version Version Code 1.0.0.
        * @apiHeader {String} deviceType 'WEB'|'IOS'|'ANDROID'
        * @apiHeader {String} Authorization eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyYmZlMGNmMTdiYmU2ZjY2NzI3MzlmMyIsImVtYWlsIjoiYWRtaW5Ad2VmdW5kdXMuY29tIiwiaWF0IjoxNjU3Njk1MzQzLCJleHAiOjE2NTc3ODE3NDN9.HAJ40QWHuL2QeXo3GVQZKziiiQHbLsq0hyuMM-SgfaY
        * @apiVersion 1.0.0
        * @apiName group-purpose-list
        * @apiGroup App-Group
        * @apiSuccessExample {json} Success-Response:
        **HTTP/1.1 200 OK
        *{
        *    "status": 200,
        *    "statusText": "SUCCESS",
        *    "message": "Group purpose list",
        *    "data": {
        *        "list": [
        *            {
        *                "_id": "631747bcd77165ad9c3a8575",
        *                "isActive": true,
        *                "text": "testing purpose 123",
        *                "createdAt": "2022-09-06T13:14:36.554Z",
        *                "updatedAt": "2022-09-06T13:14:36.554Z",
        *                "__v": 0
        *            },
        *            {
        *                "_id": "631747695e2c139b364514b8",
        *                "isActive": true,
        *                "text": "testing purpose",
        *                "createdAt": "2022-09-06T13:13:13.237Z",
        *                "updatedAt": "2022-09-06T13:13:13.237Z",
        *                "__v": 0
        *            }
        *        ],
        *        "count": 2,
        *        "execTime": 151
        *    }
        *        }
        *
        */
    groupPurpose(req: ReqInterface, res: ResInterface, next: NextFunction): Promise<void>;
    /**
        * @api {get} /api/v1/app/group/member-list/:id Group Member list
        * @apiHeader {String} App-Version Version Code 1.0.0.
        * @apiHeader {String} deviceType 'WEB'|'IOS'|'ANDROID'
        * @apiHeader {String} Authorization eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyYmZlMGNmMTdiYmU2ZjY2NzI3MzlmMyIsImVtYWlsIjoiYWRtaW5Ad2VmdW5kdXMuY29tIiwiaWF0IjoxNjU3Njk1MzQzLCJleHAiOjE2NTc3ODE3NDN9.HAJ40QWHuL2QeXo3GVQZKziiiQHbLsq0hyuMM-SgfaY
        * @apiVersion 1.0.0
        * @apiName group-member-list
        * @apiGroup App-Group
        * @apiSuccessExample {json} Success-Response:
        **HTTP/1.1 200 OK
        *    {
        *        "status": 200,
        *        "statusText": "SUCCESS",
        *        "message": "Group member list",
        *        "data": {
        *            "result": {
        *                "count": 1,
        *                "list": [
        *                    {
        *                        "_id": "631867a72f264cd844f1949d",
        *                        "member": {
        *                            "_id": "62dfcb21fb89c4b45de44685",
        *                            "email": "pukhraj47@mailinator.com",
        *                            "displayName": "pk",
        *                            "firstName": "puhraj",
        *                            "lastName": "saini",
        *                            "avatar": "user-profiles/1659706277298-pukhraj_saini_mce242.png",
        *                            "customerCode": "WFU516341"
        *                        },
        *                        "isAdmin": true,
        *                        "groupRequestStatus": 1
        *                    }
        *                ]
        *            },
        *            "execTime": 81
        *        }
        *    }
        *
        */
    groupMemberList(req: ReqInterface, res: ResInterface, next: NextFunction): Promise<void>;
    /**
                * @api {patch} api/v1/app/group/remove-member/:id Remove member from group
                * @apiHeader {String} App-Version Version Code 1.0.0.
                * @apiHeader {String} deviceType 'WEB'|'IOS'|'ANDROID'
                * @apiHeader {String} Authorization eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9........
                * @apiVersion 1.0.0
                * @apiName remove-member
                * @apiGroup App-Group
                * @apiDescription pass group _id as params
                *
                * @apiParam {String} memberId member of group
                * @apiParamExample {json} Request-Body
                * {
                *       "memberId": "631867a72f264cd844f1949b"
                * }
                *
                * @apiSuccessExample {json} Success-Response
                *    {
                *        "status": 200,
                *        "statusText": "SUCCESS",
                *        "message": "Group member removed",
                *        "data": {
                *            "group": {
                *                "_id": "631867c02f264cd844f194ab",
                *                "groupIcon": "group-icons/1662632226790-85e642626dbbbee704edf3f6f33ef837.jpg",
                *                "groupCode": "GT6596499",
                *                "name": "testing edit",
                *                "purposeId": "631747bcd77165ad9c3a8575",
                *                "purposeText": "testing purpose 123",
                *                "description": "this is testing edit.",
                *                "goalInterval": "2",
                *                "goalPrice": 101,
                *                "showContactInfo": true,
                *                "phoneNumber": "12345678901",
                *                "email": "testedit@gmail.com",
                *                "address": "this is address edit",
                *                "showSocialInfo": true,
                *                "facebookUrl": "fb.com",
                *                "twitterUrl": "twitter.com",
                *                "members": [
                *                    "62dfcb21fb89c4b45de44685"
                *                ],
                *                "createdBy": "62dfcb21fb89c4b45de44685",
                *                "totalMembers": 1,
                *                "totalSubgroup": 0,
                *                "subGroupLimit": 0,
                *                "isDeleted": false,
                *                "createdAt": "2022-09-07T09:43:28.367Z",
                *                "updatedAt": "2022-09-08T10:17:08.368Z",
                *                "__v": 0
                *            },
                *            "execTime": 1781
                *        }
                *    }
                *
                */
    removeGroupMember(req: ReqInterface, res: ResInterface, next: NextFunction): Promise<void>;
    /**
                * @api {get} api/v1/app/group/search?search=purposeText,test Search groups
                * @apiHeader {String} App-Version Version Code 1.0.0.
                * @apiHeader {String} deviceType 'WEB'|'IOS'|'ANDROID'
                * @apiHeader {String} Authorization eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9........
                * @apiVersion 1.0.0
                * @apiName search
                * @apiGroup App-Group
                * @apiDescription pass data as query string eg name,test| state,searchValue|city,searchValue|purposeText|searchValue
                *
                * @apiSuccessExample {json} Success-Response
                *    {
                *        "status": 200,
                *        "statusText": "SUCCESS",
                *        "message": "Searched group list",
                *        "data": {
                *            "count": 4,
                *            "list": [
                *                {
                *                    "_id": "63200c33899361dbc2535e89",
                *                    "groupIcon": "group-icons/1663044659455-image_1648533556788 (1).png",
                *                    "groupCode": "GT8506095",
                *                    "name": "Deep",
                *                    "purposeText": "Hello Birds",
                *                    "description": "basic",
                *                    "showContactInfo": true,
                *                    "phoneNumber": "7894556123",
                *                    "email": "harsh@123gmail.com",
                *                    "address": "Ghaziabad  ",
                *                    "showSocialInfo": true,
                *                    "facebookUrl": "https://www.google.com/search?q=facebook&rlz=1C1CHBF_enIN1007IN1007&oq=facebook&aqs=chrome.0.69i59j69i57j0i271l2j69i60.1335j0j7&sourceid=chrome&ie=UTF-8",
                *                    "twitterUrl": "https://www.google.com/search?q=facebook&rlz=1C1CHBF_enIN1007IN1007&oq=facebook&aqs=chrome.0.69i59j69i57j0i271l2j69i60.1335j0j7&sourceid=chrome&ie=UTF-8",
                *                    "createdBy": {
                *                        "_id": "631f29486ec923e37efccb94",
                *                        "email": "deepanshu.sharma@mobilecoderz.com",
                *                        "customerCode": "WFU193230",
                *                        "avatar": "user-profiles/1663574288842-Screenshot (4).png",
                *                        "displayName": "SharmaDeepanshu",
                *                        "name": "Deepanshu Sharma"
                *                    },
                *                    "totalMembers": 2,
                *                    "isFavorite": false,
                *                    "isJoined": false
                *                }
                *            ],
                *            "execTime": 26
                *        }
                *    }
                */
    searchGroup(req: ReqInterface, res: ResInterface, next: NextFunction): Promise<void>;
    /**
       * @api {get} api/v1/app/group/search-suggestions?search=purposeText,test Search Suggestions foGroup search
       * @apiHeader {String} App-Version Version Code 1.0.0.
       * @apiHeader {String} deviceType 'WEB'|'IOS'|'ANDROID'
       * @apiHeader {String} Authorization eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9........
       * @apiVersion 1.0.0
       * @apiName search-suggestions
       * @apiGroup App-Group
       * @apiDescription pass data as query string eg name,test| state,searchValue|city,searchValue|purposeText|searchValue
       *
       * @apiSuccessExample {json} Success-Response
       *    {
       *         "status": 200,
       *         "statusText": "SUCCESS",
       *         "message": "Search list",
       *         "data": {
       *             "results": [
       *                 "Test",
       *                 "TestGroup"
       *             ],
       *             "execTime": 102
       *         }
       *     }
       *
       */
    searchSuggestions(req: ReqInterface, res: ResInterface, next: NextFunction): Promise<void>;
    /**
           * @api {get} api/v1/app/group/featured-groups?page=1&limit=3 Featured Groups list
           * @apiHeader {String} App-Version Version Code 1.0.0.
           * @apiHeader {String} deviceType 'WEB'|'IOS'|'ANDROID'
           * @apiHeader {String} Authorization eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9........
           * @apiVersion 1.0.0
           * @apiName featured-groups
           * @apiGroup App-Group
           *
           * @apiParam {Number} [page] default 1
           * @apiParam {Number} [limit] default 3
           *
           * @apiSuccessExample {json} Success-Response
           *   {
           *        "status": 200,
           *        "statusText": "SUCCESS",
           *        "message": "Featured group list",
           *        "data": {
           *            "count": 18,
           *            "list": [
           *                {
           *                    "city": null,
           *                    "state": null,
           *                    "_id": "631eddcded7496146e770bf4",
           *                    "groupIcon": "group-icons/1662967245111-bird nest.jpg",
           *                    "groupCode": "GT7878910",
           *                    "name": "Birds",
           *                    "purposeText": "Fund Raising for Birds",
           *                    "description": "For Food and Nest"
           *                }
           *            ],
           *            "execTime": 242
           *        }
           *    }
           *
           */
    featuredGroup(req: ReqInterface, res: ResInterface, next: NextFunction): Promise<void>;
    /**
       * @api {get} api/v1/app/group/top-cashback-groups?page=1&limit=3 Top Cashback Groups list
       * @apiHeader {String} App-Version Version Code 1.0.0.
       * @apiHeader {String} deviceType 'WEB'|'IOS'|'ANDROID'
       * @apiHeader {String} Authorization eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9........
       * @apiVersion 1.0.0
       * @apiName top-cashback-groups
       * @apiGroup App-Group
       *
       * @apiParam {Number} [page] default 1
       * @apiParam {Number} [limit] default 3
       *
       * @apiSuccessExample {json} Success-Response
        *   {
        *        "status": 200,
        *        "statusText": "SUCCESS",
        *        "message": "Top cashback group list",
        *        "data": {
        *            "count": 18,
        *            "list": [
        *                {
        *                    "city": null,
        *                    "state": null,
        *                    "_id": "631eddcded7496146e770bf4",
        *                    "groupIcon": "group-icons/1662967245111-bird nest.jpg",
        *                    "groupCode": "GT7878910",
        *                    "name": "Birds",
        *                    "purposeText": "Fund Raising for Birds",
        *                    "description": "For Food and Nest"
        *                }
        *            ],
        *            "execTime": 242
        *        }
        *    }
       */
    topCashBackGroups(req: ReqInterface, res: ResInterface, next: NextFunction): Promise<void>;
    /**
    * @api {get} api/v1/app/group/all-list?search=dow&page=1&limit=10, All Group List
    * @apiHeader {String} App-Version Version Code 1.0.0.
    * @apiHeader {String} deviceType 'WEB'|'IOS'|'ANDROID'
    * @apiHeader {String} Authorization eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9........
    * @apiVersion 1.0.0
    * @apiName all-group-list
    * @apiGroup App-Group
    * @apiDescription Pass the group name as search value.
    * @apiSuccessExample {json} Success-Response
    *   {
    *    "status": 200,
    *    "statusText": "SUCCESS",
    *    "message": "All group list",
    *    "data": {
    *        "result": {
    *            "count": 2,
    *            "list": [
    *                {
    *                    "_id": "6322cd3986d65b0926de0cfa",
    *                    "groupCode": "GT2240198",
    *                    "groupIcon": "group-icons/1663743143375-download.png",
    *                    "name": "Down",
    *                    "phoneNumber": "9657412300",
    *                     "email": "testing@yopmail.com",
    *                    "address": "delhi-95",
    *                    "createdBy": {
    *                       "_id": "62ff730eb8867883b915a85e",
    *                        "email": "ss1@yopmail.com",
    *                        "avatar": "user-profiles/1663570153670-/EB7C1389-2FFC-4A57-B388-B5667C701D4A.jpg",
    *                        "name": "Sss Hey"
    *                    },
    *                    "totalSubgroup": 0,
    *                    "isJoined": false,
    *                    "isFavorite": true
    *                },
    *                {
    *                    "_id": "63200c58899361dbc2535ebd",
    *                    "groupCode": "GT4748542",
    *                    "groupIcon": "group-icons/1663743143375-download.png",
    *                    "name": "Down",
    *                    "phoneNumber": "9657412300",
    *                    "email": "testing@yopmail.com",
    *                    "address": "delhi-95",
    *                    "createdBy": {
    *                       "_id": "62ff730eb8867883b915a85e",
    *                        "email": "ss1@yopmail.com",
    *                        "avatar": "user-profiles/1663570153670-/EB7C1389-2FFC-4A57-B388-B5667C701D4A.jpg",
    *                        "name": "Sss Hey"
    *                    },
    *                    "totalSubgroup": 0,
    *                    "isJoined": false,
    *                    "isFavorite": true
    *                }
    *            ]
    *        },
    *        "execTime": 105
    *    }
    *   }
    */
    allGroupList(req: ReqInterface, res: ResInterface, next: NextFunction): Promise<void>;
    /**
    * @api {delete} api/v1/app/group/leave/:id Leave Group
    * @apiHeader {String} App-Version Version Code 1.0.0.
    * @apiHeader {String} deviceType 'WEB'|'IOS'|'ANDROID'
    * @apiHeader {String} Authorization eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9........
    * @apiVersion 1.0.0
    * @apiName leave-group
    * @apiGroup App-Group
    * @apiDescription Pass the group _id in params.
    * @apiSuccessExample {json} Success-Response
    *   {
    *    "status": 200,
    *    "statusText": "SUCCESS",
    *    "message": "User left group",
    *    "data": {
    *        "data": {
    *            "group": {
    *                "city": null,
    *                "state": null,
    *                "zipCode": null,
    *                "_id": "6321d770c49be8f2c62454ac",
    *                "groupIcon": null,
    *                "groupCode": "GT4952029",
    *                "name": "Fund Raiser",
    *                "purposeId": "631747bcd77165ad9c3a8575",
    *                "purposeText": "testing purpose 123",
    *                "description": "this is testing.",
    *                "goalInterval": "2",
    *                "goalPrice": 10000,
    *                "showContactInfo": true,
    *                "phoneNumber": "1234567890",
    *                "email": "test@gmail.com",
    *                "address": "this is address",
    *                "showSocialInfo": true,
    *                "facebookUrl": "fb.com",
    *                "twitterUrl": "twitter.com",
    *                "members": [
    *                    "62dfcb21fb89c4b45de44685"
    *                ],
    *                "createdBy": "62dfcb21fb89c4b45de44685",
    *                "totalMembers": 0,
    *                "totalSubgroup": 0,
    *                "subGroupLimit": 0,
    *                "isDeleted": false,
    *                "groupSubscribed": false,
    *                "subGroupSubscribed": false,
    *                "createdAt": "2022-09-14T13:30:24.813Z",
    *                "updatedAt": "2022-09-16T11:01:10.504Z",
    *                "__v": 4,
    *                "featuredRank": 0,
    *                "totalCashback": 0
    *            }
    *        },
    *        "execTime": 645
    *    }
    *   }
    */
    leaveGroup(req: ReqInterface, res: ResInterface, next: NextFunction): Promise<void>;
    /**
    * @api {post} api/v1/app/group/join Join Group
    * @apiHeader {String} App-Version Version Code 1.0.0.
    * @apiHeader {String} deviceType 'WEB'|'IOS'|'ANDROID'
    * @apiHeader {String} Authorization eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9........
    * @apiVersion 1.0.0
    * @apiName join-group
    * @apiGroup App-Group
    * @apiDescription Pass the group _id in body.
    * @apiParamExample {json} req-body
    *   {
    *       "groupId": "631b2645ed7496146e76f6f8"
    *   }
    * @apiSuccessExample {json} Success-Response
    *    {
    *        "status": 201,
    *        "statusText": "CREATED",
    *        "message": "Group joined",
    *        "data": {
    *            "group": {
    *                "city": null,
    *                "state": null,
    *                "zipCode": null,
    *                "_id": "631b2645ed7496146e76f6f8",
    *                "groupIcon": null,
    *                "groupCode": "GT5083122",
    *                "name": "Fund Raiser",
    *                "purposeId": "631747bcd77165ad9c3a8575",
    *                "purposeText": "testing purpose 123",
    *                "description": "Just for test",
    *                "goalInterval": "1",
    *                "goalPrice": 2000,
    *                "showContactInfo": true,
    *                "phoneNumber": "9648484848",
    *                "email": "gaurav.roy@mobilecoderz.com",
    *                "address": "ghaziabad up india",
    *                "showSocialInfo": true,
    *                "facebookUrl": "https://www.facebook.com/MobileCoderz/",
    *                "twitterUrl": "https://twitter.com/mobilecoderz",
    *                "members": [
    *                    "62e0eabbfb89c4b45de45c5f",
    *                    "62dfcb21fb89c4b45de44685"
    *                ],
    *                "createdBy": "62e0eabbfb89c4b45de45c5f",
    *                "totalMembers": 2,
    *                "totalSubgroup": 0,
    *                "subGroupLimit": 0,
    *                "isDeleted": true,
    *                "createdAt": "2022-09-09T11:40:53.277Z",
    *                "updatedAt": "2022-09-19T12:58:00.594Z",
    *                "__v": 2,
    *                "featuredRank": 0,
    *                "groupSubscribed": false,
    *                "subGroupSubscribed": false,
    *                "totalCashback": 0
    *            },
    *            "execTime": 269
    *        }
    *    }
    */
    joinGroup(req: ReqInterface, res: ResInterface, next: NextFunction): Promise<void>;
}
declare const _default: GroupController;
export default _default;
