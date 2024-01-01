import { Document, Types } from 'mongoose';
export interface ChatBlockInterface extends Document {
    userId: Types.ObjectId;
    groupId: Types.ObjectId;
    blockedBy: Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
}
