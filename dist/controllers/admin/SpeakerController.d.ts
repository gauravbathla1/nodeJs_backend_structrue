import { NextFunction } from "express";
import { ReqInterface, ResInterface } from "../../interfaces/ReqInterface";
declare class SpeakerController {
    createSpeaker(req: ReqInterface, res: ResInterface, next: NextFunction): Promise<void>;
    getAllSpeakers(req: ReqInterface, res: ResInterface, next: NextFunction): Promise<void>;
    edit(req: ReqInterface, res: ResInterface, next: NextFunction): Promise<void>;
    updateStatus(req: ReqInterface, res: ResInterface, next: NextFunction): Promise<void>;
    getContactList(req: ReqInterface, res: ResInterface, next: NextFunction): Promise<void>;
}
declare const _default: SpeakerController;
export default _default;
