import { Document, ObjectId } from 'mongoose';

/**
 * Interface that represent User
 * @interface
 */
export interface UserInterface extends Document {
    // _id?: ObjectId;
    email: string;
    password: string;
    name: string;
    isEmailVerified: boolean;
    currentDeviceToken: string;
    currentDeviceId: string;
    profilePic: string;
    isAccountActive: boolean;
    currentDeviceType: DeviceType;
    firstName: string;
    lastName: string;
    avatar: string;
    accountNumber: string;
    paypalEmail: string;
    description: string;
    displayName: string;
    facebookProfileUrl: string;
    linkedinProfileUrl: string;
    twitterUsername: string;
    instagramUsername: string;
    lastLogin: Date;
    createdAt: Date,
    updateAt: Date,
    passwordChangedAt: Date;
    deviceInfo: DeviceInfo[];
    changedEmail: string;
    customerCode: string;
    isCompleted: boolean;
    isDeleted: boolean;
    groups: (ObjectId | string)[];
    groupId: ObjectId | string;
    isWalletCreated?: boolean;
    subscriptionStatus?: boolean;
    stripeConnectedAccountId?: string
}


/**
 *  Interface for that represent Device Info.
 * @interface
 */
interface DeviceInfo {
    deviceId: string;
    deviceToken: string;
    deviceType: DeviceType;
}


export enum DeviceType {
    web = 'WEB',
    ios = 'IOS',
    android = 'ANDROID'
}