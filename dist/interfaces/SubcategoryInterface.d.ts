import { Document, ObjectId } from 'mongoose';
export interface SubCategoryInterface extends Document {
    _id?: ObjectId | string;
    category: ObjectId | string;
    name: string;
    image: string;
    slug: string;
    categorySlug: string;
    categoryName: string;
    isActive: Boolean;
    isDeleted: Boolean;
}
