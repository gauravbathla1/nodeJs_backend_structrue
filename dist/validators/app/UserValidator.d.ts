import { NextFunction } from "express";
import { ReqInterface, ResInterface } from "../../interfaces/ReqInterface";
declare class UserValidator {
    profile(req: ReqInterface, res: ResInterface, next: NextFunction): Promise<void>;
    updateSocial(req: ReqInterface, res: ResInterface, next: NextFunction): Promise<void>;
    verifyEmail(req: ReqInterface, res: ResInterface, next: NextFunction): Promise<void>;
    changePassword(req: ReqInterface, res: ResInterface, next: NextFunction): Promise<void>;
}
declare const _default: UserValidator;
export default _default;
