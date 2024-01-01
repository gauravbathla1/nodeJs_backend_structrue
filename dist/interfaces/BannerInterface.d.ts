import { Document, ObjectId } from 'mongoose';
export interface BannerInterface extends Document {
    _id?: ObjectId;
    clickUrl: string;
    photo: string;
    isActive: Boolean;
    isDeleted: Boolean;
    deviceType: String;
}
