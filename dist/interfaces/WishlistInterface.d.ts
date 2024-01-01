import { Document, ObjectId } from 'mongoose';
/**
 * Interface that represent Wishlist
 * @interface
 */
export interface WishlistInterface extends Document {
    _id?: ObjectId;
    userId: ObjectId;
    productId: ObjectId;
    createdAt: Date;
    updateAt: Date;
}
