import { NextFunction } from "express";
import { ReqInterface, ResInterface } from "../../interfaces/ReqInterface";
declare class UserController {
    getDashBoardData(req: ReqInterface, res: ResInterface, next: NextFunction): Promise<void>;
    getUserList(req: ReqInterface, res: ResInterface, next: NextFunction): Promise<void>;
    updateUserStats(req: ReqInterface, res: ResInterface, next: NextFunction): Promise<void>;
}
declare const _default: UserController;
export default _default;
