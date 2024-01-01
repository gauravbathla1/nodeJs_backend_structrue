import { Document } from 'mongoose';
/**
 * Interface that represent User
 * @interface
 */
export interface SpeakerInterface extends Document {
    name: string;
    title: string;
    companyName: string;
    isActive: boolean;
    profilePic: string;
    lastLogin: Date;
    createdAt: Date;
    updateAt: Date;
}
