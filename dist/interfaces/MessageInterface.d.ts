import { Document, ObjectId } from 'mongoose';
export interface MessageInterface extends Document {
    _id?: ObjectId | string;
    text: string;
    messageType: messageType;
    creator: ObjectId;
    isDeleted: boolean;
    createdAt: Date;
    updatedAt: Date;
    isEdited: boolean;
    editHistory: EditHistory[];
}
export declare enum messageType {
    text = 1,
    url = 2,
    audio = 3,
    video = 4,
    image = 5
}
export declare type EditHistory = {
    text: string;
    editedAt: Date;
};
