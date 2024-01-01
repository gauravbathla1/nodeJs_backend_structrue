import { Document, ObjectId } from 'mongoose';
export interface ColorInterface extends Document {
    _id?: ObjectId | string;
    name: string;
    code: string;
    createdAt: Date;
    updatedAt: Date;
}
