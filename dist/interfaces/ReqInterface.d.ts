import { Request, Response } from 'express';
import { AdminInterface } from './AdminInterface';
import { UserInterface } from './UserInterface';
export interface ReqInterface extends Request {
    startTime: number;
    admin?: AdminInterface;
    user?: UserInterface;
    files?: any;
    deviceType?: string;
}
/**
 * @interface
 *
 */
export interface ResInterface extends Response {
    /**
     * @type {(message: string) => string} translation message
     */
    __: (message: string) => string;
    logMsg: string;
    startTime: number;
    api: string;
    method: string;
    logger: any;
}
