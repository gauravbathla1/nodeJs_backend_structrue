import { Document, ObjectId } from 'mongoose';
export interface GroupInviteInterface extends Document {
    _id?: ObjectId | string;
    email?: string;
    groupCode: string;
    groupId: string | ObjectId;
    invitedBy: string | ObjectId;
    status: GroupInviteStatus;
    createdAt: Date;
    updatedAt: Date;
}
export declare enum GroupInviteStatus {
    invited = 1,
    accepted = 2
}
