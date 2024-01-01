import { ReqInterface, ResInterface } from "../interfaces/ReqInterface";
import { NextFunction } from "express";
export declare const logger: (req: ReqInterface, res: ResInterface, next: NextFunction) => void;
