import { NextFunction } from "express";
import ResponseHelper from "../helpers/ResponseHelper";
import { ReqInterface, ResInterface } from "../interfaces/ReqInterface";
import UserModel from "../models/UserModel";

class UserMiddleware {
    async checkUser(req: ReqInterface, res: ResInterface, next: NextFunction) {
        try {
            const email = req.body.email;
            const userExists = await UserModel.exists({ email });

            if (userExists) {
                return ResponseHelper.conflict(res, res.__('user_already_exists'))
            }

            next();
        } catch (error) {
            next(error);
        }
    }
}

export default new UserMiddleware();

