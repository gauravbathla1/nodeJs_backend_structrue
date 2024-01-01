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
const UserInterface_1 = require("../../interfaces/UserInterface");
const BannerModel_1 = require("../../models/BannerModel");
class BannerController {
    /**
       * @api {get} /api/v1/app/banner Banner listing
       * @apiHeader {String} App-Version Version Code 1.0.0.
       * @apiHeader {String} deviceType 'WEB'|'IOS'|'ANDROID'
       * @apiVersion 1.0.0
       * @apiName search
       * @apiGroup App-Banner
       *
       * @apiSuccessExample {json} Success-Response-1:
       *  {
       *        "status": 200,
       *        "statusText": "SUCCESS",
       *        "message": "Banner list",
       *        "data": {
       *            "banners": [
       *                {
       *                    "_id": "62d8f7558ecb874779972d57",
       *                    "clickUrl": "ffogbrfogfrbfbbb",
       *                    "photo": "banner/1658386260254-Slider_01.png",
       *                    "deviceType": "WEB",
       *                    "isActive": true,
       *                    "isDeleted": false,
       *                    "createdAt": "2022-07-21T06:51:01.706Z",
       *                    "updatedAt": "2022-07-21T06:51:01.706Z",
       *                    "__v": 0
       *                }
       *            ],
       *        }
       *    }
       *
       */
    getBannerList(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let deviceType = 'WEB';
                const dt = req.deviceType;
                if (dt === UserInterface_1.DeviceType.android || dt === UserInterface_1.DeviceType.ios) {
                    deviceType = 'MOBILE';
                }
                const banners = yield BannerModel_1.default.find({ isActive: true, deviceType });
                return ResponseHelper_1.default.ok(res, res.__('banners_list'), { banners });
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.default = new BannerController();
