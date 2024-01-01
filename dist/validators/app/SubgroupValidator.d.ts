import { NextFunction } from "express";
import { ReqInterface, ResInterface } from "../../interfaces/ReqInterface";
declare class SubgroupValidator {
    createSubgroup(req: ReqInterface, res: ResInterface, next: NextFunction): Promise<void>;
    addMember(req: ReqInterface, res: ResInterface, next: NextFunction): Promise<void>;
    removeMember(req: ReqInterface, res: ResInterface, next: NextFunction): Promise<void>;
    editSubgroup(req: ReqInterface, res: ResInterface, next: NextFunction): Promise<void>;
}
declare const _default: SubgroupValidator;
export default _default;
