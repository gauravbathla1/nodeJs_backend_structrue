import { NextFunction } from 'express';
import { ReqInterface, ResInterface } from '../../interfaces/ReqInterface';
declare class BannerValidator {
    add(req: ReqInterface, res: ResInterface, next: NextFunction): Promise<void>;
}
declare const _default: BannerValidator;
export default _default;
