import { DeviceType } from 'aws-sdk/clients/ec2';
import { Document, ObjectId } from 'mongoose';
export interface SessionInterface extends Document {
    _id?: ObjectId | string;
    user: ObjectId | string;
    isActive: boolean;
    deviceType: DeviceType;
    deviceToken?: string;
    deviceId?: string;
    deviceName: string;
    createdAt: Date;
}
