import { SpeakerInterface } from "../../interfaces/SpeakerInterface";
import { NextFunction } from "express";
import { ReqInterface } from "../../interfaces/ReqInterface";
declare class SpeakerService {
    createSpeaker(req: ReqInterface, next: NextFunction): Promise<{
        newSpeaker: SpeakerInterface;
        message: string;
    } | void>;
    editSpeaker(req: ReqInterface, next: NextFunction): Promise<{
        speaker: any;
        message: string;
    } | void>;
    updateStatus(speakerId: any): Promise<void>;
    getAllSpeakers(): Promise<SpeakerInterface[]>;
    getContactList(): Promise<any[]>;
}
declare const speakerService: SpeakerService;
export default speakerService;
