import { NextFunction } from 'express';
import { ReqInterface, ResInterface } from '../../interfaces/ReqInterface';
declare class CategoryValidator {
    add(req: ReqInterface, res: ResInterface, next: NextFunction): Promise<void>;
    update(req: ReqInterface, res: ResInterface, next: NextFunction): Promise<void>;
}
declare const _default: CategoryValidator;
export default _default;
