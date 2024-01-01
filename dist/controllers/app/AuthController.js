"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const ResponseHelper_1 = require("../../helpers/ResponseHelper");
const AuthService_1 = require("../../services/app/AuthService");
class UserAuthController {
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
    socailLogin(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield AuthService_1.default.socialSignUp(req === null || req === void 0 ? void 0 : req.body);
                if (data)
                    return ResponseHelper_1.default.ok(res, res.__("login_successfully"), data);
            }
            catch (error) {
                next(error);
            }
        });
    }
    ;
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
    guestLogin(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield AuthService_1.default.guestLogin(req === null || req === void 0 ? void 0 : req.body);
                if (data)
                    return ResponseHelper_1.default.ok(res, res.__("login_successfully"), data);
            }
            catch (error) {
                console.log(error);
                next(error);
            }
        });
    }
}
;
exports.default = new UserAuthController();
