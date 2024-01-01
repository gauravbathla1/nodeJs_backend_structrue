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
const ChatReportInterface_1 = require("../../interfaces/ChatReportInterface");
const ReportReasonInterface_1 = require("../../interfaces/ReportReasonInterface");
const ChatBlockModel_1 = require("../../models/ChatBlockModel");
const ChatModel_1 = require("../../models/ChatModel");
const ChatReportModel_1 = require("../../models/ChatReportModel");
const ChatStatusModel_1 = require("../../models/ChatStatusModel");
const GroupModel_1 = require("../../models/GroupModel");
const MessageModel_1 = require("../../models/MessageModel");
const ReportReasonModel_1 = require("../../models/ReportReasonModel");
const ChatService_1 = require("../../services/app/ChatService");
const GroupMemberModel_1 = require("../../models/GroupMemberModel");
// import socketObj from '../../socket'
class ChatController {
    /**
        * @api {emit} sendMessage Send Message
        * @apiHeader {String} App-Version Version Code 1.0.0.
        * @apiHeader {String} deviceType 'WEB'|'IOS'|'ANDROID'
        * @apiVersion 1.0.0
        * @apiName send-message
        * @apiGroup App-Chat
        * @apiDescription Event to send message
        * @apiParam {string} groupId
        * @apiParam {string} message
        * @apiParam {number} type allowed values are text = 1,url = 2,audio = 3,video = 4, image = 5
        * @apiSuccessExample {json} Success-Response:
        *{
        *    "status": 201,
        *    "message": "message sent",
        *    "data": {
        *        "chat": {
        *            "_id": "634fe596c6b29c25b267ec6d",
        *            "createdAt": "2022-10-19T11:55:02.132Z",
        *            "updatedAt": "2022-10-19T11:55:02.132Z",
        *            "message": {
        *                "_id": "634fe596c6b29c25b267ec6b",
        *                "text": "this.is test msg",
        *                "messageType": 1
        *            },
        *            "sender": {
        *                "_id": "62da9963b647612af2d9b831",
        *                "name": "Kamal kamal chauhan"
        *            }
        *        }
        *    }
        *}
        */
    /**
    * @api {listen} recieveMessage Receive message
    * @apiHeader {String} App-Version Version Code 1.0.0.
    * @apiHeader {String} deviceType 'WEB'|'IOS'|'ANDROID'
    * @apiVersion 1.0.0
    * @apiName receive-message
    * @apiGroup App-Chat
    * @apiDescription listener to recieve message
    * @apiSuccessExample {json} Success-Response:
    *{
    *    "message": "message recieved",
    *    "data": {
    *        "chat": {
    *            "_id": "635a59a38333b1c82f861ee3",
    *            "createdAt": "2022-10-27T10:12:51.468Z",
    *            "updatedAt": "2022-10-27T10:12:51.468Z",
    *            "message": {
    *                "_id": "635a59a38333b1c82f861ee1",
    *                "text": "this.is test msg",
    *                "messageType": 1
    *            },
    *            "sender": {
    *                "_id": "62da9963b647612af2d9b831",
    *                "name": "Kamal kamal chauhan"
    *            },
    *            "groupId": "6328426c6efefacb67f3cb60"
    *        }
    *    }
    *}
    */
    sendMessage(data, socket, callback) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = (_a = socket.data) === null || _a === void 0 ? void 0 : _a.user;
                const message = yield ChatService_1.default.createMessage(data.message, data.type, user._id);
                const chat = yield ChatService_1.default.createChat(data.groupId, message._id, user._id);
                const responseData = {
                    _id: chat._id,
                    createdAt: chat.createdAt,
                    updatedAt: chat.updatedAt,
                    message: {
                        _id: message._id,
                        text: message.text,
                        messageType: message.messageType
                    },
                    sender: {
                        _id: user._id,
                        name: user.name
                    }
                };
                callback({
                    status: 201,
                    message: "message sent",
                    data: {
                        chat: responseData
                    }
                });
                socket.to(data.groupId).emit('recieveMessage', {
                    message: 'message recieved',
                    data: {
                        chat: Object.assign(Object.assign({}, responseData), { groupId: data.groupId })
                    }
                });
            }
            catch (error) {
                console.log('send Message Error', error);
            }
        });
    }
    /**
        * @api {emit} changeChatStatus Change Chat Status
        * @apiHeader {String} App-Version Version Code 1.0.0.
        * @apiHeader {String} deviceType 'WEB'|'IOS'|'ANDROID'
        * @apiVersion 1.0.0
        * @apiName change-chat-status
        * @apiGroup App-Chat
        * @apiDescription Event to send message
        * @apiParam {string} groupId
        * @apiParam {string} lastChatId _id of last chat whose status you want to change
        * @apiParam {number} status allowed values are sent = 1,delivered = 2,seen = 3
        * @apiSuccessExample {json} Success-Response:
        *{
        *    "status": 200,
        *    "message": "Status changed",
        *    "data": {}
        *}
        */
    changeChatStatus(data, socket, callback) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = (_a = socket.data) === null || _a === void 0 ? void 0 : _a.user;
                const query = {
                    groupId: data.groupId,
                    userId: user._id
                };
                const update = {
                    groupId: data.groupId,
                    userId: user._id,
                    status: data.status,
                    lastChatId: data.lastChatId
                };
                yield ChatStatusModel_1.default.findOneAndUpdate(query, update, {
                    upsert: true,
                    new: true
                });
                // console.log('chatstatus', chatstatus);
                callback({
                    status: 200,
                    message: 'Status changed',
                    data: {}
                });
            }
            catch (error) {
                console.log('Change chat status Error', error);
            }
        });
    }
    /**
        * @api {emit} editMessage Edit Message
        * @apiHeader {String} App-Version Version Code 1.0.0.
        * @apiHeader {String} deviceType 'WEB'|'IOS'|'ANDROID'
        * @apiVersion 1.0.0
        * @apiName edit-message
        * @apiGroup App-Chat
        * @apiDescription Event to edit message
        * @apiParam {string} groupId
        * @apiParam {string} messageId _id of message that you want to edit
        * @apiParam {string} message
        * @apiParam {string} chatId
        * @apiSuccessExample {json} Success-Response:
        *{
        *    "status": 200,
        *    "message": "Chat edited successfully",
        *    "data": {
        *        "_id": "634d44eeed2e661b6fd8ea47",
        *        "message": {
        *            "_id": "634d44eeed2e661b6fd8ea45",
        *            "text": "this is edited",
        *            "isedited": true
        *        }
        *    }
        *}
        */
    /**
    * @api {listen} chatAction Chat Action
    * @apiHeader {String} App-Version Version Code 1.0.0.
    * @apiHeader {String} deviceType 'WEB'|'IOS'|'ANDROID'
    * @apiVersion 1.0.0
    * @apiName chat-action
    * @apiGroup App-Chat
    * @apiDescription listener for edit OR delete chat.
    * @apiSuccessExample {json} Success-Response:
    *{
    *    "message": "Chat edited",
    *    "data": {
    *        "_id": "634d458ded2e661b6fd8ea57",
    *        "message": {
    *            "_id": "634d458ded2e661b6fd8ea55",
    *            "text": "this is edited",
    *            "isedited": true,
    *        },
    *        "actionType": "EDIT"
    *        "groupId": "6328426c6efefacb67f3cb60"
    *    }
    *}
    @apiSuccessExample {json} Success-Example2:
    *{
    *    "message": "Chat deleted",
    *    "data": {
    *        "_id": "634d4aad80a1ef5461fe77f5",
    *        "actionType": "DELETE",
    *        "groupId": "6328426c6efefacb67f3cb60"
    *    }
    *}
    */
    editChat(data, socket, callback) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const msg = yield MessageModel_1.default.findById(data.messageId);
                if (JSON.stringify(msg.creator) !== JSON.stringify((_b = (_a = socket.data) === null || _a === void 0 ? void 0 : _a.user) === null || _b === void 0 ? void 0 : _b._id)) {
                    callback({
                        status: 403,
                        message: 'only chat creator can edit message',
                        data: {}
                    });
                }
                msg.isEdited = true;
                msg.editHistory.push({
                    text: msg.text,
                    editedAt: new Date()
                });
                msg.text = data.message;
                yield msg.save();
                const respData = {
                    _id: data.chatId,
                    message: {
                        _id: msg._id,
                        text: msg.text,
                        isedited: true
                    }
                };
                callback({
                    status: 200,
                    message: 'Chat edited successfully',
                    data: respData
                });
                socket.to(data.groupId).emit('chatAction', {
                    message: 'Chat edited',
                    data: Object.assign(Object.assign({}, respData), { actionType: 'EDIT', groupId: data.groupId })
                });
            }
            catch (error) {
                console.log('error', error);
            }
        });
    }
    /**
        * @api {emit} deleteMessage Delete Message
        * @apiHeader {String} App-Version Version Code 1.0.0.
        * @apiHeader {String} deviceType 'WEB'|'IOS'|'ANDROID'
        * @apiVersion 1.0.0
        * @apiName delete-message
        * @apiGroup App-Chat
        * @apiDescription Event to delete message
        * @apiParam {string} groupId
        * @apiParam {string} chatId
        * @apiSuccessExample {json} Success-Response:
        *{
        *    "status": 200,
        *    "message": "Chat deleted Successfully",
        *    "data": {
        *        "_id": "634d4aad80a1ef5461fe77f5"
        *    }
        *}
        */
    deleteChat(data, socket, callback) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const chat = yield ChatModel_1.default.findById(data.chatId);
                if (!chat) {
                    callback({
                        status: 403,
                        message: 'Invalid chat id'
                    });
                    return;
                }
                if (JSON.stringify(chat.senderId) !== JSON.stringify((_b = (_a = socket.data) === null || _a === void 0 ? void 0 : _a.user) === null || _b === void 0 ? void 0 : _b._id)) {
                    callback({
                        status: 403,
                        message: 'only sender can delete chat',
                        data: {}
                    });
                    return;
                }
                const chatDeleted = yield ChatService_1.default.deleteChat(chat, data.groupId);
                if (!chatDeleted) {
                    callback({
                        status: 500,
                        message: 'Error while deleting chat',
                        data: {}
                    });
                    return;
                }
                const respData = {
                    _id: data.chatId
                };
                callback({
                    status: 200,
                    message: 'Chat deleted Successfully',
                    data: respData
                });
                socket.to(data.groupId).emit('chatAction', {
                    message: 'Chat deleted',
                    data: Object.assign(Object.assign({}, respData), { actionType: 'DELETE', groupId: data.groupId })
                });
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    /**
        * @api {emit} blockUser Block User
        * @apiHeader {String} App-Version Version Code 1.0.0.
        * @apiHeader {String} deviceType 'WEB'|'IOS'|'ANDROID'
        * @apiVersion 1.0.0
        * @apiName block-user
        * @apiGroup App-Chat
        * @apiDescription Event to block user
        * @apiParam {string} groupId
        * @apiParam {string} userId
        * @apiSuccessExample {json} Success-Response:
        *{
        *    "status": 200,
        *    "message": "Blocked successfully",
        *    "data": {
        *        "groupId": "6328426c6efefacb67f3cb60",
        *        "userId": "62e0eabbfb89c4b45de45c5f"
        *    }
        *}
    */
    /**
        * @api {listen} blockAction Block Action
        * @apiHeader {String} App-Version Version Code 1.0.0.
        * @apiHeader {String} deviceType 'WEB'|'IOS'|'ANDROID'
        * @apiVersion 1.0.0
        * @apiName block-action
        * @apiGroup App-Chat
        * @apiDescription listener for block OR unblock user.
        * @apiSuccessExample {json} Success-Response:
        *{
        *    "message": "User blocked",
        *    "data": {
        *        "groupId": "6328426c6efefacb67f3cb60",
        *        "userId": "62e0eabbfb89c4b45de45c5f",
        *        "type": "BLOCKED",
        *        "groupId": "6328426c6efefacb67f3cb60"
        *    }
        *}
        *@apiSuccessExample {json} Success-Response2:
        *{
        *    "message": "User unblocked",
        *    "data": {
        *        "groupId": "6328426c6efefacb67f3cb60",
        *        "userId": "62e0eabbfb89c4b45de45c5f",
        *        "type": "UNBLOCKED",
        *         "groupId": "6328426c6efefacb67f3cb60"
        *    }
        *}
    */
    blockUser(data, socket, callback) {
        var _a, _b, _c;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const group = yield GroupModel_1.default.findById(data.groupId);
                if (!group) {
                    callback({
                        status: 403,
                        message: 'Invalid groupId'
                    });
                    return;
                }
                if (JSON.stringify(group.createdBy) !== JSON.stringify((_b = (_a = socket.data) === null || _a === void 0 ? void 0 : _a.user) === null || _b === void 0 ? void 0 : _b._id)) {
                    callback({
                        status: 403,
                        message: 'Only admin can block a user'
                    });
                    return;
                }
                const isBlocked = yield ChatBlockModel_1.default.findOne({ userId: data.userId, groupId: data.groupId });
                if (isBlocked) {
                    callback({
                        status: 403,
                        message: 'Already blocked'
                    });
                    return;
                }
                const blocked = yield ChatService_1.default.blockUser(data, (_c = socket.data) === null || _c === void 0 ? void 0 : _c.user);
                if (!blocked) {
                    callback({
                        status: 500,
                        message: 'Error while blocking chat'
                    });
                }
                callback({
                    status: 200,
                    message: 'Blocked successfully',
                    data: data
                });
                /* removing all user's sockets from group room */
                yield ChatService_1.default.removeFromRoom(data.userId, data.groupId);
                socket.to(data.groupId).emit('blockAction', {
                    message: 'User blocked',
                    data: Object.assign(Object.assign({}, data), { type: 'BLOCKED', groupId: data.groupId })
                });
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    /**
        * @api {emit} unblockUser Unblock User
        * @apiHeader {String} App-Version Version Code 1.0.0.
        * @apiHeader {String} deviceType 'WEB'|'IOS'|'ANDROID'
        * @apiVersion 1.0.0
        * @apiName unblock-user
        * @apiGroup App-Chat
        * @apiDescription Event to unblock user
        * @apiParam {string} groupId
        * @apiParam {string} userId
        * @apiSuccessExample {json} Success-Response:
        *{
        *    "status": 200,
        *    "message": "User unblocked",
        *    "data": {
        *        "groupId": "6328426c6efefacb67f3cb60",
        *        "userId": "62e0eabbfb89c4b45de45c5f"
        *    }
        *}
    */
    unblockUser(data, socket, callback) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const group = yield GroupModel_1.default.findById(data.groupId);
                if (!group) {
                    callback({
                        status: 403,
                        message: 'Invalid groupId'
                    });
                    return;
                }
                if (JSON.stringify(group.createdBy) !== JSON.stringify((_b = (_a = socket.data) === null || _a === void 0 ? void 0 : _a.user) === null || _b === void 0 ? void 0 : _b._id)) {
                    callback({
                        status: 403,
                        message: 'Only admin can unblock a user'
                    });
                    return;
                }
                const isBlocked = yield ChatBlockModel_1.default.findOne({ userId: data.userId, groupId: data.groupId });
                if (!isBlocked) {
                    callback({
                        status: 403,
                        message: 'User is not blocked'
                    });
                    return;
                }
                const unblocked = yield ChatService_1.default.unblockUser(data);
                if (!unblocked) {
                    callback({
                        status: 500,
                        message: 'Error while unblocking'
                    });
                }
                callback({
                    status: 200,
                    message: 'User unblocked',
                    data
                });
                /* joining user to group room if online */
                yield ChatService_1.default.joinRoom(data.userId, data.groupId);
                socket.to(data.groupId).emit('blockAction', {
                    message: 'User unblocked',
                    data: Object.assign(Object.assign({}, data), { type: 'UNBLOCKED', groupId: data.groupId })
                });
            }
            catch (error) {
                console.log('error', error);
            }
        });
    }
    /**
        * @api {get} /api/v1/app/chat/my-groups?search=VVI&page=1&limit=1 My group List
        * @apiHeader {String} App-Version Version Code 1.0.0.
        * @apiHeader {String} deviceType 'WEB'|'IOS'|'ANDROID'
        * @apiHeader {String} Authorization eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyYmZlMGNmMTdiYmU2ZjY2NzI3MzlmMyIsImVtYWlsIjoiYWRtaW5Ad2VmdW5kdXMuY29tIiwiaWF0IjoxNjU3Njk1MzQzLCJleHAiOjE2NTc3ODE3NDN9.HAJ40QWHuL2QeXo3GVQZKziiiQHbLsq0hyuMM-SgfaY
        * @apiVersion 1.0.0
        * @apiName my-groups-for-messaging
        * @apiGroup App-Chat
        * @apiSuccessExample {json} Success-Response:
        *HTTP/1.1 200 OK
        *{
        *    "status": 200,
        *    "statusText": "SUCCESS",
        *    "message": "My group for messaging fetched successfully",
        *    "data": {
        *        "count": 31,
        *        "list": [
        *            {
        *                "_id": "632464bad64473c39419871b",
        *                "groupIcon": null,
        *                "name": "Fund Raiser for Food",
        *                "createdBy": "62e0eabbfb89c4b45de45c5f",
        *                "totalMembers": 2,
        *                "unreadCount": 0
        *            }
        *        ],
        *        "execTime": 106
        *    }
        *}
        */
    myGroupForMessage(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const page = Number(req.query.page) || 1;
                const limit = Number(req.query.limit) || 10;
                const search = req.query.search;
                console.log('userid', req.user._id);
                const groupData = yield ChatService_1.default.myGroupForChat(req.user, page, limit, search);
                res.logMsg = `*${req.user._id}* fetched my group for message.`;
                return ResponseHelper_1.default.ok(res, res.__('my_groups_for_messaging'), groupData);
            }
            catch (error) {
                next(error);
            }
        });
    }
    /**
        * @api {get} /api/v1/app/chat/join-groups?search=VVI&page=1&limit=1 Join Group List
        * @apiHeader {String} App-Version Version Code 1.0.0.
        * @apiHeader {String} deviceType 'WEB'|'IOS'|'ANDROID'
        * @apiHeader {String} Authorization eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyYmZlMGNmMTdiYmU2ZjY2NzI3MzlmMyIsImVtYWlsIjoiYWRtaW5Ad2VmdW5kdXMuY29tIiwiaWF0IjoxNjU3Njk1MzQzLCJleHAiOjE2NTc3ODE3NDN9.HAJ40QWHuL2QeXo3GVQZKziiiQHbLsq0hyuMM-SgfaY
        * @apiVersion 1.0.0
        * @apiName Join-groups-for-chat
        * @apiGroup App-Chat
        * @apiSuccessExample {json} Success-Response:
        *HTTP/1.1 200 OK
        *{
        *    "status": 200,
        *    "statusText": "SUCCESS",
        *    "message": "Join group for chat fetched successfully",
        *    "data": {
        *        "count": 38,
        *        "list": [
        *            {
        *                "_id": "6328426c6efefacb67f3cb60",
        *                "groupIcon": "group-icons/1663936354301-/6721AB1A-B66F-4432-9F91-938C08F5958E.jpg",
        *                "name": "Kamalgroupdbdndnndndndndndndnd",
        *                "createdBy": "62da9963b647612af2d9b831",
        *                "totalMembers": 3,
        *                "unreadCount": 0
        *            }
        *        ],
        *        "execTime": 122
        *    }
        *}
        */
    joinGroupForChat(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const page = Number(req.query.page) || 1;
                const limit = Number(req.query.limit) || 10;
                const search = req.query.search;
                // console.log('userid', req.user._id);
                const groupData = yield ChatService_1.default.joinGroupForChat(req.user, page, limit, search);
                res.logMsg = `*${req.user._id}* fetched join group for chat.`;
                return ResponseHelper_1.default.ok(res, res.__('join_group_for_chat'), groupData);
            }
            catch (error) {
                next(error);
            }
        });
    }
    /**
        * @api {get} /api/v1/app/chat/history/6328426c6efefacb67f3cb60?limit=10&lt=2022-10-20T07:17:55.922Z&gt=2022-10-19T05:55:04.368Z Chat History
        * @apiHeader {String} App-Version Version Code 1.0.0.
        * @apiHeader {String} deviceType 'WEB'|'IOS'|'ANDROID'
        * @apiHeader {String} Authorization eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyYmZlMGNmMTdiYmU2ZjY2NzI3MzlmMyIsImVtYWlsIjoiYWRtaW5Ad2VmdW5kdXMuY29tIiwiaWF0IjoxNjU3Njk1MzQzLCJleHAiOjE2NTc3ODE3NDN9.HAJ40QWHuL2QeXo3GVQZKziiiQHbLsq0hyuMM-SgfaY
        * @apiVersion 1.0.0
        * @apiName chat-history
        * @apiGroup App-Chat
        * @apiParam {Number} limit
        * @apiParam {String} [lt] createdAt field of chat before which you want chats.
        * @apiParam {String} [gt] createdAt field of chat after which you want chats.
        * @apiDescription send group _id in params. if no lt and gt provided chat list will be latest on top. send only lt OR gt (one at a time).
        * @apiSuccessExample {json} Success-Response:
        *{
        *    "status": 200,
        *    "statusText": "SUCCESS",
        *    "message": "Chat history fecthed successfully",
        *    "data": {
        *        "count": 17,
        *        "list": [
        *            {
        *                "_id": "6350f62318a3ac1c1217457c",
        *                "createdAt": "2022-10-20T07:17:55.922Z",
        *                "updatedAt": "2022-10-20T07:17:55.922Z",
        *                "message": {
        *                    "_id": "6350f62318a3ac1c1217457a",
        *                    "text": "this.is test msg",
        *                    "messageType": 1
        *                },
        *                "sender": {
        *                    "_id": "62da9963b647612af2d9b831",
        *                    "name": "Kamal kamal chauhan"
        *                }
        *            }
        *        ],
        *        "isBlocked": true,
        *        "execTime": 112
        *    }
        *}        */
    chatHistory(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const limit = Number(req.query.limit) || 10;
                const groupId = req.params.id;
                const lt = req.query.lt || '';
                const gt = req.query.gt || '';
                let isBlocked = false;
                let isMember = true;
                const blockData = yield ChatBlockModel_1.default.findOne({ groupId, userId: req.user._id });
                const groupMember = yield GroupMemberModel_1.default.findOne({
                    group: groupId,
                    member: req.user._id,
                    isDeleted: false
                });
                console.log('blocked', blockData);
                console.log('groupMember', groupMember);
                if (blockData)
                    isBlocked = true;
                if (groupMember && groupMember.isLeft)
                    isMember = false;
                if (groupMember && groupMember.isRemoved)
                    isMember = false;
                const groupData = yield ChatService_1.default.chatHistory(groupId, limit, gt, lt, blockData);
                res.logMsg = `*${req.user._id}* fetched chat history of group *${groupId}*`;
                return ResponseHelper_1.default.ok(res, res.__('chat_history'), Object.assign(Object.assign({}, groupData), { isBlocked, isMember }));
            }
            catch (error) {
                next(error);
            }
        });
    }
    /**
        * @api {get} /api/v1/app/chat/group-members/6328426c6efefacb67f3cb60?page=1&limit=1 Chat Group Members
        * @apiHeader {String} App-Version Version Code 1.0.0.
        * @apiHeader {String} deviceType 'WEB'|'IOS'|'ANDROID'
        * @apiHeader {String} Authorization eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyYmZlMGNmMTdiYmU2ZjY2NzI3MzlmMyIsImVtYWlsIjoiYWRtaW5Ad2VmdW5kdXMuY29tIiwiaWF0IjoxNjU3Njk1MzQzLCJleHAiOjE2NTc3ODE3NDN9.HAJ40QWHuL2QeXo3GVQZKziiiQHbLsq0hyuMM-SgfaY
        * @apiVersion 1.0.0
        * @apiName chat-group-members
        * @apiGroup App-Chat
        * @apiParam {String} groupId _id of group in params.
        * @apiSuccessExample {json} Success-Response:
        *HTTP/1.1 200 OK
        *{
        *    "status": 200,
        *    "statusText": "SUCCESS",
        *    "message": "Group member list",
        *    "data": {
        *        "count": 3,
        *        "list": [
        *            {
        *                "_id": "6328426d6efefacb67f3cb63",
        *                "isChatBlocked": false,
        *                "user": {
        *                    "_id": "62da9963b647612af2d9b831",
        *                    "avatar": "user-profiles/1665807921587-/6f27e7dc-025b-47eb-b1a9-d23d8739e14c.jpg",
        *                    "name": "Kamal kamal chauhan"
        *                },
        *                "groupId": "6328426c6efefacb67f3cb60"
        *            }
        *        ],
        *        "page": 1,
        *        "limit": 1,
        *        "execTime": 170
        *    }
        *}
        */
    chatGroupMembers(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const page = Number(req.query.page) || 1;
                const limit = Number(req.query.limit) || 10;
                const groupId = req.params.id;
                const group = yield GroupModel_1.default.findById(groupId);
                if (!group)
                    return ResponseHelper_1.default.badRequest(res, res.__('invalid_groupId'));
                const grpMembersData = yield ChatService_1.default.chatGroupMembers(group, page, limit);
                res.logMsg = `Fetched group *${groupId}* members`;
                return ResponseHelper_1.default.ok(res, res.__('Group_Member_list'), Object.assign(Object.assign({}, grpMembersData), { page, limit }));
            }
            catch (error) {
                next(error);
            }
        });
    }
    /**
        * @api {emit} reportChat Report Chat
        * @apiHeader {String} App-Version Version Code 1.0.0.
        * @apiHeader {String} deviceType 'WEB'|'IOS'|'ANDROID'
        * @apiVersion 1.0.0
        * @apiName report-chat
        * @apiGroup App-Chat
        * @apiPrivate
        * @apiDescription Event to report chat
        * @apiParam {string} groupId
        * @apiParam {string} senderId
        * @apiParam {string} messageText
        * @apiParam {string} messageId
        * @apiParam {String} reasonText
        * @apiParamExample {json} param-example:
        *{
        *"groupId": "6328426c6efefacb67f3cb60",
        *"senderId": "62da9963b647612af2d9b831",
        *"messageText": "this is test",
        *"messageId": "635a59a38333b1c82f861ee1"
        * "reasonText": "test reason"
        *}
        * @apiSuccessExample {json} Success-Response:
        *{
        *    "status": 201,
        *    "message": "Chat reported Successfully",
        *    "data": {}
        *}
    */
    reportChat(data, socket, callback) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield ChatReportModel_1.default.create({
                    groupId: data.groupId,
                    reportedUser: data.senderId,
                    reportedBy: (_b = (_a = socket.data) === null || _a === void 0 ? void 0 : _a.user) === null || _b === void 0 ? void 0 : _b._id,
                    reportType: ChatReportInterface_1.reportType.chat,
                    chatText: data.messageText,
                    messageId: data.messageId,
                    reasonText: data.reasonText
                });
                callback({
                    status: 201,
                    message: 'Chat reported Successfully',
                    data: {}
                });
            }
            catch (error) {
                console.log('error', error);
            }
        });
    }
    /* We are using this api to remove user from socket room when user removed from group. */
    blockUserForRemoval(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { userId, groupId } = req.body;
                yield ChatService_1.default.removeFromRoom(userId, groupId);
                return ResponseHelper_1.default.ok(res, res.__('removed_user'), {});
            }
            catch (error) {
                next(error);
            }
        });
    }
    /**
        * @api {get} /api/v1/app/chat/report-reason-list Chat report reason list
        * @apiHeader {String} App-Version Version Code 1.0.0.
        * @apiHeader {String} deviceType 'WEB'|'IOS'|'ANDROID'
        * @apiHeader {String} Authorization eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyYmZlMGNmMTdiYmU2ZjY2NzI3MzlmMyIsImVtYWlsIjoiYWRtaW5Ad2VmdW5kdXMuY29tIiwiaWF0IjoxNjU3Njk1MzQzLCJleHAiOjE2NTc3ODE3NDN9.HAJ40QWHuL2QeXo3GVQZKziiiQHbLsq0hyuMM-SgfaY
        * @apiVersion 1.0.0
        * @apiName chat-report-reasons
        * @apiGroup App-Chat
        * @apiSuccessExample {json} Success-Response:
        *
        * {
        *        "status": 200,
        *        "statusText": "SUCCESS",
        *        "message": "Chat report reasons",
        *        "data": {
        *            "list": [
        *                {
        *                    "_id": "64008c8bf9eab9087af6fb99",
        *                    "reportReason": "Voluptatum natus explicabo consequatur odio facere quisquam.",
        *                    "reportType": 3,
        *                    "isActive": false,
        *                    "__v": 0,
        *                    "createdAt": "2023-03-02T11:46:19.065Z",
        *                    "updatedAt": "2023-03-02T11:46:19.065Z"
        *                }
        *            ],
        *            "execTime": 96
        *        }
        *    }
        *
        * */
    chatReportReasonList(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const list = yield ReportReasonModel_1.default.find({ reportType: ReportReasonInterface_1.ReportType.Chat, isActive: true });
                res.logMsg = 'Chat report reason list fetched successfully';
                return ResponseHelper_1.default.ok(res, res.__('chat_report_reasons'), { list });
            }
            catch (error) {
                next(error);
            }
        });
    }
    /**
        * @api {post} /api/v1/app/chat/report Chat report By user
        * @apiHeader {String} App-Version Version Code 1.0.0.
        * @apiHeader {String} deviceType 'WEB'|'IOS'|'ANDROID'
        * @apiHeader {String} Authorization eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyYmZlMGNmMTdiYmU2ZjY2NzI3MzlmMyIsImVtYWlsIjoiYWRtaW5Ad2VmdW5kdXMuY29tIiwiaWF0IjoxNjU3Njk1MzQzLCJleHAiOjE2NTc3ODE3NDN9.HAJ40QWHuL2QeXo3GVQZKziiiQHbLsq0hyuMM-SgfaY
        * @apiVersion 1.0.0
        * @apiName chat-report
        * @apiGroup App-Chat
        *
        * @apiParam {string} groupId
        * @apiParam {string} senderId
        * @apiParam {string} messageText
        * @apiParam {string} messageId
        * @apiParam {String} reasonText
        *
        * @apiParamExample {json} Request-Body
        * {
        *   "groupId": "6328426c6efefacb67f3cb60",
        *   "senderId": "62da9963b647612af2d9b831",
        *   "messageText": "this is test",
        *   "messageId": "635a59a38333b1c82f861ee1"
        *   "reasonText": "test reason"
        * }
        *
        * @apiSuccessExample {json} Success-Response:
        *
        *  {
        *        "status": 200,
        *        "statusText": "SUCCESS",
        *        "message": "Chat reported Successfully",
        *        "data": {
        *            "execTime": 96
        *        }
        *    }
        * */
    chatReportByUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = req.user;
                const data = {
                    groupId: req.body.groupId,
                    reportedUser: req.body.senderId,
                    reportedBy: user === null || user === void 0 ? void 0 : user._id,
                    chatText: req.body.messageText,
                    messageId: req.body.messageId,
                    reasonText: req.body.reasonText
                };
                if (`${data.reportedBy}` !== `${data.reportedUser}`) {
                    yield ChatReportModel_1.default.create(data);
                }
                res.logMsg = `Chat report successfully`;
                return ResponseHelper_1.default.ok(res, res.__('chat_reported'), {});
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.default = new ChatController();
