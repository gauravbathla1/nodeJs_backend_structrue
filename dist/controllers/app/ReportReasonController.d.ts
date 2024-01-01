import { NextFunction } from "express";
import { ReqInterface, ResInterface } from "../../interfaces/ReqInterface";
declare class ReportReasonController {
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
    getReportReasonList(req: ReqInterface, res: ResInterface, next: NextFunction): Promise<void>;
}
declare const _default: ReportReasonController;
export default _default;
