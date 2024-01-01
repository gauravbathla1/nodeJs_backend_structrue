import { Document, ObjectId } from 'mongoose';
export interface GroupPurposeInterface extends Document {
    _id?: ObjectId | string;
    text: string;
    isActive: boolean;
}
