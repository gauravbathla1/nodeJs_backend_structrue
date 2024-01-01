import { NextFunction } from "express";
import { ReqInterface, ResInterface } from "../../interfaces/ReqInterface";
declare class AuthController {
    login(req: ReqInterface, res: ResInterface, next: NextFunction): Promise<void>;
    changePassword(req: ReqInterface, res: ResInterface, next: NextFunction): Promise<void>;
    forgetPassword(req: ReqInterface, res: ResInterface, next: NextFunction): Promise<void>;
    verifyLink(req: ReqInterface, res: ResInterface, next: NextFunction): Promise<void>;
    resetPassword(req: ReqInterface, res: ResInterface, next: NextFunction): Promise<void>;
}
declare const _default: AuthController;
export default _default;
