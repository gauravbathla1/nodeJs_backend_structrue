import { Document, ObjectId } from 'mongoose';
export interface GroupMemberInterface extends Document {
    group: ObjectId;
    member: ObjectId;
    groupCode: string;
    isAdmin?: boolean;
    isMuted?: boolean;
    isLeft?: boolean;
    leftTime?: Date;
    isRemoved?: boolean;
    removedBy?: ObjectId;
    removeTime?: Date;
    isDeleted?: boolean;
    isChatBlocked?: boolean;
    groupRequestStatus?: GroupRequestStatus;
    requestSentBy?: ObjectId | string;
    subgroups?: (ObjectId | string)[];
}
export declare enum GroupRequestStatus {
    pending = 1,
    accepted = 2,
    rejected = 3,
    noRequest = 4
}
