import { NextFunction } from "express";
import { ReqInterface, ResInterface } from "../../interfaces/ReqInterface";
declare class TechniqueContoller {
    createTechnique(req: ReqInterface, res: ResInterface, next: NextFunction): Promise<void>;
    editTechnique(req: ReqInterface, res: ResInterface, next: NextFunction): Promise<void>;
    deleteTechnique(req: ReqInterface, res: ResInterface, next: NextFunction): Promise<void>;
    getTechnique(req: ReqInterface, res: ResInterface, next: NextFunction): Promise<void>;
}
declare const _default: TechniqueContoller;
export default _default;
