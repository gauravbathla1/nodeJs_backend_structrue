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
const GroupFavoriteModel_1 = require("../../models/GroupFavoriteModel");
class GroupFavouriteController {
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
    addToFavourite(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { groupId } = req.body;
                if (yield GroupFavoriteModel_1.default.exists({ groupId, userId: req.user._id }))
                    return ResponseHelper_1.default.badRequest(res, res.__('already_marked_favourite'));
                let favGroup = new GroupFavoriteModel_1.default();
                favGroup.groupId = groupId;
                favGroup.userId = req.user._id;
                yield favGroup.save();
                return ResponseHelper_1.default.created(res, res.__('marked_favourite'), { favGroup });
            }
            catch (error) {
                next(error);
            }
        });
    }
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
    RemoveFromFavourite(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const groupId = req.params.id;
                const exist = yield GroupFavoriteModel_1.default.exists({ groupId, userId: req.user._id });
                console.log('exist', exist);
                if (!exist)
                    return ResponseHelper_1.default.badRequest(res, res.__('invalid_groupId'));
                yield GroupFavoriteModel_1.default.deleteOne({ groupId, userId: req.user._id });
                return ResponseHelper_1.default.ok(res, res.__('removed_from_favourite'), {});
            }
            catch (error) {
                next(error);
            }
        });
    }
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
    favouriteGroupList(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = req.user._id;
                const page = Number(req.query.page) * 1 || 1;
                const limit = Number(req.query.limit) * 1 || 20;
                let skip = (page - 1) * limit;
                const pipeline = [
                    {
                        '$match': {
                            'userId': req.user._id
                        }
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
                                }, {
                                    '$lookup': {
                                        'from': 'groups',
                                        'localField': 'groupId',
                                        'foreignField': '_id',
                                        'as': 'group'
                                    }
                                }, {
                                    '$unwind': {
                                        'path': '$group',
                                        'preserveNullAndEmptyArrays': false
                                    }
                                }, {
                                    '$lookup': {
                                        'from': 'users',
                                        'localField': 'group.createdBy',
                                        'foreignField': '_id',
                                        'as': 'group.createdBy'
                                    }
                                }, {
                                    '$unwind': {
                                        'path': '$group.createdBy',
                                        'preserveNullAndEmptyArrays': true
                                    }
                                },
                                {
                                    '$lookup': {
                                        'from': 'grouppurposes',
                                        'localField': 'group.purposeId',
                                        'foreignField': '_id',
                                        'as': 'group.purpose'
                                    }
                                }, {
                                    '$unwind': {
                                        'path': '$group.purpose',
                                        'preserveNullAndEmptyArrays': true
                                    }
                                },
                                {
                                    '$project': {
                                        'group': {
                                            '_id': 1,
                                            'name': 1,
                                            'phoneNumber': 1,
                                            'address': 1,
                                            'email': 1,
                                            'purpose': '$group.purpose.text',
                                            'groupIcon': 1,
                                            'showContactInfo': 1,
                                            'description': 1,
                                            'members': 1,
                                            'state': 1,
                                            'city': 1,
                                            'zipCode': 1,
                                            'createdBy': {
                                                '_id': 1,
                                                'avatar': 1,
                                                'customerCode': 1,
                                                'name': 1,
                                                'displayName': 1
                                            },
                                            'isMember': {
                                                '$in': [
                                                    userId, '$group.members'
                                                ]
                                            }
                                        }
                                    }
                                }
                            ]
                        }
                    },
                    {
                        '$project': {
                            'count': {
                                '$first': '$count.count'
                            },
                            'list': 1
                        }
                    }
                ];
                const result = yield GroupFavoriteModel_1.default.aggregate(pipeline);
                let count = 0;
                let list = [];
                if (result.length) {
                    count = result[0].count,
                        list = result[0].list;
                }
                return ResponseHelper_1.default.ok(res, res.__('favourite_group_list_fetched'), { count, list });
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.default = new GroupFavouriteController();
