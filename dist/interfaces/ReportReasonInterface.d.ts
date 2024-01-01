import { Document, ObjectId } from 'mongoose';
/**
 * Interface that represent Report Reason Group User Chat Description
 * @interface
 */
export interface ReportReasonInterface extends Document {
    _id?: ObjectId | string;
    reportReason: string;
    reportType: string;
    isActive: boolean;
    createdAt: Date;
    updateAt: Date;
}
export declare enum ReportType {
    Group = 1,
    User = 2,
    Chat = 3
}
export interface ReportInterface extends Document {
    _id?: ObjectId | string;
    reportReason: string;
    reportedTo: ObjectId | string;
    reportedBy: ObjectId | string;
    reportType: ReportType;
    createdAt: Date;
    updateAt: Date;
}
