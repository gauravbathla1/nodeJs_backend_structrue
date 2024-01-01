import { NextFunction } from "express";
import ResponseHelper from "../../helpers/ResponseHelper";
import { ReqInterface, ResInterface } from "../../interfaces/ReqInterface";
import AuthService from "../../services/app/AuthService";

class UserAuthController{

/**
 * @api {post} api/v1/app/auth/login Social Login
 * @apiVersion 0.3.0
 * @apiSampleRequest off
 * @apiName Login
 * @apiGroup Auth
 * @apiParamExample {json} Some json code:
 *   {
    "email":"gaurav@gmail.com",
    "name":"gaurav",
    "type":"APPLE",
    "social_token":"token",
    "social_id":"1232"
    }
 *@apiSuccessExample {json} 
    {"status":200,"statusText":"SUCCESS","message":"Login successfully","data":{"token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTNmYWM1NTUzYTFlOGYwMmI1ZmI4NjgiLCJlbWFpbCI6InNhaGlsQGdtYWlsLmNvbSIsInVzZXJUeXBlIjoidXNlciIsImlhdCI6MTY5ODczNzMyMSwiZXhwIjoxNzA5MTA1MzIxfQ.4HM3RV1yh22O1Nh4B4FZekeWvDI0O1OOW2lxLu06gPE","execTime":563}}
 */
    async socailLogin(req:ReqInterface, res:ResInterface,next:NextFunction){
        try {   
            const data = await AuthService.socialSignUp(req?.body);
            if (data)
              return ResponseHelper.ok(res, res.__("login_successfully"), data);
        } catch (error) {
            next(error);
        }
    };

    /**
 * @api {post} api/v1/app/auth/guest-login Guet Login
 * @apiVersion 0.3.0
 * @apiSampleRequest off
 * @apiName Guest-Login
 * @apiGroup Auth
 * @apiParamExample {json} Some json code:
 *   {
    "deviceId":"12345sds13",
    }
 *@apiSuccessExample {json} 
    {"status":200,"statusText":"SUCCESS","message":"Login successfully","data":{"token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTMyNDgxNmRhNTk0NWExZjc4ZDFkNDgiLCJlbWFpbCI6bnVsbCwidXNlclR5cGUiOiJndWVzdCIsImlhdCI6MTY5ODczNzM1MiwiZXhwIjoxNzA5MTA1MzUyfQ.lLtRKX23E71xhKrUlS8JriO3Rcnqai-gRVgNfKRYaYY","execTime":275}}
 */
   
    async guestLogin(req:ReqInterface, res:ResInterface,next:NextFunction){
        try {
            const data = await AuthService.guestLogin(req?.body);
            if (data)
              return ResponseHelper.ok(res, res.__("login_successfully"), data);
        } catch (error) {
            console.log(error);
            
            next(error);
        }
    }

};
export default new UserAuthController();