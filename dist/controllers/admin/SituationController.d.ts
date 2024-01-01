import { NextFunction } from "express";
import { ReqInterface, ResInterface } from "../../interfaces/ReqInterface";
declare class SituationContoller {
    createSituation(req: ReqInterface, res: ResInterface, next: NextFunction): Promise<void>;
    editSituation(req: ReqInterface, res: ResInterface, next: NextFunction): Promise<void>;
    deleteSituation(req: ReqInterface, res: ResInterface, next: NextFunction): Promise<void>;
    getSituation(req: ReqInterface, res: ResInterface, next: NextFunction): Promise<void>;
    uploadImage(req: ReqInterface, res: ResInterface, next: NextFunction): Promise<ResInterface>;
}
declare const _default: SituationContoller;
export default _default;
