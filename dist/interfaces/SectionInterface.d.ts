import { Document, ObjectId } from 'mongoose';
export interface SectionInterface extends Document {
    _id?: ObjectId | string;
    category: ObjectId | string;
    subcategory: ObjectId | string;
    name: string;
    image: string;
    slug: string;
    categorySlug: string;
    subcategorySlug: string;
    categoryName: string;
    subcategoryName: string;
    isActive: Boolean;
    isDeleted: Boolean;
}
