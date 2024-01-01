import { NextFunction } from "express";
import { ReqInterface, ResInterface } from "../../interfaces/ReqInterface";
declare class LogoController {
    createLogo(req: ReqInterface, res: ResInterface, next: NextFunction): Promise<void>;
    getAllLogo(req: ReqInterface, res: ResInterface, next: NextFunction): Promise<void>;
    edit(req: ReqInterface, res: ResInterface, next: NextFunction): Promise<void>;
    updateStatus(req: ReqInterface, res: ResInterface, next: NextFunction): Promise<void>;
    updateLogoBannerStatus(req: ReqInterface, res: ResInterface, next: NextFunction): Promise<void>;
}
declare const _default: LogoController;
export default _default;
