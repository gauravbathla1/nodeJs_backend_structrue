import { NextFunction } from "express";
import { ReqInterface, ResInterface } from "../../interfaces/ReqInterface";
declare class CategoryController {
    createCategory(req: ReqInterface, res: ResInterface, next: NextFunction): Promise<void>;
    getCategory(req: ReqInterface, res: ResInterface, next: NextFunction): Promise<void>;
    getAllCategory(req: ReqInterface, res: ResInterface, next: NextFunction): Promise<void>;
    editCategory(req: ReqInterface, res: ResInterface, next: NextFunction): Promise<void>;
    deleteCategory(req: ReqInterface, res: ResInterface, next: NextFunction): Promise<void>;
}
declare const _default: CategoryController;
export default _default;
