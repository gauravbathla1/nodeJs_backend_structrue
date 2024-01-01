import { Document, ObjectId } from 'mongoose';
export interface GroupRequestInterface extends Document {
    _id?: string | ObjectId;
    groupId?: string | ObjectId;
    userId?: string | ObjectId;
    groupCode: string;
    status: GroupRequestStatus;
    createdAt: Date;
    updatedAt: Date;
}
export declare enum GroupRequestStatus {
    pending = 1,
    accepted = 2,
    rejected = 3
}
