import { Document, ObjectId } from 'mongoose';
export interface ReviewInterface extends Document {
    _id?: ObjectId;
    productId: string;
    rating: number;
    description: string;
    isActive: Boolean;
}
