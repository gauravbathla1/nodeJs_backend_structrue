import { Document, ObjectId } from 'mongoose';
export interface ChatInterface extends Document {
    _id?: ObjectId | string;
    groupId: ObjectId;
    messageId: ObjectId;
    senderId: ObjectId;
    isDeleted: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}
