import { NextFunction } from 'express';
import { ReqInterface, ResInterface } from '../../interfaces/ReqInterface';
declare class BrandValidator {
    addBrand(req: ReqInterface, res: ResInterface, next: NextFunction): Promise<void>;
    editBrand(req: ReqInterface, res: ResInterface, next: NextFunction): Promise<void>;
}
declare const _default: BrandValidator;
export default _default;
