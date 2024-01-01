import { Document, Types } from 'mongoose';
export interface ChatReportInterface extends Document {
    groupId: Types.ObjectId;
    reportedBy: Types.ObjectId;
    reportedUser: Types.ObjectId;
    reportType: reportType;
    chatText?: String;
    reasonText?: String;
    messageId?: Types.ObjectId;
}
export declare enum reportType {
    chat = 1,
    individual = 2
}
