import { Document, ObjectId } from 'mongoose';
/**
 * Interface that represent RecentSearch
 * @interface
 */
export interface RecentSearchInterface extends Document {
    _id?: ObjectId | string;
    userId: ObjectId | string;
    searchText: string;
    createdAt: Date;
    updateAt: Date;
}
