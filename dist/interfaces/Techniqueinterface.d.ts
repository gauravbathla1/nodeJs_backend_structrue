import { Document, Types } from 'mongoose';
export interface Technique extends Document {
    techniqueName: string | null;
    image: string | null;
    categoryName: string | null;
    categoryId: Types.ObjectId | null;
    instructionContent: Content;
    whyItWorksContent: Content;
    isActive: boolean;
    isDeleted: boolean;
    createdAt: Date;
    updatedAt: Date;
}
interface Content {
    content: string | null;
    animation: string | null;
}
export {};
