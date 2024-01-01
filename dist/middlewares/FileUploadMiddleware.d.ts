import { NextFunction } from 'express';
import { ReqInterface, ResInterface } from '../interfaces/ReqInterface';
declare class UploadFiles {
    upload(req: ReqInterface, res: ResInterface, next: NextFunction): Promise<void>;
}
declare const _default: UploadFiles;
export default _default;
