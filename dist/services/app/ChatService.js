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
const MessageModel_1 = require("../../models/MessageModel");
const ChatModel_1 = require("../../models/ChatModel");
const GroupMemberModel_1 = require("../../models/GroupMemberModel");
const GroupMemberInterface_1 = require("../../interfaces/GroupMemberInterface");
const GroupModel_1 = require("../../models/GroupModel");
const ChatStatusInterface_1 = require("../../interfaces/ChatStatusInterface");
const mongoose_1 = require("mongoose");
const ChatStatusModel_1 = require("../../models/ChatStatusModel");
const ChatBlockModel_1 = require("../../models/ChatBlockModel");
const socket_1 = require("../../socket");
const RedisHelper_1 = require("../../helpers/RedisHelper");
class ChatService {
    createMessage(text, type, creator) {
        return __awaiter(this, void 0, void 0, function* () {
            const message = yield MessageModel_1.default.create({
                text,
                messageType: type,
                creator
            });
            return message;
        });
    }
    createChat(groupId, messageId, senderId) {
        return __awaiter(this, void 0, void 0, function* () {
            const chat = yield ChatModel_1.default.create({
                groupId,
                messageId,
                senderId
            });
            return chat;
        });
    }
    joinAllGroup(userId, socket) {
        return __awaiter(this, void 0, void 0, function* () {
            const members = yield GroupMemberModel_1.default.find({
                member: userId,
                // isChatBlocked: false,
                groupRequestStatus: { '$in': [GroupMemberInterface_1.GroupRequestStatus.accepted, GroupMemberInterface_1.GroupRequestStatus.noRequest] }
            });
            members.forEach(mem => {
                socket.join(`${mem.group}`);
            });
            return true;
        });
    }
    myGroupForChat(user, page, limit, searchText) {
        return __awaiter(this, void 0, void 0, function* () {
            const skip = (page - 1) * limit;
            let match = {
                createdBy: user._id,
                isDeleted: false
            };
            if (searchText && searchText.trim()) {
                match = {
                    'name': {
                        '$regex': searchText,
                        '$options': '$i'
                    },
                    createdBy: user._id,
                    isDeleted: false
                };
            }
            const pipeline = [
                {
                    '$match': match
                },
                {
                    '$lookup': {
                        'from': 'chats',
                        'let': {
                            'gid': '$_id'
                        },
                        'pipeline': [
                            {
                                '$match': {
                                    '$expr': {
                                        '$eq': [
                                            '$$gid', '$groupId'
                                        ]
                                    }
                                }
                            }, {
                                '$sort': {
                                    'createdAt': -1
                                }
                            }, {
                                '$limit': 1
                            }
                        ],
                        'as': 'lastChat'
                    }
                },
                {
                    '$unwind': {
                        'path': '$lastChat',
                        'preserveNullAndEmptyArrays': true
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
                                    'lastChat.createdAt': -1
                                }
                            },
                            {
                                '$skip': skip
                            }, {
                                '$limit': limit
                            }, {
                                '$lookup': {
                                    'from': 'chatstatuses',
                                    'let': {
                                        'gid': '$_id'
                                    },
                                    'as': 'chatstatus',
                                    'pipeline': [
                                        {
                                            '$match': {
                                                'userId': user._id,
                                                'status': ChatStatusInterface_1.chatStatus.seen,
                                                '$expr': {
                                                    '$eq': [
                                                        '$$gid', '$groupId'
                                                    ]
                                                }
                                            }
                                        }, {
                                            '$limit': 1
                                        }, {
                                            '$lookup': {
                                                'from': 'chats',
                                                'localField': 'lastChatId',
                                                'foreignField': '_id',
                                                'as': 'chat'
                                            }
                                        }, {
                                            '$addFields': {
                                                'chat': {
                                                    '$first': '$chat'
                                                }
                                            }
                                        }, {
                                            '$lookup': {
                                                'from': 'chats',
                                                'let': {
                                                    'gid': '$groupId',
                                                    'lct': '$chat.createdAt'
                                                },
                                                'as': 'count',
                                                'pipeline': [
                                                    {
                                                        '$match': {
                                                            'senderId': {
                                                                '$ne': user._id
                                                            },
                                                            '$expr': {
                                                                '$and': [
                                                                    {
                                                                        '$eq': [
                                                                            '$$gid', '$groupId'
                                                                        ]
                                                                    }, {
                                                                        '$gt': [
                                                                            '$createdAt', '$$lct'
                                                                        ]
                                                                    }
                                                                ]
                                                            }
                                                        }
                                                    }, {
                                                        '$count': 'count'
                                                    }
                                                ]
                                            }
                                        }
                                    ]
                                }
                            }, {
                                '$unwind': {
                                    'path': '$chatstatus',
                                    'preserveNullAndEmptyArrays': true
                                }
                            }, {
                                '$project': {
                                    '_id': 1,
                                    'name': 1,
                                    'totalMembers': 1,
                                    'groupIcon': 1,
                                    'createdBy': 1,
                                    'unreadCount': {
                                        '$ifNull': [
                                            {
                                                '$first': '$chatstatus.count.count'
                                            }, 0
                                        ]
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
            const groupData = yield GroupModel_1.default.aggregate(pipeline);
            let list = [];
            let count = 0;
            // console.log('grpdata', groupData[0]);
            if (groupData.length) {
                count = groupData[0].count;
                list = groupData[0].list;
            }
            return { count, list };
        });
    }
    joinGroupForChat(user, page, limit, search) {
        return __awaiter(this, void 0, void 0, function* () {
            const skip = (page - 1) * limit;
            let searchMatch = {};
            if (search && search.trim()) {
                searchMatch = {
                    'name': {
                        '$regex': search,
                        '$options': 'i'
                    }
                };
            }
            const pipeline = [
                {
                    '$match': {
                        'member': user._id,
                        'isAdmin': false,
                        'groupRequestStatus': GroupMemberInterface_1.GroupRequestStatus.accepted
                    }
                }, {
                    '$lookup': {
                        'from': 'groups',
                        'localField': 'group',
                        'foreignField': '_id',
                        'as': 'group'
                    }
                }, {
                    '$unwind': {
                        'path': '$group',
                        'preserveNullAndEmptyArrays': true
                    }
                }, {
                    '$replaceRoot': {
                        'newRoot': '$group'
                    }
                },
                {
                    '$match': {
                        'isDeleted': false
                    }
                },
                {
                    '$match': searchMatch
                },
                {
                    '$lookup': {
                        'from': 'chats',
                        'let': {
                            'gid': '$_id'
                        },
                        'pipeline': [
                            {
                                '$match': {
                                    '$expr': {
                                        '$eq': [
                                            '$$gid', '$groupId'
                                        ]
                                    }
                                }
                            }, {
                                '$sort': {
                                    'createdAt': -1
                                }
                            }, {
                                '$limit': 1
                            }
                        ],
                        'as': 'lastChat'
                    }
                },
                {
                    '$unwind': {
                        'path': '$lastChat',
                        'preserveNullAndEmptyArrays': true
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
                                    'lastChat.createdAt': -1
                                }
                            },
                            {
                                '$skip': skip
                            }, {
                                '$limit': limit
                            }, {
                                '$lookup': {
                                    'from': 'chatstatuses',
                                    'let': {
                                        'gid': '$_id'
                                    },
                                    'as': 'chatstatus',
                                    'pipeline': [
                                        {
                                            '$match': {
                                                'userId': user._id,
                                                'status': ChatStatusInterface_1.chatStatus.seen,
                                                '$expr': {
                                                    '$eq': [
                                                        '$$gid', '$groupId'
                                                    ]
                                                }
                                            }
                                        }, {
                                            '$limit': 1
                                        }, {
                                            '$lookup': {
                                                'from': 'chats',
                                                'localField': 'lastChatId',
                                                'foreignField': '_id',
                                                'as': 'chat'
                                            }
                                        }, {
                                            '$addFields': {
                                                'chat': {
                                                    '$first': '$chat'
                                                }
                                            }
                                        }, {
                                            '$lookup': {
                                                'from': 'chats',
                                                'let': {
                                                    'gid': '$groupId',
                                                    'lct': '$chat.createdAt'
                                                },
                                                'as': 'count',
                                                'pipeline': [
                                                    {
                                                        '$match': {
                                                            '$expr': {
                                                                '$and': [
                                                                    {
                                                                        '$eq': [
                                                                            '$$gid', '$groupId'
                                                                        ]
                                                                    }, {
                                                                        '$gt': [
                                                                            '$createdAt', '$$lct'
                                                                        ]
                                                                    }
                                                                ]
                                                            }
                                                        }
                                                    }, {
                                                        '$count': 'count'
                                                    }
                                                ]
                                            }
                                        }
                                    ]
                                }
                            }, {
                                '$unwind': {
                                    'path': '$chatstatus',
                                    'preserveNullAndEmptyArrays': true
                                }
                            }, {
                                '$project': {
                                    '_id': 1,
                                    'name': 1,
                                    'totalMembers': 1,
                                    'groupIcon': 1,
                                    'createdBy': 1,
                                    'unreadCount': {
                                        '$ifNull': [
                                            {
                                                '$first': '$chatstatus.count.count'
                                            }, 0
                                        ]
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
            const groupData = yield GroupMemberModel_1.default.aggregate(pipeline);
            let list = [];
            let count = 0;
            if (groupData.length) {
                list = groupData[0].list;
                count = groupData[0].count;
            }
            return { count, list };
        });
    }
    chatHistory(groupId, limit, gt, lt, blockData = null) {
        return __awaiter(this, void 0, void 0, function* () {
            // const skip = (page - 1) * limit;
            // let chatBlocked = await ChatBlockModel.findOne({ groupId, userId: user })
            let match = {
                'groupId': new mongoose_1.Types.ObjectId(groupId),
            };
            let sortOrder = -1;
            if (lt && lt.trim()) {
                match.createdAt = {
                    '$lt': new Date(lt)
                };
            }
            ;
            if (gt && gt.trim()) {
                match.createdAt = {
                    '$gt': new Date(gt)
                };
                sortOrder = 1;
                delete match.lt;
            }
            ;
            let blockmatch = {};
            /* chat after blocking should not be shown */
            if (blockData) {
                blockmatch.createdAt = {
                    '$lt': blockData.createdAt
                };
            }
            const pipeline = [
                {
                    '$match': match
                },
                {
                    '$match': blockmatch
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
                                    'createdAt': sortOrder
                                }
                            },
                            /* {
                              '$skip': skip
                            }, */
                            {
                                '$limit': limit
                            },
                            {
                                '$lookup': {
                                    'from': 'messages',
                                    'localField': 'messageId',
                                    'foreignField': '_id',
                                    'as': 'message'
                                }
                            }, {
                                '$unwind': {
                                    'path': '$message',
                                    'preserveNullAndEmptyArrays': true
                                }
                            }, {
                                '$lookup': {
                                    'from': 'users',
                                    'localField': 'senderId',
                                    'foreignField': '_id',
                                    'as': 'sender'
                                }
                            }, {
                                '$unwind': {
                                    'path': '$sender',
                                    'preserveNullAndEmptyArrays': true
                                }
                            }, {
                                '$project': {
                                    'createdAt': 1,
                                    'updatedAt': 1,
                                    'sender': {
                                        '_id': 1,
                                        'name': 1
                                    },
                                    'message': {
                                        '_id': 1,
                                        'text': 1,
                                        'messageType': 1
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
            const chatData = yield ChatModel_1.default.aggregate(pipeline);
            let list = [];
            let count = 0;
            if (chatData.length) {
                list = chatData[0].list;
                count = chatData[0].count;
            }
            return { count, list };
        });
    }
    deleteChat(chat, groupId) {
        return __awaiter(this, void 0, void 0, function* () {
            const rollbacktoPrev = yield this.chatStatusRollback(chat, groupId);
            if (!rollbacktoPrev)
                return false;
            yield MessageModel_1.default.deleteOne(chat.messageId);
            chat.delete();
            return true;
        });
    }
    blockUser(blockData, user) {
        return __awaiter(this, void 0, void 0, function* () {
            let groupMember = yield GroupMemberModel_1.default.findOne({ member: blockData.userId, group: blockData.groupId });
            if (!groupMember)
                return false;
            groupMember.isChatBlocked = true;
            yield groupMember.save();
            yield ChatBlockModel_1.default.create({
                userId: blockData.userId,
                groupId: blockData.groupId,
                blockedBy: user._id,
            });
            return true;
        });
    }
    unblockUser(data) {
        return __awaiter(this, void 0, void 0, function* () {
            let groupMember = yield GroupMemberModel_1.default.findOne({ member: data.userId, group: data.groupId });
            if (!groupMember)
                return false;
            groupMember.isChatBlocked = false;
            yield groupMember.save();
            yield ChatBlockModel_1.default.deleteOne({
                userId: data.userId,
                groupId: data.groupId
            });
            return true;
        });
    }
    /* saving last chat id to prev chat in chat status model. */
    chatStatusRollback(chat, groupId) {
        return __awaiter(this, void 0, void 0, function* () {
            const condition = {
                groupId: groupId,
                lastChatId: chat._id
            };
            const prevChatData = yield ChatModel_1.default.find({ createdAt: { '$lt': chat.createdAt } }).sort('-createdAt').limit(1);
            const prevChat = prevChatData[0];
            if (prevChat) {
                yield ChatStatusModel_1.default.bulkWrite([
                    {
                        updateMany: {
                            filter: condition,
                            update: {
                                lastChatId: prevChat._id
                            }
                        }
                    }
                ]);
            }
            else {
                yield ChatStatusModel_1.default.deleteMany(condition);
            }
            return true;
        });
    }
    chatGroupMembers(group, page, limit) {
        return __awaiter(this, void 0, void 0, function* () {
            const skip = (page - 1) * limit;
            const pipeline = [
                {
                    '$match': {
                        'group': group._id,
                        'groupRequestStatus': {
                            '$nin': [GroupMemberInterface_1.GroupRequestStatus.rejected, GroupMemberInterface_1.GroupRequestStatus.pending]
                        },
                        'isLeft': false,
                        'isRemoved': false,
                        // 'isDeleted': false
                    }
                }, {
                    '$facet': {
                        'count': [
                            {
                                '$count': 'count'
                            }
                        ],
                        'list': [
                            {
                                '$skip': skip
                            }, {
                                '$limit': limit
                            }, {
                                '$lookup': {
                                    'from': 'users',
                                    'localField': 'member',
                                    'foreignField': '_id',
                                    'as': 'user'
                                }
                            }, {
                                '$unwind': {
                                    'path': '$user',
                                    'preserveNullAndEmptyArrays': true
                                }
                            }, {
                                '$project': {
                                    '_id': 1,
                                    'groupId': '$group',
                                    'isChatBlocked': 1,
                                    'user': {
                                        '_id': 1,
                                        'name': 1,
                                        'avatar': 1
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
            const result = yield GroupMemberModel_1.default.aggregate(pipeline);
            let count = 0;
            let list = [];
            if (result.length) {
                count = result[0].count;
                list = result[0].list;
            }
            return { count, list };
        });
    }
    removeFromRoom(userId, groupId) {
        var _a, _b, _c;
        return __awaiter(this, void 0, void 0, function* () {
            const userSockets = yield new RedisHelper_1.Redis(5, `${userId}`).lrange();
            if (userSockets.length) {
                for (let socketId of userSockets) {
                    let socket = (_c = (_b = (_a = socket_1.default.io) === null || _a === void 0 ? void 0 : _a.sockets) === null || _b === void 0 ? void 0 : _b.sockets) === null || _c === void 0 ? void 0 : _c.get(socketId);
                    socket === null || socket === void 0 ? void 0 : socket.leave(groupId);
                }
            }
            return true;
        });
    }
    joinRoom(userId, groupId) {
        var _a, _b, _c;
        return __awaiter(this, void 0, void 0, function* () {
            const userSockets = yield new RedisHelper_1.Redis(5, `${userId}`).lrange();
            if (userSockets.length) {
                for (let socketId of userSockets) {
                    let socket = (_c = (_b = (_a = socket_1.default.io) === null || _a === void 0 ? void 0 : _a.sockets) === null || _b === void 0 ? void 0 : _b.sockets) === null || _c === void 0 ? void 0 : _c.get(socketId);
                    socket.join(groupId);
                }
            }
            return true;
        });
    }
}
exports.default = new ChatService();
