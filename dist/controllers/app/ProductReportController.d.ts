import { NextFunction } from "express";
import { ReqInterface, ResInterface } from "../../interfaces/ReqInterface";
declare class ProductReportController {
    /**
      * @api {post} /api/v1/app/product-report Add Product Report
      * @apiHeader {String} App-Version Version Code 1.0.0.
      * @apiHeader {String} deviceType 'WEB'|'IOS'|'ANDROID'
      * @apiVersion 1.0.0
      * @apiName Add-product-Report
      * @apiGroup App-Product-Report
      *
      * @apiParam {String} reasonId selected reason id
      * @apiParam {String} productId productId
      *
      * @apiSuccessExample {json} Success-Response-1:
      *  {
      *  "status": 200,
      *  "statusText": "SUCCESS",
      *  "message": "Product Report added successfully",
      *  "data": {
      *      "data": {
      *          "userId": "62dfcb21fb89c4b45de44685",
      *          "productId": "62d7c92286616ebe475db3fa",
      *          "reasonId": "62ea62f1258089711f8cafae",
      *          "reasonText": "shoes size does not match pls actual size provided and pls exchange my shoes"
      *      },
      *      "execTime": 229
      *    }
      *   }
      *
      *
      */
    add(req: ReqInterface, res: ResInterface, next: NextFunction): Promise<void>;
}
declare const _default: ProductReportController;
export default _default;
