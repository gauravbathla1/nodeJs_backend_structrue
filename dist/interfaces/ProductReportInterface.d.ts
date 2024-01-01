import { Document, ObjectId } from 'mongoose';
export interface ProductReportInterface extends Document {
    _id?: ObjectId;
    userId: ObjectId;
    productId: ObjectId;
    reasonId: ObjectId;
    reasonText: string;
}
