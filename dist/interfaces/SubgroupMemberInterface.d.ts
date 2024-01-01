import { Document, ObjectId } from 'mongoose';
export interface SubgroupMemberInterface extends Document {
    _id?: ObjectId | string;
    subgroupId: ObjectId;
    groupId: ObjectId;
    memberId: ObjectId;
    isAdmin?: boolean;
    isDeleted?: boolean;
}
