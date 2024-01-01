import { Document, ObjectId } from 'mongoose';
/**
 * Interface for group.
 * @interface
 */
export interface GroupInterface extends Document {
    _id?: ObjectId | string;
    groupIcon?: string;
    groupCode: string;
    name: string;
    purposeId?: ObjectId | string;
    purposeText?: string;
    description: string;
    goalInterval: GoalInterval;
    goalPrice: number;
    showContactInfo?: boolean;
    phoneNumber: string;
    countryCode: string;
    email: string;
    address: string;
    city: string;
    country: string;
    state: string;
    zipCode: string;
    showSocialInfo?: boolean;
    facebookUrl?: string;
    twitterUrl?: string;
    others?: boolean;
    purpose?: string;
    members?: (ObjectId | string)[];
    createdBy: ObjectId;
    totalMembers?: number;
    totalSubgroup?: number;
    subGroupLimit?: number;
    isDeleted?: boolean;
    groupSubscribed: boolean;
    subGroupSubscribed: boolean;
    isVerifiedByAdmin?: boolean;
    isActive?: boolean;
    cashbackScheme?: number;
    stripeCustomerId?: string;
    groupSubscriptionExpiresAt?: Date;
    lat?: number;
    lng?: number;
    location?: {
        locationType: string;
        coordinates: number[];
    };
}
export declare enum GoalInterval {
    daily = 1,
    weekly = 2,
    yearly = 3,
    monthly = 4
}
