import { NextFunction } from "express";
import { ReqInterface, ResInterface } from "../../interfaces/ReqInterface";
declare class ReviewValidator {
    addReview(req: ReqInterface, res: ResInterface, next: NextFunction): Promise<void>;
    editReview(req: ReqInterface, res: ResInterface, next: NextFunction): Promise<void>;
}
declare const _default: ReviewValidator;
export default _default;
