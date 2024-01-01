import { NextFunction } from "express";
import { ReqInterface, ResInterface } from "../../interfaces/ReqInterface";
declare class TestController {
    test(req: ReqInterface, res: ResInterface, next: NextFunction): Promise<void>;
}
declare const _default: TestController;
export default _default;
