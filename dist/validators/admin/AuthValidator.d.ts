import { NextFunction } from 'express';
import { ReqInterface, ResInterface } from '../../interfaces/ReqInterface';
declare class AuthValidator {
    login(req: ReqInterface, res: ResInterface, next: NextFunction): Promise<void>;
    socialLogin(req: ReqInterface, res: ResInterface, next: NextFunction): Promise<void>;
    guestLogin(req: ReqInterface, res: ResInterface, next: NextFunction): Promise<void>;
    changePassword(req: ReqInterface, res: ResInterface, next: NextFunction): Promise<void>;
    forgotPassword(req: ReqInterface, res: ResInterface, next: NextFunction): Promise<void>;
    verifyLinkVal(req: ReqInterface, res: ResInterface, next: NextFunction): Promise<void>;
}
declare const _default: AuthValidator;
export default _default;
