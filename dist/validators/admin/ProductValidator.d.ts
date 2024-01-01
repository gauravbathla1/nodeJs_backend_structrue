import { NextFunction } from 'express';
import { ReqInterface, ResInterface } from '../../interfaces/ReqInterface';
declare class ProductValidator {
    add(req: ReqInterface, res: ResInterface, next: NextFunction): Promise<void>;
}
declare const _default: ProductValidator;
export default _default;
