import { ObjectId, Document } from 'mongoose';
export interface GroupFavoriteInterface extends Document {
    _id?: ObjectId | string;
    groupId: ObjectId | string;
    userId: ObjectId | string;
    createdAt: Date;
    updatedAt: Date;
}
