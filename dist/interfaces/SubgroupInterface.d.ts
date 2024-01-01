import { Document, ObjectId } from 'mongoose';
export interface SubgroupInterface extends Document {
    name: string;
    _id?: ObjectId | string;
    groupId: ObjectId | string;
    groupName: string;
    description: string;
    icon: string;
    isDeleted?: boolean;
    totalMember?: number;
    memberLimit: number;
    createdBy?: ObjectId;
    members?: (ObjectId | string)[];
}
