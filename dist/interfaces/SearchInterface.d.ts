import { Document, ObjectId } from 'mongoose';
export interface SearchInterface extends Document {
    _id: ObjectId | string;
    title: string;
    icon: string;
    belongsTo: number;
    categorySlug: string;
    subcategorySlug: string;
    sectionSlug: string;
    productSlug: string;
    categoryId: ObjectId | string;
    subcategoryId: ObjectId | string;
    sectionId: ObjectId | string;
    queryKey: 'categorySlug' | 'subcategorySlug' | 'productSlug' | 'sectionSlug';
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}
