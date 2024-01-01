import { NextFunction } from "express";
import { ReqInterface, ResInterface } from "../../interfaces/ReqInterface";
declare class SectionValidator {
    add(req: ReqInterface, res: ResInterface, next: NextFunction): Promise<void>;
}
declare const _default: SectionValidator;
export default _default;
