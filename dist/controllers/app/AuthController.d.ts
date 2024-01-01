import { NextFunction } from "express";
import { ReqInterface, ResInterface } from "../../interfaces/ReqInterface";
declare class UserAuthController {
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
    socailLogin(req: ReqInterface, res: ResInterface, next: NextFunction): Promise<void>;
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
    guestLogin(req: ReqInterface, res: ResInterface, next: NextFunction): Promise<void>;
}
declare const _default: UserAuthController;
export default _default;
