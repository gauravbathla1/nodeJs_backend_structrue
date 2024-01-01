import { NextFunction } from "express";
import { ResInterface, ReqInterface } from "../../interfaces/ReqInterface";
declare class BannerController {
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
    getBannerList(req: ReqInterface, res: ResInterface, next: NextFunction): Promise<void>;
}
declare const _default: BannerController;
export default _default;
