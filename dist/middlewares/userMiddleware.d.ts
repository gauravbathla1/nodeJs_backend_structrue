import { NextFunction } from "express";
import { ReqInterface, ResInterface } from "../interfaces/ReqInterface";
declare class UserMiddleware {
    checkUser(req: ReqInterface, res: ResInterface, next: NextFunction): Promise<void>;
}
declare const _default: UserMiddleware;
export default _default;
