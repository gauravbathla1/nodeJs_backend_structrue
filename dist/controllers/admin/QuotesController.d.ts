import { NextFunction } from "express";
import { ReqInterface, ResInterface } from "../../interfaces/ReqInterface";
declare class QuotesController {
    createQuote(req: ReqInterface, res: ResInterface, next: NextFunction): Promise<void>;
    editQuote(req: ReqInterface, res: ResInterface, next: NextFunction): Promise<void>;
    deleteQuote(req: ReqInterface, res: ResInterface, next: NextFunction): Promise<void>;
    getQuotes(req: ReqInterface, res: ResInterface, next: NextFunction): Promise<void>;
}
declare const _default: QuotesController;
export default _default;
