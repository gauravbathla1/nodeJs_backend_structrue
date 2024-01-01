import { NextFunction } from "express";
import { ReqInterface, ResInterface } from "../../interfaces/ReqInterface";
declare class CartValidator {
    add(req: ReqInterface, res: ResInterface, next: NextFunction): Promise<void>;
}
declare const _default: CartValidator;
export default _default;
