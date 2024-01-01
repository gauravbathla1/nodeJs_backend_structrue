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
const ChatReportModel_1 = require("../../models/ChatReportModel");
class ChatReportController {
    /**
     * @api {get} /api/v1/admin/chat/report-lis Chat report list
     * @apiHeader {String} App-Version Version Code 1.0.0.
     * @apiHeader {String} Authorization eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyYmZlMGNmMTdiYmU2ZjY2NzI3MzlmMyIsImVtYWlsIjoiYWRtaW5Ad2VmdW5kdXMuY29tIiwiaWF..........
     * @apiVersion 1.0.0
     * @apiName report-list
     * @apiGroup Admin-Chat
     * @apiSuccessExample {json} Success-Response:
     * {
     *           "status": 200,
     *           "statusText": "SUCCESS",
     *           "message": "Chat reports list",
     *           "data": {
     *               "count": 52,
     *               "list": [
     *                   {
     *                       "_id": "640582a20c124373b3872524",
     *                       "reportedBy": {
     *                           "_id": "6358c5047929638cd2c88446",
     *                           "email": "gauravroy@yopmail.com",
     *                           "avatar": "user-profiles/1676465378852-/7414fdf2-8323-4025-8837-ac602e894b8e.jpg",
     *                           "name": "Gaurav roy"
     *                       },
     *                       "chatText": "HI",
     *                       "reasonText": "Voluptatum natus explicabo consequatur odio facere quisquam.",
     *                       "group": {
     *                           "_id": "63e4df6f0e7484520de4b804",
     *                           "groupCode": "GT9976367",
     *                           "name": "friends"
     *                       },
     *                       "user": {
     *                           "_id": "637b7bbec2b0089dad0f2006",
     *                           "email": "kamalchauhan@yopmail.com",
     *                           "avatar": "user-profiles/1669123247367-black.jpg",
     *                           "name": "Kamal Chauhan"
     *                       }
     *                   }
     *               ],
     *               "execTime": 90
     *           }
     *       }
     *
     * */
    reportsList(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const queryString = req.query;
                const page = Number(queryString.page) || 1;
                const limit = Number(queryString.limit) || 10;
                const skip = (page - 1) * limit;
                let sort = -1;
                if (queryString.sort.includes('-')) {
                    sort = -1;
                }
                else {
                    sort = 1;
                }
                const pipeline = [
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
                                        'createdAt': sort
                                    }
                                },
                                {
                                    '$skip': skip
                                },
                                {
                                    '$limit': limit
                                },
                                {
                                    '$lookup': {
                                        'from': 'users',
                                        'let': {
                                            'rb': '$reportedBy',
                                            'ru': '$reportedUser'
                                        },
                                        'as': 'users',
                                        'pipeline': [
                                            {
                                                '$match': {
                                                    '$expr': {
                                                        '$in': [
                                                            '$_id', [
                                                                '$$rb', '$$ru'
                                                            ]
                                                        ]
                                                    }
                                                }
                                            }, {
                                                '$limit': 2
                                            }
                                        ]
                                    }
                                }, {
                                    '$lookup': {
                                        'from': 'groups',
                                        'let': {
                                            'gid': '$groupId'
                                        },
                                        'as': 'group',
                                        'pipeline': [
                                            {
                                                '$match': {
                                                    '$expr': {
                                                        '$eq': [
                                                            '$_id', '$$gid'
                                                        ]
                                                    }
                                                }
                                            }, {
                                                '$limit': 1
                                            }
                                        ]
                                    }
                                }, {
                                    '$addFields': {
                                        'reportedBy': {
                                            '$filter': {
                                                'input': '$users',
                                                'as': 'u',
                                                'cond': {
                                                    '$eq': [
                                                        '$$u._id', '$reportedBy'
                                                    ]
                                                }
                                            }
                                        },
                                        'user': {
                                            '$filter': {
                                                'input': '$users',
                                                'as': 'u',
                                                'cond': {
                                                    '$eq': [
                                                        '$$u._id', '$reportedUser'
                                                    ]
                                                }
                                            }
                                        }
                                    }
                                }, {
                                    '$unwind': {
                                        'path': '$user'
                                    }
                                }, {
                                    '$unwind': {
                                        'path': '$reportedBy'
                                    }
                                }, {
                                    '$unwind': {
                                        'path': '$group'
                                    }
                                }, {
                                    '$project': {
                                        '_id': 1,
                                        'group': {
                                            '_id': 1,
                                            'name': 1,
                                            'groupCode': 1
                                        },
                                        'reportedBy': {
                                            '_id': 1,
                                            'name': 1,
                                            'avatar': 1,
                                            'email': 1,
                                            'customerCode': 1,
                                        },
                                        'user': {
                                            '_id': 1,
                                            'name': 1,
                                            'avatar': 1,
                                            'email': 1,
                                            'customerCode': 1,
                                        },
                                        'chatText': 1,
                                        'reasonText': 1,
                                        'createdAt': 1,
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
                let count = 0;
                let list = [];
                const data = yield ChatReportModel_1.default.aggregate(pipeline);
                if (data.length) {
                    count = data[0].count;
                    list = data[0].list;
                }
                res.logMsg = 'Chat reports list';
                return ResponseHelper_1.default.ok(res, res.__('chat_reports_list'), { count, list });
            }
            catch (error) {
                next(error);
            }
        });
    }
    /**
    * @api {delete} /api/v1/admin/chat/report-delete/:reportId Chat report Delete
    * @apiHeader {String} App-Version Version Code 1.0.0.
    * @apiHeader {String} Authorization eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyYmZlMGNmMTdiYmU2ZjY2NzI3MzlmMyIsImVtYWlsIjoiYWRtaW5Ad2VmdW5kdXMuY29tIiwiaWF..........
    * @apiVersion 1.0.0
    * @apiName report-delete
    * @apiGroup Admin-Chat
    * @apiSuccessExample {json} Success-Response:
    * {
    *        "status": 200,
    *        "statusText": "SUCCESS",
    *        "message": "Chat report deleted",
    *        "data": {
    *            "execTime": 69
    *        }
    *    }
    *
    * */
    deleteReport(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const reportId = req.params.id;
                yield ChatReportModel_1.default.deleteOne({ _id: reportId });
                res.logMsg = 'Chat report deleted successfully';
                return ResponseHelper_1.default.ok(res, res.__('chat_report_deleted_successfully'), {});
            }
            catch (error) {
                next(error);
            }
        });
    }
    /**
   * @api {patch} /api/v1/admin/chat/report-respond/:reportId Respond on report
   * @apiHeader {String} App-Version Version Code 1.0.0.
   * @apiHeader {String} Authorization eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyYmZlMGNmMTdiYmU2ZjY2NzI3MzlmMyIsImVtYWlsIjoiYWRtaW5Ad2VmdW5kdXMuY29tIiwiaWF..........
   * @apiVersion 1.0.0
   * @apiName report-respond
   * @apiGroup Admin-Chat
   *
   * @apiParam {String} reportedBy report by user _id
   * @apiParam {String} reportedTo reported  user _id
   * @apiParam {String} content email content
   * @apiParam {String} subject email subject
   *
   * @apiSuccessExample {json} Success-Response:
   * {
   *        "status": 200,
   *        "statusText": "SUCCESS",
   *        "message": "Chat report deleted",
   *        "data": {
   *            "execTime": 69
   *        }
   *    }
   *
   * */
    reportRespondTo(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const reportId = req.params.id;
                const reportedBy = req.body.reportedBy;
                const reportedUser = req.body.reportedUser;
                const content = req.body.content;
                const subject = req.body.subject;
                console.log(content, subject);
                if (reportedBy) {
                    res.logMsg = `Admin responded to reportedBy user on chat report *${reportId}*`;
                }
                if (reportedUser) {
                    res.logMsg = `Admin responded to reportedTo user on chat report *${reportId}*`;
                }
                return ResponseHelper_1.default.ok(res, res.__('report_responded_successfully'), {});
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.default = new ChatReportController();
