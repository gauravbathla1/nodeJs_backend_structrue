import { NextFunction } from "express";
import { ReqInterface, ResInterface } from "../../interfaces/ReqInterface";
declare class GroupValidator {
    createGroup(req: ReqInterface, res: ResInterface, next: NextFunction): Promise<void>;
    editGroup(req: ReqInterface, res: ResInterface, next: NextFunction): Promise<void>;
    addMember(req: ReqInterface, res: ResInterface, next: NextFunction): Promise<void>;
    groupRequestAction(req: ReqInterface, res: ResInterface, next: NextFunction): Promise<void>;
    removeMember(req: ReqInterface, res: ResInterface, next: NextFunction): Promise<void>;
    addToFavourite(req: ReqInterface, res: ResInterface, next: NextFunction): Promise<void>;
    join(req: ReqInterface, res: ResInterface, next: NextFunction): Promise<void>;
    inviteMember(req: ReqInterface, res: ResInterface, next: NextFunction): Promise<void>;
}
declare const _default: GroupValidator;
export default _default;
