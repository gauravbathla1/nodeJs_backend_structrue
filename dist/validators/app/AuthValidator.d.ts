import { ResInterface, ReqInterface } from '../../interfaces/ReqInterface';
import { NextFunction } from 'express';
declare class AuthValidator {
    signup(req: ReqInterface, res: ResInterface, next: NextFunction): Promise<void>;
    login(req: ReqInterface, res: ResInterface, next: NextFunction): Promise<void>;
    forgotPassword(req: ReqInterface, res: ResInterface, next: NextFunction): Promise<void>;
    resendVerification(req: ReqInterface, res: ResInterface, next: NextFunction): Promise<void>;
    resetPassword(req: ReqInterface, res: ResInterface, next: NextFunction): Promise<void>;
}
declare const _default: AuthValidator;
export default _default;
