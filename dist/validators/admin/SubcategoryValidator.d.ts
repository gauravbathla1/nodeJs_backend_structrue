import { NextFunction } from 'express';
import { ReqInterface, ResInterface } from '../../interfaces/ReqInterface';
declare class SubcategoryValidator {
    add(req: ReqInterface, res: ResInterface, next: NextFunction): Promise<void>;
    update(req: ReqInterface, res: ResInterface, next: NextFunction): Promise<void>;
}
declare const _default: SubcategoryValidator;
export default _default;
