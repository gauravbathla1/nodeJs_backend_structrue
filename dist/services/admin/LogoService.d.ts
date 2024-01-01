import { NextFunction } from "express";
import { ReqInterface } from "../../interfaces/ReqInterface";
import { LogoInterface } from "../../interfaces/Logointerface";
declare class LogoService {
    createLogo(req: ReqInterface, next: NextFunction): Promise<{
        newLogo: LogoInterface;
        message: string;
    } | void>;
    editLogo(req: ReqInterface, next: NextFunction): Promise<{
        speaker: any;
        message: string;
    } | void>;
    updateStatus(logoId: any): Promise<void>;
    updateLogoBannerStatus(logoId: any): Promise<void>;
    getAllLogo(type: any): Promise<any>;
}
declare const logoService: LogoService;
export default logoService;
