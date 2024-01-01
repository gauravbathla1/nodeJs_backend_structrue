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
const ProductReportModel_1 = require("../../models/ProductReportModel");
const ReportReasonModel_1 = require("../../models/ReportReasonModel");
class ProductReportController {
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
    add(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { reasonId, productId } = req.body;
                const isExists = yield ProductReportModel_1.default.exists({ userId: req.user._id, productId });
                if (isExists) {
                    return ResponseHelper_1.default.badRequest(res, res.__('product_report_exists'), {});
                }
                const reason = yield ReportReasonModel_1.default.findById(reasonId);
                const data = {
                    userId: req.user._id,
                    productId,
                    reasonId,
                    reasonText: reason.text
                };
                yield ProductReportModel_1.default.create(data);
                return ResponseHelper_1.default.ok(res, res.__('product_report'), { data });
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.default = new ProductReportController();
