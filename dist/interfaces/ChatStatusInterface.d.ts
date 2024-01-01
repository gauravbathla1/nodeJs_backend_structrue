import { Document, ObjectId } from 'mongoose';
export interface ChatStatusInterface extends Document {
    _id?: ObjectId | string;
    groupId: ObjectId;
    userId: ObjectId;
    lastChatId: ObjectId;
    status: chatStatus;
    isDeleted: boolean;
    createdAt: Date;
    updatedAt: Date;
}
export declare enum chatStatus {
    sent = 1,
    delivered = 2,
    seen = 3
}
