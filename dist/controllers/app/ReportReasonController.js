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
const ReportReasonModel_1 = require("../../models/ReportReasonModel");
class ReportReasonController {
    /**
    *     @api {get} /api/v1/app/report/:categoryId Get Report Reason
    *     @apiHeader {String} App-Version Version Code 1.0.0.
    *     @apiHeader {String} deviceType 'WEB'|'IOS'|'ANDROID'
    *     @apiVersion 1.0.0
    *     @apiName Report-Reason-List
    *     @apiGroup App-Report-Reason
    *     @apiDescription pass categoryId as params
    *     @apiSuccessExample {json} Success-Response-1:
    *
    *     {
    *     "status": 200,
    *     "statusText": "SUCCESS",
    *     "message": "ReportReason list fetch successfully",
    *     "data": {
    *         "reportReason": [
    *             {
    *                 "_id": "62ea6213258089711f8cafa9",
    *                 "title": "jeans defected",
    *                 "text": "jeans color is defected pls exchange my jeans",
    *                 "isActive": true,
    *                 "createdAt": "2022-08-03T11:54:59.400Z",
    *                 "updatedAt": "2022-08-03T11:54:59.400Z",
    *                 "__v": 0
    *             },
    *             {
    *                 "_id": "62ea62f1258089711f8cafae",
    *                 "title": " shoes issue",
    *                 "text": "shoes size does not match pls actual size provided and pls exchange my shoes",
    *                 "isActive": true,
    *                 "createdAt": "2022-08-03T11:58:41.377Z",
    *                 "updatedAt": "2022-08-03T11:58:41.377Z",
    *                 "__v": 0
    *             },
    *             {
    *                 "_id": "62ea63a6258089711f8cafb3",
    *                 "title": "dresses",
    *                 "text": "my dress are defected pls exchange my dress",
    *                 "isActive": true,
    *                 "createdAt": "2022-08-03T12:01:42.473Z",
    *                 "updatedAt": "2022-08-03T12:01:42.473Z",
    *                 "__v": 0
    *             }
    *         ],
    *         "execTime": 33
    *     }
    *     }
    *
    */
    getReportReasonList(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const categoryId = req.params.id;
                const reportReason = yield ReportReasonModel_1.default.find({
                    isDeleted: false,
                    categoryId,
                    isActive: true
                });
                return ResponseHelper_1.default.ok(res, res.__('reportreason_list'), { reportReason });
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.default = new ReportReasonController();
