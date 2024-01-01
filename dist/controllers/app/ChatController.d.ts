import { NextFunction } from "express";
import { Socket } from "socket.io";
import { ReqInterface, ResInterface } from "../../interfaces/ReqInterface";
declare class ChatController {
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
    sendMessage(data: SendMessageData, socket: Socket, callback: any): Promise<void>;
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
    changeChatStatus(data: chatStatusData, socket: Socket, callback: any): Promise<void>;
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
    editChat(data: editChat, socket: Socket, callback: any): Promise<void>;
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
    deleteChat(data: deleteChat, socket: Socket, callback: any): Promise<void>;
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
    blockUser(data: blockData, socket: Socket, callback: any): Promise<void>;
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
    unblockUser(data: blockData, socket: Socket, callback: any): Promise<void>;
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
    myGroupForMessage(req: ReqInterface, res: ResInterface, next: NextFunction): Promise<void>;
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
    joinGroupForChat(req: ReqInterface, res: ResInterface, next: NextFunction): Promise<void>;
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
    chatHistory(req: ReqInterface, res: ResInterface, next: NextFunction): Promise<void>;
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
    chatGroupMembers(req: ReqInterface, res: ResInterface, next: NextFunction): Promise<void>;
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
    reportChat(data: reportData, socket: Socket, callback: any): Promise<void>;
    blockUserForRemoval(req: ReqInterface, res: ResInterface, next: NextFunction): Promise<void>;
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
    chatReportReasonList(req: ReqInterface, res: ResInterface, next: NextFunction): Promise<void>;
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
    chatReportByUser(req: ReqInterface, res: ResInterface, next: NextFunction): Promise<void>;
}
export declare type blockData = {
    userId: string;
    groupId: string;
};
export declare type reportData = {
    groupId: string;
    senderId: string;
    messageText: string;
    messageId: string;
    reasonText: string;
};
export declare type SendMessageData = {
    groupId: string;
    message: string;
    type: number;
};
export declare type deleteChat = {
    chatId: string;
    groupId: string;
};
export declare type editChat = {
    chatId: string;
    messageId: string;
    message: string;
    groupId: string;
};
export declare type chatStatusData = {
    groupId: string;
    lastChatId: string;
    status: number;
};
declare const _default: ChatController;
export default _default;
