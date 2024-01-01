import { NextFunction } from "express";
import ResponseHelper from "../../helpers/ResponseHelper";
import { ReqInterface, ResInterface } from "../../interfaces/ReqInterface";
import UserService from "../../services/admin/UserService";

class UserController{

    async getDashBoardData(req:ReqInterface,res:ResInterface,next:NextFunction){
        try {
            let data = await UserService.getDashBoardData();
            return ResponseHelper.ok(res,"dashboard data find succesfully",data);
        } catch (error) {
            next(error);
        }
    };

    async getUserList(req:ReqInterface,res:ResInterface,next:NextFunction){
        try {
            let page = req.query.page || 1;
            let options = {
              page: page || 1,
              limit: 10,
              sort: {
                createdAt: -1,
              },
            };
            let data = await UserService.getUserList(options);
            return ResponseHelper.ok(res,"User list find succesfully",data);
        } catch (error) {
            console.log(error);
            next(error);
        }
    };

    async updateUserStats(req:ReqInterface,res:ResInterface,next:NextFunction){
        try {
            let userId = req?.params?.id;
            let user = await UserService.updateUserStatus(userId);
            return ResponseHelper.ok(res,"User list find succesfully",user);
        } catch (error) {
            next(error);
        }
    }

};
export default new UserController();