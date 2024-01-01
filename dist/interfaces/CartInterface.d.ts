import { Document, ObjectId } from 'mongoose';
/**
 * Interface that represent Cart
 * @interface
 */
export interface CartInterface extends Document {
    _id?: ObjectId;
    userId: ObjectId | string;
    productId: ObjectId | string;
    quantity: number;
    attributes: {
        name: string;
        value: string;
    }[];
    color: string;
    createdAt: Date;
    updateAt: Date;
}
