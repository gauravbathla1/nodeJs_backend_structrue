import { NextFunction } from "express";
import { ReqInterface, ResInterface } from "../../interfaces/ReqInterface";
declare class ReportReasonValidator {
    add(req: ReqInterface, res: ResInterface, next: NextFunction): Promise<void>;
}
declare const _default: ReportReasonValidator;
export default _default;
