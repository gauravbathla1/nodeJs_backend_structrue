import { NextFunction } from "express";
import { ReqInterface, ResInterface } from "../../interfaces/ReqInterface";
declare class RecentSearchValidator {
    add(req: ReqInterface, res: ResInterface, next: NextFunction): Promise<void>;
}
declare const _default: RecentSearchValidator;
export default _default;
