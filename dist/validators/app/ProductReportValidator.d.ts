import { NextFunction } from "express";
import { ReqInterface, ResInterface } from "../../interfaces/ReqInterface";
declare class ProductReportValidator {
    productReport(req: ReqInterface, res: ResInterface, next: NextFunction): Promise<void>;
}
declare const _default: ProductReportValidator;
export default _default;
