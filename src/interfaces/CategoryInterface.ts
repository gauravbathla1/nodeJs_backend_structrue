import { Document } from 'mongoose';

/**
 * Interface that represent User
 * @interface
 */
export interface categoryInterface extends Document {
    name: string;
    isActive:Boolean;
    isDeleted:Boolean;
}