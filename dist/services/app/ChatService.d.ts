import { ObjectId } from 'mongoose';
import { MessageInterface } from "../../interfaces/MessageInterface";
import { ChatInterface } from "../../interfaces/ChatInterface";
import { Socket } from "socket.io";
import { UserInterface } from "../../interfaces/UserInterface";
import { blockData } from "../../controllers/app/ChatController";
import { GroupInterface } from "../../interfaces/GroupInterface";
import { ChatBlockInterface } from "../../interfaces/ChatBlockInterface";
declare class ChatService {
    createMessage(text: string, type: number, creator: string | ObjectId): Promise<MessageInterface>;
    createChat(groupId: string, messageId: string | ObjectId, senderId: string | ObjectId): Promise<ChatInterface>;
    joinAllGroup(userId: string | ObjectId, socket: Socket): Promise<boolean>;
    myGroupForChat(user: UserInterface, page: number, limit: number, searchText?: string): Promise<{
        count: number;
        list: any;
    }>;
    joinGroupForChat(user: UserInterface, page: number, limit: number, search: string): Promise<{
        count: number;
        list: any[];
    }>;
    chatHistory(groupId: string, limit: number, gt: string, lt: string, blockData?: ChatBlockInterface): Promise<{
        count: number;
        list: any[];
    }>;
    deleteChat(chat: ChatInterface, groupId: string): Promise<boolean>;
    blockUser(blockData: blockData, user: UserInterface): Promise<boolean>;
    unblockUser(data: blockData): Promise<boolean>;
    private chatStatusRollback;
    chatGroupMembers(group: GroupInterface, page: number, limit: number): Promise<{
        count: number;
        list: any[];
    }>;
    removeFromRoom(userId: ObjectId | string, groupId: string): Promise<boolean>;
    joinRoom(userId: ObjectId | string, groupId: string): Promise<boolean>;
}
declare const _default: ChatService;
export default _default;
