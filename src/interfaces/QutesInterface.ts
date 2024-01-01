import { Document } from 'mongoose';

/**
 * Interface that represent User
 * @interface
 */
export interface quotesInterface extends Document {
    quote: string;
    isActive:Boolean;
    isDeleted:Boolean;
}