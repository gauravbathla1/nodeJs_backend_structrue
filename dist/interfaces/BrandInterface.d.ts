import { Document, ObjectId } from 'mongoose';
export interface BrandInterface extends Document {
    _id?: ObjectId | string;
    name: string;
    categories: ObjectId[] | string[];
    isActive: boolean;
    slug: string;
    createdAt: Date;
    updateAt: Date;
    isDeleted: boolean;
    logo: string;
    timeStamp: number;
}
